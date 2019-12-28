  // ============================
  // 20 Symbols
  // ============================
    // Symbols are primitive values that are created via the factory function Symbol():
    
    // On one hand, symbols are like objects in that each value created by Symbol() is unique and not compared by value:
    Symbol() === Symbol()
    false
  
  // On the other hand, they also behave like primitive values. They have to be categorized via typeof:
    typeof Symbol() // 'symbol'

  // And they can be property keys in objects:
    const obj = {
      [sym]: 123,
    };

  // ## 20.1 Use cases for symbols
  // =========================
    // * Values for constants
    // * Unique property keys

    // ### 20.1.1 Symbols: values for constants
      const COLOR_BLUE = 'Blue';
      const MOOD_BLUE = 'Blue';

      COLOR_BLUE === MOOD_BLUE // true
      // Because two strings with the same content are considered equal:

      // We can fix that problem via symbols:
      const COLOR_BLUE = Symbol('Blue');
      const MOOD_BLUE = Symbol('Blue');

      assert.notEqual(COLOR_BLUE, MOOD_BLUE);