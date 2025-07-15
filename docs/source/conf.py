# Configuration file for the Sphinx documentation builder.

# -- Project information

project = "ictVoIP Billing for WHMCS"
copyright = "2025, ictVoIP Canada"
author = "ictVoIP Canada"

version = "1.3.2"

# -- General configuration

extensions = [
    'sphinx.ext.duration',
    'sphinx.ext.doctest',
    'sphinx.ext.autodoc',
    'sphinx.ext.autosummary',
    'sphinx.ext.intersphinx',
]

intersphinx_mapping = {
    'python': ('https://docs.python.org/3/', None),
    'sphinx': ('https://www.sphinx-doc.org/en/master/', None),
}
intersphinx_disabled_domains = ['std']

templates_path = ['_templates']

# -- Options for HTML output

html_theme = 'sphinx_rtd_theme'
html_favicon = '_static/images/favicon.ico'

# Navigation and TOC improvements
html_theme_options = {
    'navigation_depth': 4,
    'collapse_navigation': False,
    'sticky_navigation': True,
    'includehidden': True,
    'titles_only': False,
    'display_version': True,
    'prev_next_buttons_location': 'both',
    'style_external_links': True,
    'style_nav_header_background': '#2980B9',
}

# Enable breadcrumbs
html_context = {
    'display_github': False,
    'display_gitlab': False,
    'display_bitbucket': False,
    'show_source': False,
    'show_sphinx': False,
    'show_copyright': True,
}

# Improve TOC navigation
html_use_index = True
html_split_index = False
html_copy_source = False
html_show_sourcelink = False

# Include custom CSS and JavaScript for better navigation
html_css_files = [
    'custom.css',
]

html_js_files = [
    'navigation.js',
]

# -- Options for EPUB output
epub_show_urls = 'footnote'

man_pages = [
    ('index', 'ictvoipdocs', 'ictVoIP Billing Documentation',
     ['ictVoIP Canada'], 1)
]

pygments_style = "monokai"
