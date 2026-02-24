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

  QUnit.module("Battle Resolver - Common Scenarios", function () {
    QUnit.test("legacy: no defenders sends all damage to LP", function (assert) {
      const result = resolve("legacy_reference", card("D", 9), null, null);
      assert.equal(result.lpDamage, 9, "all attack damage reaches LP");
      assert.equal(result.frontHealth, null, "no front slot selected");
      assert.equal(result.backHealth, null, "no back slot selected");
    });

    QUnit.test("legacy: spade doubles LP damage", function (assert) {
      const result = resolve("legacy_reference", card("S", 9), null, null);
      assert.equal(result.lpDamage, 18, "spade doubles final LP damage");
    });

    QUnit.test("legacy: equal attack into front card discards with zero overflow", function (assert) {
      const result = resolve("legacy_reference", card("H", 6), card("D", 6), card("C", 5));
      assert.equal(result.frontHealth, 0, "front is discarded");
      assert.equal(result.backHealth, 5, "back remains untouched");
      assert.equal(result.lpDamage, 0, "no LP damage");
    });

    QUnit.test("legacy: club plus diamond shield example", function (assert) {
      const result = resolve("legacy_reference", card("C", 7), card("D", 6), card("S", 4));
      assert.equal(result.frontHealth, -1, "front is discarded");
      assert.equal(result.backHealth, 4, "diamond shield absorbs doubled carryover");
      assert.equal(result.lpDamage, 0, "no LP damage");
    });

    QUnit.test("legacy: back heart mitigates overflow", function (assert) {
      const result = resolve("legacy_reference", card("D", 9), card("C", 2), card("H", 3));
      assert.equal(result.backHealth, -4, "back is defeated");
      assert.equal(result.lpDamage, 1, "heart mitigation reduces LP overflow");
    });

    QUnit.test("canonical: no defenders sends all damage to LP", function (assert) {
      const result = resolve("canonical_v1_0", card("D", 9, "9"), null, null);
      assert.equal(result.lpDamage, 9, "all attack damage reaches LP");
    });

    QUnit.test("canonical: diamond shield applies before Club bonus", function (assert) {
      const result = resolve("canonical_v1_0", card("C", 7, "7"), card("D", 6, "6"), card("S", 4, "4"));
      assert.equal(result.frontHealth, -1, "front is discarded");
      assert.equal(result.backHealth, 4, "diamond shield prevents back damage");
      assert.equal(result.lpDamage, 0, "no LP damage");
    });

    QUnit.test("canonical: final destroyed Heart mitigates LP damage", function (assert) {
      const result = resolve("canonical_v1_0", card("D", 11, "K"), card("H", 3, "3"), card("H", 2, "2"));
      assert.equal(result.lpDamage, 4, "back heart applies when it is last defender before player");
    });

    QUnit.test("canonical: Heart mitigation depends on last destroyed card before player", function (assert) {
      const withBack = resolve("canonical_v1_0", card("D", 8, "8"), card("H", 3, "3"), card("C", 2, "2"));
      const noBack = resolve("canonical_v1_0", card("D", 8, "8"), card("H", 3, "3"), null);

      assert.equal(withBack.lpDamage, 3, "front heart does not mitigate when a non-heart is destroyed after it");
      assert.equal(noBack.lpDamage, 2, "front heart triggers when player is directly behind");
    });
  });

  QUnit.module("Battle Resolver - Mode Contrast", function () {
    QUnit.test("legacy and canonical diverge on Club-vs-Diamond ordering", function (assert) {
      const legacy = resolve("legacy_reference", card("C", 10, "10"), card("D", 2, "2"), card("S", 5, "5"));
      const canonical = resolve("canonical_v1_0", card("C", 10, "10"), card("D", 2, "2"), card("S", 5, "5"));

      assert.equal(legacy.backHealth, -9, "legacy: club doubling happens before diamond shield");
      assert.equal(canonical.backHealth, -7, "canonical: diamond shield happens before club doubling");
      assert.equal(legacy.lpDamage, 9, "legacy final LP damage");
      assert.equal(canonical.lpDamage, 7, "canonical final LP damage");
      assert.notEqual(legacy.lpDamage, canonical.lpDamage, "modes produce different outcomes");
    });

    QUnit.test("progression order differs between modes", function (assert) {
      const legacy = resolve("legacy_reference", card("C", 10, "10"), card("D", 2, "2"), card("S", 5, "5"));
      const canonical = resolve("canonical_v1_0", card("C", 10, "10"), card("D", 2, "2"), card("S", 5, "5"));

      const legacyStages = legacy.progression.map(function (s) { return s.stage; }).join(" > ");
      const canonicalStages = canonical.progression.map(function (s) { return s.stage; }).join(" > ");

      assert.true(legacyStages.indexOf("Club Overflow Bonus") < legacyStages.indexOf("Diamond Shield"), "legacy applies Club before Diamond");
      assert.true(canonicalStages.indexOf("Diamond Shield") < canonicalStages.indexOf("Club Overflow Bonus"), "canonical applies Diamond before Club");
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

    QUnit.test("front Ace survives non-Ace direct attack (legacy and current)", function (assert) {
      const legacy = resolve("legacy_reference", card("H", 6, "6"), card("D", 1, "A"), card("C", 4, "4"));
      const current = resolve("canonical_v1_0", card("H", 6, "6"), card("D", 1, "A"), card("C", 4, "4"));

      assert.true(legacy.survivors.front, "legacy: front Ace survives");
      assert.true(current.survivors.front, "current: front Ace survives");
      assert.true(legacy.specials.frontAceProtected, "legacy: Ace protection flagged");
      assert.true(current.specials.frontAceProtected, "current: Ace protection flagged");
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
