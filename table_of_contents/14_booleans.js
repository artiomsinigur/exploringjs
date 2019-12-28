  // ========================
  // 14 Booleans
  // ========================
    
    // ## 14.1 Converting to boolean
    // ========================
    
      // These are three ways in which you can convert an arbitrary value x to a boolean.
      Boolean(x)
      // Most descriptive; recommended.
      x ? true : false
      // Uses the conditional operator (explained later in this chapter).
      !!x
      // Uses the logical Not operator (!). This operator coerces its operand to boolean. It is applied a second time to get a non-negated result.

      // Table 4: Converting values to booleans.
      x	                Boolean(x)
      undefined	        false
      null	            false
      boolean value	    x (no change)
      number value	    0 → false, NaN → false
                        other numbers → true
      string value	    '' → false
                        other strings → true
      object value	    always true

    // ## 14.3 Truthiness-based existence checks
    // ========================
      // For example, the following code checks if object obj has the property .prop:
        if (obj.prop !== undefined) {
          // obj has property .prop
        }

        // Due to undefined being falsy, we can shorten this check to:
        if (obj.prop) {
          // obj has property .prop
        }

        // The body of the if statement is skipped if:
          // * obj.prop is missing (in which case, JavaScript returns undefined).

        // However, it is also skipped if:
          // * obj.prop is undefined.
          // * obj.prop is any other falsy value (null, 0, '', etc.).

        // ### 14.5.3 Default values via logical Or (||)
          // The following code shows a real-world example:
          function countMatches(regex, str) {
            const matchResult = str.match(regex); // null or Array
            return (matchResult || []).length;
          }

          // Example: Default values via the Or operator (||)
            function getFilename(options) {
              if(options.filename) {
                return options.filename;
              } else {
                return 'Untitled';
              }
            }

            // Become like that
            function getFilename(options) {
              return options.filename || 'Untitled';
            }