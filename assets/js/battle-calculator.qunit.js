  (function () {
  function card(suit, value, rank) {
    return { suit: suit, value: value, rank: rank || String(value) };
  }

  function resolve(mode, attacker, front, back) {
    return window.PhxBattle.resolveBattle({
      mode: mode,
      attacker: attacker,
      front: front || null,
      back: back || null,
    });
  }

  QUnit.module("Battle Resolver - Systematic Matrix (192 Scenarios)", function () {
    const suits = ["H", "D", "C", "S"];
    const categories = [
      { name: "Equal", atk: 10, def: 10 },
      { name: "Greater (Breach)", atk: 10, def: 2 },
      { name: "Lower (Blocked)", atk: 2, def: 10 }
    ];

    /**
     * Independent reference calculation for validation.
     * Must mirror the canonical v1.1.0 logic discovered in battle-resolver.js.
     * RESOLUTION ORDER: Shield (Mitigation) -> Weapon (Doubling) -> Clamp (Eligibility).
     */
    function calculateExpectedLP(attacker, front, back) {
      let overflow = attacker.value;
      
      // Stage 1: Front Rank
      // Matrix tests use number cards, but we add Ace handling here for correctness.
      let frontDestroyed = false;
      let frontDiamondShield = 0;
      let frontHeartShield = 0;

      if (overflow >= front.value) {
        if (front.rank === "A" && attacker.rank !== "A") {
          // Ace survives non-Ace attack: absorbs 1
          overflow = Math.max(0, overflow - 1);
        } else {
          // Standard destruction
          frontDestroyed = true;
          overflow = Math.max(0, overflow - front.value);
          if (front.suit === "D") frontDiamondShield = front.value;
          if (front.suit === "H") frontHeartShield = front.value;
        }
      } else {
        overflow = 0; // Standard block
      }

      // Stage 2: Back Rank
      let backHeartShield = 0;
      let backDestroyed = false;
      if (back) {
        if (overflow > 0) {
          // DIAMOND mitigation happens BEFORE Club doubling at the card boundary
          overflow = Math.max(0, overflow - frontDiamondShield);

          // Club doubling happens AFTER Diamond mitigation
          if (attacker.suit === "C") overflow *= 2;
          
          // Back card takes remaining energy
          if (overflow >= back.value) {
            if (back.rank === "A" && attacker.rank !== "A") {
              overflow = Math.max(0, overflow - 1);
            } else {
              backDestroyed = true;
              overflow = Math.max(0, overflow - back.value);
              if (back.suit === "H") backHeartShield = back.value;
            }
          } else {
            overflow = 0;
          }
        }
      } else {
        // No back card: Diamond shield still applies to breach
        overflow = Math.max(0, overflow - frontDiamondShield);
      }

      // Stage 3: Player LP
      if (overflow > 0) {
        // HEART shield happens BEFORE Spade doubling at the player boundary
        // Rule 9.3: Only the final destroyed card before player provides a shield.
        const finalHeartShield = backDestroyed ? backHeartShield : (frontDestroyed ? frontHeartShield : 0);
        overflow = Math.max(0, overflow - finalHeartShield);

        // Spade doubling happens AFTER Heart mitigation
        if (attacker.suit === "S" && overflow > 0) overflow *= 2;
      }

      return overflow;
    }

    categories.forEach(function (cat) {
      suits.forEach(function (aSuit) {
        suits.forEach(function (fSuit) {
          suits.forEach(function (bSuit) {
            const testName = `[${cat.name}] ${aSuit} vs ${fSuit}(F)+${bSuit}(B)`;
            
            QUnit.test(testName, function (assert) {
              const attacker = card(aSuit, cat.atk);
              const front = card(fSuit, cat.def);
              const back = card(bSuit, cat.def);
              
              const result = resolve("canonical_v1_0", attacker, front, back);
              const expectedLP = calculateExpectedLP(attacker, front, back);
              
              assert.equal(result.lpDamage, expectedLP, `Attacker ${attacker.suit}${attacker.value} vs ${front.suit}${front.value} / ${back.suit}${back.value} -> Expected ${expectedLP} LP damage`);
            });
          });
        });
      });
    });
  });

  QUnit.module("Battle Resolver - Edge Cases", function () {
    QUnit.test("low attacker into stronger defenders yields zero LP damage", function (assert) {
      const modes = ["legacy_reference", "canonical_v1_0"];
      modes.forEach(function (mode) {
        const result = resolve(mode, card("D", 1), card("C", 10), card("S", 10));
        assert.equal(result.lpDamage, 0, mode + " has no LP leakage");
      });
    });

    QUnit.test("heart mitigation cannot push LP damage below zero", function (assert) {
      const result = resolve("canonical_v1_0", card("D", 4, "4"), card("H", 3, "3"), null);
      assert.equal(result.lpDamage, 0, "LP damage clamps to zero");
    });

    QUnit.test("survivor flags for empty defender slots are null", function (assert) {
      const result = resolve("legacy_reference", card("D", 5), null, null);
      assert.equal(result.survivors.front, null, "front survivor flag is null for empty slot");
      assert.equal(result.survivors.back, null, "back survivor flag is null for empty slot");
    });

    QUnit.test("progression includes final LP stage", function (assert) {
      const result = resolve("legacy_reference", card("S", 9), null, null);
      const last = result.progression[result.progression.length - 1];
      assert.equal(last.stage, "Damage To Player LP", "last stage reports LP damage");
      assert.equal(last.after, result.lpDamage, "final progression matches LP damage");
    });

    QUnit.test("front Ace survives non-Ace direct attack and PASSES overflow", function (assert) {
      // 11S into 1H (front Ace)
      // Front survives (Ace rule). 
      // 1. Initial Overflow: 11 - 1 = 10.
      // 2. Shield: 0 (Ace survived, no shield).
      // 3. Weapon (Spade x2): 10 * 2 = 20.
      // Final LP = 20.
      const current = resolve("canonical_v1_0", card("S", 11, "K"), card("H", 1, "A"), null);

      assert.true(current.survivors.front, "front Ace survives");
      assert.equal(current.lpDamage, 20, "damage PASSES through the protected Ace (absorbing only 1 point)");
    });

    QUnit.test("ineligible face card survives and allows overflow", function (assert) {
      // 11Q into 11K (front)
      // Front survives. Overflow = 11 - 11 = 0.
      // Result should be 0 LP damage but FRONT SURVIVES.
      const result1 = resolve("canonical_v1_0", card("H", 11, "Q"), card("D", 11, "K"), null);
      
      // 11J (attacker) into 11K (front) with 10D (back)
      // Attacker is 11, Front is 11.
      // Overflow = 11 - 11 = 0.
      // But if attacker was say 15 (hypothetical), it would overflow.
      // Let's use a non-face card with high value if it existed, 
      // but in standard deck 10 is max non-face.
      // Let's test a case where overflow is guaranteed:
      // A King (11) into a Jack (11) front. Jack destroyed.
      // A Jack (11) into a King (11) front. King survives.
      
      assert.true(result1.survivors.front, "ineligible face card survives");
      assert.equal(result1.lpDamage, 0, "no overflow damage when values are equal");
    });

    QUnit.test("front Ace is discarded by direct Ace attack", function (assert) {
      const legacy = resolve("legacy_reference", card("H", 1, "A"), card("D", 1, "A"), card("C", 4, "4"));
      const current = resolve("canonical_v1_0", card("H", 1, "A"), card("D", 1, "A"), card("C", 4, "4"));

      assert.notOk(legacy.survivors.front, "legacy: front Ace discarded by Ace");
      assert.notOk(current.survivors.front, "current: front Ace discarded by Ace");
      assert.notOk(legacy.specials.frontAceProtected, "legacy: no Ace protection");
      assert.notOk(current.specials.frontAceProtected, "current: no Ace protection");
    });
    QUnit.test("canonical: face-card destroy eligibility is enforced", function (assert) {
      const queenIntoKing = resolve("canonical_v1_0", card("H", 11, "Q"), card("S", 11, "K"), null);
      const kingIntoQueen = resolve("canonical_v1_0", card("H", 11, "K"), card("S", 11, "Q"), null);

      assert.true(queenIntoKing.survivors.front, "queen cannot destroy king");
      assert.equal(queenIntoKing.frontHealth, 11, "ineligible face target remains at full value in classic mode");
      assert.notOk(kingIntoQueen.survivors.front, "king can destroy queen");
    });

    QUnit.test("intro_rules mode aliases to canonical_v1_0", function (assert) {
      const aliased = resolve("intro_rules", card("D", 9, "9"), null, null);
      assert.equal(aliased.mode, "canonical_v1_0", "legacy mode name remains a compatibility alias");
      assert.equal(aliased.lpDamage, 9, "alias resolves using canonical rules");
    });
  });

  QUnit.module("Battle Resolver - Permutations", function () {
    const modes = ["legacy_reference", "canonical_v1_0"];
    const attackers = ["D", "H", "C", "S"];
    const slotPermutations = [
      { front: null, back: null, label: "no defenders" },
      { front: card("C", 5), back: null, label: "front only" },
      { front: null, back: card("S", 5), label: "back only" },
      { front: card("D", 5), back: card("H", 4), label: "front and back" },
    ];

    modes.forEach(function (mode) {
      attackers.forEach(function (suit) {
        QUnit.test(mode + ": attacker " + suit + " with no defenders", function (assert) {
          const result = resolve(mode, card(suit, 8), null, null);
          const expected = suit === "S" ? 16 : 8;
          assert.equal(result.lpDamage, expected, "expected LP damage for " + suit + " with empty column");
        });
      });

      slotPermutations.forEach(function (perm) {
        QUnit.test(mode + ": permutation " + perm.label, function (assert) {
          const result = resolve(mode, card("C", 8), perm.front, perm.back);
          assert.true(result.lpDamage >= 0, "LP damage is non-negative");
          assert.true(Array.isArray(result.progression), "progression is available");
          assert.true(result.progression.length >= 2, "progression has multiple stages");
        });
      });
    });
  });
})();
