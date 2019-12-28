  // ============================
  // 19 Using template literals and tagged templates
  // ============================
    
    // ## 19.1 Disambiguation: “template”
    // =================================
      // * Text template is a function from data to text.
      <div class="entry">
      <h1>{{title}}</h1>
      <div class="body">
        {{body}}
      </div>
    </div>

  // * Template literal is similar to a string literal, but has additional features – for example, interpolation. It is delimited by backticks:
    const num = 5;
    assert.equal(`Count: ${num}!`, 'Count: 5!');

  // * Tagged template - Syntactically, a tagged template is a template literal that follows a function (or rather, an expression that evaluates to a function). That leads to the function being called. Its arguments are derived from the contents of the template literal.
    const getArgs = (...args) => args;
    assert.deepEqual(
      getArgs`Count: ${5}!`,
      [['Count: ', '!'], 5] );
    
    // Note that getArgs() receives both the text of the literal and the data interpolated via ${}.

// ## 19.3 Tagged templates
// =================================
  // The expression in line A is a tagged template. It is equivalent to invoking tagFunc() with the arguments listed in the Array in line B.
  
  function tagFunc(...args) {
    return args;
  }
  
  const setting = 'dark mode';
  const value = true;
  
  assert.deepEqual(
    tagFunc`Setting ${setting} is ${value}!`, // (A)
    [['Setting ', ' is ', '!'], 'dark mode', true] // (B)
  );

  // The function tagFunc before the first backtick is called a tag function. Its arguments are:
    // * Template strings (first argument): an Array with the text fragments surrounding the interpolations ${}.
        // In the example: ['Setting ', ' is ', '!']
    // * Substitutions (remaining arguments): the interpolated values.
        // In the example: 'dark mode' and true
    
    // The static (fixed) parts of the literal (the template strings) are kept separate from the dynamic parts (the substitutions).


// ## 19.6 Multiline template literals and indentation
// =================================
  // If you put multiline text in template literals, two goals are in conflict: On one hand, the template literal should be indented to fit inside the source code. On the other hand, the lines of its content should start in the leftmost column.
  function div(text) {
    return `
      <div>
        ${text}
      </div>
    `;
  }

  console.log(
    div('Hello!')
    // Replace spaces with mid-dots:
    .replace(/ /g, '·')
    // Replace \n with #\n:
    .replace(/\n/g, '#\n')
  );

  // "
  // ....<div>
  // ......Hello
  // ....</div>
  // .."

  // ### 19.6.2 Fix: .trim()
  function divDedented(text) {
    return `
      <div>
        ${text}
      </div>
    `.trim().replace(/\n/g, '#\n');
  }

// ## 19.7 Simple templating via template literals
// =================================
  // The solution is to use a template literal in the body of a function whose parameter receives the templating data – for example:
    const tmpl = (data) => `Hello ${data.name}!`;
    assert.equal(tmpl({name: 'Jane'}), 'Hello Jane!');

  // ### 19.7.1 A more complex example
  // As a more complex example, we’d like to take an Array of addresses and produce an HTML table. This is the Array:

  const addresses = [
    { first: '<Jane>', last: 'Bond' },
    { first: 'Lars', last: '<Croft>' },
  ];

  const tmpl = (addrs) => `
  <table>
    ${addrs.map(
      (addr) => `
        <tr>
          <td>${escapeHtml(addr.first)}</td>
          <td>${escapeHtml(addr.last)}</td>
        </tr>
        `.trim()
    ).join('')}
  </table>
  `.trim();

  // The first one (line 1) takes addrs, an Array with addresses, and returns a string with a table.
  // The second one (line 4) takes addr, an object containing an address, and returns a string with a table row. Note the .trim() at the end, which removes unnecessary whitespace.
  // The first templating function produces its result by wrapping a table element around an Array that it joins into a string (line 10). That Array is produced by mapping the second templating function to each element of addrs (line 3). It therefore contains strings with table rows.
