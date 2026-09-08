# frozen_string_literal: true

# Publications: form files -> BibTeX for Jekyll Scholar.
#
# The /admin editor saves one YAML-front-matter file per paper in
# _publications/. This generator reads those files itself (the folder is
# deliberately NOT a Jekyll collection: al_search would index every paper as
# a page that does not exist) and writes _bibliography/papers.bib at build
# time, so Jekyll Scholar and the al-folio bib layout keep rendering the list
# exactly as before. The .bib is a build artifact and is gitignored.
#
# It also exposes the parsed papers to Liquid as `site.data.publications`
# (newest year first) for anything else that needs them, currently the photo
# credits overlay in _includes/publication-credits.html.
#
# Runs at :highest priority so the file exists before Scholar's own generator
# (:high) and the {% bibliography %} tag (render time) read it.
#
# FIELDS IN EACH _publications/*.md FILE (the contract; anything else that
# renders publications, now or in a future site generator, can read these):
#   title     required. Text with optional emphasis: *italic* / _italic_,
#             **bold**, or raw <i>/<em>/<b>/<strong> tags.
#   authors   required. List of { family: Surname, given: First names }.
#   year      required. Integer.
#   journal   optional. Journal name.
#   doi       optional. Bare DOI or a doi.org link (prefix is stripped).
#   selected  optional. true = also shown in the homepage Selected Publications.
#   preview   optional. Thumbnail path as the editor stores it
#             (/assets/img/publication_preview/x.webp or any other site path).
#   credit    optional. Photo credit; read by _includes/publication-credits.html,
#             never written into the .bib.
#   abstract  optional. Same emphasis rules as title.
#   volume, number, pages   optional. Kept for citation completeness only.
#   extra     optional. List of { key:, value: } pairs copied verbatim into the
#             entry, so any al-folio bib field (award, arxiv, code, slides,
#             video, month, ...) is reachable without changing the form.
#
# A file missing title, authors or year is skipped with a warning naming it;
# the build never fails because of one bad entry.
require 'yaml'

