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
  
  // PedagogicalAdapter Interface
  // This layer bridges simulation engine results and educational UI components.
  const PedagogicalAdapter = {
    getBeginnerNarrative: function(attacker, front, back, result) {
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
  };

  function generateTeachingNarrative(attacker, front, back, result) {
      return PedagogicalAdapter.getBeginnerNarrative(attacker, front, back, result);
  }

  function updateVisualizer(attacker, front, back) {
    const vis = document.getElementById("cascade-vis");
    const vAtk = document.getElementById("vis-attacker");
    const vFront = document.getElementById("vis-front");
    const vBack = document.getElementById("vis-back");

    if (!vis || !vAtk || !vFront || !vBack) return;

    // Reset animation state
    vis.classList.remove("cv-animating");
    void vis.offsetWidth; // Trigger reflow

    const setCard = (el, card) => {
      if (!card) {
        el.style.opacity = "0.2";
        el.querySelector(".cv-suit").textContent = "";
        el.querySelector(".cv-rank").textContent = "";
        return;
      }
      el.style.opacity = "1";
      el.querySelector(".cv-suit").textContent = suitSymbol[card.suit];
      el.querySelector(".cv-rank").textContent = card.rank;
      el.style.borderColor = card.suit === "H" || card.suit === "D" ? "var(--color-defense)" : "var(--color-offense)";
    };

    setCard(vAtk, attacker);
    setCard(vFront, front);
    setCard(vBack, back);

    // Re-enable animation
    vis.classList.add("cv-animating");
  }

  // PedagogicalAdapter Interface (Proposed)
  // This layer will bridge the gap between simulation engine results and educational UI components.
  const PedagogicalAdapter = {
    // Defines the contract for transforming a raw battle simulation result 
    // into structured tutorial narrative tokens.
    getNarrative: function(attacker, front, back, result) {
      // Implementation will be filled in Task-013
      return []; 
    }
  };

  function renderResult(root, attacker, front, back, mode, result) {
    // SimulationOutcome: The canonical data model returned by PhxBattle.resolveBattle
    // result: {
    //   mode: string,
    //   lpDamage: number,
    //   frontHealth: number | null,
    //   backHealth: number | null,
    //   log: string[],
    //   progression: Array<{ stage: string, before: any, after: any, note: string }>,
    //   survivors: { attacker: boolean, front: boolean | null, back: boolean | null },
    //   specials: { frontAceProtected: boolean, backAceProtected: boolean }
    // }

    // Update the visualizer first
    updateVisualizer(attacker, front, back);

    const logItems = result.log.map(function (entry) {
      return "<li style='margin-bottom: 0.5rem; border-left: 2px solid var(--grid-line-bold); padding-left: 1rem;'>" + entry + "</li>";
    }).join("");

    root.innerHTML =
      '<div style="text-align: center; margin-bottom: 3rem; border-bottom: 1px solid var(--grid-line-bold); padding-bottom: 2rem;">' +
      '<span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--color-text-dim); text-transform: uppercase;">Simulation Outcome</span>' +
      '<h3 style="font-size: 4rem; margin: 0.5rem 0 0; color: ' + (result.lpDamage > 0 ? 'var(--color-defense)' : 'var(--color-success)') + ';">' + result.lpDamage + ' LP Damage</h3>' +
      '</div>' +
      
      '<div style="background: var(--color-surface-up); border-left: 4px solid var(--color-offense); padding: 2rem; margin-bottom: 3rem;">' +
      '<h4 style="margin-top: 0; color: var(--color-offense); font-family: var(--font-mono); font-size: 0.8rem; letter-spacing: 0.1em;">// TACTICAL BRIEFING</h4>' +
      generateTeachingNarrative(attacker, front, back, result) +
      '</div>' +

      '<div class="result-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 3rem;">' +
      '<div class="result-block" style="background: var(--color-surface); border: 1px solid var(--color-border-up); padding: 1.5rem; border-top: 4px solid var(--color-offense);">' +
        '<span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-offense); display: block; margin-bottom: 1rem;">ATTACKER</span>' +
        '<p style="margin: 0; font-weight: 900; text-transform: uppercase; font-size: 1.2rem;">' + attacker.verbose + '</p>' +
        '<p style="margin: 0.5rem 0 0; font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-success);">ACTIVE SOURCE</p>' +
      '</div>' +
      '<div class="result-block" style="background: var(--color-surface); border: 1px solid var(--color-border-up); padding: 1.5rem; border-top: 4px solid var(--color-defense);">' +
        '<span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-defense); display: block; margin-bottom: 1rem;">FRONT DEFENDER</span>' +
        '<p style="margin: 0; font-weight: 900; text-transform: uppercase; font-size: 1.2rem;">' + (front ? front.verbose : "EMPTY") + '</p>' +
        '<p style="margin: 0.5rem 0 0; font-family: var(--font-mono); font-size: 0.75rem;">' + cardOutcome(front, result.frontHealth, result.survivors.front, result.specials && result.specials.frontAceProtected) + "</p>" +
      '</div>' +
      '<div class="result-block" style="background: var(--color-surface); border: 1px solid var(--color-border-up); padding: 1.5rem; border-top: 4px solid var(--color-defense);">' +
        '<span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-defense); display: block; margin-bottom: 1rem;">BACK DEFENDER</span>' +
        '<p style="margin: 0; font-weight: 900; text-transform: uppercase; font-size: 1.2rem;">' + (back ? back.verbose : "EMPTY") + '</p>' +
        '<p style="margin: 0.5rem 0 0; font-family: var(--font-mono); font-size: 0.75rem;">' + cardOutcome(back, result.backHealth, result.survivors.back, false) + "</p>" +
      '</div>' +
      "</div>" +
      
      '<div style="margin-top: 4rem;">' +
        '<h3 style="font-size: 0.8rem; letter-spacing: 0.2em; margin-bottom: 1.5rem; color: var(--color-text-dim); text-transform: uppercase;">Combat Cascade Log</h3>' +
        renderProgression(result) +
      '</div>' +
      
      '<div style="margin-top: 4rem; background: var(--color-bg); padding: 1.5rem; border: 1px solid var(--grid-line-bold);">' +
        '<h3 style="font-size: 0.8rem; letter-spacing: 0.2em; margin-bottom: 1.5rem; color: var(--color-text-dim); text-transform: uppercase;">Engine Trace</h3>' +
        '<ul class="quick-list" style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--color-text-dim); list-style: none; padding: 0;">' + logItems + "</ul>" +
      '</div>';
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

    // Rules Help Toggle
    const helpToggle = document.getElementById("rules-help-toggle");
    const helpPanel = document.getElementById("rules-help-panel");
    if (helpToggle && helpPanel) {
      helpToggle.addEventListener("click", function() {
        const isHidden = helpPanel.style.display === "none";
        helpPanel.style.display = isHidden ? "block" : "none";
        helpToggle.textContent = isHidden ? "[X] CLOSE_INFO" : "[?] SYSTEM_INFO";
      });
    }

    [attackerSelect, frontSelect, backSelect, modeSelect].forEach(function (el) {
      el.addEventListener("change", runSimulation);
    });

    // Initial sync
    const initialAtk = parseCard(attackerSelect.value);
    const initialFront = parseCard(frontSelect.value);
    const initialBack = parseCard(backSelect.value);
    updateVisualizer(initialAtk, initialFront, initialBack);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();