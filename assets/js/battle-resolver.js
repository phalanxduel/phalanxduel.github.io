"use strict";

function clampToZero(num) {
  return num < 0 ? 0 : num;
}

function addStep(steps, stage, before, after, note) {
  steps.push({
    stage: stage,
    before: before,
    after: after,
    note: note || "",
  });
}

function isAce(card) {
  if (!card) return false;
  return card.rank === "A" || card.value === 1;
}

function isFaceCard(card) {
  if (!card) return false;
  return card.rank === "J" || card.rank === "Q" || card.rank === "K";
}

function faceDestroys(attacker, target) {
  if (!isFaceCard(attacker) || !isFaceCard(target)) return true;
  if (attacker.rank === "J") return target.rank === "J";
  if (attacker.rank === "Q") return target.rank === "J" || target.rank === "Q";
  if (attacker.rank === "K") return target.rank === "J" || target.rank === "Q" || target.rank === "K";
  return false;
}

function destructionEligibility(attacker, target, targetIndex) {
  if (!target) return { eligible: true, reason: "" };

  if (isAce(target)) {
    if (isAce(attacker) && targetIndex === 0) {
      return { eligible: true, reason: "" };
    }
    return { eligible: false, reason: "Classic Aces: only a direct front-rank Ace attack can destroy an Ace" };
  }

  if (isFaceCard(target) && !faceDestroys(attacker, target)) {
    return { eligible: false, reason: "Classic Face Cards: attacker cannot destroy this face card rank" };
  }

  return { eligible: true, reason: "" };
}

function resolveLegacy(attacker, front, back) {
  let damage = attacker.value;
  const log = [];
  const progression = [];

  log.push("Base attack damage: " + attacker.value + ".");
  addStep(progression, "Attacker Base Damage", attacker.value, attacker.value, attacker.suit + " attacker");

  let overflow = damage;
  let frontHealth = null;
  if (front) {
    const before = damage;
    frontHealth = front.value - damage;
    log.push("Front takes " + damage + " damage.");
    overflow = clampToZero(damage - front.value);
    addStep(progression, "After Front Defender", before, overflow, front.suit + " " + front.value + " in front");

    if (front.suit === "H" && !back) {
      const heartBefore = overflow;
      overflow -= front.value;
      overflow = clampToZero(overflow);
      log.push("Heart front bonus triggers (no back defender): -" + front.value + " overflow.");
      addStep(progression, "Front Heart Bonus", heartBefore, overflow, "Heart reduces overflow");
    }
  } else {
    log.push("No front defender: damage overflows directly.");
    overflow = damage;
    addStep(progression, "No Front Defender", damage, overflow, "Unblocked overflow");
  }

  if (attacker.suit === "C" && overflow > 0 && back) {
    const before = overflow;
    overflow += overflow;
    log.push("Club attacker bonus triggers: overflow to back doubled.");
    addStep(progression, "Club Overflow Bonus", before, overflow, "Overflow doubled before defender shield in Legacy mode");
  }

  if (front && front.suit === "D" && overflow > 0) {
    const before = overflow;
    overflow = clampToZero(overflow - front.value);
    log.push("Diamond front bonus triggers: shield absorbs " + (before - overflow) + " overflow.");
    addStep(progression, "Diamond Shield", before, overflow, "Diamond absorbs overflow");
  }

  let backHealth = null;
  damage = overflow;
  if (back) {
    const before = damage;
    backHealth = back.value - damage;
    log.push("Back takes " + damage + " damage.");

    damage -= back.value;
    damage = clampToZero(damage);
    addStep(progression, "After Back Defender", before, damage, back.suit + " " + back.value + " in back");

    if (back.suit === "H" && backHealth <= 0) {
      const heartBefore = damage;
      damage -= back.value;
      damage = clampToZero(damage);
      log.push("Heart back bonus triggers: -" + back.value + " overflow.");
      addStep(progression, "Back Heart Bonus", heartBefore, damage, "Heart reduces overflow");
    }
  } else {
    log.push("No back defender: remaining damage targets LP.");
    addStep(progression, "No Back Defender", damage, damage, "Remaining overflow goes to LP");
  }

  if (attacker.suit === "S" && damage > 0) {
    const before = damage;
    damage += damage;
    log.push("Spade attacker bonus triggers: LP damage doubled.");
    addStep(progression, "Spade LP Bonus", before, damage, "Final LP damage doubled");
  }

  addStep(progression, "Damage To Player LP", damage, damage, "Final LP damage");

  return {
    mode: "legacy_reference",
    lpDamage: damage,
    frontHealth: frontHealth,
    backHealth: backHealth,
    log: log,
    progression: progression,
  };
}