module PublicationsBib
  # ---- CONFIG (edit here, nothing else needs to change) ---------------------
  SOURCE_DIR  = '_publications'                     # where the editor writes one file per paper
  OUTPUT_PATH = '_bibliography/papers.bib'          # what Jekyll Scholar reads
  PREVIEW_DIR = '/assets/img/publication_preview/'  # bare filenames render responsively from here
  ITALIC_TAG  = 'i'                                 # HTML tag emitted for *italic*
  BOLD_TAG    = 'b'                                 # HTML tag emitted for **bold**
  ENTRY_TYPE  = 'article'                           # every entry is a journal article
  # Entries are ordered newest year first, then by title; Scholar keeps that
  # order inside each year group.
  # ---------------------------------------------------------------------------

  BIB_SPECIALS = /([&%$#_{}])/.freeze
  RESERVED_KEYS = %w[title author journal year doi selected preview].freeze
  FRONT_MATTER = /\A---\s*\r?\n(.*?)\r?\n---\s*(\r?\n|\z)/m.freeze

  class Generator < Jekyll::Generator
    priority :highest

    def generate(site)
      @site = site
      papers = read_papers(File.join(site.source, SOURCE_DIR))
      entries = papers.map { |paper| entry_for(paper) }.compact
      entries = assign_keys(entries)

      content = "---\n---\n\n" + entries.map { |e| e[:text] }.join("\n")
      write_if_changed(File.join(site.source, OUTPUT_PATH), content)

      # Liquid access, e.g. {% for pub in site.data.publications %}.
      site.data['publications'] = entries.map { |e| e[:data].merge('key' => e[:key]) }

      Jekyll.logger.info 'Publications:', "#{entries.size} entries -> #{OUTPUT_PATH}"
      entries.each { |e| Jekyll.logger.info 'Publications:', "  #{e[:key]}  (#{e[:source]})" }
    end

    private

    # Each file is front matter only. Returns [{ data:, source: }, ...].
    def read_papers(dir)
      return [] unless File.directory?(dir)

      Dir.glob(File.join(dir, '*.{md,markdown,yml,yaml}')).sort.map do |path|
        source = File.join(SOURCE_DIR, File.basename(path))
        text = File.read(path, encoding: 'UTF-8')
        yaml = text =~ FRONT_MATTER ? Regexp.last_match(1) : text
        data = YAML.safe_load(yaml, permitted_classes: [Date, Time], aliases: true)
        unless data.is_a?(Hash)
          Jekyll.logger.warn 'Publications:', "skipped #{source}: not a YAML mapping"
          next nil
        end
        { data: data, source: source }
      rescue StandardError => e
        Jekyll.logger.warn 'Publications:', "skipped #{source}: #{e.class}: #{e.message}"
        nil
      end.compact
    end

    # Markdown emphasis (what the editor's rich-text box saves) and raw HTML
    # tags both become the HTML the bib layout prints verbatim.
    def emphasis_to_html(text)
      t = text.to_s
      t = t.gsub(/\*\*(.+?)\*\*/m) { "<#{BOLD_TAG}>#{Regexp.last_match(1)}</#{BOLD_TAG}>" }
      t = t.gsub(/__(.+?)__/m) { "<#{BOLD_TAG}>#{Regexp.last_match(1)}</#{BOLD_TAG}>" }
      t = t.gsub(/\*(.+?)\*/m) { "<#{ITALIC_TAG}>#{Regexp.last_match(1)}</#{ITALIC_TAG}>" }
      t = t.gsub(/(?<![[:alnum:]])_(.+?)_(?![[:alnum:]])/m) { "<#{ITALIC_TAG}>#{Regexp.last_match(1)}</#{ITALIC_TAG}>" }
      t = t.gsub(%r{<(/?)em>}, "<\\1#{ITALIC_TAG}>").gsub(%r{<(/?)strong>}, "<\\1#{BOLD_TAG}>")
      t.gsub(/\\([*_])/, '\1') # editor-escaped literal * or _
    end

    # Collapse whitespace and escape BibTeX specials. HTML tags pass through.
    def esc(value)
      value.to_s.strip.gsub(/\s+/, ' ').gsub(BIB_SPECIALS) { "\\#{Regexp.last_match(1)}" }
    end

    def blank?(value)
      value.to_s.strip.empty?
    end

    def entry_for(paper)
      d = paper[:data]
      source = paper[:source]
      title = emphasis_to_html(d['title']).strip
      year = d['year'].to_s.strip
      authors = Array(d['authors']).select { |a| a.is_a?(Hash) && !blank?(a['family']) }
      if title.empty? || year.empty? || authors.empty?
        Jekyll.logger.warn 'Publications:', "skipped #{source}: needs title, year and at least one author"
        return nil
      end

      fields = []
      fields << ['title', esc(title)]
      fields << ['author', authors.map { |a| author_string(a) }.join(' and ')]
      fields << ['journal', esc(d['journal'])] unless blank?(d['journal'])
      %w[volume number pages].each { |k| fields << [k, esc(d[k])] unless blank?(d[k]) }
      fields << ['year', esc(year)]
      fields << ['doi', d['doi'].to_s.strip.sub(%r{^https?://(dx\.)?doi\.org/}i, '')] unless blank?(d['doi'])
      fields << ['abstract', esc(emphasis_to_html(d['abstract']))] unless blank?(d['abstract'])
      fields << ['selected', 'true'] if d['selected'] == true
      fields << ['preview', preview_value(d['preview'])] unless blank?(d['preview'])

      Array(d['extra']).each do |pair|
        next unless pair.is_a?(Hash) && !blank?(pair['key']) && !blank?(pair['value'])

        key = pair['key'].to_s.strip.downcase
        if RESERVED_KEYS.include?(key)
          Jekyll.logger.warn 'Publications:', "#{source}: extra field `#{key}` ignored, use the form box for it"
          next
        end
        fields << [key, esc(pair['value'])]
      end

      {
        base_key: base_key(authors.first['family'], year, title),
        year: year.to_i,
        title: title,
        source: source,
        data: d,
        fields: fields
      }
    end

    # The bib layout renders a bare filename responsively from PREVIEW_DIR and
    # anything containing "://" as a plain <img>. So: a thumbnail in the
    # publications folder -> bare name; a photo picked from any other folder
    # (e.g. the gallery) -> absolute site URL, which still displays, just
    # without the responsive variants.
    def preview_value(raw)
      path = raw.to_s.strip
      return path if path.include?('://')

      path = "/#{path}" unless path.start_with?('/')
      return File.basename(path) if "#{File.dirname(path)}/" == PREVIEW_DIR

      "#{@site.config['url']}#{@site.config['baseurl']}#{path}"
    end

    def author_string(author)
      family = esc(author['family'])
      given = esc(author['given'])
      given.empty? ? family : "#{family}, #{given}"
    end

    # Scholar-style key: first author's surname + year + first title word,
    # ASCII lowercase, so anchors look like rittinger2025instinct.
    def base_key(family, year, title)
      plain_title = title.gsub(/<[^>]+>/, '')
      first_word = plain_title.split(/[^[:alnum:]]+/).find { |w| !w.empty? } || 'paper'
      "#{ascii(family)}#{year}#{ascii(first_word)}"
    end

    def ascii(text)
      text.to_s.unicode_normalize(:nfkd).gsub(/[^\x00-\x7F]/, '').downcase.gsub(/[^a-z0-9]/, '')
    end

    # Newest year first, then title; clashing keys get b, c, d... suffixes.
    def assign_keys(entries)
      entries = entries.sort_by { |e| [-e[:year], e[:title].downcase] }
      seen = Hash.new(0)
      entries.each do |e|
        n = seen[e[:base_key]]
        seen[e[:base_key]] += 1
        e[:key] = n.zero? ? e[:base_key] : "#{e[:base_key]}#{('a'.ord + n).chr}"
        lines = e[:fields].map { |k, v| "  #{k}={#{v}}" }
        e[:text] = "@#{ENTRY_TYPE}{#{e[:key]},\n#{lines.join(",\n")}\n}\n"
      end
      entries
    end

    # Only touch the file when content differs, so `jekyll serve --watch`
    # never sees its own write and loops.
    def write_if_changed(path, content)
      FileUtils.mkdir_p(File.dirname(path))
      return if File.exist?(path) && File.read(path, encoding: 'UTF-8') == content

      File.write(path, content, encoding: 'UTF-8')
    end
  end
end
