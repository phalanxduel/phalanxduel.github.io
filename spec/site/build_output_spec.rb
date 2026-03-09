require "spec_helper"

RSpec.describe "Built site output" do
  it "has generated key pages" do
    expect(SITE_DIR.join("index.html")).to exist
    expect(SITE_DIR.join("rules/index.html")).to exist
    expect(SITE_DIR.join("how-to-play/index.html")).to exist
    expect(SITE_DIR.join("tutorial/index.html")).to exist
    expect(SITE_DIR.join("battle-calculator/index.html")).to exist
  end

  it "renders the homepage conversion headline and primary CTAs" do
    doc = parse_site_html("index.html")

    expect(doc.at_css("h1")&.text).to include("Start a duel in seconds.")
    expect(doc.text).to include("Create a match. Share a link. Start the duel.")
    expect(doc.text).to include("Dynamic Gameplay")
    expect(doc.text).to include("From Curious to Master")
    expect(doc.text).to include("Official Tutorial")
    expect(doc.text).to include("Battle Calculator")
  end

  it "renders the rules page scannable sections" do
    html = read_site_file("rules/index.html")

    expect(html).to include("Phalanx Duel Rules v1.0 (Player Summary)")
    expect(html).to include("Turn Cycle and Suit Timing")
    expect(html).to include("Attack Declaration &amp; Target Chain")
  end

  it "keeps global accessibility landmarks on key pages" do
    ["index.html", "rules/index.html", "how-to-play/index.html", "tutorial/index.html"].each do |page|
      doc = parse_site_html(page)

      expect(doc.at_css("a.skip-link")&.[]("href")).to eq("#main"), page
      expect(doc.at_css("main#main")).not_to be_nil, page
      expect(doc.at_css("header")).not_to be_nil, page
      expect(doc.at_css("footer")).not_to be_nil, page
    end
  end
end
