  // ========================
  // 13 The non-values undefined and null
  // ========================

    // ## 13.1 undefined vs. null
    // =========================
      // The language itself makes the following distinction:
      // * undefined means “not initialized” (e.g., a variable) or “not existing” (e.g., a property of an object).
      // * null      means “the intentional absence of any object value” (a quote from the language specification).
      let foo;                // undefined
      function bar() {}       // undefined
      const baz = (x) => x;   // undefined

    // ## 13.3 Checking for undefined or null
    // =========================
      // Checking for either:

      if (x === null) ···
      if (x === undefined) ···