require "spec_helper"

RSpec.describe "Built site output" do
  it "has generated key pages" do
    expect(SITE_DIR.join("index.html")).to exist
    expect(SITE_DIR.join("learn/rules/index.html")).to exist
    expect(SITE_DIR.join("learn/getting-started/index.html")).to exist
    expect(SITE_DIR.join("learn/first-match/index.html")).to exist
    expect(SITE_DIR.join("tools/battle-calculator/index.html")).to exist
  end

  it "renders the homepage conversion headline and primary CTAs" do
    doc = parse_site_html("index.html")

    expect(doc.at_css("h1")&.text).to include("The Collision of Lines.")
    expect(doc.text).to include("Red protects. Blue attacks. Master the cascade.")
    expect(doc.text).to include("Formation is Destiny")
    expect(doc.text).to include("Study the Cascade")
    expect(doc.text).to include("Combat Lab")
  end

  it "renders the rules page scannable sections" do
    html = read_site_file("learn/rules/index.html")

    expect(html).to include("Tactical Briefing: The Grid System")
    expect(html).to include("Suit Roles (The Combat Engine)")
    expect(html).to include("The Cascade")
  end

  it "keeps global accessibility landmarks on key pages" do
    ["index.html", "learn/rules/index.html", "learn/getting-started/index.html", "learn/first-match/index.html"].each do |page|
      doc = parse_site_html(page)

      expect(doc.at_css("a.skip-link")&.[]("href")).to eq("#main"), page
      expect(doc.at_css("main#main")).not_to be_nil, page
      expect(doc.at_css("header")).not_to be_nil, page
      expect(doc.at_css("footer")).not_to be_nil, page
    end
  end
end
