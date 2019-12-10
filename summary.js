// ============================
// 10 Variables and assignment
// ============================
    //## 10.1 let - Variables declared via let are mutable:
    // ============================

    //## 10.2 const
    // Variables declared via const are immutable. You must always initialize immediately:
    // ============================
        const i = 0; // must initialize

        // In JavaScript, const only means that the binding (the association between variable name and variable value) is immutable. The value itself may be mutable, like obj or array in the following example.

        const obj = { prop: 0 };
        // Allowed: changing properties of `obj`
        obj.prop = obj.prop + 1;

        // Not allowed: assigning to `obj`
        obj = {}

    //### 10.2.2 const and loops
        // You can use const with for-of loops, where a fresh binding is created for each iteration:
        const arr = ['hello', 'world'];
        for (const elem of arr) {
            console.log(elem);
        }


        //## 10.4 The scope of a variable
        // The scope of a variable is the region of a program where it can be accessed. Consider the following code.
        // ============================
        { // Scope A. Accessible: x
            const x = 0;
            assert.equal(x, 0);
            { // Scope B. Accessible: x, y
              const y = 1;
              assert.equal(x, 0);
              assert.equal(y, 1);
              { // Scope C. Accessible: x, y, z
                const z = 2;
                assert.equal(x, 0);
                assert.equal(y, 1);
                assert.equal(z, 2);
              }
            }
        }
        // Outside. Not accessible: x, y, z
        console.log(x); // x is not defined




    