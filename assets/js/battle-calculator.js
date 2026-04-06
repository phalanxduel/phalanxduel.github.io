(function () {
  console.log("Battle Calculator JS Loaded");
  const suits = [
    { code: "D", name: "Diamond" },
    { code: "H", name: "Heart" },
    { code: "C", name: "Club" },
    { code: "S", name: "Spade" },
  ];

  const ranks = [
    { code: "A", value: 1, label: "A" },
    { code: "2", value: 2, label: "2" },
    { code: "3", value: 3, label: "3" },
    { code: "4", value: 4, label: "4" },
    { code: "5", value: 5, label: "5" },
    { code: "6", value: 6, label: "6" },
    { code: "7", value: 7, label: "7" },
    { code: "8", value: 8, label: "8" },
    { code: "9", value: 9, label: "9" },
    { code: "10", value: 10, label: "10" },
    { code: "J", value: 11, label: "J" },
    { code: "Q", value: 11, label: "Q" },
    { code: "K", value: 11, label: "K" },
  ];

  const suitSymbol = { D: "♦", H: "♥", C: "♣", S: "♠" };
  const suitName = { D: "Diamond", H: "Heart", C: "Club", S: "Spade" };

  function parseCard(token) {
    if (!token || token === "EMPTY") return null;
    const [suit, rank] = token.split("-");
    const rankDef = ranks.find((entry) => entry.code === rank);
    if (!rankDef || !suitName[suit]) return null;

    return {
      suit: suit,
      rank: rankDef.code,
      value: rankDef.value,
      label: rankDef.label + suitSymbol[suit],
      verbose: suitName[suit] + " " + rankDef.label,
    };
  }

  function cardOutcome(card, health, survives, aceProtected) {
    if (!card) return "Empty slot";
    if (aceProtected) return "<span style='color: green;'>Survives (Ace rule)</span>";
    if (survives) return "<span style='color: green;'>Survives (" + health + " HP)</span>";
    return "<span style='color: red;'>Destroyed</span>";
  }

  function createOption(value, text) {
    const opt = document.createElement("option");
    opt.value = value;
    opt.textContent = text;
    return opt;
  }

  function populateCardSelect(selectEl, includeEmpty) {
    selectEl.innerHTML = "";
    if (includeEmpty) {
      selectEl.appendChild(createOption("EMPTY", "Empty"));
    }

    suits.forEach((suit) => {
      ranks.forEach((rank) => {
        const value = suit.code + "-" + rank.code;
        const text = rank.label + suitSymbol[suit.code] + " (" + suit.name + ")";
        selectEl.appendChild(createOption(value, text));
      });
    });
  }

  function modeLabel(mode) {
    if (mode === "canonical_v1_0" || mode === "intro_rules") return "Canonical v1.0";
    return "Historical Prototype";
  }

  function renderProgression(result) {
    const steps = Array.isArray(result.progression) ? result.progression : [];
    if (!steps.length) return "<p class=\"small-note\">No progression data available.</p>";

    const rows = steps.map(function (step) {
      return "<tr><td><strong>" + step.stage + "</strong></td><td>" + step.before + "</td><td>" + step.after + "</td><td><em>" + (step.note || "") + "</em></td></tr>";
    }).join("");

    return '<div class="table-wrap" style="margin-top: 1rem;"><table><thead><tr><th>Stage</th><th>Damage Before</th><th>Damage After</th><th>Teaching Note</th></tr></thead><tbody>' + rows + "</tbody></table></div>";
  }
  
  function generateTeachingNarrative(attacker, front, back, result) {
      let narrative = "<p style='font-size: 1.1rem; line-height: 1.6;'>";
      
      narrative += "The <strong>" + attacker.verbose + "</strong> attacks the column. ";
      
      if (!front) {
          narrative += "The Front Row is empty, so the attack immediately hits the Back Row. ";
      } else {
          if (result.survivors.front) {
              narrative += "The <strong>" + front.verbose + "</strong> absorbs the hit and <strong>survives</strong>, stopping the attack completely. ";
              return narrative + "</p>";
          } else {
              narrative += "The attack <strong>destroys</strong> the <strong>" + front.verbose + "</strong>. ";
          }
      }
      
      if (!back && front) {
          narrative += "Because there is no Back Row defender, the carryover damage proceeds toward the Life Points. ";
      } else if (back && !result.survivors.front) {
          if (result.survivors.back) {
              narrative += "The carryover damage hits the <strong>" + back.verbose + "</strong>, which <strong>survives</strong> and stops the attack. ";
              return narrative + "</p>";
          } else {
              narrative += "The carryover damage is strong enough to also <strong>destroy</strong> the <strong>" + back.verbose + "</strong>. ";
          }
      }
      
      if (result.lpDamage > 0) {
          narrative += "The remaining damage breaks through the column entirely, resulting in <strong>" + result.lpDamage + " LP damage</strong> to the player. ";
      } else {
          narrative += "However, suit shields (like Hearts or Diamonds) mitigate the remaining damage, resulting in <strong>0 LP damage</strong>. ";
      }
      
      return narrative + "</p>";
  }

  function renderResult(root, attacker, front, back, mode, result) {
    const logItems = result.log.map(function (entry) {
      return "<li style='margin-bottom: 0.25rem;'>" + entry + "</li>";
    }).join("");

    root.innerHTML =
      '<div style="text-align: center; margin-bottom: 1.5rem;">' +
      '<h3 style="font-size: 2rem; margin: 0; color: ' + (result.lpDamage > 0 ? 'var(--color-danger, #d9534f)' : 'var(--text-color)') + ';">' + result.lpDamage + ' LP Damage</h3>' +
      '</div>' +
      
      '<div style="background: white; border: 1px solid var(--border-color, #ccc); padding: 1rem; border-radius: 4px; margin-bottom: 1.5rem;">' +
      '<h4 style="margin-top: 0;">What just happened?</h4>' +
      generateTeachingNarrative(attacker, front, back, result) +
      '</div>' +

      '<div class="result-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">' +
      '<div class="result-block" style="background: white; padding: 1rem; border-radius: 4px; border: 1px solid var(--border-color, #ccc);"><h3>Front Slot</h3><p><strong>Card:</strong> ' + (front ? front.verbose : "Empty") + '</p><p><strong>Outcome:</strong> ' + cardOutcome(front, result.frontHealth, result.survivors.front, result.specials && result.specials.frontAceProtected) + "</p></div>" +
      '<div class="result-block" style="background: white; padding: 1rem; border-radius: 4px; border: 1px solid var(--border-color, #ccc);"><h3>Back Slot</h3><p><strong>Card:</strong> ' + (back ? back.verbose : "Empty") + '</p><p><strong>Outcome:</strong> ' + cardOutcome(back, result.backHealth, result.survivors.back, false) + "</p></div>" +
      '<div class="result-block" style="background: white; padding: 1rem; border-radius: 4px; border: 1px solid var(--border-color, #ccc);"><h3>Attacker</h3><p><strong>Card:</strong> ' + attacker.verbose + '</p><p><strong>Outcome:</strong> <span style="color: green;">Survives</span></p></div>' +
      "</div>" +
      
      "<h3>Step-by-Step Resolution</h3>" +
      renderProgression(result) +
      
      "<h3 style='margin-top: 2rem;'>Engine Trace Log</h3>" +
      '<ol class="quick-list" style="font-family: monospace; font-size: 0.9em; background: #eee; padding: 1rem 1rem 1rem 2rem; border-radius: 4px;">' + logItems + "</ol>";
  }

  function init() {
    console.log("Battle Calculator: Initializing...");
    const attackerSelect = document.getElementById("attacker-card");
    const frontSelect = document.getElementById("front-card");
    const backSelect = document.getElementById("back-card");
    const modeSelect = document.getElementById("battle-mode");
    const button = document.getElementById("simulate-battle");
    const resultRoot = document.getElementById("battle-result");

    if (!attackerSelect || !frontSelect || !backSelect || !modeSelect || !button || !resultRoot) {
      console.error("Battle Calculator: Missing DOM elements!");
      return;
    }

    populateCardSelect(attackerSelect, false);
    populateCardSelect(frontSelect, true);
    populateCardSelect(backSelect, true);

    attackerSelect.value = "S-9";
    frontSelect.value = "D-3";
    backSelect.value = "H-2";
    modeSelect.value = "canonical_v1_0";

    function runSimulation(event) {
      console.log("Battle Calculator: Running simulation...");
      const attacker = parseCard(attackerSelect.value);
      const front = parseCard(frontSelect.value);
      const back = parseCard(backSelect.value);
      const mode = modeSelect.value;

      if (!attacker) {
        resultRoot.innerHTML = '<p class="small-note">Select an attacker card to run simulation.</p>';
        return;
      }

      if (!window.PhxBattle || typeof window.PhxBattle.resolveBattle !== "function") {
        resultRoot.innerHTML = '<p class="small-note">Battle engine unavailable on this page. The calculator requires the PhxBattle script to be loaded.</p>';
        return;
      }

      const result = window.PhxBattle.resolveBattle({
        attacker: attacker,
        front: front,
        back: back,
        mode: mode,
      });
      
      renderResult(resultRoot, attacker, front, back, mode, result);

      resultRoot.classList.remove("calculation-update");
      void resultRoot.offsetWidth; 
      resultRoot.classList.add("calculation-update");

      if (event && event.type === "click") {
        resultRoot.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }

    button.addEventListener("click", runSimulation);

    [attackerSelect, frontSelect, backSelect, modeSelect].forEach(function (el) {
      el.addEventListener("change", runSimulation);
    });

    // We do NOT run an initial simulation anymore so the user has to click,
    // which makes it a conscious study tool.
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();