function resolveCanonical(attacker, front, back) {
  let overflow = attacker.value;
  const log = [];
  const progression = [];
  let frontAceProtected = false;
  let backAceProtected = false;

  log.push("Base attack damage: " + attacker.value + ".");
  addStep(progression, "Attacker Base Damage", overflow, overflow, attacker.suit + " attacker");

  let frontHealth = null;
  let frontDestroyed = false;
  let frontDiamondShield = 0;
  let frontHeartShield = 0;

  if (front) {
    const before = overflow;
    const tentative = front.value - overflow;
    log.push("Front takes incoming damage first.");

    if (tentative > 0) {
      frontHealth = tentative;
      overflow = 0;
    } else {
      const eligibility = destructionEligibility(attacker, front, 0);
      if (eligibility.eligible) {
        frontHealth = tentative;
        overflow = clampToZero(overflow - front.value);
        frontDestroyed = true;
        if (front.suit === "D") frontDiamondShield = front.value;
        if (front.suit === "H") frontHeartShield = front.value;
      } else if (isAce(front)) {
        frontHealth = front.value;
        overflow = clampToZero(overflow - 1); // Ace absorbs exactly 1
        frontAceProtected = true;
        log.push(eligibility.reason + " (Survives, 1 damage absorbed, attack continues).");
      } else {
        frontHealth = front.value;
        overflow = 0; // Attack stops on rank-mismatch survival for Face Cards
        log.push(eligibility.reason + " (Survives, stops attack).");
      }
    }
    addStep(progression, "After Front Defender", before, overflow, front.suit + " " + front.value + " in front");
  } else {
    log.push("No front defender: damage overflows directly.");
    addStep(progression, "No Front Defender", overflow, overflow, "Unblocked overflow");
  }

  // Step B: Back card
  let backHealth = null;
  let backDestroyed = false;
  let backHeartShield = 0;

  if (back) {
    backHealth = back.value; // Default health
    
    if (overflow > 0) {
      const beforeBackStep = overflow;
      
      // Diamond shield applies BEFORE Club doubling at the card boundary
      if (frontDiamondShield > 0) {
        const absorbed = Math.min(overflow, frontDiamondShield);
        overflow -= absorbed;
        log.push("Diamond shield: absorbed " + absorbed + ".");
      }

      // Competitive v3.0: Club doubles only after an actual front-card
      // destruction and only when a back-card boundary exists.
      if (front && frontDestroyed && back && attacker.suit === "C") {
        overflow *= 2;
        log.push("Club bonus: carryover doubled.");
      }

      if (back) {
        addStep(progression, "Boundary (Front->Back)", beforeBackStep, overflow, "Suit effects evaluated");
      }

      if (overflow > 0) {
        const before = overflow;
        const tentative = back.value - overflow;
        log.push("Back takes " + overflow + " damage.");

        if (tentative > 0) {
          backHealth = tentative;
          overflow = 0;
        } else {
          const eligibility = destructionEligibility(attacker, back, 1);
          if (eligibility.eligible) {
            backHealth = tentative;
            overflow = clampToZero(overflow - back.value);
            backDestroyed = true;
            if (back.suit === "H") backHeartShield = back.value;
          } else if (isAce(back)) {
            backHealth = back.value;
            overflow = clampToZero(overflow - 1); // Ace absorbs exactly 1
            backAceProtected = true;
            log.push(eligibility.reason + " (Survives, 1 damage absorbed, attack continues).");
          } else {
            backHealth = back.value;
            overflow = 0; // Attack stops on rank-mismatch survival for Face Cards
            log.push(eligibility.reason + " (Survives, stops attack).");
          }
        }
        addStep(progression, "After Back Defender", before, overflow, back.suit + " " + back.value + " in back");
      }
    }
  } else {
    // No back defender. Competitive v3.0 scopes the Diamond shield to a
    // Card->Card boundary, so it does not apply on a direct player path.
    if (overflow > 0) {
      log.push("No back defender: remaining damage targets LP.");
      addStep(progression, "No Back Defender", overflow, overflow, "Remaining overflow goes to LP");
    }
  }

  // Step C: Player LP
  let lpDamage = overflow;
  if (lpDamage > 0) {
    const beforeLp = lpDamage;
    
    // Heart shield happens BEFORE Spade doubling at the player boundary
    // Rule 9.3: Only the final destroyed card before player provides a shield.
    const finalHeartShield = backDestroyed ? backHeartShield : (frontDestroyed ? frontHeartShield : 0);
    if (finalHeartShield > 0) {
      const absorbed = Math.min(lpDamage, finalHeartShield);
      lpDamage -= absorbed;
      log.push("Heart shield: absorbed " + absorbed + ".");
    }

    // Spade doubling happens AFTER Heart mitigation
    if (attacker.suit === "S") {
      lpDamage *= 2;
      log.push("Spade bonus: LP damage doubled.");
    }

    addStep(progression, "Boundary (Card->Player)", beforeLp, lpDamage, "Suit effects evaluated");
  }

  addStep(progression, "Damage To Player LP", lpDamage, lpDamage, "Final LP damage");

  return {
    mode: "current_v3_0",
    lpDamage: lpDamage,
    frontHealth: frontHealth,
    backHealth: backHealth,
    log: log,
    progression: progression,
    specials: {
      frontAceProtected: frontAceProtected,
      backAceProtected: backAceProtected,
    },
  };
}

export function resolveBattle(input) {
  const attacker = input && input.attacker;
  const front = input && input.front ? input.front : null;
  const back = input && input.back ? input.back : null;
  const mode = (input && input.mode) || "current_v3_0";

  if (!attacker || typeof attacker.value !== "number") {
    throw new Error("resolveBattle requires an attacker card with numeric value");
  }

  const resolvedMode = mode === "intro_rules" || mode === "canonical_v1_0" ? "current_v3_0" : mode;
  const core = resolvedMode === "current_v3_0"
    ? resolveCanonical(attacker, front, back)
    : resolveLegacy(attacker, front, back);

  const frontAceProtected = Boolean(
    front && (
      (core.specials && core.specials.frontAceProtected) ||
      (
        !core.specials &&
        front.value === 1 &&
        core.frontHealth <= 0 &&
        attacker.value !== 1
      )
    )
  );

  return Object.assign(core, {
    mode: resolvedMode,
    specials: {
      backAceProtected: Boolean(core.specials && core.specials.backAceProtected),
      frontAceProtected: frontAceProtected,
    },
    survivors: {
      attacker: true,
      front: front ? (frontAceProtected ? true : core.frontHealth > 0) : null,
      back: back ? core.backHealth > 0 : null,
    },
  });
}

// Backward compatibility for the browser global scope
if (typeof window !== "undefined") {
  window.PhxBattle = { resolveBattle };
}
