// ============================
// 10 Variables and assignment
// ============================
    //## 10.1 let - Variables declared via let are mutable:
    // ============================

    //## 10.2 const
    // Variables declared via const are immutable. You must always initialize immediately:
    // ============================

        //### 10.2.1 const
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

    //### 10.4.1 Shadowing variables
    // You can, nest a block and use the same variable name x that you used outside the block:

    const x = 1;
    assert.equal(x, 1);
    {
      const x = 2;
      assert.equal(x, 2);
    }
    assert.equal(x, 1);
    
    // Inside the block, the inner x is the only accessible variable with that name. The inner x is said to shadow the outer x. Once you leave the block, you can access the old value again.


//## 10.5 (Advanced)
// ============================

//## 10.9 Closures
// ============================
    // ### 10.9.1 Bound variables vs. free variables
    // * Bound variables are declared within the scope. They are parameters and local variables.
    // * Free variables are declared externally. They are also called non-local variables.

    function func(x) {
      const y = 123;
      console.log(z);
    }
    // In the body of func(), x and y are bound variables. z is a free variable.

    // What is a closure then?
      // A closure is a function plus a connection to the variables that exist at its “birth place”.

      // Example
      function brand(brand) {
        console.log(brand);
        return function(model) {
          console.log(`I like ${brand}, special ${model}`);
        }
      }
      // brand('Audi'); // Audi
      const bestCar = brand('Audi');
      bestCar('A4'); // I like Audi, special A4

      // or we can call like that:
      brand('Audi')('A4'); // I like Audi, special A4


      // We can go deeper
      function brand(brand) {
        console.log(brand);
        return function(model) {
          console.log(`I like ${brand}, special ${model}`);
          return function(specs) {
            console.log(`I like ${brand}, special ${model} because it's ${specs}`);
          }
        }
      }
      // brand('Audi'); // Audi
      const brandCar = brand('Audi');
      // brandCar('A4'); // I like Audi, special A4, 
      const bestCar = brandCar('A4');
      bestCar('fast'); // I like Audi, special A4 because it's fast


      // The easiest example of closure, is when inner function has access to outer function
      // Care face referinta la functiile din interiorul functiei

      // Example of closure 2
      function processData() {
        const names = [];
        
        function getNameById(id) {
          return names.filter(item => item.id === id);
        }
        
        function setName(name) {
          names.push(name);
        }
        
        const getAllNames = () => names;
        
        return {getNameById, setName, getAllNames};
      }
      /*
      const data = processData();
      data.setName({id: 1, name: 'Dave'});
      data.setName({id: 2, name: 'Tony'});
      
      console.log(data.getAllNames());
      console.log(data.getNameById(1));
      */
      
      // With destructuring
      const {getNameById, setName, getAllNames} = processData();
      setName({id: 1, name: 'Dave'});
      setName({id: 2, name: 'Tony'});
      
      console.log(getAllNames());
      console.log(getNameById(2));





