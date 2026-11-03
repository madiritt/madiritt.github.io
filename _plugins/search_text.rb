# frozen_string_literal: true

# Site search: page text index (2026-11-02).
#
# The search box (al_search gem, a ninja-keys dropdown) only matches page
# titles and their one-line summaries. After every build this writes
# assets/search-text.json, one row per published page:
#   { "url": "/teaching/", "title": "Teaching / Mentoring", "text": "..." }
# assets/js/search-text.js fetches it on the visitor's first keystroke and adds
# "Found on <page>" rows to the dropdown; choosing one opens the page scrolled
# to the word and highlighted (browser text fragments).
#
# Runs at :post_write because only then is every page's final HTML available
# (Jekyll Scholar output, the teaching sections, the gallery grid). The file is
# written straight into the destination folder. Nothing here can fail the build:
# any error is logged as a warning and search simply keeps matching titles.
#
# What counts as page text: everything inside the main content area
# ([role="main"]) minus scripts/styles/SVG and raw BibTeX blocks, plus photo
# captions, which exist only as lightbox data-title attributes. Pages left out:
# the old-address forwarding stubs (layout: redirect), the 404 page, anything
# marked sitemap: false, /admin, collections with output: false (news; its
# text is on /news/), and the duplicate listings named in SKIP_URLS and
# DUPLICATE_BLOCKS below.

require "fileutils"
require "json"
require "nokogiri"

module SearchTextIndex
  OUTPUT_PATH = "assets/search-text.json"

  # Inside the main content but not readable page text.
  STRIP_SELECTOR = "script, style, noscript, template, svg, nav, .bibtex"

  # Listings that repeat text whose real home is another page. Without these
  # rules one word shows up as two or three search rows.
  #   /research/ is only the cards (each research page carries its own title
  #   and blurb). The homepage's News and Selected Publications blocks repeat
  #   /news/ and /publications/.
  SKIP_URLS = ["/research/"].freeze
  DUPLICATE_BLOCKS = { "/" => ".news, .publications" }.freeze

  # Block-level elements get a trailing space so text from neighbouring blocks
  # does not fuse into one word ("Teaching philosophyI have...").
  BLOCK_SELECTOR = "address, article, aside, blockquote, br, dd, div, dl, dt, " \
                   "figcaption, figure, footer, h1, h2, h3, h4, h5, h6, header, " \
                   "hr, li, main, ol, p, section, table, td, th, tr, ul"

  module_function

  def indexable?(item)
    return false unless item.respond_to?(:output_ext) && item.output_ext == ".html"
    return false if item.respond_to?(:write?) && !item.write?
    return false if item.output.nil? || item.output.empty?
    return false if item.data["layout"] == "redirect"
    return false if item.data["redirect"] # the 404 page bounces home
    return false if item.data["sitemap"] == false
    return false if item.url.start_with?("/admin")
    return false if SKIP_URLS.include?(item.url)

    true
  end

  def page_text(html, url)
    doc = Nokogiri::HTML(html)
    main = doc.at_css('[role="main"]')
    return "" unless main

    main.css(STRIP_SELECTOR).remove
    main.css(DUPLICATE_BLOCKS[url]).remove if DUPLICATE_BLOCKS.key?(url)

    captions = main.css("[data-title]").map do |el|
      Nokogiri::HTML.fragment(el["data-title"].to_s).text
    end

    main.css(BLOCK_SELECTOR).each do |el|
      el.add_next_sibling(Nokogiri::XML::Text.new(" ", doc))
    end

    [main.text, *captions].join(" ").gsub(/\s+/, " ").strip
  end

  def title_for(item)
    title = item.data["title"].to_s.strip
    title.empty? ? item.url : title
  end

  def build(site)
    items = site.pages + site.collections.values.flat_map(&:docs)
    rows = items.select { |item| indexable?(item) }.filter_map do |item|
      text = page_text(item.output, item.url)
      next if text.empty?

      { "url" => item.url, "title" => title_for(item), "text" => text }
    end

    path = File.join(site.dest, OUTPUT_PATH)
    FileUtils.mkdir_p(File.dirname(path))
    File.write(path, JSON.generate(rows))
    Jekyll.logger.info "Search text:", "indexed #{rows.length} pages -> #{OUTPUT_PATH}"
  rescue StandardError => e
    Jekyll.logger.warn "Search text:", "index NOT written (#{e.class}: #{e.message}). " \
                                       "Site search still works on page titles."
  end
end

Jekyll::Hooks.register :site, :post_write do |site|
  SearchTextIndex.build(site)
end
