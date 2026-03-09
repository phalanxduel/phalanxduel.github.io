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

    QUnit.test("canonical: diamond shield applies AFTER Club doubling", function (assert) {
      // 7C into 6D (front) with 4S (back)
      // Front destroyed. Overflow 1.
      // Boundary Front->Back: Club 1*2 = 2. Diamond 2-6 = 0.
      const result = resolve("canonical_v1_0", card("C", 7, "7"), card("D", 6, "6"), card("S", 4, "4"));
      assert.equal(result.frontHealth, -1, "front is discarded");
      assert.equal(result.backHealth, 4, "diamond shield absorbed the doubled overflow");
      assert.equal(result.lpDamage, 0, "no LP damage");
    });

    QUnit.test("canonical: Diamond shield reduces doubled Club overflow", function (assert) {
      // 10C into 2D (front) with 5S (back)
      // Front destroyed. Overflow 8.
      // Boundary Front->Back: Club 8*2 = 16. Diamond 16-2 = 14.
      // Back 5S takes 14: destroyed. Overflow 9.
      // Boundary Back->LP: 9.
      const result = resolve("canonical_v1_0", card("C", 10, "10"), card("D", 2, "2"), card("S", 5, "5"));
      assert.equal(result.backHealth, -9, "canonical: 10C into 2D and 5S -> 9 overflow");
      assert.equal(result.lpDamage, 9, "canonical LP damage");
    });

    QUnit.test("canonical: Heart shields sum from both front and back", function (assert) {
      // 11D into 3H (front) with 2H (back)
      // Front destroyed. Overflow 8.
      // Boundary Front->Back: 8.
      // Back destroyed. Overflow 6.
      // Boundary Back->LP: Hearts (3+2)=5. 6-5=1.
      const result = resolve("canonical_v1_0", card("D", 11, "J"), card("H", 3, "3"), card("H", 2, "2"));
      assert.equal(result.lpDamage, 1, "both hearts sum to mitigate 5 LP damage");
    });

    QUnit.test("canonical: Heart shields from both front and back sum to mitigate LP damage", function (assert) {
      // 8D into 3H (front) and 2C (back)
      // Front destroyed. Overflow 5. 
      // Boundary Front->Back: 5. 
      // Back 2C takes 5: destroyed. Overflow 3.
      // Boundary Back->LP: Hearts (3+0)=3. 3-3=0.
      const withBack = resolve("canonical_v1_0", card("D", 8, "8"), card("H", 3, "3"), card("C", 2, "2"));
      const noBack = resolve("canonical_v1_0", card("D", 8, "8"), card("H", 3, "3"), null);

      assert.equal(withBack.lpDamage, 0, "front heart mitigates 3 LP damage even if back card was not a heart (but was destroyed)");
      assert.equal(noBack.lpDamage, 2, "front heart mitigates 3 LP damage (8-3-3=2)");
    });
  });

  QUnit.module("Battle Resolver - Mode Contrast", function () {
    QUnit.test("legacy and canonical produce similar outcomes for Club-vs-Diamond ordering", function (assert) {
      // 10C into 2D (front) with 5S (back)
      // Overflow from front: 8.
      // Boundary Front->Back: 
      //   Legacy: Club doubles (8*2=16), then Diamond shields (16-2=14). 14 hits back. Back destroyed (14-5=9). LP 9.
      //   Canonical: Club doubles (8*2=16), then Diamond shields (16-2=14). 14 hits back. Back destroyed (14-5=9). LP 9.
      const legacy = resolve("legacy_reference", card("C", 10, "10"), card("D", 2, "2"), card("S", 5, "5"));
      const canonical = resolve("canonical_v1_0", card("C", 10, "10"), card("D", 2, "2"), card("S", 5, "5"));

      assert.equal(legacy.backHealth, -9, "legacy outcome");
      assert.equal(canonical.backHealth, -9, "canonical outcome");
      assert.equal(legacy.lpDamage, 9, "legacy final LP damage");
      assert.equal(canonical.lpDamage, 9, "canonical final LP damage");
    });

    QUnit.test("canonical provides structured progression log", function (assert) {
      const res = resolve("canonical_v1_0", card("C", 10, "10"), card("D", 2, "2"), card("H", 3, "3"));
      const stages = res.progression.map(function (s) { return s.stage; });
      
      const idx1 = stages.indexOf("Boundary (Front->Back)");
      const idx2 = stages.indexOf("Boundary (Card->Player)");
      
      assert.true(idx1 !== -1, "Front->Back boundary found");
      assert.true(idx2 !== -1, "Card->Player boundary found");
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
