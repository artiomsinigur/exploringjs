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
// In JavaScript, a scope is created by a function or code block. 
// The scope isolates its variables. That’s great because different scopes can have variables with the same name.
// In JavaScript, the scope says: if you’ve defined a variable inside of a function or code block, then you can use this variable only within that function or code block.
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
    console.log(x); // ReferenceError: x is not defined

    //### 10.4.1 Scopes nesting and The lexical scope
    // * Scopes can be nested
    // * The variables of the outer scope are accessible inside the inner scope
    // * The lexical scoping means that inside the inner scope you can access variables of its outer scopes.
    // * Note that innerFunc() invocation happens inside its lexical scope (the scope of outerFunc()).
    function outerFunc() {
      // the outer scope
      let outerVar = 'I am outside!';
    
      function innerFunc() {
        // the inner scope
        console.log(outerVar); // "I am outside!"
      }
    
      innerFunc();
    }
    outerFunc();


    //### 10.4.2 Shadowing variables
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
    //### 10.9.0 The closure
    // Let’s make a change: innerFunc() to be invoked outside of its lexical scope (outside of outerFunc()). Would innerInc() still be able to access outerVar?
    // * innerFunc() still has access to outerVar from its lexical scope, even being executed outside of its lexical scope.
    // * In other words, innerFunc() closes over (a.k.a. captures, remembers) the variable outerVar from its lexical scope. (is a CLOSURE)

    // Simpler, the closure is a function that remembers the variables from the place where it is defined, regardless of where it is executed later.
    // A rule of how identify a closure: if you see in a function an alien variable (not defined inside the function), most likely that function is a closure because the alien variable is captured.
    
    function outerFunc() {
      let outerVar = 'I am outside!';
    
      function innerFunc() { // innerFunc() is a closure
        console.log(outerVar); // "I am outside!"
      }
    
      return innerFunc;
    }
    const myInnerFunc = outerFunc();
    myInnerFunc();

    // ### Closure examples
      // 1. Event handler
      // Being a closure, handleClick() captures countClicked from the lexical scope and updates it when a click happens
      let countClicked = 0;

      myButton.addEventListener('click', function handleClick() {
        countClicked++;
        myText.innerText = `You clicked ${countClicked} times`;
      });

      // 2. Callbacks
      // The callback() is a closure because it captures the variable message.
        const message = 'Hello, World!';

        setTimeout(function callback() {
          console.log(message); // logs "Hello, World!"
        }, 1000);

      // 3. Functional programming
      // executeMultiply(b) is a closure that captures a from its lexical scope. When the closure is invoked, the captured variable a and the parameter b are used to calculate a * b.
        function multiply(a) {
          return function executeMultiply(b) {
            return a * b;
          }
        }
        
        const double = multiply(2);
        double(3); // => 6


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





