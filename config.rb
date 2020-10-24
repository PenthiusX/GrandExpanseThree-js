###
# Configuration
###

# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# Assets
set :css_dir, 'assets/stylesheets'
set :js_dir, 'assets/javascripts'
set :images_dir, 'assets/images'
set :models_dir, 'assets/models'
set :sound_dir, 'assets/sound'

# Development
configure :development do
  activate :livereload
  activate :sprockets
end

# Build
configure :build do
  activate :sprockets
  activate :minify_css
  activate :minify_javascript
end
