  // ========================
  // 16 Math
  // ========================
    
    // ## 16.3 Rounding
    // =========================
    // Note how things change with negative numbers because “larger” always means “closer to positive infinity”.
    // Table 12: Rounding functions of Math. 
    -2.9	-2.5	-2.1	2.1	2.5	2.9
    Math.floor	-3	  -3	  -3	  2	  2	  2
    Math.ceil	  -2	  -2	  -2	  3	  3	  3
    Math.round	-3	  -2	  -2	  2	  3	  3
    Math.trunc	-2	  -2	  -2	  2	  2	  2

    // ## 16.5 Various other functions
    // =========================
      Math.abs(x: number): number [ES1]

      // Returns the absolute value of x.
      > Math.abs(3)
      3
      > Math.abs(-3)
      3
      > Math.abs(0)
      0

      Math.max(...values: number[]): number [ES1]
      // Converts values to numbers and returns the largest one.
      > Math.max(3, -5, 24)
      24
      
      Math.min(...values: number[]): number [ES1]
      // Converts values to numbers and returns the smallest one.
      > Math.min(3, -5, 24)
      -5
      
      Math.random(): number [ES1]
      // Returns a pseudo-random number n where 0 ≤ n < 1.

      // Computing a random integer i where 0 ≤ i < max:
      function getRandomInteger(max) {
        return Math.floor(Math.random() * max);
      }