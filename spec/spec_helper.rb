require "rspec"
require "nokogiri"
require "pathname"

ROOT_DIR = Pathname.new(File.expand_path("..", __dir__))
SITE_DIR = ROOT_DIR.join("_site")

module SiteSpecHelpers
  def read_site_file(relative_path)
    path = SITE_DIR.join(relative_path)
    raise "Missing built file: #{path}" unless path.exist?

    path.read
  end

  def parse_site_html(relative_path)
    Nokogiri::HTML(read_site_file(relative_path))
  end
end

RSpec.configure do |config|
  config.include SiteSpecHelpers
  config.order = :random
end
