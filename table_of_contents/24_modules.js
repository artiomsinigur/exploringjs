// ============================
// 24 Modules
// ============================

    // ## 24.1 Overview: syntax of ECMAScript modules
    // ============================
        // ### Exporting
            // Named exports
            export function f() {}
            export const one = 1;
            export {foo, b as bar};

            // Default exports
            export default function f() {} // declaration with optional name
            // Replacement for `const` (there must be exactly one value)
            export default 123;

            // Re-exporting from another module
            export * from './some-module.mjs';
            export {foo, b as bar} from './some-module.mjs';

        // ### 24.1.2 Importing
            // Named imports
            import {foo, bar as b} from './some-module.mjs';
            // Namespace import
            import * as someModule from './some-module.mjs';
            // Default import
            import someModule from './some-module.mjs';

            // Combinations:
            import someModule, * as someModule from './some-module.mjs';
            import someModule, {foo, bar as b} from './some-module.mjs';

            // Empty import (for modules with side effects)
            import './some-module.mjs';

        // ### 24.4.3 Characteristics of JavaScript modules
            // Looking at CommonJS and AMD, similarities between JavaScript module systems emerge:

            // * There is one module per file.
            // * Such a file is basically a piece of code that is executed:
                // 1 Local scope: The code is executed in a local “module scope”. Therefore, by default, all of the variables, functions, and classes declared in it are internal and not global.
                // 2 Exports: If you want any declared entity to be exported, you must explicitly mark it as an export.
                // 3 Imports: Each module can import exported entities from other modules. Those other modules are identified via module specifiers (usually paths, occasionally full URLs).
            // * Modules are singletons: Even if a module is imported multiple times, only a single “instance” of it exists.
            // * No global variables are used. Instead, module specifiers serve as global IDs.

    // ## 24.5 ECMAScript modules
    // ================================
        // This is an example of ES module syntax:
        import {importedFunc1} from './other-module1.mjs';
        import {importedFunc2} from './other-module2.mjs';

        function internalFunc() {
            ···
        }

        export function exportedFunc() {
            importedFunc1();
            importedFunc2();
            internalFunc();
        }

    // ## 24.6 Named exports and imports
    // =================================
        // ### 24.6.1 Named exports
            // Each module can have zero or more named exports.
            lib/my-math.mjs
            main.mjs

            // Module my-math.mjs has two named exports: square and LIGHTSPEED.
            // Not exported, private to module. Entities that are not exported are private to a module and can’t be accessed from outside.
            function times(a, b) {
                return a * b;
            }
            export function square(x) {
                return times(x, x);
            }
            export const LIGHTSPEED = 299792458;

        // ### 24.6.2 Named imports
            // Module main.mjs has a single named import, square:
            import {square} from './lib/my-math.mjs';
            assert.equal(square(3), 9);

        // ### 24.6.3 Namespace imports
            // Namespace imports are an alternative to named imports. 
            // If we namespace-import a module, it becomes an object whose properties are the named exports. 
            // This is what main.mjs looks like if we use a namespace import:
            
            import * as myMath from './lib/my-math.mjs';
            assert.equal(myMath.square(3), 9);

            assert.deepEqual(
                Object.keys(myMath), ['LIGHTSPEED', 'square']);

        // ### 24.6.4 Named exporting styles: inline versus clause (advanced)
            // The named export style we have seen so far was inline: We exported entities by prefixing them with the keyword export.

            // But we can also use separate export clauses. For example, this is what lib/my-math.mjs looks like with an export clause:
            function times(a, b) {
                return a * b;
            }
            function square(x) {
                return times(x, x);
            }
            const LIGHTSPEED = 299792458
            
            export { square, LIGHTSPEED }; // semicolon!
            
            // or rename functions before exporting
            export { 
                square as sq, 
                LIGHTSPEED as LS 
            }; // semicolon!

    // ## 24.7 Default exports and imports
    // ==============================
        // !!! Avoid mixing named exports and default exports
            // A module can have both named exports and a default export, but it’s usually better to stick to one export style per module.

        // !!! What are use cases for default exports?
            // The most common use case for a default export is a module that contains a single function or a single class.

        // Module my-func.mjs has a default export:
        const GREETING = 'Hello!';
        export default function () {
            return GREETING;
        }

        // For importing
        import myFunc from './my-func.mjs';
        assert.equal(myFunc(), 'Hello!');
        // Note the syntactic difference: the curly braces around named imports indicate that we are reaching into the module, while a default import is the module.

        // ### 24.7.1 The two styles of default-exporting
            // 1 First, you can label existing declarations with export default:
            export default function foo() {} // no semicolon!
            export default class Bar {} // no semicolon!

            // 2 Second, you can directly default-export values. In that style, export default is itself much like a declaration.
            export default 'abc';
            export default foo();
            export default /^xyz$/;
            export default 5 * 7;
            export default { no: false, yes: true };

        // ### 24.7.2 The default export as a named export (advanced)
        export default function () {
            return 'Hello!';
        }

        // For importing, we can use a normal default import:
        import {default as myFunc} from './my-func2.mjs';
        assert.equal(myFunc(), 'Hello!');

    // ## 24.8 More details on exporting and importing
    // =================================








