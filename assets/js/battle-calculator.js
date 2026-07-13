import { resolveBattle } from '/assets/js/battle-resolver.js';

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

function renderProgression(result) {
  const steps = Array.isArray(result.progression) ? result.progression : [];
  if (!steps.length) return "<p class=\"small-note\">No progression data available.</p>";

  const rows = steps.map(function (step) {
    return "<tr><td><strong>" + step.stage + "</strong></td><td>" + step.before + "</td><td>" + step.after + "</td><td><em>" + (step.note || "") + "</em></td></tr>";
  }).join("");

  return '<div class="table-wrap" style="margin-top: 1rem;"><table><thead><tr><th>Stage</th><th>Damage Before</th><th>Damage After</th><th>Teaching Note</th></tr></thead><tbody>' + rows + "</tbody></table></div>";
}

// PedagogicalAdapter Interface
const PedagogicalAdapter = {
  getBeginnerNarrative: function(attacker, front, back, result) {
    let narrative = "<p style='font-size: 1.1rem; line-height: 1.6;'>";

    narrative += "The <strong>" + attacker.verbose + "</strong> attacks the column. ";

    let frontStoppedFullAttack = false;

    if (!front) {
        narrative += "The Front Row is empty, so the attack immediately hits the Back Row. ";
    } else {
        if (result.survivors.front) {
            const isProtected = result.specials && result.specials.frontAceProtected;
            // A card 'absorbs' and 'stops' ONLY if it wasn't protected and has positive health
            if (!isProtected && result.frontHealth > 0) {
              narrative += "The <strong>" + front.verbose + "</strong> absorbs the hit and <strong>survives</strong>, stopping the attack completely. ";
              frontStoppedFullAttack = true;
            } else {
              narrative += "The <strong>" + front.verbose + "</strong> <strong>survives</strong> due to special protection rules, but the excess energy continues to the Back Rank. ";
            }
        } else {
            narrative += "The attack <strong>destroys</strong> the <strong>" + front.verbose + "</strong>. ";
        }
    }

    if (frontStoppedFullAttack) {
        return narrative + "</p>";
    }

    if (!back && front) {
        narrative += "Because there is no Back Row defender, the carryover damage proceeds toward the Life Points. ";
    } else if (back) {
        if (result.survivors.back) {
            const isProtected = result.specials && result.specials.backAceProtected;
            if (!isProtected && result.backHealth > 0) {
              narrative += "The carryover damage hits the <strong>" + back.verbose + "</strong>, which <strong>survives</strong> and stops the attack. ";
              return narrative + "</p>";
            } else {
              narrative += "The <strong>" + back.verbose + "</strong> <strong>survives</strong> special rules, but the remaining damage breaches the Core. ";
            }
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
  },
  getMasteryNarrative: function(attacker, front, back, result) {
    const efficiency = front && front.value > 0 ? (result.lpDamage / attacker.value).toFixed(2) : "1.00";
    
    let narrative = "<div style='font-family: var(--font-mono); font-size: 0.9rem;'>";
    narrative += "<strong>// TACTICAL ANALYSIS</strong><br/>";
    narrative += "Damage Efficiency (LP/Atk): " + efficiency + "<br/>";
    
    if (result.specials && (result.specials.frontAceProtected || result.specials.backAceProtected)) {
      narrative += "Ace Protection engaged: Defensive stability confirmed.<br/>";
    }

    if (result.lpDamage === 0 && (front || back)) {
      narrative += "Optimal Shielding: Full mitigation achieved.";
    } else if (result.lpDamage > 0) {
      narrative += "Column breached: Aggressive stance recommended.";
    }
    
    narrative += "</div>";
    return narrative;
  }
};

// ProgressionManager: Orchestrates the tutorial progression state
const ProgressionManager = {
  currentStep: "beginner", // 'beginner' | 'mastery'
  
  setStep: function(step) {
    this.currentStep = step;
    console.log("ProgressionManager: Step set to", step);
  },
  
  getAdapter: function(adapter) {
    return this.currentStep === "mastery" 
      ? adapter.getMasteryNarrative 
      : adapter.getBeginnerNarrative;
  }
};

function generateTeachingNarrative(attacker, front, back, result) {
    const narrativeFunc = ProgressionManager.getAdapter(PedagogicalAdapter);
    return narrativeFunc(attacker, front, back, result);
}

function updateVisualizer(attacker, front, back) {
  const vis = document.getElementById("cascade-vis");
  const vAtk = document.getElementById("vis-attacker");
  const vFront = document.getElementById("vis-front");
  const vBack = document.getElementById("vis-back");

  if (!vis || !vAtk || !vFront || !vBack) return;

  vis.classList.remove("cv-animating");
  void vis.offsetWidth; 

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

  vis.classList.add("cv-animating");
}

// SimulationPresenter: Transforms SimulationOutcome into View-ready objects
const SimulationPresenter = {
  getViewData: function(attacker, front, back, result) {
    const logItems = result.log.map(entry => "<li>" + entry + "</li>").join("");

    return {
      lpDamage: result.lpDamage,
      lpDamageColor: result.lpDamage > 0 ? 'var(--color-defense)' : 'var(--color-success)',
      attackerLabel: attacker.verbose,
      frontDefenderLabel: front ? front.verbose : "EMPTY",
      frontOutcome: cardOutcome(front, result.frontHealth, result.survivors.front, result.specials && result.specials.frontAceProtected),
      backDefenderLabel: back ? back.verbose : "EMPTY",
      backOutcome: cardOutcome(back, result.backHealth, result.survivors.back, false),
      logItems: logItems,
      progressionHTML: renderProgression(result)
    };
  }
};

function renderResult(root, attacker, front, back, mode, result) {
  updateVisualizer(attacker, front, back);
  const viewData = SimulationPresenter.getViewData(attacker, front, back, result);

  root.innerHTML =
    '<div style="text-align: center; margin-bottom: 3rem; border-bottom: 1px solid var(--grid-line-bold); padding-bottom: 2rem;">' +
    '<span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--color-text-dim); text-transform: uppercase;">Simulation Outcome</span>' +
    '<h3 style="font-size: 4rem; margin: 0.5rem 0 0; color: ' + viewData.lpDamageColor + ';">' + viewData.lpDamage + ' LP Damage</h3>' +
    '</div>' +

    '<div style="background: var(--color-surface-up); border-left: 4px solid var(--color-offense); padding: 2rem; margin-bottom: 3rem;">' +
    '<h4 style="margin-top: 0; color: var(--color-offense); font-family: var(--font-mono); font-size: 0.8rem; letter-spacing: 0.1em;">// TACTICAL BRIEFING</h4>' +
    generateTeachingNarrative(attacker, front, back, result) +
    '</div>' +

    '<div class="result-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 3rem;">' +
    '<div class="result-block" style="background: var(--color-surface); border: 1px solid var(--color-border-up); padding: 1.5rem; border-top: 4px solid var(--color-offense);">' +
      '<span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-offense); display: block; margin-bottom: 1rem;">ATTACKER</span>' +
      '<p style="margin: 0; font-weight: 900; text-transform: uppercase; font-size: 1.2rem;">' + viewData.attackerLabel + '</p>' +
      '<p style="margin: 0.5rem 0 0; font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-success);">ACTIVE SOURCE</p>' +
    '</div>' +
    '<div class="result-block" style="background: var(--color-surface); border: 1px solid var(--color-border-up); padding: 1.5rem; border-top: 4px solid var(--color-defense);">' +
      '<span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-defense); display: block; margin-bottom: 1rem;">FRONT DEFENDER</span>' +
      '<p style="margin: 0; font-weight: 900; text-transform: uppercase; font-size: 1.2rem;">' + viewData.frontDefenderLabel + '</p>' +
      '<p style="margin: 0.5rem 0 0; font-family: var(--font-mono); font-size: 0.75rem;">' + viewData.frontOutcome + "</p>" +
    '</div>' +
    '<div class="result-block" style="background: var(--color-surface); border: 1px solid var(--color-border-up); padding: 1.5rem; border-top: 4px solid var(--color-defense);">' +
      '<span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-defense); display: block; margin-bottom: 1rem;">BACK DEFENDER</span>' +
      '<p style="margin: 0; font-weight: 900; text-transform: uppercase; font-size: 1.2rem;">' + viewData.backDefenderLabel + '</p>' +
      '<p style="margin: 0.5rem 0 0; font-family: var(--font-mono); font-size: 0.75rem;">' + viewData.backOutcome + "</p>" +
    '</div>' +
    "</div>" +

    '<div style="margin-top: 4rem;">' +
      '<h3 style="font-size: 0.8rem; letter-spacing: 0.2em; margin-bottom: 1.5rem; color: var(--color-text-dim); text-transform: uppercase;">Combat Cascade Log</h3>' +
      viewData.progressionHTML +
    '</div>' +

    '<div style="margin-top: 4rem; background: var(--color-bg); padding: 1.5rem; border: 1px solid var(--grid-line-bold);">' +
      '<h3 style="font-size: 0.8rem; letter-spacing: 0.2em; margin-bottom: 1.5rem; color: var(--color-text-dim); text-transform: uppercase;">Engine Trace</h3>' +
      '<ul class="quick-list" style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--color-text-dim); list-style: none; padding: 0;">' + viewData.logItems + "</ul>" +
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
    console.log("Battle Calculator: Missing DOM elements!");
    return;
  }
  console.log("Battle Calculator: DOM elements found.");

  populateCardSelect(attackerSelect, false);
  populateCardSelect(frontSelect, true);
  populateCardSelect(backSelect, true);

  attackerSelect.value = "S-9";
  frontSelect.value = "D-3";
  backSelect.value = "H-2";
  modeSelect.value = "current_v3_0";

  function runSimulation() {
    const attacker = parseCard(attackerSelect.value);
    const front = parseCard(frontSelect.value);
    const back = parseCard(backSelect.value);
    const mode = modeSelect.value;

    if (!attacker) {
      resultRoot.innerHTML = '<p class="small-note">Select an attacker card to run simulation.</p>';
      return;
    }

    const result = resolveBattle({
      attacker: attacker,
      front: front,
      back: back,
      mode: mode,
    });
    
    renderResult(resultRoot, attacker, front, back, mode, result);
  }

  button.addEventListener("click", runSimulation);

  // Initial sync
  const initialAtk = parseCard(attackerSelect.value);
  const initialFront = parseCard(frontSelect.value);
  const initialBack = parseCard(backSelect.value);
  updateVisualizer(initialAtk, initialFront, initialBack);
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");
    init();
});
