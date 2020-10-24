# require 'middleman-core/load_paths'
# ::Middleman.setup_load_paths
#
# require 'middleman-core'
# require 'middleman-core/rack'
#
# require 'fileutils'
# FileUtils.mkdir('log') unless File.exist?('log')
# ::Middleman::Logger.singleton("log/#{ENV['RACK_ENV']}.log")



# it runs the next line on bash
# `rm -rf build`
`bundle exec middleman build`




use Rack::Static,
  :urls => [
    "/assets/images",
    "/assets/javascripts",
    "/assets/models",
    "/assets/sounds",
    "/assets/stylesheets"
  ],
  :root => "build"


use Rack::Auth::Basic, "Restricted Area" do |username, password|
  [username, password] == ['tendril', 'T3ndr1l056']
end


run lambda { |env|
  [
    200,
    {
      'Content-Type'  => 'text/html',
      'Cache-Control' => 'public, max-age=86400'
    },
    File.open('build/index.html', File::RDONLY)
  ]
}

















# require 'middleman-core/load_paths'
# ::Middleman.setup_load_paths
#
# require 'middleman-core'
# require 'middleman-core/rack'
#
# require 'fileutils'
# FileUtils.mkdir('log') unless File.exist?('log')
# ::Middleman::Logger.singleton("log/#{ENV['RACK_ENV']}.log")
#
# app = ::Middleman::Application.new
#
# # run ::Middleman::Rack.new(app).to_app
#
#
# protected_middleman = Rack::Auth::Basic.new(app) do |username, password, c, d|
# # protected_middleman = ::Middleman::Rack::Auth::Basic.new(app) do |username, password|
#   puts username
#   puts password
#   puts c
#   puts d
#   [username, password] == ['tendril', 'tendril']
# end
#
# run protected_middleman
