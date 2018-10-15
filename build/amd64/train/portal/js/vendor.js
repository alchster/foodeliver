//---------------------------------------//// свг спрайт//---------------------------------------//;( function( window, document ){	'use strict';	var file     = './img/svg.html',		revision = 1;	if( !document.createElementNS || !document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect )		return true;	var isLocalStorage = 'localStorage' in window && window[ 'localStorage' ] !== null,		request,		data,		insertIT = function()		{			document.getElementById('svg-sprite-container').insertAdjacentHTML( 'afterbegin', data );		},		insert = function()		{			if( document.body ) insertIT();			else document.addEventListener( 'DOMContentLoaded', insertIT );		};//	if( isLocalStorage && localStorage.getItem( 'inlineSVGrev' ) == revision )//	{//		data = localStorage.getItem( 'inlineSVGdata' );//		if( data )//		{//			insert();//			return true;//		}//	}	try	{		request = new XMLHttpRequest();		request.open( 'GET', file, true );		request.onload = function()		{			if( request.status >= 200 && request.status < 400 )			{				data = request.responseText;				insert();				if( isLocalStorage )				{					localStorage.setItem( 'inlineSVGdata',  data );					localStorage.setItem( 'inlineSVGrev',   revision );				}			}		}		request.send();	}	catch( e ){}}( window, document ) );//---------------------------------------//// Подключаем набор плагинов ( requare/plugins.js )//---------------------------------------////---------------------------------------//// Подключаем плагины bower//---------------------------------------///*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
( function( global, factory ) {
	"use strict";
	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}
// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";
var arr = [];
var document = window.document;
var getProto = Object.getPrototypeOf;
var slice = arr.slice;
var concat = arr.concat;
var push = arr.push;
var indexOf = arr.indexOf;
var class2type = {};
var toString = class2type.toString;
var hasOwn = class2type.hasOwnProperty;
var fnToString = hasOwn.toString;
var ObjectFunctionString = fnToString.call( Object );
var support = {};
	function DOMEval( code, doc ) {
		doc = doc || document;
		var script = doc.createElement( "script" );
		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module
var
	version = "3.2.1",
	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},
	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,
	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};
jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,
	constructor: jQuery,
	// The default length of a jQuery object is 0
	length: 0,
	toArray: function() {
		return slice.call( this );
	},
	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}
		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},
	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {
		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );
		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		// Return the newly-formed element set
		return ret;
	},
	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},
	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},
	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},
	first: function() {
		return this.eq( 0 );
	},
	last: function() {
		return this.eq( -1 );
	},
	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},
	end: function() {
		return this.prevObject || this.constructor();
	},
	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};
jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;
	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}
	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}
	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}
	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];
				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}
				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];
					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}
					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );
				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}
	// Return the modified object
	return target;
};
jQuery.extend( {
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),
	// Assume jQuery is ready without the ready module
	isReady: true,
	error: function( msg ) {
		throw new Error( msg );
	},
	noop: function() {},
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},
	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},
	isNumeric: function( obj ) {
		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&
			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},
	isPlainObject: function( obj ) {
		var proto, Ctor;
		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}
		proto = getProto( obj );
		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}
		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},
	isEmptyObject: function( obj ) {
		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},
	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},
	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},
	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},
	each: function( obj, callback ) {
		var length, i = 0;
		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}
		return obj;
	},
	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},
	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];
		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}
		return ret;
	},
	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},
	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;
		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}
		first.length = i;
		return first;
	},
	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;
		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}
		return matches;
	},
	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];
		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );
				if ( value != null ) {
					ret.push( value );
				}
			}
		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );
				if ( value != null ) {
					ret.push( value );
				}
			}
		}
		// Flatten any nested arrays
		return concat.apply( [], ret );
	},
	// A global GUID counter for objects
	guid: 1,
	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;
		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}
		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}
		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};
		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;
		return proxy;
	},
	now: Date.now,
	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}
// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );
function isArrayLike( obj ) {
	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );
	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}
	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {
var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,
	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,
	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},
	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},
	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
	// Regular expressions
	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",
	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",
	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),
	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),
	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),
	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),
	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},
	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,
	rnative = /^[^{]+\{\s*\[native \w/,
	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
	rsibling = /[+~]/,
	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},
	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {
			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}
			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}
		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},
	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},
	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);
// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?
		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :
		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}
function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,
		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;
	results = results || [];
	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {
		return results;
	}
	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {
		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;
		if ( documentIsHTML ) {
			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
				// ID selector
				if ( (m = match[1]) ) {
					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {
							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}
					// Element context
					} else {
						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {
							results.push( elem );
							return results;
						}
					}
				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;
				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {
					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}
			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;
				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {
					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}
					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );
					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}
				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}
	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}
/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];
	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}
/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}
/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");
	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}
/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;
	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}
/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;
	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}
	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}
	return a ? 1 : -1;
}
/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}
/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}
/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {
	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {
		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {
			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {
				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}
				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||
					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}
			return elem.disabled === disabled;
		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}
		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}
/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;
			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}
/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}
// Expose support vars for convenience
support = Sizzle.support = {};
/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};
/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;
	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}
	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );
	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {
		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );
		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}
	/* Attributes
	---------------------------------------------------------------------- */
	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});
	/* getElement(s)By*
	---------------------------------------------------------------------- */
	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});
	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );
	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});
	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );
				if ( elem ) {
					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}
					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}
				return [];
			}
		};
	}
	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );
			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );
			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}
				return tmp;
			}
			return results;
		};
	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};
	/* QSA/matchesSelector
	---------------------------------------------------------------------- */
	// QSA and matchesSelector support
	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];
	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];
	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";
			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}
			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}
			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}
			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});
		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );
			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}
			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}
			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}
			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}
	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {
		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );
			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}
	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );
	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );
	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};
	/* Sorting
	---------------------------------------------------------------------- */
	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {
		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}
		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}
		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :
			// Otherwise we know they are disconnected
			1;
		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {
			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}
			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}
		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}
		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];
		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}
		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}
		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}
		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :
			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};
	return document;
};
Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};
Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}
	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );
	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {
		try {
			var ret = matches.call( elem, expr );
			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}
	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};
Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};
Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}
	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;
	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};
Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};
Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};
/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;
	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );
	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}
	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;
	return results;
};
/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;
	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes
	return ret;
};
Expr = Sizzle.selectors = {
	// Can be adjusted by the user
	cacheLength: 50,
	createPseudo: markFunction,
	match: matchExpr,
	attrHandle: {},
	find: {},
	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},
	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );
			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );
			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}
			return match.slice( 0, 4 );
		},
		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();
			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}
				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );
			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}
			return match;
		},
		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];
			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}
			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";
			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {
				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}
			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},
	filter: {
		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},
		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];
			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},
		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );
				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}
				result += "";
				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},
		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";
			return first === 1 && last === 0 ?
				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :
				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;
					if ( parent ) {
						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}
						start = [ forward ? parent.firstChild : parent.lastChild ];
						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});
							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});
							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {
								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}
						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});
								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});
								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}
							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {
									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {
										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});
											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});
											uniqueCache[ type ] = [ dirruns, diff ];
										}
										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}
						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},
		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );
			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}
			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}
			return fn;
		}
	},
	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );
			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;
					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),
		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),
		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),
		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {
						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),
		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},
		"root": function( elem ) {
			return elem === docElem;
		},
		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},
		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),
		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},
		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}
			return elem.selected === true;
		},
		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},
		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},
		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},
		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},
		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},
		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&
				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},
		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),
		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),
		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),
		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),
		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),
		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),
		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};
Expr.pseudos["nth"] = Expr.pseudos["eq"];
// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}
// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();
tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];
	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}
	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;
	while ( soFar ) {
		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}
		matched = false;
		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}
		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}
		if ( !matched ) {
			break;
		}
	}
	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};
function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}
function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;
	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :
		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];
			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});
						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {
							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;
							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}
function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}
function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}
function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;
	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}
	return newUnmatched;
}
function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,
			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),
			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,
			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?
					// ...intermediate processing is necessary
					[] :
					// ...otherwise use results directly
					results :
				matcherIn;
		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}
		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );
			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}
		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}
				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {
						seed[temp] = !(results[temp] = elem);
					}
				}
			}
		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}
function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,
		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];
	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );
			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}
	return elementMatcher( matchers );
}
function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;
			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}
			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}
				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}
					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}
			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;
			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}
				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}
					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}
				// Add matches to results
				push.apply( results, setMatched );
				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {
					Sizzle.uniqueSort( results );
				}
			}
			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}
			return unmatched;
		};
	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}
compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];
	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}
		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};
/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );
	results = results || [];
	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {
		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {
			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;
			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}
			selector = selector.slice( tokens.shift().value.length );
		}
		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];
			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {
					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}
					break;
				}
			}
		}
	}
	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};
// One-time assignments
// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;
// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;
// Initialize against the default document
setDocument();
// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});
// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}
// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}
// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}
return Sizzle;
})( window );
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;
var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;
	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};
var siblings = function( n, elem ) {
	var matched = [];
	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}
	return matched;
};
var rneedsContext = jQuery.expr.match.needsContext;
function nodeName( elem, name ) {
  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );
var risSimple = /^.[^:#\[\.,]*$/;
// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}
	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}
	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}
	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}
	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}
jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];
	if ( not ) {
		expr = ":not(" + expr + ")";
	}
	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}
	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};
jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;
		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}
		ret = this.pushStack( [] );
		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}
		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,
			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );
// Initialize a jQuery object
// A central reference to the root jQuery(document)
var rootjQuery,
	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;
		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}
		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;
		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];
			} else {
				match = rquickExpr.exec( selector );
			}
			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {
				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;
					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );
					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );
							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}
					return this;
				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );
					if ( elem ) {
						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}
			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );
			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}
		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;
		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}
		return jQuery.makeArray( selector, this );
	};
// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;
// Initialize central reference
rootjQuery = jQuery( document );
var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};
jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;
		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},
	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );
		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {
					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :
						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {
						matched.push( cur );
						break;
					}
				}
			}
		}
		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},
	// Determine the position of an element within the set
	index: function( elem ) {
		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}
		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}
		// Locate the position of the desired element
		return indexOf.call( this,
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},
	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},
	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );
function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}
jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }
        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }
        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );
		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}
		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}
		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}
			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}
		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );
// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}
/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {
	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );
	var // Flag to know if list is currently firing
		firing,
		// Last fire value for non-forgettable lists
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to prevent firing
		locked,
		// Actual callback list
		list = [],
		// Queue of execution data for repeatable lists
		queue = [],
		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,
		// Fire callbacks
		fire = function() {
			// Enforce single-firing
			locked = locked || options.once;
			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {
					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {
						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}
			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}
			firing = false;
			// Clean up if we're done firing for good
			if ( locked ) {
				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];
				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}
					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );
					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );
						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},
			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},
			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},
			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};
	return self;
};
function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}
function adoptValue( value, resolve, reject, noValue ) {
	var method;
	try {
		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );
		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );
		// Other non-thenables
		} else {
			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}
	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {
		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}
jQuery.extend( {
	Deferred: function( func ) {
		var tuples = [
				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},
				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];
							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;
									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}
									returned = handler.apply( that, args );
									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}
									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&
										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;
									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {
										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);
										// Normal processors (resolve) also hook into progress
										} else {
											// ...and disregard older resolution values
											maxDepth++;
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}
									// Handle all other returned values
									} else {
										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}
										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},
								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {
											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}
											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {
												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}
												deferred.rejectWith( that, args );
											}
										}
									};
							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {
								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}
					return jQuery.Deferred( function( newDefer ) {
						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);
						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);
						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};
		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];
			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;
			// Handle state
			if ( stateString ) {
				list.add(
					function() {
						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},
					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,
					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}
			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );
			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};
			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );
		// Make the deferred a promise
		promise.promise( deferred );
		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}
		// All done!
		return deferred;
	},
	// Deferred helper
	when: function( singleValue ) {
		var
			// count of uncompleted subordinates
			remaining = arguments.length,
			// count of unprocessed arguments
			i = remaining,
			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),
			// the master Deferred
			master = jQuery.Deferred(),
			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};
		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );
			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {
				return master.then();
			}
		}
		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}
		return master.promise();
	}
} );
// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
jQuery.Deferred.exceptionHook = function( error, stack ) {
	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};
jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};
// The deferred used on DOM ready
var readyList = jQuery.Deferred();
jQuery.fn.ready = function( fn ) {
	readyList
		.then( fn )
		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );
	return this;
};
jQuery.extend( {
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,
	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,
	// Handle when the DOM is ready
	ready: function( wait ) {
		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}
		// Remember that the DOM is ready
		jQuery.isReady = true;
		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}
		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );
jQuery.ready.then = readyList.then;
// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}
// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {
	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );
} else {
	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );
	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}
// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;
	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}
	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;
		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}
		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;
			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}
		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}
	if ( chainable ) {
		return elems;
	}
	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}
	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};
function Data() {
	this.expando = jQuery.expando + Data.uid++;
}
Data.uid = 1;
Data.prototype = {
	cache: function( owner ) {
		// Check if the owner object already has a cache
		var value = owner[ this.expando ];
		// If not, create one
		if ( !value ) {
			value = {};
			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {
				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;
				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}
		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );
		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;
		// Handle: [ owner, { properties } ] args
		} else {
			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :
			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {
			return this.get( owner, key );
		}
		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );
		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];
		if ( cache === undefined ) {
			return;
		}
		if ( key !== undefined ) {
			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {
				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );
				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}
			i = key.length;
			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}
		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {
			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();
var dataUser = new Data();
//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014
var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;
function getData( data ) {
	if ( data === "true" ) {
		return true;
	}
	if ( data === "false" ) {
		return false;
	}
	if ( data === "null" ) {
		return null;
	}
	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}
	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}
	return data;
}
function dataAttr( elem, key, data ) {
	var name;
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );
		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}
			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}
jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},
	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},
	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},
	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},
	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );
jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;
		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );
				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {
						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}
			return data;
		}
		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}
		return access( this, function( value ) {
			var data;
			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}
				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}
				// We tried really hard, but the data doesn't exist.
				return;
			}
			// Set the data...
			this.each( function() {
				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},
	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );
jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;
		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );
			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},
	dequeue: function( elem, type ) {
		type = type || "fx";
		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};
		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}
		if ( fn ) {
			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}
			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}
		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},
	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );
jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;
		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}
		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}
		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );
				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );
				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};
		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";
		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;
var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );
var cssExpand = [ "Top", "Right", "Bottom", "Left" ];
var isHiddenWithinTree = function( elem, el ) {
		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&
			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&
			jQuery.css( elem, "display" ) === "none";
	};
var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};
	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}
	ret = callback.apply( elem, args || [] );
	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}
	return ret;
};
function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),
		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );
	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {
		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];
		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;
		do {
			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";
			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );
		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}
	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;
		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}
var defaultDisplayMap = {};
function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];
	if ( display ) {
		return display;
	}
	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );
	temp.parentNode.removeChild( temp );
	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;
	return display;
}
function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;
	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		display = elem.style.display;
		if ( show ) {
			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";
				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}
	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}
	return elements;
}
jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}
		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );
var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );
var rscriptType = ( /^$|\/(?:java|ecma)script/i );
// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
	_default: [ 0, "", "" ]
};
// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;
function getAll( context, tag ) {
	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;
	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );
	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );
	} else {
		ret = [];
	}
	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}
	return ret;
}
// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;
	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}
var rhtml = /<|&#?\w+;/;
function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;
	for ( ; i < l; i++ ) {
		elem = elems[ i ];
		if ( elem || elem === 0 ) {
			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );
			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );
			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );
				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];
				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}
				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );
				// Remember the top-level container
				tmp = fragment.firstChild;
				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}
	// Remove wrapper from fragment
	fragment.textContent = "";
	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {
		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}
		contains = jQuery.contains( elem.ownerDocument, elem );
		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );
		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}
		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}
	return fragment;
}
( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );
	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );
	div.appendChild( input );
	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;
	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;
var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
function returnTrue() {
	return true;
}
function returnFalse() {
	return false;
}
// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}
function on( elem, types, selector, data, fn, one ) {
	var origFn, type;
	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {
		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {
			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}
	if ( data == null && fn == null ) {
		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {
			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {
			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}
	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {
			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};
		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}
/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {
	global: {},
	add: function( elem, types, handler, data, selector ) {
		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );
		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}
		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}
		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}
		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}
		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}
		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();
			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}
			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};
			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;
			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};
			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );
			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;
				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}
			if ( special.add ) {
				special.add.call( elem, handleObj );
				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}
			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}
			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}
	},
	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );
		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}
		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();
			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}
			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );
			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];
				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );
					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}
			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}
				delete events[ type ];
			}
		}
		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},
	dispatch: function( nativeEvent ) {
		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );
		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};
		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}
		event.delegateTarget = this;
		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}
		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );
		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;
			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {
				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {
					event.handleObj = handleObj;
					event.data = handleObj.data;
					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );
					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}
		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}
		return event.result;
	},
	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;
		// Find delegate handlers
		if ( delegateCount &&
			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&
			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {
			for ( ; cur !== this; cur = cur.parentNode || this ) {
				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];
						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";
						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}
		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}
		return handlerQueue;
	},
	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,
			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},
			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},
	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},
	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},
			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},
		beforeunload: {
			postDispatch: function( event ) {
				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};
jQuery.removeEvent = function( elem, type, handle ) {
	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};
jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}
	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;
		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;
		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;
		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;
	// Event type
	} else {
		this.type = src;
	}
	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}
	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();
	// Mark it as fixed
	this[ jQuery.expando ] = true;
};
// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,
	preventDefault: function() {
		var e = this.originalEvent;
		this.isDefaultPrevented = returnTrue;
		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;
		this.isPropagationStopped = returnTrue;
		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;
		this.isImmediatePropagationStopped = returnTrue;
		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}
		this.stopPropagation();
	}
};
// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,
	which: function( event ) {
		var button = event.button;
		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}
		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}
			if ( button & 2 ) {
				return 3;
			}
			if ( button & 4 ) {
				return 2;
			}
			return 0;
		}
		return event.which;
	}
}, jQuery.event.addProp );
// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,
		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;
			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );
jQuery.fn.extend( {
	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );
var
	/* eslint-disable max-len */
	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
	/* eslint-enable */
	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {
		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}
	return elem;
}
// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}
function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
	if ( dest.nodeType !== 1 ) {
		return;
	}
	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;
		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};
			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}
	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );
		dataUser.set( dest, udataCur );
	}
}
// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();
	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;
	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}
function domManip( collection, args, callback, ignored ) {
	// Flatten any nested arrays
	args = concat.apply( [], args );
	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );
	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}
	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;
		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}
		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;
			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;
				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );
					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {
						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}
				callback.call( collection[ i ], node, i );
			}
			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;
				// Reenable scripts
				jQuery.map( scripts, restoreScript );
				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {
						if ( node.src ) {
							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}
	return collection;
}
function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;
	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}
		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}
	return elem;
}
jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );
		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {
			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );
			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}
		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );
				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}
		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}
		// Return the cloned set
		return clone;
	},
	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;
		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );
							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {
					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );
jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},
	remove: function( selector ) {
		return remove( this, selector );
	},
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},
	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},
	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},
	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},
	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},
	empty: function() {
		var elem,
			i = 0;
		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {
				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );
				// Remove any remaining nodes
				elem.textContent = "";
			}
		}
		return this;
	},
	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},
	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;
			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}
			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {
				value = jQuery.htmlPrefilter( value );
				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};
						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}
					elem = 0;
				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}
			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},
	replaceWith: function() {
		var ignored = [];
		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;
			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}
		// Force callback invocation
		}, ignored );
	}
} );
jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;
		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );
			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}
		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );
var getStyles = function( elem ) {
		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;
		if ( !view || !view.opener ) {
			view = window;
		}
		return view.getComputedStyle( elem );
	};
( function() {
	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {
		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}
		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );
		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";
		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";
		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";
		documentElement.removeChild( container );
		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}
	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );
	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}
	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );
	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();
function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;
	computed = computed || getStyles( elem );
	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}
		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {
			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;
			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;
			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}
	return ret !== undefined ?
		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}
function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}
			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}
var
	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},
	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;
// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {
	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}
	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;
	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}
// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}
function setPositiveNumber( elem, value, subtract ) {
	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}
function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;
	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;
	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}
	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}
		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}
			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}
	return val;
}
function getWidthOrHeight( elem, name, extra ) {
	// Start with computed style
	var valueIsBorderBox,
		styles = getStyles( elem ),
		val = curCSS( elem, name, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";
	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}
	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = isBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ name ] );
	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];
	}
	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;
	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}
jQuery.extend( {
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},
	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},
	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},
	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}
		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;
		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}
		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;
			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );
				// Fixes bug #9237
				type = "number";
			}
			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}
			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}
			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {
				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}
		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {
				return ret;
			}
			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},
	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );
		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}
		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}
		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}
		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}
		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );
jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},
		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);
			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {
				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}
			return setPositiveNumber( elem, value, subtract );
		}
	};
} );
jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);
// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},
				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];
			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}
			return expanded;
		}
	};
	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );
jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;
			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;
				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}
				return map;
			}
			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );
function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;
Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];
		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];
		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;
		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}
		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};
Tween.prototype.init.prototype = Tween.prototype;
Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;
			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}
			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};
// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};
jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};
jQuery.fx = Tween.prototype.init;
// Back compat <1.8 extension point
jQuery.fx.step = {};
var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;
function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}
		jQuery.fx.tick();
	}
}
// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}
// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };
	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}
	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}
	return attrs;
}
function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {
			// We're done with this property
			return tween;
		}
	}
}
function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );
	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;
		anim.always( function() {
			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}
	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {
				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}
	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}
	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {
		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];
		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {
				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}
		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {
				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}
	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}
	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {
		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}
			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}
			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}
			/* eslint-disable no-loop-func */
			anim.done( function() {
			/* eslint-enable no-loop-func */
				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}
		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}
function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;
	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}
		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}
		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];
			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}
function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;
			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}
			deferred.notifyWith( elem, [ animation, percent, remaining ] );
			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}
			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}
			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}
				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;
	propFilter( props, animation.opts.specialEasing );
	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}
	jQuery.map( props, createTween, animation );
	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}
	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);
	return animation;
}
jQuery.Animation = jQuery.extend( Animation, {
	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}
		var prop,
			index = 0,
			length = props.length;
		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},
	prefilters: [ defaultPrefilter ],
	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );
jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};
	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;
	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];
			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}
	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}
	// Queueing
	opt.old = opt.complete;
	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}
		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};
	return opt;
};
jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {
		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()
			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );
				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;
		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};
		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}
		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );
			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}
			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;
			// Enable finishing flag on private data
			data.finish = true;
			// Empty the queue first
			jQuery.queue( this, type, [] );
			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}
			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}
			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}
			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );
jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );
// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );
jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;
	fxNow = jQuery.now();
	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}
	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};
jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};
jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}
	inProgress = true;
	schedule();
};
jQuery.fx.stop = function() {
	inProgress = null;
};
jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};
// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";
	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};
( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );
	input.type = "checkbox";
	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";
	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;
	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();
var boolHook,
	attrHandle = jQuery.expr.attrHandle;
jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},
	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );
jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;
		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}
		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}
		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}
		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}
			elem.setAttribute( name, value + "" );
			return value;
		}
		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}
		ret = jQuery.find.attr( elem, name );
		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},
	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},
	removeAttr: function( elem, value ) {
		var name,
			i = 0,
			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );
		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );
// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;
	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );
var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;
jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},
	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );
jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;
		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}
		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}
			return ( elem[ name ] = value );
		}
		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}
		return elem[ name ];
	},
	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );
				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}
				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}
				return -1;
			}
		}
	},
	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );
// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			/* eslint no-unused-expressions: "off" */
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {
			/* eslint no-unused-expressions: "off" */
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}
jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );
	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}
function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}
jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;
		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}
		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );
				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}
					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}
		return this;
	},
	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;
		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}
		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}
		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );
				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}
					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}
		return this;
	},
	toggleClass: function( value, stateVal ) {
		var type = typeof value;
		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}
		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}
		return this.each( function() {
			var className, i, self, classNames;
			if ( type === "string" ) {
				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];
				while ( ( className = classNames[ i++ ] ) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}
			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {
					// Store className if set
					dataPriv.set( this, "__className__", className );
				}
				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},
	hasClass: function( selector ) {
		var className, elem,
			i = 0;
		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}
		return false;
	}
} );
var rreturn = /\r/g;
jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];
		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];
				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}
				ret = elem.value;
				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}
				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}
			return;
		}
		isFunction = jQuery.isFunction( value );
		return this.each( function( i ) {
			var val;
			if ( this.nodeType !== 1 ) {
				return;
			}
			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}
			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}
			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];
			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );
jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;
				if ( index < 0 ) {
					i = max;
				} else {
					i = one ? index : 0;
				}
				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];
					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {
						// Get the specific value for the option
						value = jQuery( option ).val();
						// We don't need an array for one selects
						if ( one ) {
							return value;
						}
						// Multi-Selects return an array
						values.push( value );
					}
				}
				return values;
			},
			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;
				while ( i-- ) {
					option = options[ i ];
					/* eslint-disable no-cond-assign */
					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}
					/* eslint-enable no-cond-assign */
				}
				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );
// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );
// Return jQuery for attributes-only inclusion
var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
jQuery.extend( jQuery.event, {
	trigger: function( event, data, elem, onlyHandlers ) {
		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];
		cur = tmp = elem = elem || document;
		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}
		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}
		if ( type.indexOf( "." ) > -1 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;
		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );
		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;
		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}
		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );
		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}
		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {
			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}
			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}
		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;
			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}
			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;
		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {
			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {
				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {
					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];
					if ( tmp ) {
						elem[ ontype ] = null;
					}
					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;
					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}
		return event.result;
	},
	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);
		jQuery.event.trigger( e, null, elem );
	}
} );
jQuery.fn.extend( {
	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );
jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {
	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );
jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );
support.focusin = "onfocusin" in window;
// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {
		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};
		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );
				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;
				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );
				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;
var nonce = jQuery.now();
var rquery = ( /\?/ );
// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};
var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;
function buildParams( prefix, obj, traditional, add ) {
	var name;
	if ( Array.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );
			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );
	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}
	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {
			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;
			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};
	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );
	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}
	// Return the resulting serialization
	return s.join( "&" );
};
jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;
			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();
			if ( val == null ) {
				return null;
			}
			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}
			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );
var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},
	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},
	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),
	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;
// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {
	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {
		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}
		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];
		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {
				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );
				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}
// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {
	var inspected = {},
		seekingTransport = ( structure === transports );
	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}
	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}
// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};
	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}
	return target;
}
/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;
	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}
	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}
	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}
	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}
/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();
	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}
	current = dataTypes.shift();
	// Convert to each sequential dataType
	while ( current ) {
		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}
		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}
		prev = current;
		current = dataTypes.shift();
		if ( current ) {
			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {
				current = prev;
			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {
				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];
				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {
						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {
							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];
								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}
				// Apply converter (if not an equivalence)
				if ( conv !== true ) {
					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}
	return { state: "success", data: response };
}
jQuery.extend( {
	// Counter for holding the number of active queries
	active: 0,
	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},
	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/
		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},
		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},
		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},
		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {
			// Convert anything to text
			"* text": String,
			// Text to html (true = no transformation)
			"text html": true,
			// Evaluate text as a json expression
			"text json": JSON.parse,
			// Parse text as xml
			"text xml": jQuery.parseXML
		},
		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},
	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?
			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :
			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},
	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),
	// Main method
	ajax: function( url, options ) {
		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}
		// Force options to be an object
		options = options || {};
		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Url cleanup var
			urlAnchor,
			// Request state (becomes false upon send and true upon completion)
			completed,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// uncached part of the url
			uncached,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,
				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},
				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},
				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},
				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},
				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {
							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},
				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};
		// Attach deferreds
		deferred.promise( jqXHR );
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );
		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;
		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];
		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );
			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;
				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {
				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}
		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}
		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );
		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}
		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;
		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}
		// Uppercase the type
		s.type = s.type.toUpperCase();
		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );
		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );
		// More options handling for requests with no content
		if ( !s.hasContent ) {
			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );
			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}
			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}
			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;
		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}
		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}
		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}
		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);
		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}
		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}
		// Aborting is no longer a cancellation
		strAbort = "abort";
		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );
		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );
		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;
			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}
			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}
				// Propagate others as results
				done( -1, e );
			}
		}
		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;
			// Ignore repeat invocations
			if ( completed ) {
				return;
			}
			completed = true;
			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}
			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;
			// Cache response headers
			responseHeadersString = headers || "";
			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;
			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;
			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}
			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );
			// If successful, handle type chaining
			if ( isSuccess ) {
				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}
				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";
				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";
				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}
			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";
			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}
			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;
			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}
			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}
		return jqXHR;
	},
	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},
	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );
jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}
		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );
jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,
		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};
jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;
		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}
			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );
			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}
			wrap.map( function() {
				var elem = this;
				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}
				return elem;
			} ).append( this );
		}
		return this;
	},
	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}
		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();
			if ( contents.length ) {
				contents.wrapAll( html );
			} else {
				self.append( html );
			}
		} );
	},
	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );
		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},
	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );
jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};
jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};
var xhrSuccessStatus = {
		// File protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;
jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;
	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();
				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);
				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}
				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}
				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}
				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}
				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;
							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(
										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};
				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );
				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {
						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {
							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}
				// Create the abort callback
				callback = callback( "abort" );
				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );
// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );
// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );
// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );
// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );
var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;
// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );
// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {
	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);
	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {
		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;
		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}
		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};
		// Force json dataType
		s.dataTypes[ 0 ] = "json";
		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};
		// Clean-up function (fires after converters)
		jqXHR.always( function() {
			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );
			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}
			// Save back as free
			if ( s[ callbackName ] ) {
				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;
				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}
			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}
			responseContainer = overwritten = undefined;
		} );
		// Delegate to script
		return "script";
	}
} );
// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();
// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	var base, parsed, scripts;
	if ( !context ) {
		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );
			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}
	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];
	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}
	parsed = buildFragment( [ data ], context, scripts );
	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}
	return jQuery.merge( [], parsed.childNodes );
};
/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );
	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}
	// If it's a function
	if ( jQuery.isFunction( params ) ) {
		// We assume that it's the callback
		callback = params;
		params = undefined;
	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}
	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,
			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {
			// Save response for use in complete callback
			response = arguments;
			self.html( selector ?
				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :
				// Otherwise use the full result
				responseText );
		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}
	return this;
};
// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );
jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};
jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};
		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}
		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;
		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}
		if ( jQuery.isFunction( options ) ) {
			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}
		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}
		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};
jQuery.fn.extend( {
	offset: function( options ) {
		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}
		var doc, docElem, rect, win,
			elem = this[ 0 ];
		if ( !elem ) {
			return;
		}
		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}
		rect = elem.getBoundingClientRect();
		doc = elem.ownerDocument;
		docElem = doc.documentElement;
		win = doc.defaultView;
		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		};
	},
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}
		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };
		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();
			// Get correct offsets
			offset = this.offset();
			if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}
			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}
		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},
	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;
			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );
// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;
	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			// Coalesce documents and windows
			var win;
			if ( jQuery.isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}
			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}
			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);
			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );
// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );
			return access( this, function( elem, type, value ) {
				var doc;
				if ( jQuery.isWindow( elem ) ) {
					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}
				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;
					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}
				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :
					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );
jQuery.fn.extend( {
	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},
	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );
jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.
// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}
var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,
	// Map over the $ in case of overwrite
	_$ = window.$;
jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}
	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}
	return jQuery;
};
// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}
return jQuery;
} );
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/
 Version: 1.8.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues
 */
/* global window, document, define, jQuery, setInterval, clearInterval */
;(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($) {
    'use strict';
    var Slick = window.Slick || {};
    Slick = (function() {
        var instanceUid = 0;
        function Slick(element, settings) {
            var _ = this, dataSettings;
            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return $('<button type="button" />').text(i + 1);
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                focusOnChange: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };
            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: false,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                swiping: false,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };
            $.extend(_, _.initials);
            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = 'hidden';
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;
            dataSettings = $(element).data('slick') || {};
            _.options = $.extend({}, _.defaults, settings, dataSettings);
            _.currentSlide = _.options.initialSlide;
            _.originalSettings = _.options;
            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }
            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);
            _.instanceUid = instanceUid++;
            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
            _.registerBreakpoints();
            _.init(true);
        }
        return Slick;
    }());
    Slick.prototype.activateADA = function() {
        var _ = this;
        _.$slideTrack.find('.slick-active').attr({
            'aria-hidden': 'false'
        }).find('a, input, button, select').attr({
            'tabindex': '0'
        });
    };
    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {
        var _ = this;
        if (typeof(index) === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || (index >= _.slideCount)) {
            return false;
        }
        _.unload();
        if (typeof(index) === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }
        _.$slides = _.$slideTrack.children(this.options.slide);
        _.$slideTrack.children(this.options.slide).detach();
        _.$slideTrack.append(_.$slides);
        _.$slides.each(function(index, element) {
            $(element).attr('data-slick-index', index);
        });
        _.$slidesCache = _.$slides;
        _.reinit();
    };
    Slick.prototype.animateHeight = function() {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    };
    Slick.prototype.animateSlide = function(targetLeft, callback) {
        var animProps = {},
            _ = this;
        _.animateHeight();
        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }
        } else {
            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -(_.currentLeft);
                }
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function(now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' +
                                now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' +
                                now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });
            } else {
                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);
                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);
                if (callback) {
                    setTimeout(function() {
                        _.disableTransition();
                        callback.call();
                    }, _.options.speed);
                }
            }
        }
    };
    Slick.prototype.getNavTarget = function() {
        var _ = this,
            asNavFor = _.options.asNavFor;
        if ( asNavFor && asNavFor !== null ) {
            asNavFor = $(asNavFor).not(_.$slider);
        }
        return asNavFor;
    };
    Slick.prototype.asNavFor = function(index) {
        var _ = this,
            asNavFor = _.getNavTarget();
        if ( asNavFor !== null && typeof asNavFor === 'object' ) {
            asNavFor.each(function() {
                var target = $(this).slick('getSlick');
                if(!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }
    };
    Slick.prototype.applyTransition = function(slide) {
        var _ = this,
            transition = {};
        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }
        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }
    };
    Slick.prototype.autoPlay = function() {
        var _ = this;
        _.autoPlayClear();
        if ( _.slideCount > _.options.slidesToShow ) {
            _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
        }
    };
    Slick.prototype.autoPlayClear = function() {
        var _ = this;
        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }
    };
    Slick.prototype.autoPlayIterator = function() {
        var _ = this,
            slideTo = _.currentSlide + _.options.slidesToScroll;
        if ( !_.paused && !_.interrupted && !_.focussed ) {
            if ( _.options.infinite === false ) {
                if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {
                    _.direction = 0;
                }
                else if ( _.direction === 0 ) {
                    slideTo = _.currentSlide - _.options.slidesToScroll;
                    if ( _.currentSlide - 1 === 0 ) {
                        _.direction = 1;
                    }
                }
            }
            _.slideHandler( slideTo );
        }
    };
    Slick.prototype.buildArrows = function() {
        var _ = this;
        if (_.options.arrows === true ) {
            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');
            if( _.slideCount > _.options.slidesToShow ) {
                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows);
                }
                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows);
                }
                if (_.options.infinite !== true) {
                    _.$prevArrow
                        .addClass('slick-disabled')
                        .attr('aria-disabled', 'true');
                }
            } else {
                _.$prevArrow.add( _.$nextArrow )
                    .addClass('slick-hidden')
                    .attr({
                        'aria-disabled': 'true',
                        'tabindex': '-1'
                    });
            }
        }
    };
    Slick.prototype.buildDots = function() {
        var _ = this,
            i, dot;
        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            _.$slider.addClass('slick-dotted');
            dot = $('<ul />').addClass(_.options.dotsClass);
            for (i = 0; i <= _.getDotCount(); i += 1) {
                dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
            }
            _.$dots = dot.appendTo(_.options.appendDots);
            _.$dots.find('li').first().addClass('slick-active');
        }
    };
    Slick.prototype.buildOut = function() {
        var _ = this;
        _.$slides =
            _.$slider
                .children( _.options.slide + ':not(.slick-cloned)')
                .addClass('slick-slide');
        _.slideCount = _.$slides.length;
        _.$slides.each(function(index, element) {
            $(element)
                .attr('data-slick-index', index)
                .data('originalStyling', $(element).attr('style') || '');
        });
        _.$slider.addClass('slick-slider');
        _.$slideTrack = (_.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(_.$slider) :
            _.$slides.wrapAll('<div class="slick-track"/>').parent();
        _.$list = _.$slideTrack.wrap(
            '<div class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);
        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }
        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');
        _.setupInfinite();
        _.buildArrows();
        _.buildDots();
        _.updateDots();
        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);
        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }
    };
    Slick.prototype.buildRows = function() {
        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;
        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();
        if(_.options.rows > 0) {
            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(
                originalSlides.length / slidesPerSection
            );
            for(a = 0; a < numOfSlides; a++){
                var slide = document.createElement('div');
                for(b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for(c = 0; c < _.options.slidesPerRow; c++) {
                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }
            _.$slider.empty().append(newSlides);
            _.$slider.children().children().children()
                .css({
                    'width':(100 / _.options.slidesPerRow) + '%',
                    'display': 'inline-block'
                });
        }
    };
    Slick.prototype.checkResponsive = function(initial, forceUpdate) {
        var _ = this,
            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();
        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }
        if ( _.options.responsive &&
            _.options.responsive.length &&
            _.options.responsive !== null) {
            targetBreakpoint = null;
            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }
            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings,
                                _.breakpointSettings[
                                    targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings,
                            _.breakpointSettings[
                                targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }
            // only trigger breakpoints during an actual break. not on initialize.
            if( !initial && triggerBreakpoint !== false ) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }
    };
    Slick.prototype.changeSlide = function(event, dontAnimate) {
        var _ = this,
            $target = $(event.currentTarget),
            indexOffset, slideOffset, unevenOffset;
        // If target is a link, prevent default action.
        if($target.is('a')) {
            event.preventDefault();
        }
        // If target is not the <li> element (ie: a child), find the <li>.
        if(!$target.is('li')) {
            $target = $target.closest('li');
        }
        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;
        switch (event.data.message) {
            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;
            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;
            case 'index':
                var index = event.data.index === 0 ? 0 :
                    event.data.index || $target.index() * _.options.slidesToScroll;
                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;
            default:
                return;
        }
    };
    Slick.prototype.checkNavigable = function(index) {
        var _ = this,
            navigables, prevNavigable;
        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }
        return index;
    };
    Slick.prototype.cleanUpEvents = function() {
        var _ = this;
        if (_.options.dots && _.$dots !== null) {
            $('li', _.$dots)
                .off('click.slick', _.changeSlide)
                .off('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .off('mouseleave.slick', $.proxy(_.interrupt, _, false));
            if (_.options.accessibility === true) {
                _.$dots.off('keydown.slick', _.keyHandler);
            }
        }
        _.$slider.off('focus.slick blur.slick');
        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);
            if (_.options.accessibility === true) {
                _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
                _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
            }
        }
        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);
        _.$list.off('click.slick', _.clickHandler);
        $(document).off(_.visibilityChange, _.visibility);
        _.cleanUpSlideEvents();
        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', _.keyHandler);
        }
        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
        }
        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);
        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);
        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);
        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
    };
    Slick.prototype.cleanUpSlideEvents = function() {
        var _ = this;
        _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
        _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));
    };
    Slick.prototype.cleanUpRows = function() {
        var _ = this, originalSlides;
        if(_.options.rows > 0) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.empty().append(originalSlides);
        }
    };
    Slick.prototype.clickHandler = function(event) {
        var _ = this;
        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }
    };
    Slick.prototype.destroy = function(refresh) {
        var _ = this;
        _.autoPlayClear();
        _.touchObject = {};
        _.cleanUpEvents();
        $('.slick-cloned', _.$slider).detach();
        if (_.$dots) {
            _.$dots.remove();
        }
        if ( _.$prevArrow && _.$prevArrow.length ) {
            _.$prevArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');
            if ( _.htmlExpr.test( _.options.prevArrow )) {
                _.$prevArrow.remove();
            }
        }
        if ( _.$nextArrow && _.$nextArrow.length ) {
            _.$nextArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');
            if ( _.htmlExpr.test( _.options.nextArrow )) {
                _.$nextArrow.remove();
            }
        }
        if (_.$slides) {
            _.$slides
                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
                .removeAttr('aria-hidden')
                .removeAttr('data-slick-index')
                .each(function(){
                    $(this).attr('style', $(this).data('originalStyling'));
                });
            _.$slideTrack.children(this.options.slide).detach();
            _.$slideTrack.detach();
            _.$list.detach();
            _.$slider.append(_.$slides);
        }
        _.cleanUpRows();
        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');
        _.$slider.removeClass('slick-dotted');
        _.unslicked = true;
        if(!refresh) {
            _.$slider.trigger('destroy', [_]);
        }
    };
    Slick.prototype.disableTransition = function(slide) {
        var _ = this,
            transition = {};
        transition[_.transitionType] = '';
        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }
    };
    Slick.prototype.fadeSlide = function(slideIndex, callback) {
        var _ = this;
        if (_.cssTransitions === false) {
            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });
            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);
        } else {
            _.applyTransition(slideIndex);
            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });
            if (callback) {
                setTimeout(function() {
                    _.disableTransition(slideIndex);
                    callback.call();
                }, _.options.speed);
            }
        }
    };
    Slick.prototype.fadeSlideOut = function(slideIndex) {
        var _ = this;
        if (_.cssTransitions === false) {
            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing);
        } else {
            _.applyTransition(slideIndex);
            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });
        }
    };
    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {
        var _ = this;
        if (filter !== null) {
            _.$slidesCache = _.$slides;
            _.unload();
            _.$slideTrack.children(this.options.slide).detach();
            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);
            _.reinit();
        }
    };
    Slick.prototype.focusHandler = function() {
        var _ = this;
        _.$slider
            .off('focus.slick blur.slick')
            .on('focus.slick blur.slick', '*', function(event) {
            event.stopImmediatePropagation();
            var $sf = $(this);
            setTimeout(function() {
                if( _.options.pauseOnFocus ) {
                    _.focussed = $sf.is(':focus');
                    _.autoPlay();
                }
            }, 0);
        });
    };
    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {
        var _ = this;
        return _.currentSlide;
    };
    Slick.prototype.getDotCount = function() {
        var _ = this;
        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;
        if (_.options.infinite === true) {
            if (_.slideCount <= _.options.slidesToShow) {
                 ++pagerQty;
            } else {
                while (breakPoint < _.slideCount) {
                    ++pagerQty;
                    breakPoint = counter + _.options.slidesToScroll;
                    counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
                }
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else if(!_.options.asNavFor) {
            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        }else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        }
        return pagerQty - 1;
    };
    Slick.prototype.getLeft = function(slideIndex) {
        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide,
            coef;
        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);
        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                coef = -1
                if (_.options.vertical === true && _.options.centerMode === true) {
                    if (_.options.slidesToShow === 2) {
                        coef = -1.5;
                    } else if (_.options.slidesToShow === 1) {
                        coef = -2
                    }
                }
                verticalOffset = (verticalHeight * _.options.slidesToShow) * coef;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                    } else {
                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
            }
        }
        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }
        if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
            _.slideOffset = ((_.slideWidth * Math.floor(_.options.slidesToShow)) / 2) - ((_.slideWidth * _.slideCount) / 2);
        } else if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }
        if (_.options.vertical === false) {
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        } else {
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        }
        if (_.options.variableWidth === true) {
            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }
            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft =  0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }
            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }
                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft =  0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }
                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }
        return targetLeft;
    };
    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {
        var _ = this;
        return _.options[option];
    };
    Slick.prototype.getNavigableIndexes = function() {
        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;
        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }
        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }
        return indexes;
    };
    Slick.prototype.getSlick = function() {
        return this;
    };
    Slick.prototype.getSlideCount = function() {
        var _ = this,
            slidesTraversed, swipedSlide, centerOffset;
        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;
        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find('.slick-slide').each(function(index, slide) {
                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
                    swipedSlide = slide;
                    return false;
                }
            });
            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;
            return slidesTraversed;
        } else {
            return _.options.slidesToScroll;
        }
    };
    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {
        var _ = this;
        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate);
    };
    Slick.prototype.init = function(creation) {
        var _ = this;
        if (!$(_.$slider).hasClass('slick-initialized')) {
            $(_.$slider).addClass('slick-initialized');
            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(true);
            _.focusHandler();
        }
        if (creation) {
            _.$slider.trigger('init', [_]);
        }
        if (_.options.accessibility === true) {
            _.initADA();
        }
        if ( _.options.autoplay ) {
            _.paused = false;
            _.autoPlay();
        }
    };
    Slick.prototype.initADA = function() {
        var _ = this,
                numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
                tabControlIndexes = _.getNavigableIndexes().filter(function(val) {
                    return (val >= 0) && (val < _.slideCount);
                });
        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
            'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });
        if (_.$dots !== null) {
            _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
                var slideControlIndex = tabControlIndexes.indexOf(i);
                $(this).attr({
                    'role': 'tabpanel',
                    'id': 'slick-slide' + _.instanceUid + i,
                    'tabindex': -1
                });
                if (slideControlIndex !== -1) {
                   var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex
                   if ($('#' + ariaButtonControl).length) {
                     $(this).attr({
                         'aria-describedby': ariaButtonControl
                     });
                   }
                }
            });
            _.$dots.attr('role', 'tablist').find('li').each(function(i) {
                var mappedSlideIndex = tabControlIndexes[i];
                $(this).attr({
                    'role': 'presentation'
                });
                $(this).find('button').first().attr({
                    'role': 'tab',
                    'id': 'slick-slide-control' + _.instanceUid + i,
                    'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
                    'aria-label': (i + 1) + ' of ' + numDotGroups,
                    'aria-selected': null,
                    'tabindex': '-1'
                });
            }).eq(_.currentSlide).find('button').attr({
                'aria-selected': 'true',
                'tabindex': '0'
            }).end();
        }
        for (var i=_.currentSlide, max=i+_.options.slidesToShow; i < max; i++) {
          if (_.options.focusOnChange) {
            _.$slides.eq(i).attr({'tabindex': '0'});
          } else {
            _.$slides.eq(i).removeAttr('tabindex');
          }
        }
        _.activateADA();
    };
    Slick.prototype.initArrowEvents = function() {
        var _ = this;
        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'previous'
               }, _.changeSlide);
            _.$nextArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'next'
               }, _.changeSlide);
            if (_.options.accessibility === true) {
                _.$prevArrow.on('keydown.slick', _.keyHandler);
                _.$nextArrow.on('keydown.slick', _.keyHandler);
            }
        }
    };
    Slick.prototype.initDotEvents = function() {
        var _ = this;
        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);
            if (_.options.accessibility === true) {
                _.$dots.on('keydown.slick', _.keyHandler);
            }
        }
        if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots)
                .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .on('mouseleave.slick', $.proxy(_.interrupt, _, false));
        }
    };
    Slick.prototype.initSlideEvents = function() {
        var _ = this;
        if ( _.options.pauseOnHover ) {
            _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
            _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));
        }
    };
    Slick.prototype.initializeEvents = function() {
        var _ = this;
        _.initArrowEvents();
        _.initDotEvents();
        _.initSlideEvents();
        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('click.slick', _.clickHandler);
        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));
        if (_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }
        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }
        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));
        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));
        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);
        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(_.setPosition);
    };
    Slick.prototype.initUI = function() {
        var _ = this;
        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow.show();
            _.$nextArrow.show();
        }
        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            _.$dots.show();
        }
    };
    Slick.prototype.keyHandler = function(event) {
        var _ = this;
         //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'next' :  'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'previous' : 'next'
                    }
                });
            }
        }
    };
    Slick.prototype.lazyLoad = function() {
        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;
        function loadImages(imagesScope) {
            $('img[data-lazy]', imagesScope).each(function() {
                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageSrcSet = $(this).attr('data-srcset'),
                    imageSizes  = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
                    imageToLoad = document.createElement('img');
                imageToLoad.onload = function() {
                    image
                        .animate({ opacity: 0 }, 100, function() {
                            if (imageSrcSet) {
                                image
                                    .attr('srcset', imageSrcSet );
                                if (imageSizes) {
                                    image
                                        .attr('sizes', imageSizes );
                                }
                            }
                            image
                                .attr('src', imageSource)
                                .animate({ opacity: 1 }, 200, function() {
                                    image
                                        .removeAttr('data-lazy data-srcset data-sizes')
                                        .removeClass('slick-loading');
                                });
                            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                        });
                };
                imageToLoad.onerror = function() {
                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );
                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);
                };
                imageToLoad.src = imageSource;
            });
        }
        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }
        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);
        if (_.options.lazyLoad === 'anticipated') {
            var prevSlide = rangeStart - 1,
                nextSlide = rangeEnd,
                $slides = _.$slider.find('.slick-slide');
            for (var i = 0; i < _.options.slidesToScroll; i++) {
                if (prevSlide < 0) prevSlide = _.slideCount - 1;
                loadRange = loadRange.add($slides.eq(prevSlide));
                loadRange = loadRange.add($slides.eq(nextSlide));
                prevSlide--;
                nextSlide++;
            }
        }
        loadImages(loadRange);
        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange);
        } else
        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }
    };
    Slick.prototype.loadSlider = function() {
        var _ = this;
        _.setPosition();
        _.$slideTrack.css({
            opacity: 1
        });
        _.$slider.removeClass('slick-loading');
        _.initUI();
        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }
    };
    Slick.prototype.next = Slick.prototype.slickNext = function() {
        var _ = this;
        _.changeSlide({
            data: {
                message: 'next'
            }
        });
    };
    Slick.prototype.orientationChange = function() {
        var _ = this;
        _.checkResponsive();
        _.setPosition();
    };
    Slick.prototype.pause = Slick.prototype.slickPause = function() {
        var _ = this;
        _.autoPlayClear();
        _.paused = true;
    };
    Slick.prototype.play = Slick.prototype.slickPlay = function() {
        var _ = this;
        _.autoPlay();
        _.options.autoplay = true;
        _.paused = false;
        _.focussed = false;
        _.interrupted = false;
    };
    Slick.prototype.postSlide = function(index) {
        var _ = this;
        if( !_.unslicked ) {
            _.$slider.trigger('afterChange', [_, index]);
            _.animating = false;
            if (_.slideCount > _.options.slidesToShow) {
                _.setPosition();
            }
            _.swipeLeft = null;
            if ( _.options.autoplay ) {
                _.autoPlay();
            }
            if (_.options.accessibility === true) {
                _.initADA();
                if (_.options.focusOnChange) {
                    var $currentSlide = $(_.$slides.get(_.currentSlide));
                    $currentSlide.attr('tabindex', 0).focus();
                }
            }
        }
    };
    Slick.prototype.prev = Slick.prototype.slickPrev = function() {
        var _ = this;
        _.changeSlide({
            data: {
                message: 'previous'
            }
        });
    };
    Slick.prototype.preventDefault = function(event) {
        event.preventDefault();
    };
    Slick.prototype.progressiveLazyLoad = function( tryCount ) {
        tryCount = tryCount || 1;
        var _ = this,
            $imgsToLoad = $( 'img[data-lazy]', _.$slider ),
            image,
            imageSource,
            imageSrcSet,
            imageSizes,
            imageToLoad;
        if ( $imgsToLoad.length ) {
            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageSrcSet = image.attr('data-srcset');
            imageSizes  = image.attr('data-sizes') || _.$slider.attr('data-sizes');
            imageToLoad = document.createElement('img');
            imageToLoad.onload = function() {
                if (imageSrcSet) {
                    image
                        .attr('srcset', imageSrcSet );
                    if (imageSizes) {
                        image
                            .attr('sizes', imageSizes );
                    }
                }
                image
                    .attr( 'src', imageSource )
                    .removeAttr('data-lazy data-srcset data-sizes')
                    .removeClass('slick-loading');
                if ( _.options.adaptiveHeight === true ) {
                    _.setPosition();
                }
                _.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
                _.progressiveLazyLoad();
            };
            imageToLoad.onerror = function() {
                if ( tryCount < 3 ) {
                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                    setTimeout( function() {
                        _.progressiveLazyLoad( tryCount + 1 );
                    }, 500 );
                } else {
                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );
                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);
                    _.progressiveLazyLoad();
                }
            };
            imageToLoad.src = imageSource;
        } else {
            _.$slider.trigger('allImagesLoaded', [ _ ]);
        }
    };
    Slick.prototype.refresh = function( initializing ) {
        var _ = this, currentSlide, lastVisibleIndex;
        lastVisibleIndex = _.slideCount - _.options.slidesToShow;
        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {
            _.currentSlide = lastVisibleIndex;
        }
        // if less slides than to show, go to start.
        if ( _.slideCount <= _.options.slidesToShow ) {
            _.currentSlide = 0;
        }
        currentSlide = _.currentSlide;
        _.destroy(true);
        $.extend(_, _.initials, { currentSlide: currentSlide });
        _.init();
        if( !initializing ) {
            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, false);
        }
    };
    Slick.prototype.registerBreakpoints = function() {
        var _ = this, breakpoint, currentBreakpoint, l,
            responsiveSettings = _.options.responsive || null;
        if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {
            _.respondTo = _.options.respondTo || 'window';
            for ( breakpoint in responsiveSettings ) {
                l = _.breakpoints.length-1;
                if (responsiveSettings.hasOwnProperty(breakpoint)) {
                    currentBreakpoint = responsiveSettings[breakpoint].breakpoint;
                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while( l >= 0 ) {
                        if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                            _.breakpoints.splice(l,1);
                        }
                        l--;
                    }
                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;
                }
            }
            _.breakpoints.sort(function(a, b) {
                return ( _.options.mobileFirst ) ? a-b : b-a;
            });
        }
    };
    Slick.prototype.reinit = function() {
        var _ = this;
        _.$slides =
            _.$slideTrack
                .children(_.options.slide)
                .addClass('slick-slide');
        _.slideCount = _.$slides.length;
        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }
        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }
        _.registerBreakpoints();
        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();
        _.cleanUpSlideEvents();
        _.initSlideEvents();
        _.checkResponsive(false, true);
        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }
        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);
        _.setPosition();
        _.focusHandler();
        _.paused = !_.options.autoplay;
        _.autoPlay();
        _.$slider.trigger('reInit', [_]);
    };
    Slick.prototype.resize = function() {
        var _ = this;
        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function() {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if( !_.unslicked ) { _.setPosition(); }
            }, 50);
        }
    };
    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {
        var _ = this;
        if (typeof(index) === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }
        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }
        _.unload();
        if (removeAll === true) {
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }
        _.$slides = _.$slideTrack.children(this.options.slide);
        _.$slideTrack.children(this.options.slide).detach();
        _.$slideTrack.append(_.$slides);
        _.$slidesCache = _.$slides;
        _.reinit();
    };
    Slick.prototype.setCSS = function(position) {
        var _ = this,
            positionProps = {},
            x, y;
        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';
        positionProps[_.positionProp] = position;
        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }
    };
    Slick.prototype.setDimensions = function() {
        var _ = this;
        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: ('0px ' + _.options.centerPadding)
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: (_.options.centerPadding + ' 0px')
                });
            }
        }
        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();
        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));
        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
        }
        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);
    };
    Slick.prototype.setFade = function() {
        var _ = this,
            targetLeft;
        _.$slides.each(function(index, element) {
            targetLeft = (_.slideWidth * index) * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });
        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });
    };
    Slick.prototype.setHeight = function() {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }
    };
    Slick.prototype.setOption =
    Slick.prototype.slickSetOption = function() {
        /**
         * accepts arguments in format of:
         *
         *  - for changing a single option's value:
         *     .slick("setOption", option, value, refresh )
         *
         *  - for changing a set of responsive options:
         *     .slick("setOption", 'responsive', [{}, ...], refresh )
         *
         *  - for updating multiple values at once (not responsive)
         *     .slick("setOption", { 'option': value, ... }, refresh )
         */
        var _ = this, l, item, option, value, refresh = false, type;
        if( $.type( arguments[0] ) === 'object' ) {
            option =  arguments[0];
            refresh = arguments[1];
            type = 'multiple';
        } else if ( $.type( arguments[0] ) === 'string' ) {
            option =  arguments[0];
            value = arguments[1];
            refresh = arguments[2];
            if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {
                type = 'responsive';
            } else if ( typeof arguments[1] !== 'undefined' ) {
                type = 'single';
            }
        }
        if ( type === 'single' ) {
            _.options[option] = value;
        } else if ( type === 'multiple' ) {
            $.each( option , function( opt, val ) {
                _.options[opt] = val;
            });
        } else if ( type === 'responsive' ) {
            for ( item in value ) {
                if( $.type( _.options.responsive ) !== 'array' ) {
                    _.options.responsive = [ value[item] ];
                } else {
                    l = _.options.responsive.length-1;
                    // loop through the responsive object and splice out duplicates.
                    while( l >= 0 ) {
                        if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {
                            _.options.responsive.splice(l,1);
                        }
                        l--;
                    }
                    _.options.responsive.push( value[item] );
                }
            }
        }
        if ( refresh ) {
            _.unload();
            _.reinit();
        }
    };
    Slick.prototype.setPosition = function() {
        var _ = this;
        _.setDimensions();
        _.setHeight();
        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }
        _.$slider.trigger('setPosition', [_]);
    };
    Slick.prototype.setProps = function() {
        var _ = this,
            bodyStyle = document.body.style;
        _.positionProp = _.options.vertical === true ? 'top' : 'left';
        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }
        if (bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }
        if ( _.options.fade ) {
            if ( typeof _.options.zIndex === 'number' ) {
                if( _.options.zIndex < 3 ) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }
        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
    };
    Slick.prototype.setSlideClasses = function(index) {
        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;
        allSlides = _.$slider
            .find('.slick-slide')
            .removeClass('slick-active slick-center slick-current')
            .attr('aria-hidden', 'true');
        _.$slides
            .eq(index)
            .addClass('slick-current');
        if (_.options.centerMode === true) {
            var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;
            centerOffset = Math.floor(_.options.slidesToShow / 2);
            if (_.options.infinite === true) {
                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {
                    _.$slides
                        .slice(index - centerOffset + evenCoef, index + centerOffset + 1)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');
                } else {
                    indexOffset = _.options.slidesToShow + index;
                    allSlides
                        .slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');
                }
                if (index === 0) {
                    allSlides
                        .eq(allSlides.length - 1 - _.options.slidesToShow)
                        .addClass('slick-center');
                } else if (index === _.slideCount - 1) {
                    allSlides
                        .eq(_.options.slidesToShow)
                        .addClass('slick-center');
                }
            }
            _.$slides
                .eq(index)
                .addClass('slick-center');
        } else {
            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {
                _.$slides
                    .slice(index, index + _.options.slidesToShow)
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');
            } else if (allSlides.length <= _.options.slidesToShow) {
                allSlides
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');
            } else {
                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;
                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {
                    allSlides
                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');
                } else {
                    allSlides
                        .slice(indexOffset, indexOffset + _.options.slidesToShow)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');
                }
            }
        }
        if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
            _.lazyLoad();
        }
    };
    Slick.prototype.setupInfinite = function() {
        var _ = this,
            i, slideIndex, infiniteCount;
        if (_.options.fade === true) {
            _.options.centerMode = false;
        }
        if (_.options.infinite === true && _.options.fade === false) {
            slideIndex = null;
            if (_.slideCount > _.options.slidesToShow) {
                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }
                for (i = _.slideCount; i > (_.slideCount -
                        infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex - _.slideCount)
                        .prependTo(_.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount  + _.slideCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex + _.slideCount)
                        .appendTo(_.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                    $(this).attr('id', '');
                });
            }
        }
    };
    Slick.prototype.interrupt = function( toggle ) {
        var _ = this;
        if( !toggle ) {
            _.autoPlay();
        }
        _.interrupted = toggle;
    };
    Slick.prototype.selectHandler = function(event) {
        var _ = this;
        var targetElement =
            $(event.target).is('.slick-slide') ?
                $(event.target) :
                $(event.target).parents('.slick-slide');
        var index = parseInt(targetElement.attr('data-slick-index'));
        if (!index) index = 0;
        if (_.slideCount <= _.options.slidesToShow) {
            _.slideHandler(index, false, true);
            return;
        }
        _.slideHandler(index);
    };
    Slick.prototype.slideHandler = function(index, sync, dontAnimate) {
        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
            _ = this, navTarget;
        sync = sync || false;
        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }
        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }
        if (sync === false) {
            _.asNavFor(index);
        }
        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);
        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;
        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }
        if ( _.options.autoplay ) {
            clearInterval(_.autoPlayTimer);
        }
        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }
        _.animating = true;
        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);
        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;
        _.setSlideClasses(_.currentSlide);
        if ( _.options.asNavFor ) {
            navTarget = _.getNavTarget();
            navTarget = navTarget.slick('getSlick');
            if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {
                navTarget.setSlideClasses(_.currentSlide);
            }
        }
        _.updateDots();
        _.updateArrows();
        if (_.options.fade === true) {
            if (dontAnimate !== true) {
                _.fadeSlideOut(oldSlide);
                _.fadeSlide(animSlide, function() {
                    _.postSlide(animSlide);
                });
            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }
        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
            _.animateSlide(targetLeft, function() {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }
    };
    Slick.prototype.startLoad = function() {
        var _ = this;
        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow.hide();
            _.$nextArrow.hide();
        }
        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            _.$dots.hide();
        }
        _.$slider.addClass('slick-loading');
    };
    Slick.prototype.swipeDirection = function() {
        var xDist, yDist, r, swipeAngle, _ = this;
        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);
        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }
        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return (_.options.rtl === false ? 'right' : 'left');
        }
        if (_.options.verticalSwiping === true) {
            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                return 'down';
            } else {
                return 'up';
            }
        }
        return 'vertical';
    };
    Slick.prototype.swipeEnd = function(event) {
        var _ = this,
            slideCount,
            direction;
        _.dragging = false;
        _.swiping = false;
        if (_.scrolling) {
            _.scrolling = false;
            return false;
        }
        _.interrupted = false;
        _.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;
        if ( _.touchObject.curX === undefined ) {
            return false;
        }
        if ( _.touchObject.edgeHit === true ) {
            _.$slider.trigger('edge', [_, _.swipeDirection() ]);
        }
        if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {
            direction = _.swipeDirection();
            switch ( direction ) {
                case 'left':
                case 'down':
                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide + _.getSlideCount() ) :
                            _.currentSlide + _.getSlideCount();
                    _.currentDirection = 0;
                    break;
                case 'right':
                case 'up':
                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide - _.getSlideCount() ) :
                            _.currentSlide - _.getSlideCount();
                    _.currentDirection = 1;
                    break;
                default:
            }
            if( direction != 'vertical' ) {
                _.slideHandler( slideCount );
                _.touchObject = {};
                _.$slider.trigger('swipe', [_, direction ]);
            }
        } else {
            if ( _.touchObject.startX !== _.touchObject.curX ) {
                _.slideHandler( _.currentSlide );
                _.touchObject = {};
            }
        }
    };
    Slick.prototype.swipeHandler = function(event) {
        var _ = this;
        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }
        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
            event.originalEvent.touches.length : 1;
        _.touchObject.minSwipe = _.listWidth / _.options
            .touchThreshold;
        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options
                .touchThreshold;
        }
        switch (event.data.action) {
            case 'start':
                _.swipeStart(event);
                break;
            case 'move':
                _.swipeMove(event);
                break;
            case 'end':
                _.swipeEnd(event);
                break;
        }
    };
    Slick.prototype.swipeMove = function(event) {
        var _ = this,
            edgeWasHit = false,
            curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength;
        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;
        if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
            return false;
        }
        curLeft = _.getLeft(_.currentSlide);
        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;
        _.touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));
        verticalSwipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));
        if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
            _.scrolling = true;
            return false;
        }
        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = verticalSwipeLength;
        }
        swipeDirection = _.swipeDirection();
        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            _.swiping = true;
            event.preventDefault();
        }
        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }
        swipeLength = _.touchObject.swipeLength;
        _.touchObject.edgeHit = false;
        if (_.options.infinite === false) {
            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }
        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }
        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }
        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }
        _.setCSS(_.swipeLeft);
    };
    Slick.prototype.swipeStart = function(event) {
        var _ = this,
            touches;
        _.interrupted = true;
        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }
        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }
        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;
        _.dragging = true;
    };
    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {
        var _ = this;
        if (_.$slidesCache !== null) {
            _.unload();
            _.$slideTrack.children(this.options.slide).detach();
            _.$slidesCache.appendTo(_.$slideTrack);
            _.reinit();
        }
    };
    Slick.prototype.unload = function() {
        var _ = this;
        $('.slick-cloned', _.$slider).remove();
        if (_.$dots) {
            _.$dots.remove();
        }
        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
        }
        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
        }
        _.$slides
            .removeClass('slick-slide slick-active slick-visible slick-current')
            .attr('aria-hidden', 'true')
            .css('width', '');
    };
    Slick.prototype.unslick = function(fromBreakpoint) {
        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy();
    };
    Slick.prototype.updateArrows = function() {
        var _ = this,
            centerOffset;
        centerOffset = Math.floor(_.options.slidesToShow / 2);
        if ( _.options.arrows === true &&
            _.slideCount > _.options.slidesToShow &&
            !_.options.infinite ) {
            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            if (_.currentSlide === 0) {
                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {
                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {
                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            }
        }
    };
    Slick.prototype.updateDots = function() {
        var _ = this;
        if (_.$dots !== null) {
            _.$dots
                .find('li')
                    .removeClass('slick-active')
                    .end();
            _.$dots
                .find('li')
                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
                .addClass('slick-active');
        }
    };
    Slick.prototype.visibility = function() {
        var _ = this;
        if ( _.options.autoplay ) {
            if ( document[_.hidden] ) {
                _.interrupted = true;
            } else {
                _.interrupted = false;
            }
        }
    };
    $.fn.slick = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].slick = new Slick(_[i], opt);
            else
                ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };
}));
/* == jquery mousewheel plugin == Version: 3.1.13, License: MIT License (MIT) */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});
/* == malihu jquery custom scrollbar plugin == Version: 3.1.5, License: MIT License (MIT) */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"undefined"!=typeof module&&module.exports?module.exports=e:e(jQuery,window,document)}(function(e){!function(t){var o="function"==typeof define&&define.amd,a="undefined"!=typeof module&&module.exports,n="https:"==document.location.protocol?"https:":"http:",i="cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";o||(a?require("jquery-mousewheel")(e):e.event.special.mousewheel||e("head").append(decodeURI("%3Cscript src="+n+"//"+i+"%3E%3C/script%3E"))),t()}(function(){var t,o="mCustomScrollbar",a="mCS",n=".mCustomScrollbar",i={setTop:0,setLeft:0,axis:"y",scrollbarPosition:"inside",scrollInertia:950,autoDraggerLength:!0,alwaysShowScrollbar:0,snapOffset:0,mouseWheel:{enable:!0,scrollAmount:"auto",axis:"y",deltaFactor:"auto",disableOver:["select","option","keygen","datalist","textarea"]},scrollButtons:{scrollType:"stepless",scrollAmount:"auto"},keyboard:{enable:!0,scrollType:"stepless",scrollAmount:"auto"},contentTouchScroll:25,documentTouchScroll:!0,advanced:{autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",updateOnContentResize:!0,updateOnImageLoad:"auto",autoUpdateTimeout:60},theme:"light",callbacks:{onTotalScrollOffset:0,onTotalScrollBackOffset:0,alwaysTriggerOffsets:!0}},r=0,l={},s=window.attachEvent&&!window.addEventListener?1:0,c=!1,d=["mCSB_dragger_onDrag","mCSB_scrollTools_onDrag","mCS_img_loaded","mCS_disabled","mCS_destroyed","mCS_no_scrollbar","mCS-autoHide","mCS-dir-rtl","mCS_no_scrollbar_y","mCS_no_scrollbar_x","mCS_y_hidden","mCS_x_hidden","mCSB_draggerContainer","mCSB_buttonUp","mCSB_buttonDown","mCSB_buttonLeft","mCSB_buttonRight"],u={init:function(t){var t=e.extend(!0,{},i,t),o=f.call(this);if(t.live){var s=t.liveSelector||this.selector||n,c=e(s);if("off"===t.live)return void m(s);l[s]=setTimeout(function(){c.mCustomScrollbar(t),"once"===t.live&&c.length&&m(s)},500)}else m(s);return t.setWidth=t.set_width?t.set_width:t.setWidth,t.setHeight=t.set_height?t.set_height:t.setHeight,t.axis=t.horizontalScroll?"x":p(t.axis),t.scrollInertia=t.scrollInertia>0&&t.scrollInertia<17?17:t.scrollInertia,"object"!=typeof t.mouseWheel&&1==t.mouseWheel&&(t.mouseWheel={enable:!0,scrollAmount:"auto",axis:"y",preventDefault:!1,deltaFactor:"auto",normalizeDelta:!1,invert:!1}),t.mouseWheel.scrollAmount=t.mouseWheelPixels?t.mouseWheelPixels:t.mouseWheel.scrollAmount,t.mouseWheel.normalizeDelta=t.advanced.normalizeMouseWheelDelta?t.advanced.normalizeMouseWheelDelta:t.mouseWheel.normalizeDelta,t.scrollButtons.scrollType=g(t.scrollButtons.scrollType),h(t),e(o).each(function(){var o=e(this);if(!o.data(a)){o.data(a,{idx:++r,opt:t,scrollRatio:{y:null,x:null},overflowed:null,contentReset:{y:null,x:null},bindEvents:!1,tweenRunning:!1,sequential:{},langDir:o.css("direction"),cbOffsets:null,trigger:null,poll:{size:{o:0,n:0},img:{o:0,n:0},change:{o:0,n:0}}});var n=o.data(a),i=n.opt,l=o.data("mcs-axis"),s=o.data("mcs-scrollbar-position"),c=o.data("mcs-theme");l&&(i.axis=l),s&&(i.scrollbarPosition=s),c&&(i.theme=c,h(i)),v.call(this),n&&i.callbacks.onCreate&&"function"==typeof i.callbacks.onCreate&&i.callbacks.onCreate.call(this),e("#mCSB_"+n.idx+"_container img:not(."+d[2]+")").addClass(d[2]),u.update.call(null,o)}})},update:function(t,o){var n=t||f.call(this);return e(n).each(function(){var t=e(this);if(t.data(a)){var n=t.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container"),l=e("#mCSB_"+n.idx),s=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];if(!r.length)return;n.tweenRunning&&Q(t),o&&n&&i.callbacks.onBeforeUpdate&&"function"==typeof i.callbacks.onBeforeUpdate&&i.callbacks.onBeforeUpdate.call(this),t.hasClass(d[3])&&t.removeClass(d[3]),t.hasClass(d[4])&&t.removeClass(d[4]),l.css("max-height","none"),l.height()!==t.height()&&l.css("max-height",t.height()),_.call(this),"y"===i.axis||i.advanced.autoExpandHorizontalScroll||r.css("width",x(r)),n.overflowed=y.call(this),M.call(this),i.autoDraggerLength&&S.call(this),b.call(this),T.call(this);var c=[Math.abs(r[0].offsetTop),Math.abs(r[0].offsetLeft)];"x"!==i.axis&&(n.overflowed[0]?s[0].height()>s[0].parent().height()?B.call(this):(G(t,c[0].toString(),{dir:"y",dur:0,overwrite:"none"}),n.contentReset.y=null):(B.call(this),"y"===i.axis?k.call(this):"yx"===i.axis&&n.overflowed[1]&&G(t,c[1].toString(),{dir:"x",dur:0,overwrite:"none"}))),"y"!==i.axis&&(n.overflowed[1]?s[1].width()>s[1].parent().width()?B.call(this):(G(t,c[1].toString(),{dir:"x",dur:0,overwrite:"none"}),n.contentReset.x=null):(B.call(this),"x"===i.axis?k.call(this):"yx"===i.axis&&n.overflowed[0]&&G(t,c[0].toString(),{dir:"y",dur:0,overwrite:"none"}))),o&&n&&(2===o&&i.callbacks.onImageLoad&&"function"==typeof i.callbacks.onImageLoad?i.callbacks.onImageLoad.call(this):3===o&&i.callbacks.onSelectorChange&&"function"==typeof i.callbacks.onSelectorChange?i.callbacks.onSelectorChange.call(this):i.callbacks.onUpdate&&"function"==typeof i.callbacks.onUpdate&&i.callbacks.onUpdate.call(this)),N.call(this)}})},scrollTo:function(t,o){if("undefined"!=typeof t&&null!=t){var n=f.call(this);return e(n).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l={trigger:"external",scrollInertia:r.scrollInertia,scrollEasing:"mcsEaseInOut",moveDragger:!1,timeout:60,callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},s=e.extend(!0,{},l,o),c=Y.call(this,t),d=s.scrollInertia>0&&s.scrollInertia<17?17:s.scrollInertia;c[0]=X.call(this,c[0],"y"),c[1]=X.call(this,c[1],"x"),s.moveDragger&&(c[0]*=i.scrollRatio.y,c[1]*=i.scrollRatio.x),s.dur=ne()?0:d,setTimeout(function(){null!==c[0]&&"undefined"!=typeof c[0]&&"x"!==r.axis&&i.overflowed[0]&&(s.dir="y",s.overwrite="all",G(n,c[0].toString(),s)),null!==c[1]&&"undefined"!=typeof c[1]&&"y"!==r.axis&&i.overflowed[1]&&(s.dir="x",s.overwrite="none",G(n,c[1].toString(),s))},s.timeout)}})}},stop:function(){var t=f.call(this);return e(t).each(function(){var t=e(this);t.data(a)&&Q(t)})},disable:function(t){var o=f.call(this);return e(o).each(function(){var o=e(this);if(o.data(a)){o.data(a);N.call(this,"remove"),k.call(this),t&&B.call(this),M.call(this,!0),o.addClass(d[3])}})},destroy:function(){var t=f.call(this);return e(t).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx),s=e("#mCSB_"+i.idx+"_container"),c=e(".mCSB_"+i.idx+"_scrollbar");r.live&&m(r.liveSelector||e(t).selector),N.call(this,"remove"),k.call(this),B.call(this),n.removeData(a),$(this,"mcs"),c.remove(),s.find("img."+d[2]).removeClass(d[2]),l.replaceWith(s.contents()),n.removeClass(o+" _"+a+"_"+i.idx+" "+d[6]+" "+d[7]+" "+d[5]+" "+d[3]).addClass(d[4])}})}},f=function(){return"object"!=typeof e(this)||e(this).length<1?n:this},h=function(t){var o=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],a=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],n=["minimal","minimal-dark"],i=["minimal","minimal-dark"],r=["minimal","minimal-dark"];t.autoDraggerLength=e.inArray(t.theme,o)>-1?!1:t.autoDraggerLength,t.autoExpandScrollbar=e.inArray(t.theme,a)>-1?!1:t.autoExpandScrollbar,t.scrollButtons.enable=e.inArray(t.theme,n)>-1?!1:t.scrollButtons.enable,t.autoHideScrollbar=e.inArray(t.theme,i)>-1?!0:t.autoHideScrollbar,t.scrollbarPosition=e.inArray(t.theme,r)>-1?"outside":t.scrollbarPosition},m=function(e){l[e]&&(clearTimeout(l[e]),$(l,e))},p=function(e){return"yx"===e||"xy"===e||"auto"===e?"yx":"x"===e||"horizontal"===e?"x":"y"},g=function(e){return"stepped"===e||"pixels"===e||"step"===e||"click"===e?"stepped":"stepless"},v=function(){var t=e(this),n=t.data(a),i=n.opt,r=i.autoExpandScrollbar?" "+d[1]+"_expand":"",l=["<div id='mCSB_"+n.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_vertical"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+n.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_horizontal"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],s="yx"===i.axis?"mCSB_vertical_horizontal":"x"===i.axis?"mCSB_horizontal":"mCSB_vertical",c="yx"===i.axis?l[0]+l[1]:"x"===i.axis?l[1]:l[0],u="yx"===i.axis?"<div id='mCSB_"+n.idx+"_container_wrapper' class='mCSB_container_wrapper' />":"",f=i.autoHideScrollbar?" "+d[6]:"",h="x"!==i.axis&&"rtl"===n.langDir?" "+d[7]:"";i.setWidth&&t.css("width",i.setWidth),i.setHeight&&t.css("height",i.setHeight),i.setLeft="y"!==i.axis&&"rtl"===n.langDir?"989999px":i.setLeft,t.addClass(o+" _"+a+"_"+n.idx+f+h).wrapInner("<div id='mCSB_"+n.idx+"' class='mCustomScrollBox mCS-"+i.theme+" "+s+"'><div id='mCSB_"+n.idx+"_container' class='mCSB_container' style='position:relative; top:"+i.setTop+"; left:"+i.setLeft+";' dir='"+n.langDir+"' /></div>");var m=e("#mCSB_"+n.idx),p=e("#mCSB_"+n.idx+"_container");"y"===i.axis||i.advanced.autoExpandHorizontalScroll||p.css("width",x(p)),"outside"===i.scrollbarPosition?("static"===t.css("position")&&t.css("position","relative"),t.css("overflow","visible"),m.addClass("mCSB_outside").after(c)):(m.addClass("mCSB_inside").append(c),p.wrap(u)),w.call(this);var g=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];g[0].css("min-height",g[0].height()),g[1].css("min-width",g[1].width())},x=function(t){var o=[t[0].scrollWidth,Math.max.apply(Math,t.children().map(function(){return e(this).outerWidth(!0)}).get())],a=t.parent().width();return o[0]>a?o[0]:o[1]>a?o[1]:"100%"},_=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx+"_container");if(n.advanced.autoExpandHorizontalScroll&&"y"!==n.axis){i.css({width:"auto","min-width":0,"overflow-x":"scroll"});var r=Math.ceil(i[0].scrollWidth);3===n.advanced.autoExpandHorizontalScroll||2!==n.advanced.autoExpandHorizontalScroll&&r>i.parent().width()?i.css({width:r,"min-width":"100%","overflow-x":"inherit"}):i.css({"overflow-x":"inherit",position:"absolute"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:Math.ceil(i[0].getBoundingClientRect().right+.4)-Math.floor(i[0].getBoundingClientRect().left),"min-width":"100%",position:"relative"}).unwrap()}},w=function(){var t=e(this),o=t.data(a),n=o.opt,i=e(".mCSB_"+o.idx+"_scrollbar:first"),r=oe(n.scrollButtons.tabindex)?"tabindex='"+n.scrollButtons.tabindex+"'":"",l=["<a href='#' class='"+d[13]+"' "+r+" />","<a href='#' class='"+d[14]+"' "+r+" />","<a href='#' class='"+d[15]+"' "+r+" />","<a href='#' class='"+d[16]+"' "+r+" />"],s=["x"===n.axis?l[2]:l[0],"x"===n.axis?l[3]:l[1],l[2],l[3]];n.scrollButtons.enable&&i.prepend(s[0]).append(s[1]).next(".mCSB_scrollTools").prepend(s[2]).append(s[3])},S=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[n.height()/i.outerHeight(!1),n.width()/i.outerWidth(!1)],c=[parseInt(r[0].css("min-height")),Math.round(l[0]*r[0].parent().height()),parseInt(r[1].css("min-width")),Math.round(l[1]*r[1].parent().width())],d=s&&c[1]<c[0]?c[0]:c[1],u=s&&c[3]<c[2]?c[2]:c[3];r[0].css({height:d,"max-height":r[0].parent().height()-10}).find(".mCSB_dragger_bar").css({"line-height":c[0]+"px"}),r[1].css({width:u,"max-width":r[1].parent().width()-10})},b=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[i.outerHeight(!1)-n.height(),i.outerWidth(!1)-n.width()],s=[l[0]/(r[0].parent().height()-r[0].height()),l[1]/(r[1].parent().width()-r[1].width())];o.scrollRatio={y:s[0],x:s[1]}},C=function(e,t,o){var a=o?d[0]+"_expanded":"",n=e.closest(".mCSB_scrollTools");"active"===t?(e.toggleClass(d[0]+" "+a),n.toggleClass(d[1]),e[0]._draggable=e[0]._draggable?0:1):e[0]._draggable||("hide"===t?(e.removeClass(d[0]),n.removeClass(d[1])):(e.addClass(d[0]),n.addClass(d[1])))},y=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=null==o.overflowed?i.height():i.outerHeight(!1),l=null==o.overflowed?i.width():i.outerWidth(!1),s=i[0].scrollHeight,c=i[0].scrollWidth;return s>r&&(r=s),c>l&&(l=c),[r>n.height(),l>n.width()]},B=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx),r=e("#mCSB_"+o.idx+"_container"),l=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")];if(Q(t),("x"!==n.axis&&!o.overflowed[0]||"y"===n.axis&&o.overflowed[0])&&(l[0].add(r).css("top",0),G(t,"_resetY")),"y"!==n.axis&&!o.overflowed[1]||"x"===n.axis&&o.overflowed[1]){var s=dx=0;"rtl"===o.langDir&&(s=i.width()-r.outerWidth(!1),dx=Math.abs(s/o.scrollRatio.x)),r.css("left",s),l[1].css("left",dx),G(t,"_resetX")}},T=function(){function t(){r=setTimeout(function(){e.event.special.mousewheel?(clearTimeout(r),W.call(o[0])):t()},100)}var o=e(this),n=o.data(a),i=n.opt;if(!n.bindEvents){if(I.call(this),i.contentTouchScroll&&D.call(this),E.call(this),i.mouseWheel.enable){var r;t()}P.call(this),U.call(this),i.advanced.autoScrollOnFocus&&H.call(this),i.scrollButtons.enable&&F.call(this),i.keyboard.enable&&q.call(this),n.bindEvents=!0}},k=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=".mCSB_"+o.idx+"_scrollbar",l=e("#mCSB_"+o.idx+",#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,"+r+" ."+d[12]+",#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal,"+r+">a"),s=e("#mCSB_"+o.idx+"_container");n.advanced.releaseDraggableSelectors&&l.add(e(n.advanced.releaseDraggableSelectors)),n.advanced.extraDraggableSelectors&&l.add(e(n.advanced.extraDraggableSelectors)),o.bindEvents&&(e(document).add(e(!A()||top.document)).unbind("."+i),l.each(function(){e(this).unbind("."+i)}),clearTimeout(t[0]._focusTimeout),$(t[0],"_focusTimeout"),clearTimeout(o.sequential.step),$(o.sequential,"step"),clearTimeout(s[0].onCompleteTimeout),$(s[0],"onCompleteTimeout"),o.bindEvents=!1)},M=function(t){var o=e(this),n=o.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container_wrapper"),l=r.length?r:e("#mCSB_"+n.idx+"_container"),s=[e("#mCSB_"+n.idx+"_scrollbar_vertical"),e("#mCSB_"+n.idx+"_scrollbar_horizontal")],c=[s[0].find(".mCSB_dragger"),s[1].find(".mCSB_dragger")];"x"!==i.axis&&(n.overflowed[0]&&!t?(s[0].add(c[0]).add(s[0].children("a")).css("display","block"),l.removeClass(d[8]+" "+d[10])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[0].css("display","none"),l.removeClass(d[10])):(s[0].css("display","none"),l.addClass(d[10])),l.addClass(d[8]))),"y"!==i.axis&&(n.overflowed[1]&&!t?(s[1].add(c[1]).add(s[1].children("a")).css("display","block"),l.removeClass(d[9]+" "+d[11])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[1].css("display","none"),l.removeClass(d[11])):(s[1].css("display","none"),l.addClass(d[11])),l.addClass(d[9]))),n.overflowed[0]||n.overflowed[1]?o.removeClass(d[5]):o.addClass(d[5])},O=function(t){var o=t.type,a=t.target.ownerDocument!==document&&null!==frameElement?[e(frameElement).offset().top,e(frameElement).offset().left]:null,n=A()&&t.target.ownerDocument!==top.document&&null!==frameElement?[e(t.view.frameElement).offset().top,e(t.view.frameElement).offset().left]:[0,0];switch(o){case"pointerdown":case"MSPointerDown":case"pointermove":case"MSPointerMove":case"pointerup":case"MSPointerUp":return a?[t.originalEvent.pageY-a[0]+n[0],t.originalEvent.pageX-a[1]+n[1],!1]:[t.originalEvent.pageY,t.originalEvent.pageX,!1];case"touchstart":case"touchmove":case"touchend":var i=t.originalEvent.touches[0]||t.originalEvent.changedTouches[0],r=t.originalEvent.touches.length||t.originalEvent.changedTouches.length;return t.target.ownerDocument!==document?[i.screenY,i.screenX,r>1]:[i.pageY,i.pageX,r>1];default:return a?[t.pageY-a[0]+n[0],t.pageX-a[1]+n[1],!1]:[t.pageY,t.pageX,!1]}},I=function(){function t(e,t,a,n){if(h[0].idleTimer=d.scrollInertia<233?250:0,o.attr("id")===f[1])var i="x",s=(o[0].offsetLeft-t+n)*l.scrollRatio.x;else var i="y",s=(o[0].offsetTop-e+a)*l.scrollRatio.y;G(r,s.toString(),{dir:i,drag:!0})}var o,n,i,r=e(this),l=r.data(a),d=l.opt,u=a+"_"+l.idx,f=["mCSB_"+l.idx+"_dragger_vertical","mCSB_"+l.idx+"_dragger_horizontal"],h=e("#mCSB_"+l.idx+"_container"),m=e("#"+f[0]+",#"+f[1]),p=d.advanced.releaseDraggableSelectors?m.add(e(d.advanced.releaseDraggableSelectors)):m,g=d.advanced.extraDraggableSelectors?e(!A()||top.document).add(e(d.advanced.extraDraggableSelectors)):e(!A()||top.document);m.bind("contextmenu."+u,function(e){e.preventDefault()}).bind("mousedown."+u+" touchstart."+u+" pointerdown."+u+" MSPointerDown."+u,function(t){if(t.stopImmediatePropagation(),t.preventDefault(),ee(t)){c=!0,s&&(document.onselectstart=function(){return!1}),L.call(h,!1),Q(r),o=e(this);var a=o.offset(),l=O(t)[0]-a.top,u=O(t)[1]-a.left,f=o.height()+a.top,m=o.width()+a.left;f>l&&l>0&&m>u&&u>0&&(n=l,i=u),C(o,"active",d.autoExpandScrollbar)}}).bind("touchmove."+u,function(e){e.stopImmediatePropagation(),e.preventDefault();var a=o.offset(),r=O(e)[0]-a.top,l=O(e)[1]-a.left;t(n,i,r,l)}),e(document).add(g).bind("mousemove."+u+" pointermove."+u+" MSPointerMove."+u,function(e){if(o){var a=o.offset(),r=O(e)[0]-a.top,l=O(e)[1]-a.left;if(n===r&&i===l)return;t(n,i,r,l)}}).add(p).bind("mouseup."+u+" touchend."+u+" pointerup."+u+" MSPointerUp."+u,function(){o&&(C(o,"active",d.autoExpandScrollbar),o=null),c=!1,s&&(document.onselectstart=null),L.call(h,!0)})},D=function(){function o(e){if(!te(e)||c||O(e)[2])return void(t=0);t=1,b=0,C=0,d=1,y.removeClass("mCS_touch_action");var o=I.offset();u=O(e)[0]-o.top,f=O(e)[1]-o.left,z=[O(e)[0],O(e)[1]]}function n(e){if(te(e)&&!c&&!O(e)[2]&&(T.documentTouchScroll||e.preventDefault(),e.stopImmediatePropagation(),(!C||b)&&d)){g=K();var t=M.offset(),o=O(e)[0]-t.top,a=O(e)[1]-t.left,n="mcsLinearOut";if(E.push(o),W.push(a),z[2]=Math.abs(O(e)[0]-z[0]),z[3]=Math.abs(O(e)[1]-z[1]),B.overflowed[0])var i=D[0].parent().height()-D[0].height(),r=u-o>0&&o-u>-(i*B.scrollRatio.y)&&(2*z[3]<z[2]||"yx"===T.axis);if(B.overflowed[1])var l=D[1].parent().width()-D[1].width(),h=f-a>0&&a-f>-(l*B.scrollRatio.x)&&(2*z[2]<z[3]||"yx"===T.axis);r||h?(U||e.preventDefault(),b=1):(C=1,y.addClass("mCS_touch_action")),U&&e.preventDefault(),w="yx"===T.axis?[u-o,f-a]:"x"===T.axis?[null,f-a]:[u-o,null],I[0].idleTimer=250,B.overflowed[0]&&s(w[0],R,n,"y","all",!0),B.overflowed[1]&&s(w[1],R,n,"x",L,!0)}}function i(e){if(!te(e)||c||O(e)[2])return void(t=0);t=1,e.stopImmediatePropagation(),Q(y),p=K();var o=M.offset();h=O(e)[0]-o.top,m=O(e)[1]-o.left,E=[],W=[]}function r(e){if(te(e)&&!c&&!O(e)[2]){d=0,e.stopImmediatePropagation(),b=0,C=0,v=K();var t=M.offset(),o=O(e)[0]-t.top,a=O(e)[1]-t.left;if(!(v-g>30)){_=1e3/(v-p);var n="mcsEaseOut",i=2.5>_,r=i?[E[E.length-2],W[W.length-2]]:[0,0];x=i?[o-r[0],a-r[1]]:[o-h,a-m];var u=[Math.abs(x[0]),Math.abs(x[1])];_=i?[Math.abs(x[0]/4),Math.abs(x[1]/4)]:[_,_];var f=[Math.abs(I[0].offsetTop)-x[0]*l(u[0]/_[0],_[0]),Math.abs(I[0].offsetLeft)-x[1]*l(u[1]/_[1],_[1])];w="yx"===T.axis?[f[0],f[1]]:"x"===T.axis?[null,f[1]]:[f[0],null],S=[4*u[0]+T.scrollInertia,4*u[1]+T.scrollInertia];var y=parseInt(T.contentTouchScroll)||0;w[0]=u[0]>y?w[0]:0,w[1]=u[1]>y?w[1]:0,B.overflowed[0]&&s(w[0],S[0],n,"y",L,!1),B.overflowed[1]&&s(w[1],S[1],n,"x",L,!1)}}}function l(e,t){var o=[1.5*t,2*t,t/1.5,t/2];return e>90?t>4?o[0]:o[3]:e>60?t>3?o[3]:o[2]:e>30?t>8?o[1]:t>6?o[0]:t>4?t:o[2]:t>8?t:o[3]}function s(e,t,o,a,n,i){e&&G(y,e.toString(),{dur:t,scrollEasing:o,dir:a,overwrite:n,drag:i})}var d,u,f,h,m,p,g,v,x,_,w,S,b,C,y=e(this),B=y.data(a),T=B.opt,k=a+"_"+B.idx,M=e("#mCSB_"+B.idx),I=e("#mCSB_"+B.idx+"_container"),D=[e("#mCSB_"+B.idx+"_dragger_vertical"),e("#mCSB_"+B.idx+"_dragger_horizontal")],E=[],W=[],R=0,L="yx"===T.axis?"none":"all",z=[],P=I.find("iframe"),H=["touchstart."+k+" pointerdown."+k+" MSPointerDown."+k,"touchmove."+k+" pointermove."+k+" MSPointerMove."+k,"touchend."+k+" pointerup."+k+" MSPointerUp."+k],U=void 0!==document.body.style.touchAction&&""!==document.body.style.touchAction;I.bind(H[0],function(e){o(e)}).bind(H[1],function(e){n(e)}),M.bind(H[0],function(e){i(e)}).bind(H[2],function(e){r(e)}),P.length&&P.each(function(){e(this).bind("load",function(){A(this)&&e(this.contentDocument||this.contentWindow.document).bind(H[0],function(e){o(e),i(e)}).bind(H[1],function(e){n(e)}).bind(H[2],function(e){r(e)})})})},E=function(){function o(){return window.getSelection?window.getSelection().toString():document.selection&&"Control"!=document.selection.type?document.selection.createRange().text:0}function n(e,t,o){d.type=o&&i?"stepped":"stepless",d.scrollAmount=10,j(r,e,t,"mcsLinearOut",o?60:null)}var i,r=e(this),l=r.data(a),s=l.opt,d=l.sequential,u=a+"_"+l.idx,f=e("#mCSB_"+l.idx+"_container"),h=f.parent();f.bind("mousedown."+u,function(){t||i||(i=1,c=!0)}).add(document).bind("mousemove."+u,function(e){if(!t&&i&&o()){var a=f.offset(),r=O(e)[0]-a.top+f[0].offsetTop,c=O(e)[1]-a.left+f[0].offsetLeft;r>0&&r<h.height()&&c>0&&c<h.width()?d.step&&n("off",null,"stepped"):("x"!==s.axis&&l.overflowed[0]&&(0>r?n("on",38):r>h.height()&&n("on",40)),"y"!==s.axis&&l.overflowed[1]&&(0>c?n("on",37):c>h.width()&&n("on",39)))}}).bind("mouseup."+u+" dragend."+u,function(){t||(i&&(i=0,n("off",null)),c=!1)})},W=function(){function t(t,a){if(Q(o),!z(o,t.target)){var r="auto"!==i.mouseWheel.deltaFactor?parseInt(i.mouseWheel.deltaFactor):s&&t.deltaFactor<100?100:t.deltaFactor||100,d=i.scrollInertia;if("x"===i.axis||"x"===i.mouseWheel.axis)var u="x",f=[Math.round(r*n.scrollRatio.x),parseInt(i.mouseWheel.scrollAmount)],h="auto"!==i.mouseWheel.scrollAmount?f[1]:f[0]>=l.width()?.9*l.width():f[0],m=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetLeft),p=c[1][0].offsetLeft,g=c[1].parent().width()-c[1].width(),v="y"===i.mouseWheel.axis?t.deltaY||a:t.deltaX;else var u="y",f=[Math.round(r*n.scrollRatio.y),parseInt(i.mouseWheel.scrollAmount)],h="auto"!==i.mouseWheel.scrollAmount?f[1]:f[0]>=l.height()?.9*l.height():f[0],m=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetTop),p=c[0][0].offsetTop,g=c[0].parent().height()-c[0].height(),v=t.deltaY||a;"y"===u&&!n.overflowed[0]||"x"===u&&!n.overflowed[1]||((i.mouseWheel.invert||t.webkitDirectionInvertedFromDevice)&&(v=-v),i.mouseWheel.normalizeDelta&&(v=0>v?-1:1),(v>0&&0!==p||0>v&&p!==g||i.mouseWheel.preventDefault)&&(t.stopImmediatePropagation(),t.preventDefault()),t.deltaFactor<5&&!i.mouseWheel.normalizeDelta&&(h=t.deltaFactor,d=17),G(o,(m-v*h).toString(),{dir:u,dur:d}))}}if(e(this).data(a)){var o=e(this),n=o.data(a),i=n.opt,r=a+"_"+n.idx,l=e("#mCSB_"+n.idx),c=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")],d=e("#mCSB_"+n.idx+"_container").find("iframe");d.length&&d.each(function(){e(this).bind("load",function(){A(this)&&e(this.contentDocument||this.contentWindow.document).bind("mousewheel."+r,function(e,o){t(e,o)})})}),l.bind("mousewheel."+r,function(e,o){t(e,o)})}},R=new Object,A=function(t){var o=!1,a=!1,n=null;if(void 0===t?a="#empty":void 0!==e(t).attr("id")&&(a=e(t).attr("id")),a!==!1&&void 0!==R[a])return R[a];if(t){try{var i=t.contentDocument||t.contentWindow.document;n=i.body.innerHTML}catch(r){}o=null!==n}else{try{var i=top.document;n=i.body.innerHTML}catch(r){}o=null!==n}return a!==!1&&(R[a]=o),o},L=function(e){var t=this.find("iframe");if(t.length){var o=e?"auto":"none";t.css("pointer-events",o)}},z=function(t,o){var n=o.nodeName.toLowerCase(),i=t.data(a).opt.mouseWheel.disableOver,r=["select","textarea"];return e.inArray(n,i)>-1&&!(e.inArray(n,r)>-1&&!e(o).is(":focus"))},P=function(){var t,o=e(this),n=o.data(a),i=a+"_"+n.idx,r=e("#mCSB_"+n.idx+"_container"),l=r.parent(),s=e(".mCSB_"+n.idx+"_scrollbar ."+d[12]);s.bind("mousedown."+i+" touchstart."+i+" pointerdown."+i+" MSPointerDown."+i,function(o){c=!0,e(o.target).hasClass("mCSB_dragger")||(t=1)}).bind("touchend."+i+" pointerup."+i+" MSPointerUp."+i,function(){c=!1}).bind("click."+i,function(a){if(t&&(t=0,e(a.target).hasClass(d[12])||e(a.target).hasClass("mCSB_draggerRail"))){Q(o);var i=e(this),s=i.find(".mCSB_dragger");if(i.parent(".mCSB_scrollTools_horizontal").length>0){if(!n.overflowed[1])return;var c="x",u=a.pageX>s.offset().left?-1:1,f=Math.abs(r[0].offsetLeft)-u*(.9*l.width())}else{if(!n.overflowed[0])return;var c="y",u=a.pageY>s.offset().top?-1:1,f=Math.abs(r[0].offsetTop)-u*(.9*l.height())}G(o,f.toString(),{dir:c,scrollEasing:"mcsEaseInOut"})}})},H=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=e("#mCSB_"+o.idx+"_container"),l=r.parent();r.bind("focusin."+i,function(){var o=e(document.activeElement),a=r.find(".mCustomScrollBox").length,i=0;o.is(n.advanced.autoScrollOnFocus)&&(Q(t),clearTimeout(t[0]._focusTimeout),t[0]._focusTimer=a?(i+17)*a:0,t[0]._focusTimeout=setTimeout(function(){var e=[ae(o)[0],ae(o)[1]],a=[r[0].offsetTop,r[0].offsetLeft],s=[a[0]+e[0]>=0&&a[0]+e[0]<l.height()-o.outerHeight(!1),a[1]+e[1]>=0&&a[0]+e[1]<l.width()-o.outerWidth(!1)],c="yx"!==n.axis||s[0]||s[1]?"all":"none";"x"===n.axis||s[0]||G(t,e[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:c,dur:i}),"y"===n.axis||s[1]||G(t,e[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:c,dur:i})},t[0]._focusTimer))})},U=function(){var t=e(this),o=t.data(a),n=a+"_"+o.idx,i=e("#mCSB_"+o.idx+"_container").parent();i.bind("scroll."+n,function(){0===i.scrollTop()&&0===i.scrollLeft()||e(".mCSB_"+o.idx+"_scrollbar").css("visibility","hidden")})},F=function(){var t=e(this),o=t.data(a),n=o.opt,i=o.sequential,r=a+"_"+o.idx,l=".mCSB_"+o.idx+"_scrollbar",s=e(l+">a");s.bind("contextmenu."+r,function(e){e.preventDefault()}).bind("mousedown."+r+" touchstart."+r+" pointerdown."+r+" MSPointerDown."+r+" mouseup."+r+" touchend."+r+" pointerup."+r+" MSPointerUp."+r+" mouseout."+r+" pointerout."+r+" MSPointerOut."+r+" click."+r,function(a){function r(e,o){i.scrollAmount=n.scrollButtons.scrollAmount,j(t,e,o)}if(a.preventDefault(),ee(a)){var l=e(this).attr("class");switch(i.type=n.scrollButtons.scrollType,a.type){case"mousedown":case"touchstart":case"pointerdown":case"MSPointerDown":if("stepped"===i.type)return;c=!0,o.tweenRunning=!1,r("on",l);break;case"mouseup":case"touchend":case"pointerup":case"MSPointerUp":case"mouseout":case"pointerout":case"MSPointerOut":if("stepped"===i.type)return;c=!1,i.dir&&r("off",l);break;case"click":if("stepped"!==i.type||o.tweenRunning)return;r("on",l)}}})},q=function(){function t(t){function a(e,t){r.type=i.keyboard.scrollType,r.scrollAmount=i.keyboard.scrollAmount,"stepped"===r.type&&n.tweenRunning||j(o,e,t)}switch(t.type){case"blur":n.tweenRunning&&r.dir&&a("off",null);break;case"keydown":case"keyup":var l=t.keyCode?t.keyCode:t.which,s="on";if("x"!==i.axis&&(38===l||40===l)||"y"!==i.axis&&(37===l||39===l)){if((38===l||40===l)&&!n.overflowed[0]||(37===l||39===l)&&!n.overflowed[1])return;"keyup"===t.type&&(s="off"),e(document.activeElement).is(u)||(t.preventDefault(),t.stopImmediatePropagation(),a(s,l))}else if(33===l||34===l){if((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type){Q(o);var f=34===l?-1:1;if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=Math.abs(c[0].offsetLeft)-f*(.9*d.width());else var h="y",m=Math.abs(c[0].offsetTop)-f*(.9*d.height());G(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}else if((35===l||36===l)&&!e(document.activeElement).is(u)&&((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type)){if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=35===l?Math.abs(d.width()-c.outerWidth(!1)):0;else var h="y",m=35===l?Math.abs(d.height()-c.outerHeight(!1)):0;G(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}}var o=e(this),n=o.data(a),i=n.opt,r=n.sequential,l=a+"_"+n.idx,s=e("#mCSB_"+n.idx),c=e("#mCSB_"+n.idx+"_container"),d=c.parent(),u="input,textarea,select,datalist,keygen,[contenteditable='true']",f=c.find("iframe"),h=["blur."+l+" keydown."+l+" keyup."+l];f.length&&f.each(function(){e(this).bind("load",function(){A(this)&&e(this.contentDocument||this.contentWindow.document).bind(h[0],function(e){t(e)})})}),s.attr("tabindex","0").bind(h[0],function(e){t(e)})},j=function(t,o,n,i,r){function l(e){u.snapAmount&&(f.scrollAmount=u.snapAmount instanceof Array?"x"===f.dir[0]?u.snapAmount[1]:u.snapAmount[0]:u.snapAmount);var o="stepped"!==f.type,a=r?r:e?o?p/1.5:g:1e3/60,n=e?o?7.5:40:2.5,s=[Math.abs(h[0].offsetTop),Math.abs(h[0].offsetLeft)],d=[c.scrollRatio.y>10?10:c.scrollRatio.y,c.scrollRatio.x>10?10:c.scrollRatio.x],m="x"===f.dir[0]?s[1]+f.dir[1]*(d[1]*n):s[0]+f.dir[1]*(d[0]*n),v="x"===f.dir[0]?s[1]+f.dir[1]*parseInt(f.scrollAmount):s[0]+f.dir[1]*parseInt(f.scrollAmount),x="auto"!==f.scrollAmount?v:m,_=i?i:e?o?"mcsLinearOut":"mcsEaseInOut":"mcsLinear",w=!!e;return e&&17>a&&(x="x"===f.dir[0]?s[1]:s[0]),G(t,x.toString(),{dir:f.dir[0],scrollEasing:_,dur:a,onComplete:w}),e?void(f.dir=!1):(clearTimeout(f.step),void(f.step=setTimeout(function(){l()},a)))}function s(){clearTimeout(f.step),$(f,"step"),Q(t)}var c=t.data(a),u=c.opt,f=c.sequential,h=e("#mCSB_"+c.idx+"_container"),m="stepped"===f.type,p=u.scrollInertia<26?26:u.scrollInertia,g=u.scrollInertia<1?17:u.scrollInertia;switch(o){case"on":if(f.dir=[n===d[16]||n===d[15]||39===n||37===n?"x":"y",n===d[13]||n===d[15]||38===n||37===n?-1:1],Q(t),oe(n)&&"stepped"===f.type)return;l(m);break;case"off":s(),(m||c.tweenRunning&&f.dir)&&l(!0)}},Y=function(t){var o=e(this).data(a).opt,n=[];return"function"==typeof t&&(t=t()),t instanceof Array?n=t.length>1?[t[0],t[1]]:"x"===o.axis?[null,t[0]]:[t[0],null]:(n[0]=t.y?t.y:t.x||"x"===o.axis?null:t,n[1]=t.x?t.x:t.y||"y"===o.axis?null:t),"function"==typeof n[0]&&(n[0]=n[0]()),"function"==typeof n[1]&&(n[1]=n[1]()),n},X=function(t,o){if(null!=t&&"undefined"!=typeof t){var n=e(this),i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx+"_container"),s=l.parent(),c=typeof t;o||(o="x"===r.axis?"x":"y");var d="x"===o?l.outerWidth(!1)-s.width():l.outerHeight(!1)-s.height(),f="x"===o?l[0].offsetLeft:l[0].offsetTop,h="x"===o?"left":"top";switch(c){case"function":return t();case"object":var m=t.jquery?t:e(t);if(!m.length)return;return"x"===o?ae(m)[1]:ae(m)[0];case"string":case"number":if(oe(t))return Math.abs(t);if(-1!==t.indexOf("%"))return Math.abs(d*parseInt(t)/100);if(-1!==t.indexOf("-="))return Math.abs(f-parseInt(t.split("-=")[1]));if(-1!==t.indexOf("+=")){var p=f+parseInt(t.split("+=")[1]);return p>=0?0:Math.abs(p)}if(-1!==t.indexOf("px")&&oe(t.split("px")[0]))return Math.abs(t.split("px")[0]);if("top"===t||"left"===t)return 0;if("bottom"===t)return Math.abs(s.height()-l.outerHeight(!1));if("right"===t)return Math.abs(s.width()-l.outerWidth(!1));if("first"===t||"last"===t){var m=l.find(":"+t);return"x"===o?ae(m)[1]:ae(m)[0]}return e(t).length?"x"===o?ae(e(t))[1]:ae(e(t))[0]:(l.css(h,t),void u.update.call(null,n[0]))}}},N=function(t){function o(){return clearTimeout(f[0].autoUpdate),0===l.parents("html").length?void(l=null):void(f[0].autoUpdate=setTimeout(function(){return c.advanced.updateOnSelectorChange&&(s.poll.change.n=i(),s.poll.change.n!==s.poll.change.o)?(s.poll.change.o=s.poll.change.n,void r(3)):c.advanced.updateOnContentResize&&(s.poll.size.n=l[0].scrollHeight+l[0].scrollWidth+f[0].offsetHeight+l[0].offsetHeight+l[0].offsetWidth,s.poll.size.n!==s.poll.size.o)?(s.poll.size.o=s.poll.size.n,void r(1)):!c.advanced.updateOnImageLoad||"auto"===c.advanced.updateOnImageLoad&&"y"===c.axis||(s.poll.img.n=f.find("img").length,s.poll.img.n===s.poll.img.o)?void((c.advanced.updateOnSelectorChange||c.advanced.updateOnContentResize||c.advanced.updateOnImageLoad)&&o()):(s.poll.img.o=s.poll.img.n,void f.find("img").each(function(){n(this)}))},c.advanced.autoUpdateTimeout))}function n(t){function o(e,t){return function(){
return t.apply(e,arguments)}}function a(){this.onload=null,e(t).addClass(d[2]),r(2)}if(e(t).hasClass(d[2]))return void r();var n=new Image;n.onload=o(n,a),n.src=t.src}function i(){c.advanced.updateOnSelectorChange===!0&&(c.advanced.updateOnSelectorChange="*");var e=0,t=f.find(c.advanced.updateOnSelectorChange);return c.advanced.updateOnSelectorChange&&t.length>0&&t.each(function(){e+=this.offsetHeight+this.offsetWidth}),e}function r(e){clearTimeout(f[0].autoUpdate),u.update.call(null,l[0],e)}var l=e(this),s=l.data(a),c=s.opt,f=e("#mCSB_"+s.idx+"_container");return t?(clearTimeout(f[0].autoUpdate),void $(f[0],"autoUpdate")):void o()},V=function(e,t,o){return Math.round(e/t)*t-o},Q=function(t){var o=t.data(a),n=e("#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal");n.each(function(){Z.call(this)})},G=function(t,o,n){function i(e){return s&&c.callbacks[e]&&"function"==typeof c.callbacks[e]}function r(){return[c.callbacks.alwaysTriggerOffsets||w>=S[0]+y,c.callbacks.alwaysTriggerOffsets||-B>=w]}function l(){var e=[h[0].offsetTop,h[0].offsetLeft],o=[x[0].offsetTop,x[0].offsetLeft],a=[h.outerHeight(!1),h.outerWidth(!1)],i=[f.height(),f.width()];t[0].mcs={content:h,top:e[0],left:e[1],draggerTop:o[0],draggerLeft:o[1],topPct:Math.round(100*Math.abs(e[0])/(Math.abs(a[0])-i[0])),leftPct:Math.round(100*Math.abs(e[1])/(Math.abs(a[1])-i[1])),direction:n.dir}}var s=t.data(a),c=s.opt,d={trigger:"internal",dir:"y",scrollEasing:"mcsEaseOut",drag:!1,dur:c.scrollInertia,overwrite:"all",callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},n=e.extend(d,n),u=[n.dur,n.drag?0:n.dur],f=e("#mCSB_"+s.idx),h=e("#mCSB_"+s.idx+"_container"),m=h.parent(),p=c.callbacks.onTotalScrollOffset?Y.call(t,c.callbacks.onTotalScrollOffset):[0,0],g=c.callbacks.onTotalScrollBackOffset?Y.call(t,c.callbacks.onTotalScrollBackOffset):[0,0];if(s.trigger=n.trigger,0===m.scrollTop()&&0===m.scrollLeft()||(e(".mCSB_"+s.idx+"_scrollbar").css("visibility","visible"),m.scrollTop(0).scrollLeft(0)),"_resetY"!==o||s.contentReset.y||(i("onOverflowYNone")&&c.callbacks.onOverflowYNone.call(t[0]),s.contentReset.y=1),"_resetX"!==o||s.contentReset.x||(i("onOverflowXNone")&&c.callbacks.onOverflowXNone.call(t[0]),s.contentReset.x=1),"_resetY"!==o&&"_resetX"!==o){if(!s.contentReset.y&&t[0].mcs||!s.overflowed[0]||(i("onOverflowY")&&c.callbacks.onOverflowY.call(t[0]),s.contentReset.x=null),!s.contentReset.x&&t[0].mcs||!s.overflowed[1]||(i("onOverflowX")&&c.callbacks.onOverflowX.call(t[0]),s.contentReset.x=null),c.snapAmount){var v=c.snapAmount instanceof Array?"x"===n.dir?c.snapAmount[1]:c.snapAmount[0]:c.snapAmount;o=V(o,v,c.snapOffset)}switch(n.dir){case"x":var x=e("#mCSB_"+s.idx+"_dragger_horizontal"),_="left",w=h[0].offsetLeft,S=[f.width()-h.outerWidth(!1),x.parent().width()-x.width()],b=[o,0===o?0:o/s.scrollRatio.x],y=p[1],B=g[1],T=y>0?y/s.scrollRatio.x:0,k=B>0?B/s.scrollRatio.x:0;break;case"y":var x=e("#mCSB_"+s.idx+"_dragger_vertical"),_="top",w=h[0].offsetTop,S=[f.height()-h.outerHeight(!1),x.parent().height()-x.height()],b=[o,0===o?0:o/s.scrollRatio.y],y=p[0],B=g[0],T=y>0?y/s.scrollRatio.y:0,k=B>0?B/s.scrollRatio.y:0}b[1]<0||0===b[0]&&0===b[1]?b=[0,0]:b[1]>=S[1]?b=[S[0],S[1]]:b[0]=-b[0],t[0].mcs||(l(),i("onInit")&&c.callbacks.onInit.call(t[0])),clearTimeout(h[0].onCompleteTimeout),J(x[0],_,Math.round(b[1]),u[1],n.scrollEasing),!s.tweenRunning&&(0===w&&b[0]>=0||w===S[0]&&b[0]<=S[0])||J(h[0],_,Math.round(b[0]),u[0],n.scrollEasing,n.overwrite,{onStart:function(){n.callbacks&&n.onStart&&!s.tweenRunning&&(i("onScrollStart")&&(l(),c.callbacks.onScrollStart.call(t[0])),s.tweenRunning=!0,C(x),s.cbOffsets=r())},onUpdate:function(){n.callbacks&&n.onUpdate&&i("whileScrolling")&&(l(),c.callbacks.whileScrolling.call(t[0]))},onComplete:function(){if(n.callbacks&&n.onComplete){"yx"===c.axis&&clearTimeout(h[0].onCompleteTimeout);var e=h[0].idleTimer||0;h[0].onCompleteTimeout=setTimeout(function(){i("onScroll")&&(l(),c.callbacks.onScroll.call(t[0])),i("onTotalScroll")&&b[1]>=S[1]-T&&s.cbOffsets[0]&&(l(),c.callbacks.onTotalScroll.call(t[0])),i("onTotalScrollBack")&&b[1]<=k&&s.cbOffsets[1]&&(l(),c.callbacks.onTotalScrollBack.call(t[0])),s.tweenRunning=!1,h[0].idleTimer=0,C(x,"hide")},e)}}})}},J=function(e,t,o,a,n,i,r){function l(){S.stop||(x||m.call(),x=K()-v,s(),x>=S.time&&(S.time=x>S.time?x+f-(x-S.time):x+f-1,S.time<x+1&&(S.time=x+1)),S.time<a?S.id=h(l):g.call())}function s(){a>0?(S.currVal=u(S.time,_,b,a,n),w[t]=Math.round(S.currVal)+"px"):w[t]=o+"px",p.call()}function c(){f=1e3/60,S.time=x+f,h=window.requestAnimationFrame?window.requestAnimationFrame:function(e){return s(),setTimeout(e,.01)},S.id=h(l)}function d(){null!=S.id&&(window.requestAnimationFrame?window.cancelAnimationFrame(S.id):clearTimeout(S.id),S.id=null)}function u(e,t,o,a,n){switch(n){case"linear":case"mcsLinear":return o*e/a+t;case"mcsLinearOut":return e/=a,e--,o*Math.sqrt(1-e*e)+t;case"easeInOutSmooth":return e/=a/2,1>e?o/2*e*e+t:(e--,-o/2*(e*(e-2)-1)+t);case"easeInOutStrong":return e/=a/2,1>e?o/2*Math.pow(2,10*(e-1))+t:(e--,o/2*(-Math.pow(2,-10*e)+2)+t);case"easeInOut":case"mcsEaseInOut":return e/=a/2,1>e?o/2*e*e*e+t:(e-=2,o/2*(e*e*e+2)+t);case"easeOutSmooth":return e/=a,e--,-o*(e*e*e*e-1)+t;case"easeOutStrong":return o*(-Math.pow(2,-10*e/a)+1)+t;case"easeOut":case"mcsEaseOut":default:var i=(e/=a)*e,r=i*e;return t+o*(.499999999999997*r*i+-2.5*i*i+5.5*r+-6.5*i+4*e)}}e._mTween||(e._mTween={top:{},left:{}});var f,h,r=r||{},m=r.onStart||function(){},p=r.onUpdate||function(){},g=r.onComplete||function(){},v=K(),x=0,_=e.offsetTop,w=e.style,S=e._mTween[t];"left"===t&&(_=e.offsetLeft);var b=o-_;S.stop=0,"none"!==i&&d(),c()},K=function(){return window.performance&&window.performance.now?window.performance.now():window.performance&&window.performance.webkitNow?window.performance.webkitNow():Date.now?Date.now():(new Date).getTime()},Z=function(){var e=this;e._mTween||(e._mTween={top:{},left:{}});for(var t=["top","left"],o=0;o<t.length;o++){var a=t[o];e._mTween[a].id&&(window.requestAnimationFrame?window.cancelAnimationFrame(e._mTween[a].id):clearTimeout(e._mTween[a].id),e._mTween[a].id=null,e._mTween[a].stop=1)}},$=function(e,t){try{delete e[t]}catch(o){e[t]=null}},ee=function(e){return!(e.which&&1!==e.which)},te=function(e){var t=e.originalEvent.pointerType;return!(t&&"touch"!==t&&2!==t)},oe=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},ae=function(e){var t=e.parents(".mCSB_container");return[e.offset().top-t.offset().top,e.offset().left-t.offset().left]},ne=function(){function e(){var e=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var t=0;t<e.length;t++)if(e[t]+"Hidden"in document)return e[t]+"Hidden";return null}var t=e();return t?document[t]:!1};e.fn[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o].defaults=i,window[o]=!0,e(window).bind("load",function(){e(n)[o](),e.extend(e.expr[":"],{mcsInView:e.expr[":"].mcsInView||function(t){var o,a,n=e(t),i=n.parents(".mCSB_container");if(i.length)return o=i.parent(),a=[i[0].offsetTop,i[0].offsetLeft],a[0]+ae(n)[0]>=0&&a[0]+ae(n)[0]<o.height()-n.outerHeight(!1)&&a[1]+ae(n)[1]>=0&&a[1]+ae(n)[1]<o.width()-n.outerWidth(!1)},mcsInSight:e.expr[":"].mcsInSight||function(t,o,a){var n,i,r,l,s=e(t),c=s.parents(".mCSB_container"),d="exact"===a[3]?[[1,0],[1,0]]:[[.9,.1],[.6,.4]];if(c.length)return n=[s.outerHeight(!1),s.outerWidth(!1)],r=[c[0].offsetTop+ae(s)[0],c[0].offsetLeft+ae(s)[1]],i=[c.parent()[0].offsetHeight,c.parent()[0].offsetWidth],l=[n[0]<i[0]?d[0]:d[1],n[1]<i[1]?d[0]:d[1]],r[0]-i[0]*l[0][0]<0&&r[0]+n[0]-i[0]*l[0][1]>=0&&r[1]-i[1]*l[1][0]<0&&r[1]+n[1]-i[1]*l[1][1]>=0},mcsOverflow:e.expr[":"].mcsOverflow||function(t){var o=e(t).data(a);if(o)return o.overflowed[0]||o.overflowed[1]}})})})});// ==================================================
// fancyBox v3.2.5
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2017 fancyApps
//
// ==================================================
;(function (window, document, $, undefined) {
    'use strict';
    // If there's no jQuery, fancyBox can't work
    // =========================================
    if ( !$ ) {
        return;
    }
    // Check if fancyBox is already initialized
    // ========================================
    if ( $.fn.fancybox ) {
        if ( 'console' in window ) {
            console.log( 'fancyBox already initialized' );
        }
        return;
    }
    // Private default settings
    // ========================
    var defaults = {
        // Enable infinite gallery navigation
        loop : false,
        // Space around image, ignored if zoomed-in or viewport width is smaller than 800px
        margin : [44, 0],
        // Horizontal space between slides
        gutter : 50,
        // Enable keyboard navigation
        keyboard : true,
        // Should display navigation arrows at the screen edges
        arrows : true,
        // Should display infobar (counter and arrows at the top)
        infobar : true,
        // Should display toolbar (buttons at the top)
        toolbar : true,
        // What buttons should appear in the top right corner.
        // Buttons will be created using templates from `btnTpl` option
        // and they will be placed into toolbar (class="fancybox-toolbar"` element)
        buttons : [
            'slideShow',
            'fullScreen',
            'thumbs',
            'share',
            //'download',
            //'zoom',
            'close'
        ],
        // Detect "idle" time in seconds
        idleTime : 3,
        // Should display buttons at top right corner of the content
        // If 'auto' - they will be created for content having type 'html', 'inline' or 'ajax'
        // Use template from `btnTpl.smallBtn` for customization
        smallBtn : 'auto',
        // Disable right-click and use simple image protection for images
        protect : false,
        // Shortcut to make content "modal" - disable keyboard navigtion, hide buttons, etc
        modal : false,
        image : {
            // Wait for images to load before displaying
            // Requires predefined image dimensions
            // If 'auto' - will zoom in thumbnail if 'width' and 'height' attributes are found
            preload : "auto"
        },
        ajax : {
            // Object containing settings for ajax request
            settings : {
                // This helps to indicate that request comes from the modal
                // Feel free to change naming
                data : {
                    fancybox : true
                }
            }
        },
        iframe : {
            // Iframe template
            tpl : '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',
            // Preload iframe before displaying it
            // This allows to calculate iframe content width and height
            // (note: Due to "Same Origin Policy", you can't get cross domain data).
            preload : true,
            // Custom CSS styling for iframe wrapping element
            // You can use this to set custom iframe dimensions
            css : {},
            // Iframe tag attributes
            attr : {
                scrolling : 'auto'
            }
        },
        // Default content type if cannot be detected automatically
        defaultType : 'image',
        // Open/close animation type
        // Possible values:
        //   false            - disable
        //   "zoom"           - zoom images from/to thumbnail
        //   "fade"
        //   "zoom-in-out"
        //
        animationEffect : "zoom",
        // Duration in ms for open/close animation
        animationDuration : 500,
        // Should image change opacity while zooming
        // If opacity is "auto", then opacity will be changed if image and thumbnail have different aspect ratios
        zoomOpacity : "auto",
        // Transition effect between slides
        //
        // Possible values:
        //   false            - disable
        //   "fade'
        //   "slide'
        //   "circular'
        //   "tube'
        //   "zoom-in-out'
        //   "rotate'
        //
        transitionEffect : "fade",
        // Duration in ms for transition animation
        transitionDuration : 366,
        // Custom CSS class for slide element
        slideClass : '',
        // Custom CSS class for layout
        baseClass : '',
        // Base template for layout
        baseTpl	:
            '<div class="fancybox-container" role="dialog" tabindex="-1">' +
                '<div class="fancybox-bg"></div>' +
                '<div class="fancybox-inner">' +
                    '<div class="fancybox-infobar">' +
                        '<span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span>' +
                    '</div>' +
                    '<div class="fancybox-toolbar">{{buttons}}</div>' +
                    '<div class="fancybox-navigation">{{arrows}}</div>' +
                    '<div class="fancybox-stage"></div>' +
                    '<div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div>' +
                '</div>' +
            '</div>',
        // Loading indicator template
        spinnerTpl : '<div class="fancybox-loading"></div>',
        // Error message template
        errorTpl : '<div class="fancybox-error"><p>{{ERROR}}<p></div>',
        btnTpl : {
            download : '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}">' +
                        '<svg viewBox="0 0 40 40">' +
                            '<path d="M20,23 L20,8 L20,23 L13,16 L20,23 L27,16 L20,23 M26,28 L13,28 L27,28 L14,28" />' +
                        '</svg>' +
                    '</a>',
            zoom : '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}">' +
                        '<svg viewBox="0 0 40 40">' +
                            '<path d="M 18,17 m-8,0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0 M25,23 L31,29 L25,23" />' +
                        '</svg>' +
                    '</button>',
            close : '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' +
                        '<svg viewBox="0 0 40 40">' +
                            '<path d="M10,10 L30,30 M30,10 L10,30" />' +
                        '</svg>' +
                    '</button>',
            // This small close button will be appended to your html/inline/ajax content by default,
            // if "smallBtn" option is not set to false
            smallBtn   : '<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"></button>',
            // Arrows
            arrowLeft : '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' +
                            '<svg viewBox="0 0 40 40">' +
                              '<path d="M10,20 L30,20 L10,20 L18,28 L10,20 L18,12 L10,20"></path>' +
                            '</svg>' +
                          '</button>',
            arrowRight : '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' +
                          '<svg viewBox="0 0 40 40">' +
                            '<path d="M30,20 L10,20 L30,20 L22,28 L30,20 L22,12 L30,20"></path>' +
                          '</svg>' +
                        '</button>'
        },
        // Container is injected into this element
        parentEl : 'body',
        // Focus handling
        // ==============
        // Try to focus on the first focusable element after opening
        autoFocus : false,
        // Put focus back to active element after closing
        backFocus : true,
        // Do not let user to focus on element outside modal content
        trapFocus : true,
        // Module specific options
        // =======================
        fullScreen : {
            autoStart : false,
        },
        // Set `touch: false` to disable dragging/swiping
        touch : {
            vertical : true,  // Allow to drag content vertically
            momentum : true   // Continue movement after releasing mouse/touch when panning
        },
        // Hash value when initializing manually,
        // set `false` to disable hash change
        hash : null,
        // Customize or add new media types
        // Example:
        /*
        media : {
            youtube : {
                params : {
                    autoplay : 0
                }
            }
        }
        */
        media : {},
        slideShow : {
            autoStart : false,
            speed     : 4000
        },
        thumbs : {
			autoStart   : false,                  // Display thumbnails on opening
			hideOnClose : true,                   // Hide thumbnail grid when closing animation starts
			parentEl    : '.fancybox-container',  // Container is injected into this element
			axis        : 'y'                     // Vertical (y) or horizontal (x) scrolling
		},
        // Callbacks
        //==========
        // See Documentation/API/Events for more information
        // Example:
        /*
            afterShow: function( instance, current ) {
                 console.info( 'Clicked element:' );
                 console.info( current.opts.$orig );
            }
        */
        onInit       : $.noop,  // When instance has been initialized
        beforeLoad   : $.noop,  // Before the content of a slide is being loaded
        afterLoad    : $.noop,  // When the content of a slide is done loading
        beforeShow   : $.noop,  // Before open animation starts
        afterShow    : $.noop,  // When content is done loading and animating
        beforeClose  : $.noop,  // Before the instance attempts to close. Return false to cancel the close.
        afterClose   : $.noop,  // After instance has been closed
        onActivate   : $.noop,  // When instance is brought to front
        onDeactivate : $.noop,  // When other instance has been activated
        // Interaction
        // ===========
        // Use options below to customize taken action when user clicks or double clicks on the fancyBox area,
        // each option can be string or method that returns value.
        //
        // Possible values:
        //   "close"           - close instance
        //   "next"            - move to next gallery item
        //   "nextOrClose"     - move to next gallery item or close if gallery has only one item
        //   "toggleControls"  - show/hide controls
        //   "zoom"            - zoom image (if loaded)
        //   false             - do nothing
        // Clicked on the content
        clickContent : function( current, event ) {
            return current.type === 'image' ? 'zoom' : false;
        },
        // Clicked on the slide
        clickSlide : 'close',
        // Clicked on the background (backdrop) element
        clickOutside : 'close',
        // Same as previous two, but for double click
        dblclickContent : false,
        dblclickSlide   : false,
        dblclickOutside : false,
        // Custom options when mobile device is detected
        // =============================================
        mobile : {
            margin : 0,
            clickContent : function( current, event ) {
                return current.type === 'image' ? 'toggleControls' : false;
            },
            clickSlide : function( current, event ) {
                return current.type === 'image' ? 'toggleControls' : 'close';
            },
            dblclickContent : function( current, event ) {
                return current.type === 'image' ? 'zoom' : false;
            },
            dblclickSlide : function( current, event ) {
                return current.type === 'image' ? 'zoom' : false;
            }
        },
        // Internationalization
        // ============
        lang : 'en',
        i18n : {
            'en' : {
                CLOSE       : 'Close',
                NEXT        : 'Next',
                PREV        : 'Previous',
                ERROR       : 'The requested content cannot be loaded. <br/> Please try again later.',
                PLAY_START  : 'Start slideshow',
                PLAY_STOP   : 'Pause slideshow',
                FULL_SCREEN : 'Full screen',
                THUMBS      : 'Thumbnails',
                DOWNLOAD    : 'Download',
                SHARE       : 'Share',
                ZOOM        : 'Zoom'
            },
            'de' : {
                CLOSE       : 'Schliessen',
                NEXT        : 'Weiter',
                PREV        : 'Zurück',
                ERROR       : 'Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.',
                PLAY_START  : 'Diaschau starten',
                PLAY_STOP   : 'Diaschau beenden',
                FULL_SCREEN : 'Vollbild',
                THUMBS      : 'Vorschaubilder',
                DOWNLOAD    : 'Herunterladen',
                SHARE       : 'Teilen',
                ZOOM        : 'Maßstab'
            }
        }
    };
    // Few useful variables and methods
    // ================================
    var $W = $(window);
    var $D = $(document);
    var called = 0;
    // Check if an object is a jQuery object and not a native JavaScript object
    // ========================================================================
    var isQuery = function ( obj ) {
        return obj && obj.hasOwnProperty && obj instanceof $;
    };
    // Handle multiple browsers for "requestAnimationFrame" and "cancelAnimationFrame"
    // ===============================================================================
    var requestAFrame = (function () {
        return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                // if all else fails, use setTimeout
                function (callback) {
                    return window.setTimeout(callback, 1000 / 60);
                };
    })();
    // Detect the supported transition-end event property name
    // =======================================================
    var transitionEnd = (function () {
        var t, el = document.createElement("fakeelement");
        var transitions = {
            "transition"      : "transitionend",
            "OTransition"     : "oTransitionEnd",
            "MozTransition"   : "transitionend",
            "WebkitTransition": "webkitTransitionEnd"
        };
        for (t in transitions) {
            if (el.style[t] !== undefined){
                return transitions[t];
            }
        }
        return 'transitionend';
    })();
    // Force redraw on an element.
    // This helps in cases where the browser doesn't redraw an updated element properly.
    // =================================================================================
    var forceRedraw = function( $el ) {
        return ( $el && $el.length && $el[0].offsetHeight );
    };
    // Class definition
    // ================
    var FancyBox = function( content, opts, index ) {
        var self = this;
        self.opts = $.extend( true, { index : index }, $.fancybox.defaults, opts || {} );
        if ( $.fancybox.isMobile ) {
            self.opts = $.extend( true, {}, self.opts, self.opts.mobile );
        }
        // Exclude buttons option from deep merging
        if ( opts && $.isArray( opts.buttons ) ) {
            self.opts.buttons = opts.buttons;
        }
        self.id    = self.opts.id || ++called;
        self.group = [];
        self.currIndex = parseInt( self.opts.index, 10 ) || 0;
        self.prevIndex = null;
        self.prevPos = null;
        self.currPos = 0;
        self.firstRun = null;
        // Create group elements from original item collection
        self.createGroup( content );
        if ( !self.group.length ) {
            return;
        }
        // Save last active element and current scroll position
        self.$lastFocus = $(document.activeElement).blur();
        // Collection of gallery objects
        self.slides = {};
        self.init();
    };
    $.extend(FancyBox.prototype, {
        // Create DOM structure
        // ====================
        init : function() {
            var self = this,
                firstItem      = self.group[ self.currIndex ],
                firstItemOpts  = firstItem.opts,
                scrollbarWidth = $.fancybox.scrollbarWidth,
                $scrollDiv,
                $container,
                buttonStr;
            self.scrollTop  = $D.scrollTop();
            self.scrollLeft = $D.scrollLeft();
            // Hide scrollbars
            // ===============
            if ( !$.fancybox.getInstance() ) {
                $( 'body' ).addClass( 'fancybox-active' );
                // iOS hack
                if ( /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream ) {
                    // iOS has problems for input elements inside fixed containers,
                    // the workaround is to apply `position: fixed` to `<body>` element,
                    // unfortunately, this makes it lose the scrollbars and forces address bar to appear.
                    if ( firstItem.type !== 'image' ) {
                        $( 'body' ).css( 'top', $( 'body' ).scrollTop() * -1 ).addClass( 'fancybox-iosfix' );
                    }
                } else if ( !$.fancybox.isMobile && document.body.scrollHeight > window.innerHeight ) {
                    if ( scrollbarWidth === undefined ) {
                        $scrollDiv = $('<div style="width:50px;height:50px;overflow:scroll;" />').appendTo( 'body' );
                        scrollbarWidth = $.fancybox.scrollbarWidth = $scrollDiv[0].offsetWidth - $scrollDiv[0].clientWidth;
                        $scrollDiv.remove();
                    }
                    $( 'head' ).append( '<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar { margin-right: ' + scrollbarWidth + 'px; }</style>' );
                    $( 'body' ).addClass( 'compensate-for-scrollbar' );
                }
            }
            // Build html markup and set references
            // ====================================
            // Build html code for buttons and insert into main template
            buttonStr = '';
            $.each( firstItemOpts.buttons, function( index, value ) {
                buttonStr += ( firstItemOpts.btnTpl[ value ] || '' );
            });
            // Create markup from base template, it will be initially hidden to
            // avoid unnecessary work like painting while initializing is not complete
            $container = $(
                self.translate( self,
                    firstItemOpts.baseTpl
                        .replace( '\{\{buttons\}\}', buttonStr )
                        .replace( '\{\{arrows\}\}', firstItemOpts.btnTpl.arrowLeft + firstItemOpts.btnTpl.arrowRight )
                )
            )
                .attr( 'id', 'fancybox-container-' + self.id )
                .addClass( 'fancybox-is-hidden' )
                .addClass( firstItemOpts.baseClass )
                .data( 'FancyBox', self )
                .appendTo( firstItemOpts.parentEl );
            // Create object holding references to jQuery wrapped nodes
            self.$refs = {
                container : $container
            };
            [ 'bg', 'inner', 'infobar', 'toolbar', 'stage', 'caption', 'navigation' ].forEach(function(item) {
                self.$refs[ item ] = $container.find( '.fancybox-' + item );
            });
            self.trigger( 'onInit' );
            // Enable events, deactive previous instances
            self.activate();
            // Build slides, load and reveal content
            self.jumpTo( self.currIndex );
        },
        // Simple i18n support - replaces object keys found in template
        // with corresponding values
        // ============================================================
        translate : function( obj, str ) {
            var arr = obj.opts.i18n[ obj.opts.lang ];
            return str.replace(/\{\{(\w+)\}\}/g, function(match, n) {
                var value = arr[n];
                if ( value === undefined ) {
                    return match;
                }
                return value;
            });
        },
        // Create array of gally item objects
        // Check if each object has valid type and content
        // ===============================================
        createGroup : function ( content ) {
            var self  = this;
            var items = $.makeArray( content );
            $.each(items, function( i, item ) {
                var obj  = {},
                    opts = {},
                    $item,
                    type,
                    src,
                    srcParts;
                // Step 1 - Make sure we have an object
                // ====================================
                if ( $.isPlainObject( item ) ) {
                    // We probably have manual usage here, something like
                    // $.fancybox.open( [ { src : "image.jpg", type : "image" } ] )
                    obj  = item;
                    opts = item.opts || item;
                } else if ( $.type( item ) === 'object' && $( item ).length ) {
                    // Here we probably have jQuery collection returned by some selector
                    $item = $( item );
                    opts = $item.data();
                    opts = $.extend( {}, opts, opts.options || {} );
                    // Here we store clicked element
                    opts.$orig = $item;
                    obj.src = opts.src || $item.attr( 'href' );
                    // Assume that simple syntax is used, for example:
                    //   `$.fancybox.open( $("#test"), {} );`
                    if ( !obj.type && !obj.src ) {
                        obj.type = 'inline';
                        obj.src  = item;
                    }
                } else {
                    // Assume we have a simple html code, for example:
                    //   $.fancybox.open( '<div><h1>Hi!</h1></div>' );
                    obj = {
                        type : 'html',
                        src  : item + ''
                    };
                }
                // Each gallery object has full collection of options
                obj.opts = $.extend( true, {}, self.opts, opts );
                // Do not merge buttons array
                if ( $.isArray( opts.buttons ) ) {
                    obj.opts.buttons = opts.buttons;
                }
                // Step 2 - Make sure we have content type, if not - try to guess
                // ==============================================================
                type = obj.type || obj.opts.type;
                src  = obj.src || '';
                if ( !type && src ) {
                    if ( src.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ) {
                        type = 'image';
                    } else if ( src.match(/\.(pdf)((\?|#).*)?$/i) ) {
                        type = 'pdf';
                    } else if ( src.charAt(0) === '#' ) {
                        type = 'inline';
                    }
                }
                if ( type ) {
                    obj.type = type;
                } else {
                    self.trigger( 'objectNeedsType', obj );
                }
                // Step 3 - Some adjustments
                // =========================
                obj.index = self.group.length;
                // Check if $orig and $thumb objects exist
                if ( obj.opts.$orig && !obj.opts.$orig.length ) {
                    delete obj.opts.$orig;
                }
                if ( !obj.opts.$thumb && obj.opts.$orig ) {
                    obj.opts.$thumb = obj.opts.$orig.find( 'img:first' );
                }
                if ( obj.opts.$thumb && !obj.opts.$thumb.length ) {
                    delete obj.opts.$thumb;
                }
                // "caption" is a "special" option, it can be used to customize caption per gallery item ..
                if ( $.type( obj.opts.caption ) === 'function' ) {
                    obj.opts.caption = obj.opts.caption.apply( item, [ self, obj ] );
                }
                if ( $.type( self.opts.caption ) === 'function' ) {
                    obj.opts.caption = self.opts.caption.apply( item, [ self, obj ] );
                }
                // Make sure we have caption as a string or jQuery object
                if ( !( obj.opts.caption instanceof $ ) ) {
                    obj.opts.caption = obj.opts.caption === undefined ? '' : obj.opts.caption + '';
                }
                // Check if url contains "filter" used to filter the content
                // Example: "ajax.html #something"
                if ( type === 'ajax' ) {
                    srcParts = src.split(/\s+/, 2);
                    if ( srcParts.length > 1 ) {
                        obj.src = srcParts.shift();
                        obj.opts.filter = srcParts.shift();
                    }
                }
                if ( obj.opts.smallBtn == 'auto' ) {
                    if ( $.inArray( type, ['html', 'inline', 'ajax'] ) > -1 ) {
                        obj.opts.toolbar  = false;
                        obj.opts.smallBtn = true;
                    } else {
                        obj.opts.smallBtn = false;
                    }
                }
                // If the type is "pdf", then simply load file into iframe
                if ( type === 'pdf' ) {
                    obj.type = 'iframe';
                    obj.opts.iframe.preload = false;
                }
                // Hide all buttons and disable interactivity for modal items
                if ( obj.opts.modal ) {
                    obj.opts = $.extend(true, obj.opts, {
                        // Remove buttons
                        infobar : 0,
                        toolbar : 0,
                        smallBtn : 0,
                        // Disable keyboard navigation
                        keyboard : 0,
                        // Disable some modules
                        slideShow  : 0,
                        fullScreen : 0,
                        thumbs     : 0,
                        touch      : 0,
                        // Disable click event handlers
                        clickContent    : false,
                        clickSlide      : false,
                        clickOutside    : false,
                        dblclickContent : false,
                        dblclickSlide   : false,
                        dblclickOutside : false
                    });
                }
                // Step 4 - Add processed object to group
                // ======================================
                self.group.push( obj );
            });
        },
        // Attach an event handler functions for:
        //   - navigation buttons
        //   - browser scrolling, resizing;
        //   - focusing
        //   - keyboard
        //   - detect idle
        // ======================================
        addEvents : function() {
            var self = this;
            self.removeEvents();
            // Make navigation elements clickable
            self.$refs.container.on('click.fb-close', '[data-fancybox-close]', function(e) {
                e.stopPropagation();
                e.preventDefault();
                self.close( e );
            }).on( 'click.fb-prev touchend.fb-prev', '[data-fancybox-prev]', function(e) {
                e.stopPropagation();
                e.preventDefault();
                self.previous();
            }).on( 'click.fb-next touchend.fb-next', '[data-fancybox-next]', function(e) {
                e.stopPropagation();
                e.preventDefault();
                self.next();
            }).on( 'click.fb', '[data-fancybox-zoom]', function(e) {
                // Click handler for zoom button
                self[ self.isScaledDown() ? 'scaleToActual' : 'scaleToFit' ]();
            });
            // Handle page scrolling and browser resizing
            $W.on('orientationchange.fb resize.fb', function(e) {
                if ( e && e.originalEvent && e.originalEvent.type === "resize" ) {
                    requestAFrame(function() {
                        self.update();
                    });
                } else {
                    self.$refs.stage.hide();
                    setTimeout(function() {
                        self.$refs.stage.show();
                        self.update();
                    }, 600);
                }
            });
            // Trap keyboard focus inside of the modal, so the user does not accidentally tab outside of the modal
            // (a.k.a. "escaping the modal")
            $D.on('focusin.fb', function(e) {
                var instance = $.fancybox ? $.fancybox.getInstance() : null;
                if ( instance.isClosing || !instance.current || !instance.current.opts.trapFocus || $( e.target ).hasClass( 'fancybox-container' ) || $( e.target ).is( document ) ) {
                    return;
                }
                if ( instance && $( e.target ).css( 'position' ) !== 'fixed' && !instance.$refs.container.has( e.target ).length ) {
                    e.stopPropagation();
                    instance.focus();
                    // Sometimes page gets scrolled, set it back
                    $W.scrollTop( self.scrollTop ).scrollLeft( self.scrollLeft );
                }
            });
            // Enable keyboard navigation
            $D.on('keydown.fb', function (e) {
                var current = self.current,
                    keycode = e.keyCode || e.which;
                if ( !current || !current.opts.keyboard ) {
                    return;
                }
                if ( $(e.target).is('input') || $(e.target).is('textarea') ) {
                    return;
                }
                // Backspace and Esc keys
                if ( keycode === 8 || keycode === 27 ) {
                    e.preventDefault();
                    self.close( e );
                    return;
                }
                // Left arrow and Up arrow
                if ( keycode === 37 || keycode === 38 ) {
                    e.preventDefault();
                    self.previous();
                    return;
                }
                // Righ arrow and Down arrow
                if ( keycode === 39 || keycode === 40 ) {
                    e.preventDefault();
                    self.next();
                    return;
                }
                self.trigger('afterKeydown', e, keycode);
            });
            // Hide controls after some inactivity period
            if ( self.group[ self.currIndex ].opts.idleTime ) {
                self.idleSecondsCounter = 0;
                $D.on('mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle', function(e) {
                    self.idleSecondsCounter = 0;
                    if ( self.isIdle ) {
                        self.showControls();
                    }
                    self.isIdle = false;
                });
                self.idleInterval = window.setInterval(function() {
                    self.idleSecondsCounter++;
                    if ( self.idleSecondsCounter >= self.group[ self.currIndex ].opts.idleTime ) {
                        self.isIdle = true;
                        self.idleSecondsCounter = 0;
                        self.hideControls();
                    }
                }, 1000);
            }
        },
        // Remove events added by the core
        // ===============================
        removeEvents : function() {
            var self = this;
            $W.off( 'orientationchange.fb resize.fb' );
            $D.off( 'focusin.fb keydown.fb .fb-idle' );
            this.$refs.container.off( '.fb-close .fb-prev .fb-next' );
            if ( self.idleInterval ) {
                window.clearInterval( self.idleInterval );
                self.idleInterval = null;
            }
        },
        // Change to previous gallery item
        // ===============================
        previous : function( duration ) {
            return this.jumpTo( this.currPos - 1, duration );
        },
        // Change to next gallery item
        // ===========================
        next : function( duration ) {
            return this.jumpTo( this.currPos + 1, duration );
        },
        // Switch to selected gallery item
        // ===============================
        jumpTo : function ( pos, duration, slide ) {
            var self = this,
                firstRun,
                loop,
                current,
                previous,
                canvasWidth,
                currentPos,
                transitionProps;
            var groupLen = self.group.length;
            if ( self.isSliding || self.isClosing || ( self.isAnimating && self.firstRun ) ) {
                return;
            }
            pos  = parseInt( pos, 10 );
            loop = self.current ? self.current.opts.loop : self.opts.loop;
            if ( !loop && ( pos < 0 || pos >= groupLen ) ) {
                return false;
            }
            firstRun = self.firstRun = ( self.firstRun === null );
            if ( groupLen < 2 && !firstRun && !!self.isSliding ) {
                return;
            }
            previous = self.current;
            self.prevIndex = self.currIndex;
            self.prevPos   = self.currPos;
            // Create slides
            current = self.createSlide( pos );
            if ( groupLen > 1 ) {
                if ( loop || current.index > 0 ) {
                    self.createSlide( pos - 1 );
                }
                if ( loop || current.index < groupLen - 1 ) {
                    self.createSlide( pos + 1 );
                }
            }
            self.current   = current;
            self.currIndex = current.index;
            self.currPos   = current.pos;
            self.trigger( 'beforeShow', firstRun );
            self.updateControls();
            currentPos = $.fancybox.getTranslate( current.$slide );
            current.isMoved        = ( currentPos.left !== 0 || currentPos.top !== 0 ) && !current.$slide.hasClass( 'fancybox-animated' );
            current.forcedDuration = undefined;
            if ( $.isNumeric( duration ) ) {
                current.forcedDuration = duration;
            } else {
                duration = current.opts[ firstRun ? 'animationDuration' : 'transitionDuration' ];
            }
            duration = parseInt( duration, 10 );
            // Fresh start - reveal container, current slide and start loading content
            if ( firstRun ) {
                if ( current.opts.animationEffect && duration ) {
                    self.$refs.container.css( 'transition-duration', duration + 'ms' );
                }
                self.$refs.container.removeClass( 'fancybox-is-hidden' );
                forceRedraw( self.$refs.container );
                self.$refs.container.addClass( 'fancybox-is-open' );
                // Make first slide visible (to display loading icon, if needed)
                current.$slide.addClass( 'fancybox-slide--current' );
                self.loadSlide( current );
                self.preload();
                return;
            }
            // Clean up
            $.each(self.slides, function( index, slide ) {
                $.fancybox.stop( slide.$slide );
            });
            // Make current that slide is visible even if content is still loading
            current.$slide.removeClass( 'fancybox-slide--next fancybox-slide--previous' ).addClass( 'fancybox-slide--current' );
            // If slides have been dragged, animate them to correct position
            if ( current.isMoved ) {
                canvasWidth = Math.round( current.$slide.width() );
                $.each(self.slides, function( index, slide ) {
                    var pos = slide.pos - current.pos;
                    $.fancybox.animate( slide.$slide, {
                        top  : 0,
                        left : ( pos * canvasWidth ) + ( pos * slide.opts.gutter )
                    }, duration, function() {
                        slide.$slide.removeAttr('style').removeClass( 'fancybox-slide--next fancybox-slide--previous' );
                        if ( slide.pos === self.currPos ) {
                            current.isMoved = false;
                            self.complete();
                        }
                    });
                });
            } else {
                self.$refs.stage.children().removeAttr( 'style' );
            }
            // Start transition that reveals current content
            // or wait when it will be loaded
            if ( current.isLoaded ) {
                self.revealContent( current );
            } else {
                self.loadSlide( current );
            }
            self.preload();
            if ( previous.pos === current.pos ) {
                return;
            }
            // Handle previous slide
            // =====================
            transitionProps = 'fancybox-slide--' + ( previous.pos > current.pos ? 'next' : 'previous' );
            previous.$slide.removeClass( 'fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous' );
            previous.isComplete = false;
            if ( !duration || ( !current.isMoved && !current.opts.transitionEffect ) ) {
                return;
            }
            if ( current.isMoved ) {
                previous.$slide.addClass( transitionProps );
            } else {
                transitionProps = 'fancybox-animated ' + transitionProps + ' fancybox-fx-' + current.opts.transitionEffect;
                $.fancybox.animate( previous.$slide, transitionProps, duration, function() {
                    previous.$slide.removeClass( transitionProps ).removeAttr( 'style' );
                });
            }
        },
        // Create new "slide" element
        // These are gallery items  that are actually added to DOM
        // =======================================================
        createSlide : function( pos ) {
            var self = this;
            var $slide;
            var index;
            index = pos % self.group.length;
            index = index < 0 ? self.group.length + index : index;
            if ( !self.slides[ pos ] && self.group[ index ] ) {
                $slide = $('<div class="fancybox-slide"></div>').appendTo( self.$refs.stage );
                self.slides[ pos ] = $.extend( true, {}, self.group[ index ], {
                    pos      : pos,
                    $slide   : $slide,
                    isLoaded : false,
                });
                self.updateSlide( self.slides[ pos ] );
            }
            return self.slides[ pos ];
        },
        // Scale image to the actual size of the image
        // ===========================================
        scaleToActual : function( x, y, duration ) {
            var self = this;
            var current = self.current;
            var $what   = current.$content;
            var imgPos, posX, posY, scaleX, scaleY;
            var canvasWidth  = parseInt( current.$slide.width(), 10 );
            var canvasHeight = parseInt( current.$slide.height(), 10 );
            var newImgWidth  = current.width;
            var newImgHeight = current.height;
            if ( !( current.type == 'image' && !current.hasError) || !$what || self.isAnimating ) {
                return;
            }
            $.fancybox.stop( $what );
            self.isAnimating = true;
            x = x === undefined ? canvasWidth  * 0.5  : x;
            y = y === undefined ? canvasHeight * 0.5  : y;
            imgPos = $.fancybox.getTranslate( $what );
            scaleX  = newImgWidth  / imgPos.width;
            scaleY  = newImgHeight / imgPos.height;
            // Get center position for original image
            posX = ( canvasWidth * 0.5  - newImgWidth * 0.5 );
            posY = ( canvasHeight * 0.5 - newImgHeight * 0.5 );
            // Make sure image does not move away from edges
            if ( newImgWidth > canvasWidth ) {
                posX = imgPos.left * scaleX - ( ( x * scaleX ) - x );
                if ( posX > 0 ) {
                    posX = 0;
                }
                if ( posX <  canvasWidth - newImgWidth ) {
                    posX = canvasWidth - newImgWidth;
                }
            }
            if ( newImgHeight > canvasHeight) {
                posY = imgPos.top  * scaleY - ( ( y * scaleY ) - y );
                if ( posY > 0 ) {
                    posY = 0;
                }
                if ( posY <  canvasHeight - newImgHeight ) {
                    posY = canvasHeight - newImgHeight;
                }
            }
            self.updateCursor( newImgWidth, newImgHeight );
            $.fancybox.animate( $what, {
                top    : posY,
                left   : posX,
                scaleX : scaleX,
                scaleY : scaleY
            }, duration || 330, function() {
                self.isAnimating = false;
            });
            // Stop slideshow
            if ( self.SlideShow && self.SlideShow.isActive ) {
                self.SlideShow.stop();
            }
        },
        // Scale image to fit inside parent element
        // ========================================
        scaleToFit : function( duration ) {
            var self = this;
            var current = self.current;
            var $what   = current.$content;
            var end;
            if ( !( current.type == 'image' && !current.hasError) || !$what || self.isAnimating ) {
                return;
            }
            $.fancybox.stop( $what );
            self.isAnimating = true;
            end = self.getFitPos( current );
            self.updateCursor( end.width, end.height );
            $.fancybox.animate( $what, {
                top    : end.top,
                left   : end.left,
                scaleX : end.width  / $what.width(),
                scaleY : end.height / $what.height()
            }, duration || 330, function() {
                self.isAnimating = false;
            });
        },
        // Calculate image size to fit inside viewport
        // ===========================================
        getFitPos : function( slide ) {
            var self  = this;
            var $what = slide.$content;
            var imgWidth  = slide.width;
            var imgHeight = slide.height;
            var margin = slide.opts.margin;
            var canvasWidth, canvasHeight, minRatio, width, height;
            if ( !$what || !$what.length || ( !imgWidth && !imgHeight) ) {
                return false;
            }
            // Convert "margin to CSS style: [ top, right, bottom, left ]
            if ( $.type( margin ) === "number" ) {
                margin = [ margin, margin ];
            }
            if ( margin.length == 2 ) {
                margin = [ margin[0], margin[1], margin[0], margin[1] ];
            }
            // We can not use $slide width here, because it can have different diemensions while in transiton
            canvasWidth  = parseInt( self.$refs.stage.width(), 10 )  - ( margin[ 1 ] + margin[ 3 ] );
            canvasHeight = parseInt( self.$refs.stage.height(), 10 ) - ( margin[ 0 ] + margin[ 2 ] );
            minRatio = Math.min(1, canvasWidth / imgWidth, canvasHeight / imgHeight );
            width  = Math.floor( minRatio * imgWidth );
            height = Math.floor( minRatio * imgHeight );
            // Use floor rounding to make sure it really fits
            return {
                top    : Math.floor( ( canvasHeight - height ) * 0.5 ) + margin[ 0 ],
                left   : Math.floor( ( canvasWidth  - width )  * 0.5 ) + margin[ 3 ],
                width  : width,
                height : height
            };
        },
        // Update position and content of all slides
        // =========================================
        update : function() {
            var self = this;
            $.each( self.slides, function( key, slide ) {
                self.updateSlide( slide );
            });
        },
        // Update slide position and scale content to fit
        // ==============================================
        updateSlide : function( slide ) {
            var self  = this;
            var $what = slide.$content;
            if ( $what && ( slide.width || slide.height ) ) {
                self.isAnimating = false;
                $.fancybox.stop( $what );
                $.fancybox.setTranslate( $what, self.getFitPos( slide ) );
                if ( slide.pos === self.currPos ) {
                    self.updateCursor();
                }
            }
            slide.$slide.trigger( 'refresh' );
            self.trigger( 'onUpdate', slide );
        },
        // Update cursor style depending if content can be zoomed
        // ======================================================
        updateCursor : function( nextWidth, nextHeight ) {
            var self = this;
            var isScaledDown;
            var $container = self.$refs.container.removeClass( 'fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut' );
            if ( !self.current || self.isClosing ) {
                return;
            }
            if ( self.isZoomable() ) {
                $container.addClass( 'fancybox-is-zoomable' );
                if ( nextWidth !== undefined && nextHeight !== undefined ) {
                    isScaledDown = nextWidth < self.current.width && nextHeight < self.current.height;
                } else {
                    isScaledDown = self.isScaledDown();
                }
                if ( isScaledDown ) {
                    // If image is scaled down, then, obviously, it can be zoomed to full size
                    $container.addClass( 'fancybox-can-zoomIn' );
                } else {
                    if ( self.current.opts.touch ) {
                        // If image size ir largen than available available and touch module is not disable,
                        // then user can do panning
                        $container.addClass( 'fancybox-can-drag' );
                    } else {
                        $container.addClass( 'fancybox-can-zoomOut' );
                    }
                }
            } else if ( self.current.opts.touch ) {
                $container.addClass( 'fancybox-can-drag' );
            }
        },
        // Check if current slide is zoomable
        // ==================================
        isZoomable : function() {
            var self = this;
            var current = self.current;
            var fitPos;
            if ( !current || self.isClosing ) {
                return;
            }
            // Assume that slide is zoomable if
            //   - image is loaded successfuly
            //   - click action is "zoom"
            //   - actual size of the image is smaller than available area
            if ( current.type === 'image' && current.isLoaded && !current.hasError &&
                ( current.opts.clickContent === 'zoom' || ( $.isFunction( current.opts.clickContent ) && current.opts.clickContent( current ) ===  "zoom" ) )
            ) {
                fitPos = self.getFitPos( current );
                if ( current.width > fitPos.width || current.height > fitPos.height ) {
                    return true;
                }
            }
            return false;
        },
        // Check if current image dimensions are smaller than actual
        // =========================================================
        isScaledDown : function() {
            var self = this;
            var current = self.current;
            var $what   = current.$content;
            var rez = false;
            if ( $what ) {
                rez = $.fancybox.getTranslate( $what );
                rez = rez.width < current.width || rez.height < current.height;
            }
            return rez;
        },
        // Check if image dimensions exceed parent element
        // ===============================================
        canPan : function() {
            var self = this;
            var current = self.current;
            var $what   = current.$content;
            var rez = false;
            if ( $what ) {
                rez = self.getFitPos( current );
                rez = Math.abs( $what.width() - rez.width ) > 1  || Math.abs( $what.height() - rez.height ) > 1;
            }
            return rez;
        },
        // Load content into the slide
        // ===========================
        loadSlide : function( slide ) {
            var self = this, type, $slide;
            var ajaxLoad;
            if ( slide.isLoading ) {
                return;
            }
            if ( slide.isLoaded ) {
                return;
            }
            slide.isLoading = true;
            self.trigger( 'beforeLoad', slide );
            type   = slide.type;
            $slide = slide.$slide;
            $slide
                .off( 'refresh' )
                .trigger( 'onReset' )
                .addClass( 'fancybox-slide--' + ( type || 'unknown' ) )
                .addClass( slide.opts.slideClass );
            // Create content depending on the type
            switch ( type ) {
                case 'image':
                    self.setImage( slide );
                break;
                case 'iframe':
                    self.setIframe( slide );
                break;
                case 'html':
                    self.setContent( slide, slide.src || slide.content );
                break;
                case 'inline':
                    if ( $( slide.src ).length ) {
                        self.setContent( slide, $( slide.src ) );
                    } else {
                        self.setError( slide );
                    }
                break;
                case 'ajax':
                    self.showLoading( slide );
                    ajaxLoad = $.ajax( $.extend( {}, slide.opts.ajax.settings, {
                        url : slide.src,
                        success : function ( data, textStatus ) {
                            if ( textStatus === 'success' ) {
                                self.setContent( slide, data );
                            }
                        },
                        error : function ( jqXHR, textStatus ) {
                            if ( jqXHR && textStatus !== 'abort' ) {
                                self.setError( slide );
                            }
                        }
                    }));
                    $slide.one( 'onReset', function () {
                        ajaxLoad.abort();
                    });
                break;
                default:
                    self.setError( slide );
                break;
            }
            return true;
        },
        // Use thumbnail image, if possible
        // ================================
        setImage : function( slide ) {
            var self   = this;
            var srcset = slide.opts.srcset || slide.opts.image.srcset;
            var found, temp, pxRatio, windowWidth;
            // If we have "srcset", then we need to find matching "src" value.
            // This is necessary, because when you set an src attribute, the browser will preload the image
            // before any javascript or even CSS is applied.
            if ( srcset ) {
                pxRatio     = window.devicePixelRatio || 1;
                windowWidth = window.innerWidth  * pxRatio;
                temp = srcset.split(',').map(function ( el ) {
            		var ret = {};
            		el.trim().split(/\s+/).forEach(function ( el, i ) {
                        var value = parseInt( el.substring(0, el.length - 1), 10 );
            			if ( i === 0 ) {
            				return ( ret.url = el );
            			}
                        if ( value ) {
                            ret.value   = value;
                            ret.postfix = el[ el.length - 1 ];
                        }
            		});
            		return ret;
            	});
                // Sort by value
                temp.sort(function (a, b) {
                  return a.value - b.value;
                });
                // Ok, now we have an array of all srcset values
                for ( var j = 0; j < temp.length; j++ ) {
                    var el = temp[ j ];
                    if ( ( el.postfix === 'w' && el.value >= windowWidth ) || ( el.postfix === 'x' && el.value >= pxRatio ) ) {
                        found = el;
                        break;
                    }
                }
                // If not found, take the last one
                if ( !found && temp.length ) {
                    found = temp[ temp.length - 1 ];
                }
                if ( found ) {
                    slide.src = found.url;
                    // If we have default width/height values, we can calculate height for matching source
                    if ( slide.width && slide.height && found.postfix == 'w' ) {
                        slide.height = ( slide.width / slide.height ) * found.value;
                        slide.width  = found.value;
                    }
                }
            }
            // This will be wrapper containing both ghost and actual image
            slide.$content = $('<div class="fancybox-image-wrap"></div>')
                .addClass( 'fancybox-is-hidden' )
                .appendTo( slide.$slide );
            // If we have a thumbnail, we can display it while actual image is loading
            // Users will not stare at black screen and actual image will appear gradually
            if ( slide.opts.preload !== false && slide.opts.width && slide.opts.height && ( slide.opts.thumb || slide.opts.$thumb ) ) {
                slide.width  = slide.opts.width;
                slide.height = slide.opts.height;
                slide.$ghost = $('<img />')
                    .one('error', function() {
                        $(this).remove();
                        slide.$ghost = null;
                        self.setBigImage( slide );
                    })
                    .one('load', function() {
                        self.afterLoad( slide );
                        self.setBigImage( slide );
                    })
                    .addClass( 'fancybox-image' )
                    .appendTo( slide.$content )
                    .attr( 'src', slide.opts.thumb || slide.opts.$thumb.attr( 'src' ) );
            } else {
                self.setBigImage( slide );
            }
        },
        // Create full-size image
        // ======================
        setBigImage : function ( slide ) {
            var self = this;
            var $img = $('<img />');
            slide.$image = $img
                .one('error', function() {
                    self.setError( slide );
                })
                .one('load', function() {
                    // Clear timeout that checks if loading icon needs to be displayed
                    clearTimeout( slide.timouts );
                    slide.timouts = null;
                    if ( self.isClosing ) {
                        return;
                    }
                    slide.width  = this.naturalWidth;
                    slide.height = this.naturalHeight;
                    if ( slide.opts.image.srcset ) {
                        $img.attr( 'sizes', '100vw' ).attr( 'srcset', slide.opts.image.srcset );
                    }
                    self.hideLoading( slide );
                    if ( slide.$ghost ) {
                        slide.timouts = setTimeout(function() {
                            slide.timouts = null;
                            slide.$ghost.hide();
                        }, Math.min( 300, Math.max( 1000, slide.height / 1600 ) ) );
                    } else {
                        self.afterLoad( slide );
                    }
                })
                .addClass( 'fancybox-image' )
                .attr('src', slide.src)
                .appendTo( slide.$content );
            if ( ( $img[0].complete || $img[0].readyState == "complete" ) && $img[0].naturalWidth && $img[0].naturalHeight ) {
                  $img.trigger( 'load' );
            } else if( $img[0].error ) {
                 $img.trigger( 'error' );
            } else {
                slide.timouts = setTimeout(function() {
                    if ( !$img[0].complete && !slide.hasError ) {
                        self.showLoading( slide );
                    }
                }, 100);
            }
        },
        // Create iframe wrapper, iframe and bindings
        // ==========================================
        setIframe : function( slide ) {
            var self	= this,
                opts    = slide.opts.iframe,
                $slide	= slide.$slide,
                $iframe;
            slide.$content = $('<div class="fancybox-content' + ( opts.preload ? ' fancybox-is-hidden' : '' ) + '"></div>')
                .css( opts.css )
                .appendTo( $slide );
            $iframe = $( opts.tpl.replace(/\{rnd\}/g, new Date().getTime()) )
                .attr( opts.attr )
                .appendTo( slide.$content );
            if ( opts.preload ) {
                self.showLoading( slide );
                // Unfortunately, it is not always possible to determine if iframe is successfully loaded
                // (due to browser security policy)
                $iframe.on('load.fb error.fb', function(e) {
                    this.isReady = 1;
                    slide.$slide.trigger( 'refresh' );
                    self.afterLoad( slide );
                });
                // Recalculate iframe content size
                // ===============================
                $slide.on('refresh.fb', function() {
                    var $wrap = slide.$content,
                        frameWidth  = opts.css.width,
                        frameHeight = opts.css.height,
                        scrollWidth,
                        $contents,
                        $body;
                    if ( $iframe[0].isReady !== 1 ) {
                        return;
                    }
                    // Check if content is accessible,
                    // it will fail if frame is not with the same origin
                    try {
                        $contents = $iframe.contents();
                        $body     = $contents.find('body');
                    } catch (ignore) {}
                    // Calculate dimensions for the wrapper
                    if ( $body && $body.length ) {
                        if ( frameWidth === undefined ) {
                            scrollWidth = $iframe[0].contentWindow.document.documentElement.scrollWidth;
                            frameWidth = Math.ceil( $body.outerWidth(true) + ( $wrap.width() - scrollWidth ) );
                            frameWidth += $wrap.outerWidth() - $wrap.innerWidth();
                        }
                        if ( frameHeight === undefined ) {
                            frameHeight = Math.ceil( $body.outerHeight(true) );
                            frameHeight += $wrap.outerHeight() - $wrap.innerHeight();
                        }
                        // Resize wrapper to fit iframe content
                        if ( frameWidth ) {
                            $wrap.width( frameWidth );
                        }
                        if ( frameHeight ) {
                            $wrap.height( frameHeight );
                        }
                    }
                    $wrap.removeClass( 'fancybox-is-hidden' );
                });
            } else {
                this.afterLoad( slide );
            }
            $iframe.attr( 'src', slide.src );
            if ( slide.opts.smallBtn === true ) {
                slide.$content.prepend( self.translate( slide, slide.opts.btnTpl.smallBtn ) );
            }
            // Remove iframe if closing or changing gallery item
            $slide.one( 'onReset', function () {
                // This helps IE not to throw errors when closing
                try {
                    $( this ).find( 'iframe' ).hide().attr( 'src', '//about:blank' );
                } catch ( ignore ) {}
                $( this ).empty();
                slide.isLoaded = false;
            });
        },
        // Wrap and append content to the slide
        // ======================================
        setContent : function ( slide, content ) {
            var self = this;
            if ( self.isClosing ) {
                return;
            }
            self.hideLoading( slide );
            slide.$slide.empty();
            if ( isQuery( content ) && content.parent().length ) {
                // If content is a jQuery object, then it will be moved to the slide.
                // The placeholder is created so we will know where to put it back.
                // If user is navigating gallery fast, then the content might be already inside fancyBox
                // =====================================================================================
                // Make sure content is not already moved to fancyBox
                content.parent( '.fancybox-slide--inline' ).trigger( 'onReset' );
                // Create temporary element marking original place of the content
                slide.$placeholder = $( '<div></div>' ).hide().insertAfter( content );
                // Make sure content is visible
                content.css('display', 'inline-block');
            } else if ( !slide.hasError ) {
                // If content is just a plain text, try to convert it to html
                if ( $.type( content ) === 'string' ) {
                    content = $('<div>').append( $.trim( content ) ).contents();
                    // If we have text node, then add wrapping element to make vertical alignment work
                    if ( content[0].nodeType === 3 ) {
                        content = $('<div>').html( content );
                    }
                }
                // If "filter" option is provided, then filter content
                if ( slide.opts.filter ) {
                    content = $('<div>').html( content ).find( slide.opts.filter );
                }
            }
            slide.$slide.one('onReset', function () {
                // Put content back
                if ( slide.$placeholder ) {
                    slide.$placeholder.after( content.hide() ).remove();
                    slide.$placeholder = null;
                }
                // Remove custom close button
                if ( slide.$smallBtn ) {
                    slide.$smallBtn.remove();
                    slide.$smallBtn = null;
                }
                // Remove content and mark slide as not loaded
                if ( !slide.hasError ) {
                    $(this).empty();
                    slide.isLoaded = false;
                }
            });
            slide.$content = $( content ).appendTo( slide.$slide );
            this.afterLoad( slide );
        },
        // Display error message
        // =====================
        setError : function ( slide ) {
            slide.hasError = true;
            slide.$slide.removeClass( 'fancybox-slide--' + slide.type );
            this.setContent( slide, this.translate( slide, slide.opts.errorTpl ) );
        },
        // Show loading icon inside the slide
        // ==================================
        showLoading : function( slide ) {
            var self = this;
            slide = slide || self.current;
            if ( slide && !slide.$spinner ) {
                slide.$spinner = $( self.opts.spinnerTpl ).appendTo( slide.$slide );
            }
        },
        // Remove loading icon from the slide
        // ==================================
        hideLoading : function( slide ) {
            var self = this;
            slide = slide || self.current;
            if ( slide && slide.$spinner ) {
                slide.$spinner.remove();
                delete slide.$spinner;
            }
        },
        // Adjustments after slide content has been loaded
        // ===============================================
        afterLoad : function( slide ) {
            var self = this;
            if ( self.isClosing ) {
                return;
            }
            slide.isLoading = false;
            slide.isLoaded  = true;
            self.trigger( 'afterLoad', slide );
            self.hideLoading( slide );
            if ( slide.opts.smallBtn && !slide.$smallBtn ) {
                slide.$smallBtn = $( self.translate( slide, slide.opts.btnTpl.smallBtn ) ).appendTo( slide.$content.filter('div,form').first() );
            }
            if ( slide.opts.protect && slide.$content && !slide.hasError ) {
                // Disable right click
                slide.$content.on( 'contextmenu.fb', function( e ) {
                     if ( e.button == 2 ) {
                         e.preventDefault();
                     }
                    return true;
                });
                // Add fake element on top of the image
                // This makes a bit harder for user to select image
                if ( slide.type === 'image' ) {
                    $( '<div class="fancybox-spaceball"></div>' ).appendTo( slide.$content );
                }
            }
            self.revealContent( slide );
        },
        // Make content visible
        // This method is called right after content has been loaded or
        // user navigates gallery and transition should start
        // ============================================================
        revealContent : function( slide ) {
            var self   = this;
            var $slide = slide.$slide;
            var effect, effectClassName, duration, opacity, end, start = false;
            effect   = slide.opts[ self.firstRun ? 'animationEffect'   : 'transitionEffect' ];
            duration = slide.opts[ self.firstRun ? 'animationDuration' : 'transitionDuration' ];
            duration = parseInt( slide.forcedDuration === undefined ? duration : slide.forcedDuration, 10 );
            if ( slide.isMoved || slide.pos !== self.currPos || !duration ) {
                effect = false;
            }
            // Check if can zoom
            if ( effect === 'zoom' && !( slide.pos === self.currPos && duration && slide.type === 'image' && !slide.hasError && ( start = self.getThumbPos( slide ) ) ) ) {
                effect = 'fade';
            }
            // Zoom animation
            // ==============
            if ( effect === 'zoom' ) {
                end = self.getFitPos( slide );
                end.scaleX = end.width  / start.width;
                end.scaleY = end.height / start.height;
                delete end.width;
                delete end.height;
                // Check if we need to animate opacity
                opacity = slide.opts.zoomOpacity;
                if ( opacity == 'auto' ) {
                    opacity = Math.abs( slide.width / slide.height - start.width / start.height ) > 0.1;
                }
                if ( opacity ) {
                    start.opacity = 0.1;
                    end.opacity   = 1;
                }
                // Draw image at start position
                $.fancybox.setTranslate( slide.$content.removeClass( 'fancybox-is-hidden' ), start );
                forceRedraw( slide.$content );
                // Start animation
                $.fancybox.animate( slide.$content, end, duration, function() {
                    self.complete();
                });
                return;
            }
            self.updateSlide( slide );
            // Simply show content
            // ===================
            if ( !effect ) {
                forceRedraw( $slide );
                slide.$content.removeClass( 'fancybox-is-hidden' );
                if ( slide.pos === self.currPos ) {
                    self.complete();
                }
                return;
            }
            $.fancybox.stop( $slide );
            effectClassName = 'fancybox-animated fancybox-slide--' + ( slide.pos >= self.prevPos ? 'next' : 'previous' ) + ' fancybox-fx-' + effect;
            $slide.removeAttr( 'style' ).removeClass( 'fancybox-slide--current fancybox-slide--next fancybox-slide--previous' ).addClass( effectClassName );
            slide.$content.removeClass( 'fancybox-is-hidden' );
            //Force reflow for CSS3 transitions
            forceRedraw( $slide );
            $.fancybox.animate( $slide, 'fancybox-slide--current', duration, function(e) {
                $slide.removeClass( effectClassName ).removeAttr( 'style' );
                if ( slide.pos === self.currPos ) {
                    self.complete();
                }
            }, true);
        },
        // Check if we can and have to zoom from thumbnail
        //================================================
        getThumbPos : function( slide ) {
            var self = this;
            var rez  = false;
            // Check if element is inside the viewport by at least 1 pixel
            var isElementVisible = function( $el ) {
                var element = $el[0];
                var elementRect = element.getBoundingClientRect();
                var parentRects = [];
                var visibleInAllParents;
                while ( element.parentElement !== null ) {
                    if ( $(element.parentElement).css('overflow') === 'hidden'  || $(element.parentElement).css('overflow') === 'auto' ) {
                        parentRects.push(element.parentElement.getBoundingClientRect());
                    }
                    element = element.parentElement;
                }
                visibleInAllParents = parentRects.every(function(parentRect){
                    var visiblePixelX = Math.min(elementRect.right, parentRect.right) - Math.max(elementRect.left, parentRect.left);
                    var visiblePixelY = Math.min(elementRect.bottom, parentRect.bottom) - Math.max(elementRect.top, parentRect.top);
                    return visiblePixelX > 0 && visiblePixelY > 0;
                });
                return visibleInAllParents &&
                    elementRect.bottom > 0 && elementRect.right > 0 &&
                    elementRect.left < $(window).width() && elementRect.top < $(window).height();
            };
            var $thumb   = slide.opts.$thumb;
            var thumbPos = $thumb ? $thumb.offset() : 0;
            var slidePos;
            if ( thumbPos && $thumb[0].ownerDocument === document && isElementVisible( $thumb ) ) {
                slidePos = self.$refs.stage.offset();
                rez = {
                    top    : thumbPos.top  - slidePos.top  + parseFloat( $thumb.css( "border-top-width" ) || 0 ),
                    left   : thumbPos.left - slidePos.left + parseFloat( $thumb.css( "border-left-width" ) || 0 ),
                    width  : $thumb.width(),
                    height : $thumb.height(),
                    scaleX : 1,
                    scaleY : 1
                };
            }
            return rez;
        },
        // Final adjustments after current gallery item is moved to position
        // and it`s content is loaded
        // ==================================================================
        complete : function() {
            var self = this;
            var current = self.current;
            var slides  = {};
            if ( current.isMoved || !current.isLoaded || current.isComplete ) {
                return;
            }
            current.isComplete = true;
            current.$slide.siblings().trigger( 'onReset' );
            // Trigger any CSS3 transiton inside the slide
            forceRedraw( current.$slide );
            current.$slide.addClass( 'fancybox-slide--complete' );
            // Remove unnecessary slides
            $.each( self.slides, function( key, slide ) {
                if ( slide.pos >= self.currPos - 1 && slide.pos <= self.currPos + 1 ) {
                    slides[ slide.pos ] = slide;
                } else if ( slide ) {
                    $.fancybox.stop( slide.$slide );
                    slide.$slide.off().remove();
                }
            });
            self.slides = slides;
            self.updateCursor();
            self.trigger( 'afterShow' );
            // Try to focus on the first focusable element
            if ( $( document.activeElement ).is( '[disabled]' ) || ( current.opts.autoFocus && !( current.type == 'image' || current.type === 'iframe' ) ) ) {
                self.focus();
            }
        },
        // Preload next and previous slides
        // ================================
        preload : function() {
            var self = this;
            var next, prev;
            if ( self.group.length < 2 ) {
                return;
            }
            next  = self.slides[ self.currPos + 1 ];
            prev  = self.slides[ self.currPos - 1 ];
            if ( next && next.type === 'image' ) {
                self.loadSlide( next );
            }
            if ( prev && prev.type === 'image' ) {
                self.loadSlide( prev );
            }
        },
        // Try to find and focus on the first focusable element
        // ====================================================
        focus : function() {
            var current = this.current;
            var $el;
            if ( this.isClosing ) {
                return;
            }
            if ( current && current.isComplete ) {
                // Look for first input with autofocus attribute
                $el = current.$slide.find('input[autofocus]:enabled:visible:first');
                if ( !$el.length ) {
                    $el = current.$slide.find('button,:input,[tabindex],a').filter(':enabled:visible:first');
                }
            }
            $el = $el && $el.length ? $el : this.$refs.container;
            $el.focus();
        },
        // Activates current instance - brings container to the front and enables keyboard,
        // notifies other instances about deactivating
        // =================================================================================
        activate : function () {
            var self = this;
            // Deactivate all instances
            $( '.fancybox-container' ).each(function () {
                var instance = $(this).data( 'FancyBox' );
                // Skip self and closing instances
                if (instance && instance.id !== self.id && !instance.isClosing) {
                    instance.trigger( 'onDeactivate' );
                    instance.removeEvents();
                    instance.isVisible = false;
                }
            });
            self.isVisible = true;
            if ( self.current || self.isIdle ) {
                self.update();
                self.updateControls();
            }
            self.trigger( 'onActivate' );
            self.addEvents();
        },
        // Start closing procedure
        // This will start "zoom-out" animation if needed and clean everything up afterwards
        // =================================================================================
        close : function( e, d ) {
            var self    = this;
            var current = self.current;
            var effect, duration;
            var $what, opacity, start, end;
            var done = function() {
                self.cleanUp( e );
            };
            if ( self.isClosing ) {
                return false;
            }
            self.isClosing = true;
            // If beforeClose callback prevents closing, make sure content is centered
            if ( self.trigger( 'beforeClose', e ) === false ) {
                self.isClosing = false;
                requestAFrame(function() {
                    self.update();
                });
                return false;
            }
            // Remove all events
            // If there are multiple instances, they will be set again by "activate" method
            self.removeEvents();
            if ( current.timouts ) {
                clearTimeout( current.timouts );
            }
            $what    = current.$content;
            effect   = current.opts.animationEffect;
            duration = $.isNumeric( d ) ? d : ( effect ? current.opts.animationDuration : 0 );
            // Remove other slides
            current.$slide.off( transitionEnd ).removeClass( 'fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated' );
            current.$slide.siblings().trigger( 'onReset' ).remove();
            // Trigger animations
            if ( duration ) {
                self.$refs.container.removeClass( 'fancybox-is-open' ).addClass( 'fancybox-is-closing' );
            }
            // Clean up
            self.hideLoading( current );
            self.hideControls();
            self.updateCursor();
            // Check if possible to zoom-out
            if ( effect === 'zoom' && !( e !== true && $what && duration && current.type === 'image' && !current.hasError && ( end = self.getThumbPos( current ) ) ) ) {
                effect = 'fade';
            }
            if ( effect === 'zoom' ) {
                $.fancybox.stop( $what );
                start = $.fancybox.getTranslate( $what );
                start.width  = start.width  * start.scaleX;
                start.height = start.height * start.scaleY;
                // Check if we need to animate opacity
                opacity = current.opts.zoomOpacity;
                if ( opacity == 'auto' ) {
                    opacity = Math.abs( current.width / current.height - end.width / end.height ) > 0.1;
                }
                if ( opacity ) {
                    end.opacity = 0;
                }
                start.scaleX = start.width  / end.width;
                start.scaleY = start.height / end.height;
                start.width  = end.width;
                start.height = end.height;
                $.fancybox.setTranslate( current.$content, start );
                forceRedraw( current.$content );
                $.fancybox.animate( current.$content, end, duration, done );
                return true;
            }
            if ( effect && duration ) {
                // If skip animation
                if ( e === true ) {
                    setTimeout( done, duration );
                } else {
                    $.fancybox.animate( current.$slide.removeClass( 'fancybox-slide--current' ), 'fancybox-animated fancybox-slide--previous fancybox-fx-' + effect, duration, done );
                }
            } else {
                done();
            }
            return true;
        },
        // Final adjustments after removing the instance
        // =============================================
        cleanUp : function( e ) {
            var self  = this,
                $body = $( 'body' ),
                instance,
                offset;
            self.current.$slide.trigger( 'onReset' );
            self.$refs.container.empty().remove();
            self.trigger( 'afterClose', e );
            // Place back focus
            if ( self.$lastFocus && !!self.current.opts.backFocus ) {
                self.$lastFocus.focus();
            }
            self.current = null;
            // Check if there are other instances
            instance = $.fancybox.getInstance();
            if ( instance ) {
                instance.activate();
            } else {
                $W.scrollTop( self.scrollTop ).scrollLeft( self.scrollLeft );
                $body.removeClass( 'fancybox-active compensate-for-scrollbar' );
                if ( $body.hasClass( 'fancybox-iosfix' ) ) {
                    offset = parseInt(document.body.style.top, 10);
                    $body.removeClass( 'fancybox-iosfix' ).css( 'top', '' ).scrollTop( offset * -1 );
                }
                $( '#fancybox-style-noscroll' ).remove();
            }
        },
        // Call callback and trigger an event
        // ==================================
        trigger : function( name, slide ) {
            var args  = Array.prototype.slice.call(arguments, 1),
                self  = this,
                obj   = slide && slide.opts ? slide : self.current,
                rez;
            if ( obj ) {
                args.unshift( obj );
            } else {
                obj = self;
            }
            args.unshift( self );
            if ( $.isFunction( obj.opts[ name ] ) ) {
                rez = obj.opts[ name ].apply( obj, args );
            }
            if ( rez === false ) {
                return rez;
            }
            if ( name === 'afterClose' || !self.$refs ) {
                $D.trigger( name + '.fb', args );
            } else {
                self.$refs.container.trigger( name + '.fb', args );
            }
        },
        // Update infobar values, navigation button states and reveal caption
        // ==================================================================
        updateControls : function ( force ) {
            var self = this;
            var current  = self.current,
                index    = current.index,
                caption  = current.opts.caption,
                $container = self.$refs.container,
                $caption   = self.$refs.caption;
            // Recalculate content dimensions
            current.$slide.trigger( 'refresh' );
            self.$caption = caption && caption.length ? $caption.html( caption ) : null;
            if ( !self.isHiddenControls && !self.isIdle ) {
                self.showControls();
            }
            // Update info and navigation elements
            $container.find('[data-fancybox-count]').html( self.group.length );
            $container.find('[data-fancybox-index]').html( index + 1 );
            $container.find('[data-fancybox-prev]').prop( 'disabled', ( !current.opts.loop && index <= 0 ) );
            $container.find('[data-fancybox-next]').prop( 'disabled', ( !current.opts.loop && index >= self.group.length - 1 ) );
            if ( current.type === 'image' ) {
                // Update download button source
                $container.find('[data-fancybox-download]').attr( 'href', current.opts.image.src || current.src ).show();
            } else {
                $container.find('[data-fancybox-download],[data-fancybox-zoom]').hide();
            }
        },
        // Hide toolbar and caption
        // ========================
        hideControls : function () {
            this.isHiddenControls = true;
            this.$refs.container.removeClass( 'fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav' );
        },
        showControls : function() {
            var self = this;
            var opts = self.current ? self.current.opts : self.opts;
            var $container = self.$refs.container;
            self.isHiddenControls   = false;
            self.idleSecondsCounter = 0;
            $container
                .toggleClass( 'fancybox-show-toolbar', !!( opts.toolbar && opts.buttons ) )
                .toggleClass( 'fancybox-show-infobar', !!( opts.infobar && self.group.length > 1 ) )
                .toggleClass( 'fancybox-show-nav',     !!( opts.arrows && self.group.length > 1 ) )
                .toggleClass( 'fancybox-is-modal',     !!opts.modal );
            if ( self.$caption ) {
                $container.addClass( 'fancybox-show-caption ');
            } else {
               $container.removeClass( 'fancybox-show-caption' );
           }
       },
       // Toggle toolbar and caption
       // ==========================
       toggleControls : function() {
           if ( this.isHiddenControls ) {
               this.showControls();
           } else {
               this.hideControls();
           }
       },
    });
    $.fancybox = {
        version  : "3.2.5",
        defaults : defaults,
        // Get current instance and execute a command.
        //
        // Examples of usage:
        //
        //   $instance = $.fancybox.getInstance();
        //   $.fancybox.getInstance().jumpTo( 1 );
        //   $.fancybox.getInstance( 'jumpTo', 1 );
        //   $.fancybox.getInstance( function() {
        //       console.info( this.currIndex );
        //   });
        // ======================================================
        getInstance : function ( command ) {
            var instance = $('.fancybox-container:not(".fancybox-is-closing"):last').data( 'FancyBox' );
            var args     = Array.prototype.slice.call(arguments, 1);
            if ( instance instanceof FancyBox ) {
                if ( $.type( command ) === 'string' ) {
                    instance[ command ].apply( instance, args );
                } else if ( $.type( command ) === 'function' ) {
                    command.apply( instance, args );
                }
                return instance;
            }
            return false;
        },
        // Create new instance
        // ===================
        open : function ( items, opts, index ) {
            return new FancyBox( items, opts, index );
        },
        // Close current or all instances
        // ==============================
        close : function ( all ) {
            var instance = this.getInstance();
            if ( instance ) {
                instance.close();
                // Try to find and close next instance
                if ( all === true ) {
                    this.close();
                }
            }
        },
        // Close instances and unbind all events
        // ==============================
        destroy : function() {
            this.close( true );
            $D.off( 'click.fb-start' );
        },
        // Try to detect mobile devices
        // ============================
        isMobile : document.createTouch !== undefined && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        // Detect if 'translate3d' support is available
        // ============================================
        use3d : (function() {
            var div = document.createElement('div');
            return window.getComputedStyle && window.getComputedStyle( div ).getPropertyValue('transform') && !(document.documentMode && document.documentMode < 11);
        }()),
        // Helper function to get current visual state of an element
        // returns array[ top, left, horizontal-scale, vertical-scale, opacity ]
        // =====================================================================
        getTranslate : function( $el ) {
            var matrix;
            if ( !$el || !$el.length ) {
                return false;
            }
            matrix  = $el.eq( 0 ).css('transform');
            if ( matrix && matrix.indexOf( 'matrix' ) !== -1 ) {
                matrix = matrix.split('(')[1];
                matrix = matrix.split(')')[0];
                matrix = matrix.split(',');
            } else {
                matrix = [];
            }
            if ( matrix.length ) {
                // If IE
                if ( matrix.length > 10 ) {
                    matrix = [ matrix[13], matrix[12], matrix[0], matrix[5] ];
                } else {
                    matrix = [ matrix[5], matrix[4], matrix[0], matrix[3]];
                }
                matrix = matrix.map(parseFloat);
            } else {
                matrix = [ 0, 0, 1, 1 ];
                var transRegex = /\.*translate\((.*)px,(.*)px\)/i;
                var transRez = transRegex.exec( $el.eq( 0 ).attr('style') );
                if ( transRez ) {
                    matrix[ 0 ] = parseFloat( transRez[2] );
                    matrix[ 1 ] = parseFloat( transRez[1] );
                }
            }
            return {
                top     : matrix[ 0 ],
                left    : matrix[ 1 ],
                scaleX  : matrix[ 2 ],
                scaleY  : matrix[ 3 ],
                opacity : parseFloat( $el.css('opacity') ),
                width   : $el.width(),
                height  : $el.height()
            };
        },
        // Shortcut for setting "translate3d" properties for element
        // Can set be used to set opacity, too
        // ========================================================
        setTranslate : function( $el, props ) {
            var str  = '';
            var css  = {};
            if ( !$el || !props ) {
                return;
            }
            if ( props.left !== undefined || props.top !== undefined ) {
                str = ( props.left === undefined ? $el.position().left : props.left )  + 'px, ' + ( props.top === undefined ? $el.position().top : props.top ) + 'px';
                if ( this.use3d ) {
                    str = 'translate3d(' + str + ', 0px)';
                } else {
                    str = 'translate(' + str + ')';
                }
            }
            if ( props.scaleX !== undefined && props.scaleY !== undefined ) {
                str = (str.length ? str + ' ' : '') + 'scale(' + props.scaleX + ', ' + props.scaleY + ')';
            }
            if ( str.length ) {
                css.transform = str;
            }
            if ( props.opacity !== undefined ) {
                css.opacity = props.opacity;
            }
            if ( props.width !== undefined ) {
                css.width = props.width;
            }
            if ( props.height !== undefined ) {
                css.height = props.height;
            }
            return $el.css( css );
        },
        // Simple CSS transition handler
        // =============================
        animate : function ( $el, to, duration, callback, leaveAnimationName ) {
            if ( $.isFunction( duration ) ) {
                callback = duration;
                duration = null;
            }
            if ( !$.isPlainObject( to ) ) {
                $el.removeAttr('style');
            }
            $el.on( transitionEnd, function(e) {
                // Skip events from child elements and z-index change
                if ( e && e.originalEvent && ( !$el.is( e.originalEvent.target ) || e.originalEvent.propertyName == 'z-index' ) ) {
                    return;
                }
                $.fancybox.stop( $el );
                if ( $.isPlainObject( to ) ) {
                    if ( to.scaleX !== undefined && to.scaleY !== undefined ) {
                        $el.css( 'transition-duration', '' );
                        to.width  = Math.round( $el.width()  * to.scaleX );
                        to.height = Math.round( $el.height() * to.scaleY );
                        to.scaleX = 1;
                        to.scaleY = 1;
                        $.fancybox.setTranslate( $el, to );
                    }
                } else if ( leaveAnimationName !== true ) {
                    $el.removeClass( to );
                }
                if ( $.isFunction( callback ) ) {
                    callback( e );
                }
            });
            if ( $.isNumeric( duration ) ) {
                $el.css( 'transition-duration', duration + 'ms' );
            }
            if ( $.isPlainObject( to ) ) {
                $.fancybox.setTranslate( $el, to );
            } else {
                $el.addClass( to );
            }
            if ( to.scaleX && $el.hasClass( 'fancybox-image-wrap' ) ) {
                $el.parent().addClass( 'fancybox-is-scaling' );
            }
            // Make sure that `transitionend` callback gets fired
            $el.data("timer", setTimeout(function() {
                $el.trigger( 'transitionend' );
            }, duration + 16));
        },
        stop : function( $el ) {
            clearTimeout( $el.data("timer") );
            $el.off( 'transitionend' ).css( 'transition-duration', '' );
            if ( $el.hasClass( 'fancybox-image-wrap' ) ) {
                $el.parent().removeClass( 'fancybox-is-scaling' );
            }
        }
    };
    // Default click handler for "fancyboxed" links
    // ============================================
    function _run( e ) {
        var $target	= $( e.currentTarget ),
            opts	= e.data ? e.data.options : {},
            value	= $target.attr( 'data-fancybox' ) || '',
            index	= 0,
            items   = [];
        // Avoid opening multiple times
        if ( e.isDefaultPrevented() ) {
            return;
        }
        e.preventDefault();
        // Get all related items and find index for clicked one
        if ( value ) {
            items = opts.selector ? $( opts.selector ) : ( e.data ? e.data.items : [] );
            items = items.length ? items.filter( '[data-fancybox="' + value + '"]' ) : $( '[data-fancybox="' + value + '"]' );
            index = items.index( $target );
            // Sometimes current item can not be found
            // (for example, when slider clones items)
            if ( index < 0 ) {
                index = 0;
            }
        } else {
            items = [ $target ];
        }
        $.fancybox.open( items, opts, index );
    }
    // Create a jQuery plugin
    // ======================
    $.fn.fancybox = function (options) {
        var selector;
        options  = options || {};
        selector = options.selector || false;
        if ( selector ) {
            $( 'body' ).off( 'click.fb-start', selector ).on( 'click.fb-start', selector, {
                options : options
            }, _run );
        } else {
            this.off( 'click.fb-start' ).on( 'click.fb-start', {
                items   : this,
                options : options
            }, _run);
        }
        return this;
    };
    // Self initializing plugin
    // ========================
    $D.on( 'click.fb-start', '[data-fancybox]', _run );
}( window, document, window.jQuery || jQuery ));
// ==========================================================================
//
// Media
// Adds additional media type support
//
// ==========================================================================
;(function ($) {
	'use strict';
	// Formats matching url to final form
	var format = function (url, rez, params) {
		if ( !url ) {
			return;
		}
		params = params || '';
		if ( $.type(params) === "object" ) {
			params = $.param(params, true);
		}
		$.each(rez, function (key, value) {
			url = url.replace('$' + key, value || '');
		});
		if (params.length) {
			url += (url.indexOf('?') > 0 ? '&' : '?') + params;
		}
		return url;
	};
	// Object containing properties for each media type
	var defaults = {
		youtube : {
			matcher : /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
			params  : {
				autoplay : 1,
				autohide : 1,
				fs  : 1,
				rel : 0,
				hd  : 1,
				wmode : 'transparent',
				enablejsapi : 1,
				html5 : 1
			},
			paramPlace : 8,
			type  : 'iframe',
			url   : '//www.youtube.com/embed/$4',
			thumb : '//img.youtube.com/vi/$4/hqdefault.jpg'
		},
		vimeo : {
			matcher : /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
			params  : {
				autoplay : 1,
				hd : 1,
				show_title    : 1,
				show_byline   : 1,
				show_portrait : 0,
				fullscreen    : 1,
				api : 1
			},
			paramPlace : 3,
			type : 'iframe',
			url : '//player.vimeo.com/video/$2'
		},
		metacafe : {
			matcher : /metacafe.com\/watch\/(\d+)\/(.*)?/,
			type    : 'iframe',
			url     : '//www.metacafe.com/embed/$1/?ap=1'
		},
		dailymotion : {
			matcher : /dailymotion.com\/video\/(.*)\/?(.*)/,
			params : {
				additionalInfos : 0,
				autoStart : 1
			},
			type : 'iframe',
			url  : '//www.dailymotion.com/embed/video/$1'
		},
		vine : {
			matcher : /vine.co\/v\/([a-zA-Z0-9\?\=\-]+)/,
			type    : 'iframe',
			url     : '//vine.co/v/$1/embed/simple'
		},
		instagram : {
			matcher : /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
			type    : 'image',
			url     : '//$1/p/$2/media/?size=l'
		},
		// Examples:
		// http://maps.google.com/?ll=48.857995,2.294297&spn=0.007666,0.021136&t=m&z=16
		// https://www.google.com/maps/@37.7852006,-122.4146355,14.65z
		// https://www.google.com/maps/place/Googleplex/@37.4220041,-122.0833494,17z/data=!4m5!3m4!1s0x0:0x6c296c66619367e0!8m2!3d37.4219998!4d-122.0840572
		gmap_place : {
			matcher : /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
			type    : 'iframe',
			url     : function (rez) {
				return '//maps.google.' + rez[2] + '/?ll=' + ( rez[9] ? rez[9] + '&z=' + Math.floor(  rez[10]  ) + ( rez[12] ? rez[12].replace(/^\//, "&") : '' )  : rez[12] ) + '&output=' + ( rez[12] && rez[12].indexOf('layer=c') > 0 ? 'svembed' : 'embed' );
			}
		},
		// Examples:
		// https://www.google.com/maps/search/Empire+State+Building/
		// https://www.google.com/maps/search/?api=1&query=centurylink+field
		// https://www.google.com/maps/search/?api=1&query=47.5951518,-122.3316393
		gmap_search : {
			matcher : /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
			type    : 'iframe',
			url     : function (rez) {
				return '//maps.google.' + rez[2] + '/maps?q=' + rez[5].replace('query=', 'q=').replace('api=1', '') + '&output=embed';
			}
		}
	};
	$(document).on('objectNeedsType.fb', function (e, instance, item) {
		var url	 = item.src || '',
			type = false,
			media,
			thumb,
			rez,
			params,
			urlParams,
			paramObj,
			provider;
		media = $.extend( true, {}, defaults, item.opts.media );
		// Look for any matching media type
		$.each(media, function ( providerName, providerOpts ) {
			rez = url.match( providerOpts.matcher );
			if ( !rez ) {
				return;
			}
			type     = providerOpts.type;
			paramObj = {};
			if ( providerOpts.paramPlace && rez[ providerOpts.paramPlace ] ) {
				urlParams = rez[ providerOpts.paramPlace ];
				if ( urlParams[ 0 ] == '?' ) {
					urlParams = urlParams.substring(1);
				}
				urlParams = urlParams.split('&');
				for ( var m = 0; m < urlParams.length; ++m ) {
					var p = urlParams[ m ].split('=', 2);
					if ( p.length == 2 ) {
						paramObj[ p[0] ] = decodeURIComponent( p[1].replace(/\+/g, " ") );
					}
				}
			}
			params = $.extend( true, {}, providerOpts.params, item.opts[ providerName ], paramObj );
			url   = $.type( providerOpts.url ) === "function" ? providerOpts.url.call( this, rez, params, item ) : format( providerOpts.url, rez, params );
			thumb = $.type( providerOpts.thumb ) === "function" ? providerOpts.thumb.call( this, rez, params, item ) : format( providerOpts.thumb, rez );
			if ( providerName === 'vimeo' ) {
				url = url.replace('&%23', '#');
			}
			return false;
		});
		// If it is found, then change content type and update the url
		if ( type ) {
			item.src  = url;
			item.type = type;
			if ( !item.opts.thumb && !( item.opts.$thumb && item.opts.$thumb.length ) ) {
				item.opts.thumb = thumb;
			}
			if ( type === 'iframe' ) {
				$.extend(true, item.opts, {
					iframe : {
						preload : false,
						attr : {
							scrolling : "no"
						}
					}
				});
				item.contentProvider = provider;
				item.opts.slideClass += ' fancybox-slide--' + ( provider == 'gmap_place' || provider == 'gmap_search' ? 'map' : 'video' );
			}
		} else if ( url ) {
			item.type = item.opts.defaultType;
		}
	});
}( window.jQuery || jQuery ));
// ==========================================================================
//
// Guestures
// Adds touch guestures, handles click and tap events
//
// ==========================================================================
;(function (window, document, $) {
	'use strict';
	var requestAFrame = (function () {
        return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                // if all else fails, use setTimeout
                function (callback) {
                    return window.setTimeout(callback, 1000 / 60);
                };
    })();
    var cancelAFrame = (function () {
        return window.cancelAnimationFrame ||
                window.webkitCancelAnimationFrame ||
                window.mozCancelAnimationFrame ||
                window.oCancelAnimationFrame ||
                function (id) {
                    window.clearTimeout(id);
                };
    })();
	var pointers = function( e ) {
		var result = [];
		e = e.originalEvent || e || window.e;
		e = e.touches && e.touches.length ? e.touches : ( e.changedTouches && e.changedTouches.length ? e.changedTouches : [ e ] );
		for ( var key in e ) {
			if ( e[ key ].pageX ) {
				result.push( { x : e[ key ].pageX, y : e[ key ].pageY } );
			} else if ( e[ key ].clientX ) {
				result.push( { x : e[ key ].clientX, y : e[ key ].clientY } );
			}
		}
		return result;
	};
	var distance = function( point2, point1, what ) {
		if ( !point1 || !point2 ) {
			return 0;
		}
		if ( what === 'x' ) {
			return point2.x - point1.x;
		} else if ( what === 'y' ) {
			return point2.y - point1.y;
		}
		return Math.sqrt( Math.pow( point2.x - point1.x, 2 ) + Math.pow( point2.y - point1.y, 2 ) );
	};
	var isClickable = function( $el ) {
		if ( $el.is('a,area,button,[role="button"],input,label,select,summary,textarea') || $.isFunction( $el.get(0).onclick ) || $el.data('selectable') ) {
			return true;
		}
		// Check for attributes like data-fancybox-next or data-fancybox-close
		for ( var i = 0, atts = $el[0].attributes, n = atts.length; i < n; i++ ) {
            if ( atts[i].nodeName.substr(0, 14) === 'data-fancybox-' ) {
                return true;
            }
        }
	 	return false;
	};
	var hasScrollbars = function( el ) {
		var overflowY = window.getComputedStyle( el )['overflow-y'];
		var overflowX = window.getComputedStyle( el )['overflow-x'];
		var vertical   = (overflowY === 'scroll' || overflowY === 'auto') && el.scrollHeight > el.clientHeight;
		var horizontal = (overflowX === 'scroll' || overflowX === 'auto') && el.scrollWidth > el.clientWidth;
		return vertical || horizontal;
	};
	var isScrollable = function ( $el ) {
		var rez = false;
		while ( true ) {
			rez	= hasScrollbars( $el.get(0) );
			if ( rez ) {
				break;
			}
			$el = $el.parent();
			if ( !$el.length || $el.hasClass( 'fancybox-stage' ) || $el.is( 'body' ) ) {
				break;
			}
		}
		return rez;
	};
	var Guestures = function ( instance ) {
		var self = this;
		self.instance = instance;
		self.$bg        = instance.$refs.bg;
		self.$stage     = instance.$refs.stage;
		self.$container = instance.$refs.container;
		self.destroy();
		self.$container.on( 'touchstart.fb.touch mousedown.fb.touch', $.proxy(self, 'ontouchstart') );
	};
	Guestures.prototype.destroy = function() {
		this.$container.off( '.fb.touch' );
	};
	Guestures.prototype.ontouchstart = function( e ) {
		var self = this;
		var $target  = $( e.target );
		var instance = self.instance;
		var current  = instance.current;
		var $content = current.$content;
		var isTouchDevice = ( e.type == 'touchstart' );
		// Do not respond to both events
		if ( isTouchDevice ) {
	        self.$container.off( 'mousedown.fb.touch' );
	    }
		// Ignore clicks while zooming or closing
		if ( !current || self.instance.isAnimating || self.instance.isClosing ) {
			e.stopPropagation();
			e.preventDefault();
			return;
		}
		// Ignore right click
		if ( e.originalEvent && e.originalEvent.button == 2 ) {
			return;
		}
		// Ignore taping on links, buttons, input elements
		if ( !$target.length || isClickable( $target ) || isClickable( $target.parent() ) ) {
			return;
		}
		// Ignore clicks on the scrollbar
		if ( e.originalEvent.clientX > $target[0].clientWidth + $target.offset().left ) {
			return;
		}
		self.startPoints = pointers( e );
		// Prevent zooming if already swiping
		if ( !self.startPoints || ( self.startPoints.length > 1 && instance.isSliding ) ) {
			return;
		}
		self.$target  = $target;
		self.$content = $content;
		self.canTap   = true;
		self.opts     = current.opts.touch;
		$(document).off( '.fb.touch' );
		$(document).on( isTouchDevice ? 'touchend.fb.touch touchcancel.fb.touch' : 'mouseup.fb.touch mouseleave.fb.touch',  $.proxy(self, "ontouchend"));
		$(document).on( isTouchDevice ? 'touchmove.fb.touch' : 'mousemove.fb.touch',  $.proxy(self, "ontouchmove"));
		if ( !(self.opts || instance.canPan() ) || !( $target.is( self.$stage ) || self.$stage.find( $target ).length ) ) {
			// Prevent ghosting
			if ( $target.is('img') ) {
				e.preventDefault();
			}
			return;
		}
		e.stopPropagation();
		if ( !( $.fancybox.isMobile && ( isScrollable( self.$target ) || isScrollable( self.$target.parent() ) ) ) ) {
			e.preventDefault();
		}
		self.canvasWidth  = Math.round( current.$slide[0].clientWidth );
		self.canvasHeight = Math.round( current.$slide[0].clientHeight );
		self.startTime = new Date().getTime();
		self.distanceX = self.distanceY = self.distance = 0;
		self.isPanning = false;
		self.isSwiping = false;
		self.isZooming = false;
		self.sliderStartPos  = self.sliderLastPos || { top: 0, left: 0 };
		self.contentStartPos = $.fancybox.getTranslate( self.$content );
		self.contentLastPos  = null;
		if ( self.startPoints.length === 1 && !self.isZooming ) {
			self.canTap = !instance.isSliding;
			if ( current.type === 'image' && ( self.contentStartPos.width > self.canvasWidth + 1 || self.contentStartPos.height > self.canvasHeight + 1 ) ) {
				$.fancybox.stop( self.$content );
				self.$content.css( 'transition-duration', '0ms' );
				self.isPanning = true;
			} else {
				self.isSwiping = true;
			}
			self.$container.addClass('fancybox-controls--isGrabbing');
		}
		if ( self.startPoints.length === 2 && !instance.isAnimating && !current.hasError && current.type === 'image' && ( current.isLoaded || current.$ghost ) ) {
			self.isZooming = true;
			self.isSwiping = false;
			self.isPanning = false;
			$.fancybox.stop( self.$content );
			self.$content.css( 'transition-duration', '0ms' );
			self.centerPointStartX = ( ( self.startPoints[0].x + self.startPoints[1].x ) * 0.5 ) - $(window).scrollLeft();
			self.centerPointStartY = ( ( self.startPoints[0].y + self.startPoints[1].y ) * 0.5 ) - $(window).scrollTop();
			self.percentageOfImageAtPinchPointX = ( self.centerPointStartX - self.contentStartPos.left ) / self.contentStartPos.width;
			self.percentageOfImageAtPinchPointY = ( self.centerPointStartY - self.contentStartPos.top  ) / self.contentStartPos.height;
			self.startDistanceBetweenFingers = distance( self.startPoints[0], self.startPoints[1] );
		}
	};
	Guestures.prototype.ontouchmove = function( e ) {
		var self = this;
		self.newPoints = pointers( e );
		if ( $.fancybox.isMobile && ( isScrollable( self.$target ) || isScrollable( self.$target.parent() ) ) ) {
			e.stopPropagation();
			self.canTap = false;
			return;
		}
		if ( !( self.opts || self.instance.canPan() ) || !self.newPoints || !self.newPoints.length ) {
			return;
		}
		self.distanceX = distance( self.newPoints[0], self.startPoints[0], 'x' );
		self.distanceY = distance( self.newPoints[0], self.startPoints[0], 'y' );
		self.distance = distance( self.newPoints[0], self.startPoints[0] );
		// Skip false ontouchmove events (Chrome)
		if ( self.distance > 0 ) {
			if ( !( self.$target.is( self.$stage ) || self.$stage.find( self.$target ).length ) ) {
				return;
			}
			e.stopPropagation();
			e.preventDefault();
			if ( self.isSwiping ) {
				self.onSwipe();
			} else if ( self.isPanning ) {
				self.onPan();
			} else if ( self.isZooming ) {
				self.onZoom();
			}
		}
	};
	Guestures.prototype.onSwipe = function() {
		var self = this;
		var swiping = self.isSwiping;
		var left    = self.sliderStartPos.left || 0;
		var angle;
		if ( swiping === true ) {
			if ( Math.abs( self.distance ) > 10 )  {
				self.canTap = false;
				if ( self.instance.group.length < 2 && self.opts.vertical ) {
					self.isSwiping  = 'y';
				} else if ( self.instance.isSliding || self.opts.vertical === false || ( self.opts.vertical === 'auto' && $( window ).width() > 800 ) ) {
					self.isSwiping  = 'x';
				} else {
					angle = Math.abs( Math.atan2( self.distanceY, self.distanceX ) * 180 / Math.PI );
					self.isSwiping = ( angle > 45 && angle < 135 ) ? 'y' : 'x';
				}
				self.instance.isSliding = self.isSwiping;
				// Reset points to avoid jumping, because we dropped first swipes to calculate the angle
				self.startPoints = self.newPoints;
				$.each(self.instance.slides, function( index, slide ) {
					$.fancybox.stop( slide.$slide );
					slide.$slide.css( 'transition-duration', '0ms' );
					slide.inTransition = false;
					if ( slide.pos === self.instance.current.pos ) {
						self.sliderStartPos.left = $.fancybox.getTranslate( slide.$slide ).left;
					}
				});
				//self.instance.current.isMoved = true;
				// Stop slideshow
				if ( self.instance.SlideShow && self.instance.SlideShow.isActive ) {
					self.instance.SlideShow.stop();
				}
			}
		} else {
			if ( swiping == 'x' ) {
				// Sticky edges
				if ( self.distanceX > 0 && ( self.instance.group.length < 2 || ( self.instance.current.index === 0 && !self.instance.current.opts.loop ) ) ) {
					left = left + Math.pow( self.distanceX, 0.8 );
				} else if ( self.distanceX < 0 && ( self.instance.group.length < 2 || ( self.instance.current.index === self.instance.group.length - 1 && !self.instance.current.opts.loop ) ) ) {
					left = left - Math.pow( -self.distanceX, 0.8 );
				} else {
					left = left + self.distanceX;
				}
			}
			self.sliderLastPos = {
				top  : swiping == 'x' ? 0 : self.sliderStartPos.top + self.distanceY,
				left : left
			};
			if ( self.requestId ) {
				cancelAFrame( self.requestId );
				self.requestId = null;
			}
			self.requestId = requestAFrame(function() {
				if ( self.sliderLastPos ) {
					$.each(self.instance.slides, function( index, slide ) {
						var pos = slide.pos - self.instance.currPos;
						$.fancybox.setTranslate( slide.$slide, {
							top  : self.sliderLastPos.top,
							left : self.sliderLastPos.left + ( pos * self.canvasWidth ) + ( pos * slide.opts.gutter )
						});
					});
					self.$container.addClass( 'fancybox-is-sliding' );
				}
			});
		}
	};
	Guestures.prototype.onPan = function() {
		var self = this;
		var newOffsetX, newOffsetY, newPos;
		self.canTap = false;
		if ( self.contentStartPos.width > self.canvasWidth ) {
			newOffsetX = self.contentStartPos.left + self.distanceX;
		} else {
			newOffsetX = self.contentStartPos.left;
		}
		newOffsetY = self.contentStartPos.top + self.distanceY;
		newPos = self.limitMovement( newOffsetX, newOffsetY, self.contentStartPos.width, self.contentStartPos.height );
		newPos.scaleX = self.contentStartPos.scaleX;
		newPos.scaleY = self.contentStartPos.scaleY;
		self.contentLastPos = newPos;
		if ( self.requestId ) {
			cancelAFrame( self.requestId );
			self.requestId = null;
		}
		self.requestId = requestAFrame(function() {
			$.fancybox.setTranslate( self.$content, self.contentLastPos );
		});
	};
	// Make panning sticky to the edges
	Guestures.prototype.limitMovement = function( newOffsetX, newOffsetY, newWidth, newHeight ) {
		var self = this;
		var minTranslateX, minTranslateY, maxTranslateX, maxTranslateY;
		var canvasWidth  = self.canvasWidth;
		var canvasHeight = self.canvasHeight;
		var currentOffsetX = self.contentStartPos.left;
		var currentOffsetY = self.contentStartPos.top;
		var distanceX = self.distanceX;
		var distanceY = self.distanceY;
		// Slow down proportionally to traveled distance
		minTranslateX = Math.max(0, canvasWidth  * 0.5 - newWidth  * 0.5 );
		minTranslateY = Math.max(0, canvasHeight * 0.5 - newHeight * 0.5 );
		maxTranslateX = Math.min( canvasWidth  - newWidth,  canvasWidth  * 0.5 - newWidth  * 0.5 );
		maxTranslateY = Math.min( canvasHeight - newHeight, canvasHeight * 0.5 - newHeight * 0.5 );
		if ( newWidth > canvasWidth ) {
			//   ->
			if ( distanceX > 0 && newOffsetX > minTranslateX ) {
				newOffsetX = minTranslateX - 1 + Math.pow( -minTranslateX + currentOffsetX + distanceX, 0.8 ) || 0;
			}
			//    <-
			if ( distanceX  < 0 && newOffsetX < maxTranslateX ) {
				newOffsetX = maxTranslateX + 1 - Math.pow( maxTranslateX - currentOffsetX - distanceX, 0.8 ) || 0;
			}
		}
		if ( newHeight > canvasHeight ) {
			//   \/
			if ( distanceY > 0 && newOffsetY > minTranslateY ) {
				newOffsetY = minTranslateY - 1 + Math.pow(-minTranslateY + currentOffsetY + distanceY, 0.8 ) || 0;
			}
			//   /\
			if ( distanceY < 0 && newOffsetY < maxTranslateY ) {
				newOffsetY = maxTranslateY + 1 - Math.pow ( maxTranslateY - currentOffsetY - distanceY, 0.8 ) || 0;
			}
		}
		return {
			top  : newOffsetY,
			left : newOffsetX
		};
	};
	Guestures.prototype.limitPosition = function( newOffsetX, newOffsetY, newWidth, newHeight ) {
		var self = this;
		var canvasWidth  = self.canvasWidth;
		var canvasHeight = self.canvasHeight;
		if ( newWidth > canvasWidth ) {
			newOffsetX = newOffsetX > 0 ? 0 : newOffsetX;
			newOffsetX = newOffsetX < canvasWidth - newWidth ? canvasWidth - newWidth : newOffsetX;
		} else {
			// Center horizontally
			newOffsetX = Math.max( 0, canvasWidth / 2 - newWidth / 2 );
		}
		if ( newHeight > canvasHeight ) {
			newOffsetY = newOffsetY > 0 ? 0 : newOffsetY;
			newOffsetY = newOffsetY < canvasHeight - newHeight ? canvasHeight - newHeight : newOffsetY;
		} else {
			// Center vertically
			newOffsetY = Math.max( 0, canvasHeight / 2 - newHeight / 2 );
		}
		return {
			top  : newOffsetY,
			left : newOffsetX
		};
	};
	Guestures.prototype.onZoom = function() {
		var self = this;
		// Calculate current distance between points to get pinch ratio and new width and height
		var currentWidth  = self.contentStartPos.width;
		var currentHeight = self.contentStartPos.height;
		var currentOffsetX = self.contentStartPos.left;
		var currentOffsetY = self.contentStartPos.top;
		var endDistanceBetweenFingers = distance( self.newPoints[0], self.newPoints[1] );
		var pinchRatio = endDistanceBetweenFingers / self.startDistanceBetweenFingers;
		var newWidth  = Math.floor( currentWidth  * pinchRatio );
		var newHeight = Math.floor( currentHeight * pinchRatio );
		// This is the translation due to pinch-zooming
		var translateFromZoomingX = (currentWidth  - newWidth)  * self.percentageOfImageAtPinchPointX;
		var translateFromZoomingY = (currentHeight - newHeight) * self.percentageOfImageAtPinchPointY;
		//Point between the two touches
		var centerPointEndX = ((self.newPoints[0].x + self.newPoints[1].x) / 2) - $(window).scrollLeft();
		var centerPointEndY = ((self.newPoints[0].y + self.newPoints[1].y) / 2) - $(window).scrollTop();
		// And this is the translation due to translation of the centerpoint
		// between the two fingers
		var translateFromTranslatingX = centerPointEndX - self.centerPointStartX;
		var translateFromTranslatingY = centerPointEndY - self.centerPointStartY;
		// The new offset is the old/current one plus the total translation
		var newOffsetX = currentOffsetX + ( translateFromZoomingX + translateFromTranslatingX );
		var newOffsetY = currentOffsetY + ( translateFromZoomingY + translateFromTranslatingY );
		var newPos = {
			top    : newOffsetY,
			left   : newOffsetX,
			scaleX : self.contentStartPos.scaleX * pinchRatio,
			scaleY : self.contentStartPos.scaleY * pinchRatio
		};
		self.canTap = false;
		self.newWidth  = newWidth;
		self.newHeight = newHeight;
		self.contentLastPos = newPos;
		if ( self.requestId ) {
			cancelAFrame( self.requestId );
			self.requestId = null;
		}
		self.requestId = requestAFrame(function() {
			$.fancybox.setTranslate( self.$content, self.contentLastPos );
		});
	};
	Guestures.prototype.ontouchend = function( e ) {
		var self = this;
		var dMs  = Math.max( (new Date().getTime() ) - self.startTime, 1);
		var swiping = self.isSwiping;
		var panning = self.isPanning;
		var zooming = self.isZooming;
		self.endPoints = pointers( e );
		self.$container.removeClass( 'fancybox-controls--isGrabbing' );
		$(document).off( '.fb.touch' );
		if ( self.requestId ) {
			cancelAFrame( self.requestId );
			self.requestId = null;
		}
		self.isSwiping = false;
		self.isPanning = false;
		self.isZooming = false;
		if ( self.canTap )  {
			return self.onTap( e );
		}
		self.speed = 366;
		// Speed in px/ms
		self.velocityX = self.distanceX / dMs * 0.5;
		self.velocityY = self.distanceY / dMs * 0.5;
		self.speedX = Math.max( self.speed * 0.5, Math.min( self.speed * 1.5, ( 1 / Math.abs( self.velocityX ) ) * self.speed ) );
		if ( panning ) {
			self.endPanning();
		} else if ( zooming ) {
			self.endZooming();
		} else {
			self.endSwiping( swiping );
		}
		return;
	};
	Guestures.prototype.endSwiping = function( swiping ) {
		var self = this;
		var ret = false;
		self.instance.isSliding = false;
		self.sliderLastPos      = null;
		// Close if swiped vertically / navigate if horizontally
		if ( swiping == 'y' && Math.abs( self.distanceY ) > 50 ) {
			// Continue vertical movement
			$.fancybox.animate( self.instance.current.$slide, {
				top     : self.sliderStartPos.top + self.distanceY + ( self.velocityY * 150 ),
				opacity : 0
			}, 150 );
			ret = self.instance.close( true, 300 );
		} else if ( swiping == 'x' && self.distanceX > 50 && self.instance.group.length > 1 ) {
			ret = self.instance.previous( self.speedX );
		} else if ( swiping == 'x' && self.distanceX < -50  && self.instance.group.length > 1 ) {
			ret = self.instance.next( self.speedX );
		}
		if ( ret === false && ( swiping == 'x' || swiping == 'y' ) ) {
			self.instance.jumpTo( self.instance.current.index, 150 );
		}
		self.$container.removeClass( 'fancybox-is-sliding' );
	};
	// Limit panning from edges
	// ========================
	Guestures.prototype.endPanning = function() {
		var self = this;
		var newOffsetX, newOffsetY, newPos;
		if ( !self.contentLastPos ) {
			return;
		}
		if ( self.opts.momentum === false ) {
			newOffsetX = self.contentLastPos.left;
			newOffsetY = self.contentLastPos.top;
		} else {
			// Continue movement
			newOffsetX = self.contentLastPos.left + ( self.velocityX * self.speed );
			newOffsetY = self.contentLastPos.top  + ( self.velocityY * self.speed );
		}
		newPos = self.limitPosition( newOffsetX, newOffsetY, self.contentStartPos.width, self.contentStartPos.height );
		 newPos.width  = self.contentStartPos.width;
		 newPos.height = self.contentStartPos.height;
		$.fancybox.animate( self.$content, newPos, 330 );
	};
	Guestures.prototype.endZooming = function() {
		var self = this;
		var current = self.instance.current;
		var newOffsetX, newOffsetY, newPos, reset;
		var newWidth  = self.newWidth;
		var newHeight = self.newHeight;
		if ( !self.contentLastPos ) {
			return;
		}
		newOffsetX = self.contentLastPos.left;
		newOffsetY = self.contentLastPos.top;
		reset = {
		   	top    : newOffsetY,
		   	left   : newOffsetX,
		   	width  : newWidth,
		   	height : newHeight,
			scaleX : 1,
			scaleY : 1
	   };
	   // Reset scalex/scaleY values; this helps for perfomance and does not break animation
	   $.fancybox.setTranslate( self.$content, reset );
		if ( newWidth < self.canvasWidth && newHeight < self.canvasHeight ) {
			self.instance.scaleToFit( 150 );
		} else if ( newWidth > current.width || newHeight > current.height ) {
			self.instance.scaleToActual( self.centerPointStartX, self.centerPointStartY, 150 );
		} else {
			newPos = self.limitPosition( newOffsetX, newOffsetY, newWidth, newHeight );
			// Switch from scale() to width/height or animation will not work correctly
			$.fancybox.setTranslate( self.content, $.fancybox.getTranslate( self.$content ) );
			$.fancybox.animate( self.$content, newPos, 150 );
		}
	};
	Guestures.prototype.onTap = function(e) {
		var self    = this;
		var $target = $( e.target );
		var instance = self.instance;
		var current  = instance.current;
		var endPoints = ( e && pointers( e ) ) || self.startPoints;
		var tapX = endPoints[0] ? endPoints[0].x - self.$stage.offset().left : 0;
		var tapY = endPoints[0] ? endPoints[0].y - self.$stage.offset().top  : 0;
		var where;
		var process = function ( prefix ) {
			var action = current.opts[ prefix ];
			if ( $.isFunction( action ) ) {
				action = action.apply( instance, [ current, e ] );
			}
			if ( !action) {
				return;
			}
			switch ( action ) {
				case "close" :
					instance.close( self.startEvent );
				break;
				case "toggleControls" :
					instance.toggleControls( true );
				break;
				case "next" :
					instance.next();
				break;
				case "nextOrClose" :
					if ( instance.group.length > 1 ) {
						instance.next();
					} else {
						instance.close( self.startEvent );
					}
				break;
				case "zoom" :
					if ( current.type == 'image' && ( current.isLoaded || current.$ghost ) ) {
						if ( instance.canPan() ) {
							instance.scaleToFit();
						} else if ( instance.isScaledDown() ) {
							instance.scaleToActual( tapX, tapY );
						} else if ( instance.group.length < 2 ) {
							instance.close( self.startEvent );
						}
					}
				break;
			}
		};
		// Ignore right click
		if ( e.originalEvent && e.originalEvent.button == 2 ) {
			return;
		}
		// Skip if current slide is not in the center
		if ( instance.isSliding ) {
			return;
		}
		// Skip if clicked on the scrollbar
		if ( tapX > $target[0].clientWidth + $target.offset().left ) {
			return;
		}
		// Check where is clicked
		if ( $target.is( '.fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container' ) ) {
			where = 'Outside';
		} else if ( $target.is( '.fancybox-slide' ) ) {
			where = 'Slide';
		} else if  ( instance.current.$content && instance.current.$content.has( e.target ).length ) {
		 	where = 'Content';
		} else {
			return;
		}
		// Check if this is a double tap
		if ( self.tapped ) {
			// Stop previously created single tap
			clearTimeout( self.tapped );
			self.tapped = null;
			// Skip if distance between taps is too big
			if ( Math.abs( tapX - self.tapX ) > 50 || Math.abs( tapY - self.tapY ) > 50 || instance.isSliding ) {
				return this;
			}
			// OK, now we assume that this is a double-tap
			process( 'dblclick' + where );
		} else {
			// Single tap will be processed if user has not clicked second time within 300ms
			// or there is no need to wait for double-tap
			self.tapX = tapX;
			self.tapY = tapY;
			if ( current.opts[ 'dblclick' + where ] && current.opts[ 'dblclick' + where ] !== current.opts[ 'click' + where ] ) {
				self.tapped = setTimeout(function() {
					self.tapped = null;
					process( 'click' + where );
				}, 300);
			} else {
				process( 'click' + where );
			}
		}
		return this;
	};
	$(document).on('onActivate.fb', function (e, instance) {
		if ( instance && !instance.Guestures ) {
			instance.Guestures = new Guestures( instance );
		}
	});
	$(document).on('beforeClose.fb', function (e, instance) {
		if ( instance && instance.Guestures ) {
			instance.Guestures.destroy();
		}
	});
}( window, document, window.jQuery || jQuery ));
// ==========================================================================
//
// SlideShow
// Enables slideshow functionality
//
// Example of usage:
// $.fancybox.getInstance().SlideShow.start()
//
// ==========================================================================
;(function (document, $) {
	'use strict';
	$.extend(true, $.fancybox.defaults, {
		btnTpl : {
			slideShow :
				'<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}">' +
					'<svg viewBox="0 0 40 40">' +
						'<path d="M13,12 L27,20 L13,27 Z" />' +
						'<path d="M15,10 v19 M23,10 v19" />' +
					'</svg>' +
				'</button>'
		},
		slideShow : {
			autoStart : false,
            speed     : 3000
		}
	});
	var SlideShow = function( instance ) {
		this.instance = instance;
		this.init();
	};
	$.extend( SlideShow.prototype, {
		timer    : null,
		isActive : false,
		$button  : null,
		init : function() {
			var self = this;
			self.$button = self.instance.$refs.toolbar.find('[data-fancybox-play]').on('click', function() {
				self.toggle();
			});
			if ( self.instance.group.length < 2 || !self.instance.group[ self.instance.currIndex ].opts.slideShow ) {
				self.$button.hide();
			}
		},
		set : function( force ) {
			var self = this;
			// Check if reached last element
			if ( self.instance && self.instance.current && (force === true || self.instance.current.opts.loop || self.instance.currIndex < self.instance.group.length - 1 )) {
				self.timer = setTimeout(function() {
					if ( self.isActive ) {
						self.instance.jumpTo( (self.instance.currIndex + 1) % self.instance.group.length );
					}
				}, self.instance.current.opts.slideShow.speed);
			} else {
				self.stop();
				self.instance.idleSecondsCounter = 0;
				self.instance.showControls();
			}
		},
		clear : function() {
			var self = this;
			clearTimeout( self.timer );
			self.timer = null;
		},
		start : function() {
			var self = this;
			var current = self.instance.current;
			if ( current ) {
				self.isActive = true;
				self.$button
					.attr( 'title', current.opts.i18n[ current.opts.lang ].PLAY_STOP )
					.removeClass( 'fancybox-button--play' )
					.addClass( 'fancybox-button--pause' );
					self.set( true );
			}
		},
		stop : function() {
			var self = this;
			var current = self.instance.current;
			self.clear();
			self.$button
				.attr( 'title', current.opts.i18n[ current.opts.lang ].PLAY_START )
				.removeClass( 'fancybox-button--pause' )
				.addClass( 'fancybox-button--play' );
			self.isActive = false;
		},
		toggle : function() {
			var self = this;
			if ( self.isActive ) {
				self.stop();
			} else {
				self.start();
			}
		}
	});
	$(document).on({
		'onInit.fb' : function(e, instance) {
			if ( instance && !instance.SlideShow ) {
				instance.SlideShow = new SlideShow( instance );
			}
		},
		'beforeShow.fb' : function(e, instance, current, firstRun) {
			var SlideShow = instance && instance.SlideShow;
			if ( firstRun ) {
				if ( SlideShow && current.opts.slideShow.autoStart ) {
					SlideShow.start();
				}
			} else if ( SlideShow && SlideShow.isActive )  {
				SlideShow.clear();
			}
		},
		'afterShow.fb' : function(e, instance, current) {
			var SlideShow = instance && instance.SlideShow;
			if ( SlideShow && SlideShow.isActive ) {
				SlideShow.set();
			}
		},
		'afterKeydown.fb' : function(e, instance, current, keypress, keycode) {
			var SlideShow = instance && instance.SlideShow;
			// "P" or Spacebar
			if ( SlideShow && current.opts.slideShow && ( keycode === 80 || keycode === 32 ) && !$(document.activeElement).is( 'button,a,input' ) ) {
				keypress.preventDefault();
				SlideShow.toggle();
			}
		},
		'beforeClose.fb onDeactivate.fb' : function(e, instance) {
			var SlideShow = instance && instance.SlideShow;
			if ( SlideShow ) {
				SlideShow.stop();
			}
		}
	});
	// Page Visibility API to pause slideshow when window is not active
	$(document).on("visibilitychange", function() {
		var instance  = $.fancybox.getInstance();
		var SlideShow = instance && instance.SlideShow;
		if ( SlideShow && SlideShow.isActive ) {
			if ( document.hidden ) {
				SlideShow.clear();
			} else {
				SlideShow.set();
			}
		}
	});
}( document, window.jQuery || jQuery ));
// ==========================================================================
//
// FullScreen
// Adds fullscreen functionality
//
// ==========================================================================
;(function (document, $) {
	'use strict';
	// Collection of methods supported by user browser
	var fn = (function () {
		var fnMap = [
			[
				'requestFullscreen',
				'exitFullscreen',
				'fullscreenElement',
				'fullscreenEnabled',
				'fullscreenchange',
				'fullscreenerror'
			],
			// new WebKit
			[
				'webkitRequestFullscreen',
				'webkitExitFullscreen',
				'webkitFullscreenElement',
				'webkitFullscreenEnabled',
				'webkitfullscreenchange',
				'webkitfullscreenerror'
			],
			// old WebKit (Safari 5.1)
			[
				'webkitRequestFullScreen',
				'webkitCancelFullScreen',
				'webkitCurrentFullScreenElement',
				'webkitCancelFullScreen',
				'webkitfullscreenchange',
				'webkitfullscreenerror'
			],
			[
				'mozRequestFullScreen',
				'mozCancelFullScreen',
				'mozFullScreenElement',
				'mozFullScreenEnabled',
				'mozfullscreenchange',
				'mozfullscreenerror'
			],
			[
				'msRequestFullscreen',
				'msExitFullscreen',
				'msFullscreenElement',
				'msFullscreenEnabled',
				'MSFullscreenChange',
				'MSFullscreenError'
			]
		];
		var val;
		var ret = {};
		var i, j;
		for ( i = 0; i < fnMap.length; i++ ) {
			val = fnMap[ i ];
			if ( val && val[ 1 ] in document ) {
				for ( j = 0; j < val.length; j++ ) {
					ret[ fnMap[ 0 ][ j ] ] = val[ j ];
				}
				return ret;
			}
		}
		return false;
	})();
	// If browser does not have Full Screen API, then simply unset default button template and stop
	if ( !fn ) {
		if ( $ && $.fancybox ) {
			$.fancybox.defaults.btnTpl.fullScreen = false;
		}
		return;
	}
	var FullScreen = {
		request : function ( elem ) {
			elem = elem || document.documentElement;
			elem[ fn.requestFullscreen ]( elem.ALLOW_KEYBOARD_INPUT );
		},
		exit : function () {
			document[ fn.exitFullscreen ]();
		},
		toggle : function ( elem ) {
			elem = elem || document.documentElement;
			if ( this.isFullscreen() ) {
				this.exit();
			} else {
				this.request( elem );
			}
		},
		isFullscreen : function()  {
			return Boolean( document[ fn.fullscreenElement ] );
		},
		enabled : function()  {
			return Boolean( document[ fn.fullscreenEnabled ] );
		}
	};
	$.extend(true, $.fancybox.defaults, {
		btnTpl : {
			fullScreen :
				'<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}">' +
					'<svg viewBox="0 0 40 40">' +
						'<path d="M9,12 h22 v16 h-22 v-16 v16 h22 v-16 Z" />' +
					'</svg>' +
				'</button>'
		},
		fullScreen : {
			autoStart : false
		}
	});
	$(document).on({
		'onInit.fb' : function(e, instance) {
			var $container;
			if ( instance && instance.group[ instance.currIndex ].opts.fullScreen ) {
				$container = instance.$refs.container;
				$container.on('click.fb-fullscreen', '[data-fancybox-fullscreen]', function(e) {
					e.stopPropagation();
					e.preventDefault();
					FullScreen.toggle( $container[ 0 ] );
				});
				if ( instance.opts.fullScreen && instance.opts.fullScreen.autoStart === true ) {
					FullScreen.request( $container[ 0 ] );
				}
				// Expose API
				instance.FullScreen = FullScreen;
			} else if ( instance ) {
				instance.$refs.toolbar.find('[data-fancybox-fullscreen]').hide();
			}
		},
		'afterKeydown.fb' : function(e, instance, current, keypress, keycode) {
			// "P" or Spacebar
			if ( instance && instance.FullScreen && keycode === 70 ) {
				keypress.preventDefault();
				instance.FullScreen.toggle( instance.$refs.container[ 0 ] );
			}
		},
		'beforeClose.fb' : function( instance ) {
			if ( instance && instance.FullScreen ) {
				FullScreen.exit();
			}
		}
	});
	$(document).on(fn.fullscreenchange, function() {
		var isFullscreen = FullScreen.isFullscreen(),
			instance = $.fancybox.getInstance();
		if ( instance ) {
			// If image is zooming, then force to stop and reposition properly
			if ( instance.current && instance.current.type === 'image' && instance.isAnimating ) {
				instance.current.$content.css( 'transition', 'none' );
				instance.isAnimating = false;
				instance.update( true, true, 0 );
			}
			instance.trigger( 'onFullscreenChange', isFullscreen );
			instance.$refs.container.toggleClass( 'fancybox-is-fullscreen', isFullscreen );
		}
	});
}( document, window.jQuery || jQuery ));
// ==========================================================================
//
// Thumbs
// Displays thumbnails in a grid
//
// ==========================================================================
;(function (document, $) {
	'use strict';
	// Make sure there are default values
	$.fancybox.defaults = $.extend(true, {
		btnTpl : {
			thumbs :
			'<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}">' +
				'<svg viewBox="0 0 120 120">' +
					'<path d="M30,30 h14 v14 h-14 Z M50,30 h14 v14 h-14 Z M70,30 h14 v14 h-14 Z M30,50 h14 v14 h-14 Z M50,50 h14 v14 h-14 Z M70,50 h14 v14 h-14 Z M30,70 h14 v14 h-14 Z M50,70 h14 v14 h-14 Z M70,70 h14 v14 h-14 Z" />' +
				'</svg>' +
			'</button>'
		},
		thumbs : {
			autoStart   : false,                  // Display thumbnails on opening
			hideOnClose : true,                   // Hide thumbnail grid when closing animation starts
			parentEl    : '.fancybox-container',  // Container is injected into this element
			axis        : 'y'                     // Vertical (y) or horizontal (x) scrolling
		}
	}, $.fancybox.defaults);
	var FancyThumbs = function( instance ) {
		this.init( instance );
	};
	$.extend( FancyThumbs.prototype, {
		$button		: null,
		$grid		: null,
		$list		: null,
		isVisible	: false,
		isActive	: false,
		init : function( instance ) {
			var self = this;
			self.instance = instance;
			instance.Thumbs = self;
			// Enable thumbs if at least two group items have thumbnails
			var first  = instance.group[0],
				second = instance.group[1];
			self.opts = instance.group[ instance.currIndex ].opts.thumbs;
			self.$button = instance.$refs.toolbar.find( '[data-fancybox-thumbs]' );
			if ( self.opts && first && second && (
		    		( first.type == 'image'  || first.opts.thumb  || first.opts.$thumb ) &&
		    		( second.type == 'image' || second.opts.thumb || second.opts.$thumb )
			)) {
				self.$button.show().on('click', function() {
					self.toggle();
				});
				self.isActive = true;
			} else {
				self.$button.hide();
			}
		},
		create : function() {
			var self = this,
				instance = self.instance,
				parentEl = self.opts.parentEl,
				list,
				src;
			self.$grid = $('<div class="fancybox-thumbs fancybox-thumbs-' + self.opts.axis + '"></div>').appendTo( instance.$refs.container.find( parentEl ).addBack().filter( parentEl ) );
			// Build list HTML
			list = '<ul>';
			$.each(instance.group, function( i, item ) {
				src = item.opts.thumb || ( item.opts.$thumb ? item.opts.$thumb.attr( 'src' ) : null );
				if ( !src && item.type === 'image' ) {
					src = item.src;
				}
				if ( src && src.length ) {
					list += '<li data-index="' + i + '"  tabindex="0" class="fancybox-thumbs-loading"><img data-src="' + src + '" /></li>';
				}
			});
			list += '</ul>';
			self.$list = $( list ).appendTo( self.$grid ).on('click', 'li', function() {
				instance.jumpTo( $(this).data('index') );
			});
			self.$list.find( 'img' ).hide().one('load', function() {
				var $parent		= $(this).parent().removeClass( 'fancybox-thumbs-loading' ),
					thumbWidth	= $parent.outerWidth(),
					thumbHeight	= $parent.outerHeight(),
					width,
					height,
					widthRatio,
					heightRatio;
				width  = this.naturalWidth	|| this.width;
				height = this.naturalHeight	|| this.height;
				// Calculate thumbnail dimensions; center vertically and horizontally
				widthRatio  = width  / thumbWidth;
				heightRatio = height / thumbHeight;
				if (widthRatio >= 1 && heightRatio >= 1) {
					if (widthRatio > heightRatio) {
						width  = width / heightRatio;
						height = thumbHeight;
					} else {
						width  = thumbWidth;
						height = height / widthRatio;
					}
				}
				$(this).css({
					width         : Math.floor(width),
					height        : Math.floor(height),
					'margin-top'  : height > thumbHeight ? ( Math.floor(thumbHeight * 0.3 - height * 0.3 ) ) : Math.floor(thumbHeight * 0.5 - height * 0.5 ),
					'margin-left' : Math.floor(thumbWidth * 0.5 - width * 0.5 )
				}).show();
			})
			.each(function() {
				this.src = $( this ).data( 'src' );
			});
			if ( self.opts.axis === 'x' ) {
				self.$list.width( parseInt( self.$grid.css("padding-right") ) + ( instance.group.length * self.$list.children().eq(0).outerWidth(true) ) + 'px' );
			}
		},
		focus : function( duration ) {
			var self = this,
				$list = self.$list,
				thumb,
				thumbPos;
			if ( self.instance.current ) {
				thumb = $list.children()
					.removeClass( 'fancybox-thumbs-active' )
					.filter('[data-index="' + self.instance.current.index  + '"]')
					.addClass('fancybox-thumbs-active');
				thumbPos = thumb.position();
				// Check if need to scroll to make current thumb visible
				if ( self.opts.axis === 'y' && ( thumbPos.top < 0 || thumbPos.top > ( $list.height() - thumb.outerHeight() ) ) ) {
					$list.stop().animate({ 'scrollTop' : $list.scrollTop() + thumbPos.top }, duration);
				} else if ( self.opts.axis === 'x' && (
						thumbPos.left < $list.parent().scrollLeft() ||
						thumbPos.left > ( $list.parent().scrollLeft() + ( $list.parent().width() - thumb.outerWidth() ) )
					)
				) {
					$list.parent().stop().animate({ 'scrollLeft' : thumbPos.left }, duration);
				}
			}
		},
		update : function() {
			this.instance.$refs.container.toggleClass( 'fancybox-show-thumbs', this.isVisible );
			if ( this.isVisible ) {
				if ( !this.$grid ) {
					this.create();
				}
				this.instance.trigger( 'onThumbsShow' );
				this.focus( 0 );
			} else if ( this.$grid ) {
				this.instance.trigger( 'onThumbsHide' );
			}
			// Update content position
			this.instance.update();
		},
		hide : function() {
			this.isVisible = false;
			this.update();
		},
		show : function() {
			this.isVisible = true;
			this.update();
		},
		toggle : function() {
			this.isVisible = !this.isVisible;
			this.update();
		}
	});
	$(document).on({
		'onInit.fb' : function(e, instance) {
			var Thumbs;
			if ( instance && !instance.Thumbs ) {
				Thumbs = new FancyThumbs( instance );
				if ( Thumbs.isActive && Thumbs.opts.autoStart === true ) {
					Thumbs.show();
				}
			}
		},
		'beforeShow.fb' : function(e, instance, item, firstRun) {
			var Thumbs = instance && instance.Thumbs;
			if ( Thumbs && Thumbs.isVisible ) {
				Thumbs.focus( firstRun ? 0 : 250 );
			}
		},
		'afterKeydown.fb' : function(e, instance, current, keypress, keycode) {
			var Thumbs = instance && instance.Thumbs;
			// "G"
			if ( Thumbs && Thumbs.isActive && keycode === 71 ) {
				keypress.preventDefault();
				Thumbs.toggle();
			}
		},
		'beforeClose.fb' : function( e, instance ) {
			var Thumbs = instance && instance.Thumbs;
			if ( Thumbs && Thumbs.isVisible && Thumbs.opts.hideOnClose !== false ) {
				Thumbs.$grid.hide();
			}
		}
	});
}(document, window.jQuery));
//// ==========================================================================
//
// Share
// Displays simple form for sharing current url
//
// ==========================================================================
;(function (document, $) {
	'use strict';
	$.extend(true, $.fancybox.defaults, {
		btnTpl : {
			share :
				'<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}">' +
					'<svg viewBox="0 0 40 40">' +
						'<path d="M6,30 C8,18 19,16 23,16 L23,16 L23,10 L33,20 L23,29 L23,24 C19,24 8,27 6,30 Z">' +
					'</svg>' +
				'</button>'
		},
		share : {
			tpl :
				'<div class="fancybox-share">' +
					'<h1>{{SHARE}}</h1>' +
					'<p>' +
						'<a href="https://www.facebook.com/sharer/sharer.php?u={{src}}" target="_blank" class="fancybox-share_button">' +
							'<svg version="1.1" viewBox="0 0 32 32" fill="#3b5998"><path d="M27.6 3h-23.2c-.8 0-1.4.6-1.4 1.4v23.1c0 .9.6 1.5 1.4 1.5h12.5v-10.1h-3.4v-3.9h3.4v-2.9c0-3.4 2.1-5.2 5-5.2 1.4 0 2.7.1 3 .2v3.5h-2.1c-1.6 0-1.9.8-1.9 1.9v2.5h3.9l-.5 3.9h-3.4v10.1h6.6c.8 0 1.4-.6 1.4-1.4v-23.2c.1-.8-.5-1.4-1.3-1.4z"></path></svg>' +
							'<span>Facebook</span>' +
						'</a>' +
						'<a href="https://www.pinterest.com/pin/create/button/?url={{src}}&amp;description={{descr}}" target="_blank" class="fancybox-share_button">' +
							'<svg version="1.1" viewBox="0 0 32 32" fill="#c92228"><path d="M16 3c-7.2 0-13 5.8-13 13 0 5.5 3.4 10.2 8.3 12.1-.1-1-.2-2.6 0-3.7.2-1 1.5-6.5 1.5-6.5s-.4-.8-.4-1.9c0-1.8 1-3.2 2.4-3.2 1.1 0 1.6.8 1.6 1.8 0 1.1-.7 2.8-1.1 4.3-.3 1.3.6 2.3 1.9 2.3 2.3 0 4.1-2.4 4.1-6 0-3.1-2.2-5.3-5.4-5.3-3.7 0-5.9 2.8-5.9 5.6 0 1.1.4 2.3 1 3 .1.1.1.2.1.4-.1.4-.3 1.3-.4 1.5-.1.2-.2.3-.4.2-1.6-.8-2.6-3.1-2.6-5 0-4.1 3-7.9 8.6-7.9 4.5 0 8 3.2 8 7.5 0 4.5-2.8 8.1-6.7 8.1-1.3 0-2.6-.7-3-1.5 0 0-.7 2.5-.8 3.1-.3 1.1-1.1 2.5-1.6 3.4 1.2.4 2.5.6 3.8.6 7.2 0 13-5.8 13-13 0-7.1-5.8-12.9-13-12.9z"></path></svg>' +
							'<span>Pinterest</span>' +
						'</a>' +
						'<a href="https://twitter.com/intent/tweet?url={{src}}&amp;text={{descr}}" target="_blank" class="fancybox-share_button">' +
							'<svg version="1.1" viewBox="0 0 32 32" fill="#1da1f2"><path d="M30 7.3c-1 .5-2.1.8-3.3.9 1.2-.7 2.1-1.8 2.5-3.2-1.1.7-2.3 1.1-3.6 1.4-1-1.1-2.5-1.8-4.2-1.8-3.2 0-5.7 2.6-5.7 5.7 0 .5.1.9.1 1.3-4.8-.2-9-2.5-11.8-6-.5.9-.8 1.9-.8 3 0 2 1 3.8 2.6 4.8-.9 0-1.8-.3-2.6-.7v.1c0 2.8 2 5.1 4.6 5.6-.5.1-1 .2-1.5.2-.4 0-.7 0-1.1-.1.7 2.3 2.9 3.9 5.4 4-2 1.5-4.4 2.5-7.1 2.5-.5 0-.9 0-1.4-.1 2.5 1.6 5.6 2.6 8.8 2.6 10.6 0 16.3-8.8 16.3-16.3v-.7c1.1-1 2-2 2.8-3.2z"></path></svg>' +
							'<span>Twitter</span>' +
						'</a>' +
					'</p>' +
					'<p><input type="text" value="{{src_raw}}" onfocus="this.select()" /></p>' +
				'</div>'
		}
	});
	function escapeHtml(string) {
		var entityMap = {
		  '&': '&amp;',
		  '<': '&lt;',
		  '>': '&gt;',
		  '"': '&quot;',
		  "'": '&#39;',
		  '/': '&#x2F;',
		  '`': '&#x60;',
		  '=': '&#x3D;'
		};
		return String(string).replace(/[&<>"'`=\/]/g, function (s) {
			return entityMap[s];
		});
	}
	$(document).on('click', '[data-fancybox-share]', function() {
		var f = $.fancybox.getInstance(),
			url,
			tpl;
		if ( f ) {
			url = f.current.opts.hash === false ? f.current.src : window.location;
			tpl = f.current.opts.share.tpl
					.replace( /\{\{src\}\}/g, encodeURIComponent( url ) )
					.replace( /\{\{src_raw\}\}/g, escapeHtml( url ) )
					.replace( /\{\{descr\}\}/g, f.$caption ? encodeURIComponent( f.$caption.text() ) : '' );
			$.fancybox.open({
				src  : f.translate( f, tpl ),
				type : 'html',
				opts : {
					animationEffect   : "fade",
					animationDuration : 250
				}
			});
		}
	});
}( document, window.jQuery || jQuery ));
// ==========================================================================
//
// Hash
// Enables linking to each modal
//
// ==========================================================================
;(function (document, window, $) {
	'use strict';
	// Simple $.escapeSelector polyfill (for jQuery prior v3)
	if ( !$.escapeSelector ) {
		$.escapeSelector = function( sel ) {
			var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
			var fcssescape = function( ch, asCodePoint ) {
				if ( asCodePoint ) {
					// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
					if ( ch === "\0" ) {
						return "\uFFFD";
					}
					// Control characters and (dependent upon position) numbers get escaped as code points
					return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
				}
				// Other potentially-special ASCII characters get backslash-escaped
				return "\\" + ch;
			};
			return ( sel + "" ).replace( rcssescape, fcssescape );
		};
	}
	// Create new history entry only once
	var shouldCreateHistory = true;
	// Variable containing last hash value set by fancyBox
	// It will be used to determine if fancyBox needs to close after hash change is detected
    var currentHash = null;
	// Throttling the history change
	var timerID = null;
	// Get info about gallery name and current index from url
    function parseUrl() {
        var hash    = window.location.hash.substr( 1 );
        var rez     = hash.split( '-' );
        var index   = rez.length > 1 && /^\+?\d+$/.test( rez[ rez.length - 1 ] ) ? parseInt( rez.pop( -1 ), 10 ) || 1 : 1;
        var gallery = rez.join( '-' );
		// Index is starting from 1
		if ( index < 1 ) {
			index = 1;
		}
        return {
            hash    : hash,
            index   : index,
            gallery : gallery
        };
    }
	// Trigger click evnt on links to open new fancyBox instance
	function triggerFromUrl( url ) {
		var $el;
        if ( url.gallery !== '' ) {
			// If we can find element matching 'data-fancybox' atribute, then trigger click event for that ..
			$el = $( "[data-fancybox='" + $.escapeSelector( url.gallery ) + "']" ).eq( url.index - 1 );
            if ( !$el.length ) {
				// .. if not, try finding element by ID
				$el = $( "#" + $.escapeSelector( url.gallery ) + "" );
			}
			if ( $el.length ) {
				shouldCreateHistory = false;
				$el.trigger( 'click' );
			}
        }
	}
	// Get gallery name from current instance
	function getGalleryID( instance ) {
		var opts;
		if ( !instance ) {
			return false;
		}
		opts = instance.current ? instance.current.opts : instance.opts;
		return opts.hash || ( opts.$orig ? opts.$orig.data( 'fancybox' ) : ''  );
	}
	// Start when DOM becomes ready
    $(function() {
		// Check if user has disabled this module
		if ( $.fancybox.defaults.hash === false ) {
			return;
		}
		// Update hash when opening/closing fancyBox
	    $(document).on({
			'onInit.fb' : function( e, instance ) {
				var url, gallery;
				if ( instance.group[ instance.currIndex ].opts.hash === false ) {
					return;
				}
				url     = parseUrl();
				gallery = getGalleryID( instance );
				// Make sure gallery start index matches index from hash
				if ( gallery && url.gallery && gallery == url.gallery ) {
					instance.currIndex = url.index - 1;
				}
			},
			'beforeShow.fb' : function( e, instance, current ) {
				var gallery;
				if ( !current || current.opts.hash === false ) {
					return;
				}
	            gallery = getGalleryID( instance );
	            // Update window hash
	            if ( gallery && gallery !== '' ) {
					if ( window.location.hash.indexOf( gallery ) < 0 ) {
		                instance.opts.origHash = window.location.hash;
		            }
					currentHash = gallery + ( instance.group.length > 1 ? '-' + ( current.index + 1 ) : '' );
					if ( 'replaceState' in window.history ) {
						if ( timerID ) {
							clearTimeout( timerID );
						}
						timerID = setTimeout(function() {
							window.history[ shouldCreateHistory ? 'pushState' : 'replaceState' ]( {} , document.title, window.location.pathname + window.location.search + '#' +  currentHash );
							timerID = null;
							shouldCreateHistory = false;
						}, 300);
					} else {
						window.location.hash = currentHash;
					}
	            }
	        },
			'beforeClose.fb' : function( e, instance, current ) {
				var gallery, origHash;
				if ( timerID ) {
					clearTimeout( timerID );
				}
				if ( current.opts.hash === false ) {
					return;
				}
				gallery  = getGalleryID( instance );
				origHash = instance && instance.opts.origHash ? instance.opts.origHash : '';
	            // Remove hash from location bar
	            if ( gallery && gallery !== '' ) {
	                if ( 'replaceState' in history ) {
						window.history.replaceState( {} , document.title, window.location.pathname + window.location.search + origHash );
	                } else {
						window.location.hash = origHash;
						// Keep original scroll position
						$( window ).scrollTop( instance.scrollTop ).scrollLeft( instance.scrollLeft );
	                }
	            }
				currentHash = null;
	        }
	    });
		// Check if need to close after url has changed
		$(window).on('hashchange.fb', function() {
			var url = parseUrl();
			if ( $.fancybox.getInstance() ) {
				if ( currentHash && currentHash !== url.gallery + '-' + url.index && !( url.index === 1 && currentHash == url.gallery ) ) {
					currentHash = null;
					$.fancybox.close();
				}
			} else if ( url.gallery !== '' ) {
				triggerFromUrl( url );
			}
		});
		// Check current hash and trigger click event on matching element to start fancyBox, if needed
		setTimeout(function() {
			triggerFromUrl( parseUrl() );
		}, 50);
    });
}( document, window, window.jQuery || jQuery ));
/*!
* Parsley.js
* Version 2.8.1 - built Sat, Feb 3rd 2018, 2:27 pm
* http://parsleyjs.org
* Guillaume Potier - <guillaume@wisembly.com>
* Marc-Andre Lafortune - <petroselinum@marc-andre.ca>
* MIT Licensed
*/
// The source code below is generated by babel as
// Parsley is written in ECMAScript 6
//
var _slice = Array.prototype.slice;
var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) : typeof define === 'function' && define.amd ? define(['jquery'], factory) : global.parsley = factory(global.jQuery);
})(this, function ($) {
  'use strict';
  var globalID = 1;
  var pastWarnings = {};
  var Utils = {
    // Parsley DOM-API
    // returns object from dom attributes and values
    attr: function attr(element, namespace, obj) {
      var i;
      var attribute;
      var attributes;
      var regex = new RegExp('^' + namespace, 'i');
      if ('undefined' === typeof obj) obj = {};else {
        // Clear all own properties. This won't affect prototype's values
        for (i in obj) {
          if (obj.hasOwnProperty(i)) delete obj[i];
        }
      }
      if (!element) return obj;
      attributes = element.attributes;
      for (i = attributes.length; i--;) {
        attribute = attributes[i];
        if (attribute && attribute.specified && regex.test(attribute.name)) {
          obj[this.camelize(attribute.name.slice(namespace.length))] = this.deserializeValue(attribute.value);
        }
      }
      return obj;
    },
    checkAttr: function checkAttr(element, namespace, _checkAttr) {
      return element.hasAttribute(namespace + _checkAttr);
    },
    setAttr: function setAttr(element, namespace, attr, value) {
      element.setAttribute(this.dasherize(namespace + attr), String(value));
    },
    getType: function getType(element) {
      return element.getAttribute('type') || 'text';
    },
    generateID: function generateID() {
      return '' + globalID++;
    },
    /** Third party functions **/
    deserializeValue: function deserializeValue(value) {
      var num;
      try {
        return value ? value == "true" || (value == "false" ? false : value == "null" ? null : !isNaN(num = Number(value)) ? num : /^[\[\{]/.test(value) ? JSON.parse(value) : value) : value;
      } catch (e) {
        return value;
      }
    },
    // Zepto camelize function
    camelize: function camelize(str) {
      return str.replace(/-+(.)?/g, function (match, chr) {
        return chr ? chr.toUpperCase() : '';
      });
    },
    // Zepto dasherize function
    dasherize: function dasherize(str) {
      return str.replace(/::/g, '/').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/_/g, '-').toLowerCase();
    },
    warn: function warn() {
      var _window$console;
      if (window.console && 'function' === typeof window.console.warn) (_window$console = window.console).warn.apply(_window$console, arguments);
    },
    warnOnce: function warnOnce(msg) {
      if (!pastWarnings[msg]) {
        pastWarnings[msg] = true;
        this.warn.apply(this, arguments);
      }
    },
    _resetWarnings: function _resetWarnings() {
      pastWarnings = {};
    },
    trimString: function trimString(string) {
      return string.replace(/^\s+|\s+$/g, '');
    },
    parse: {
      date: function date(string) {
        var parsed = string.match(/^(\d{4,})-(\d\d)-(\d\d)$/);
        if (!parsed) return null;
        var _parsed$map = parsed.map(function (x) {
          return parseInt(x, 10);
        });
        var _parsed$map2 = _slicedToArray(_parsed$map, 4);
        var _ = _parsed$map2[0];
        var year = _parsed$map2[1];
        var month = _parsed$map2[2];
        var day = _parsed$map2[3];
        var date = new Date(year, month - 1, day);
        if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) return null;
        return date;
      },
      string: function string(_string) {
        return _string;
      },
      integer: function integer(string) {
        if (isNaN(string)) return null;
        return parseInt(string, 10);
      },
      number: function number(string) {
        if (isNaN(string)) throw null;
        return parseFloat(string);
      },
      'boolean': function _boolean(string) {
        return !/^\s*false\s*$/i.test(string);
      },
      object: function object(string) {
        return Utils.deserializeValue(string);
      },
      regexp: function regexp(_regexp) {
        var flags = '';
        // Test if RegExp is literal, if not, nothing to be done, otherwise, we need to isolate flags and pattern
        if (/^\/.*\/(?:[gimy]*)$/.test(_regexp)) {
          // Replace the regexp literal string with the first match group: ([gimy]*)
          // If no flag is present, this will be a blank string
          flags = _regexp.replace(/.*\/([gimy]*)$/, '$1');
          // Again, replace the regexp literal string with the first match group:
          // everything excluding the opening and closing slashes and the flags
          _regexp = _regexp.replace(new RegExp('^/(.*?)/' + flags + '$'), '$1');
        } else {
          // Anchor regexp:
          _regexp = '^' + _regexp + '$';
        }
        return new RegExp(_regexp, flags);
      }
    },
    parseRequirement: function parseRequirement(requirementType, string) {
      var converter = this.parse[requirementType || 'string'];
      if (!converter) throw 'Unknown requirement specification: "' + requirementType + '"';
      var converted = converter(string);
      if (converted === null) throw 'Requirement is not a ' + requirementType + ': "' + string + '"';
      return converted;
    },
    namespaceEvents: function namespaceEvents(events, namespace) {
      events = this.trimString(events || '').split(/\s+/);
      if (!events[0]) return '';
      return $.map(events, function (evt) {
        return evt + '.' + namespace;
      }).join(' ');
    },
    difference: function difference(array, remove) {
      // This is O(N^2), should be optimized
      var result = [];
      $.each(array, function (_, elem) {
        if (remove.indexOf(elem) == -1) result.push(elem);
      });
      return result;
    },
    // Alter-ego to native Promise.all, but for jQuery
    all: function all(promises) {
      // jQuery treats $.when() and $.when(singlePromise) differently; let's avoid that and add spurious elements
      return $.when.apply($, _toConsumableArray(promises).concat([42, 42]));
    },
    // Object.create polyfill, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#Polyfill
    objectCreate: Object.create || (function () {
      var Object = function Object() {};
      return function (prototype) {
        if (arguments.length > 1) {
          throw Error('Second argument not supported');
        }
        if (typeof prototype != 'object') {
          throw TypeError('Argument must be an object');
        }
        Object.prototype = prototype;
        var result = new Object();
        Object.prototype = null;
        return result;
      };
    })(),
    _SubmitSelector: 'input[type="submit"], button:submit'
  };
  // All these options could be overriden and specified directly in DOM using
  // `data-parsley-` default DOM-API
  // eg: `inputs` can be set in DOM using `data-parsley-inputs="input, textarea"`
  // eg: `data-parsley-stop-on-first-failing-constraint="false"`
  var Defaults = {
    // ### General
    // Default data-namespace for DOM API
    namespace: 'data-parsley-',
    // Supported inputs by default
    inputs: 'input, textarea, select',
    // Excluded inputs by default
    excluded: 'input[type=button], input[type=submit], input[type=reset], input[type=hidden]',
    // Stop validating field on highest priority failing constraint
    priorityEnabled: true,
    // ### Field only
    // identifier used to group together inputs (e.g. radio buttons...)
    multiple: null,
    // identifier (or array of identifiers) used to validate only a select group of inputs
    group: null,
    // ### UI
    // Enable\Disable error messages
    uiEnabled: true,
    // Key events threshold before validation
    validationThreshold: 3,
    // Focused field on form validation error. 'first'|'last'|'none'
    focus: 'first',
    // event(s) that will trigger validation before first failure. eg: `input`...
    trigger: false,
    // event(s) that will trigger validation after first failure.
    triggerAfterFailure: 'input',
    // Class that would be added on every failing validation Parsley field
    errorClass: 'parsley-error',
    // Same for success validation
    successClass: 'parsley-success',
    // Return the `$element` that will receive these above success or error classes
    // Could also be (and given directly from DOM) a valid selector like `'#div'`
    classHandler: function classHandler(Field) {},
    // Return the `$element` where errors will be appended
    // Could also be (and given directly from DOM) a valid selector like `'#div'`
    errorsContainer: function errorsContainer(Field) {},
    // ul elem that would receive errors' list
    errorsWrapper: '<ul class="parsley-errors-list"></ul>',
    // li elem that would receive error message
    errorTemplate: '<li></li>'
  };
  var Base = function Base() {
    this.__id__ = Utils.generateID();
  };
  Base.prototype = {
    asyncSupport: true, // Deprecated
    _pipeAccordingToValidationResult: function _pipeAccordingToValidationResult() {
      var _this = this;
      var pipe = function pipe() {
        var r = $.Deferred();
        if (true !== _this.validationResult) r.reject();
        return r.resolve().promise();
      };
      return [pipe, pipe];
    },
    actualizeOptions: function actualizeOptions() {
      Utils.attr(this.element, this.options.namespace, this.domOptions);
      if (this.parent && this.parent.actualizeOptions) this.parent.actualizeOptions();
      return this;
    },
    _resetOptions: function _resetOptions(initOptions) {
      this.domOptions = Utils.objectCreate(this.parent.options);
      this.options = Utils.objectCreate(this.domOptions);
      // Shallow copy of ownProperties of initOptions:
      for (var i in initOptions) {
        if (initOptions.hasOwnProperty(i)) this.options[i] = initOptions[i];
      }
      this.actualizeOptions();
    },
    _listeners: null,
    // Register a callback for the given event name
    // Callback is called with context as the first argument and the `this`
    // The context is the current parsley instance, or window.Parsley if global
    // A return value of `false` will interrupt the calls
    on: function on(name, fn) {
      this._listeners = this._listeners || {};
      var queue = this._listeners[name] = this._listeners[name] || [];
      queue.push(fn);
      return this;
    },
    // Deprecated. Use `on` instead
    subscribe: function subscribe(name, fn) {
      $.listenTo(this, name.toLowerCase(), fn);
    },
    // Unregister a callback (or all if none is given) for the given event name
    off: function off(name, fn) {
      var queue = this._listeners && this._listeners[name];
      if (queue) {
        if (!fn) {
          delete this._listeners[name];
        } else {
          for (var i = queue.length; i--;) if (queue[i] === fn) queue.splice(i, 1);
        }
      }
      return this;
    },
    // Deprecated. Use `off`
    unsubscribe: function unsubscribe(name, fn) {
      $.unsubscribeTo(this, name.toLowerCase());
    },
    // Trigger an event of the given name
    // A return value of `false` interrupts the callback chain
    // Returns false if execution was interrupted
    trigger: function trigger(name, target, extraArg) {
      target = target || this;
      var queue = this._listeners && this._listeners[name];
      var result;
      var parentResult;
      if (queue) {
        for (var i = queue.length; i--;) {
          result = queue[i].call(target, target, extraArg);
          if (result === false) return result;
        }
      }
      if (this.parent) {
        return this.parent.trigger(name, target, extraArg);
      }
      return true;
    },
    asyncIsValid: function asyncIsValid(group, force) {
      Utils.warnOnce("asyncIsValid is deprecated; please use whenValid instead");
      return this.whenValid({ group: group, force: force });
    },
    _findRelated: function _findRelated() {
      return this.options.multiple ? $(this.parent.element.querySelectorAll('[' + this.options.namespace + 'multiple="' + this.options.multiple + '"]')) : this.$element;
    }
  };
  var convertArrayRequirement = function convertArrayRequirement(string, length) {
    var m = string.match(/^\s*\[(.*)\]\s*$/);
    if (!m) throw 'Requirement is not an array: "' + string + '"';
    var values = m[1].split(',').map(Utils.trimString);
    if (values.length !== length) throw 'Requirement has ' + values.length + ' values when ' + length + ' are needed';
    return values;
  };
  var convertExtraOptionRequirement = function convertExtraOptionRequirement(requirementSpec, string, extraOptionReader) {
    var main = null;
    var extra = {};
    for (var key in requirementSpec) {
      if (key) {
        var value = extraOptionReader(key);
        if ('string' === typeof value) value = Utils.parseRequirement(requirementSpec[key], value);
        extra[key] = value;
      } else {
        main = Utils.parseRequirement(requirementSpec[key], string);
      }
    }
    return [main, extra];
  };
  // A Validator needs to implement the methods `validate` and `parseRequirements`
  var Validator = function Validator(spec) {
    $.extend(true, this, spec);
  };
  Validator.prototype = {
    // Returns `true` iff the given `value` is valid according the given requirements.
    validate: function validate(value, requirementFirstArg) {
      if (this.fn) {
        // Legacy style validator
        if (arguments.length > 3) // If more args then value, requirement, instance...
          requirementFirstArg = [].slice.call(arguments, 1, -1); // Skip first arg (value) and last (instance), combining the rest
        return this.fn(value, requirementFirstArg);
      }
      if (Array.isArray(value)) {
        if (!this.validateMultiple) throw 'Validator `' + this.name + '` does not handle multiple values';
        return this.validateMultiple.apply(this, arguments);
      } else {
        var instance = arguments[arguments.length - 1];
        if (this.validateDate && instance._isDateInput()) {
          arguments[0] = Utils.parse.date(arguments[0]);
          if (arguments[0] === null) return false;
          return this.validateDate.apply(this, arguments);
        }
        if (this.validateNumber) {
          if (isNaN(value)) return false;
          arguments[0] = parseFloat(arguments[0]);
          return this.validateNumber.apply(this, arguments);
        }
        if (this.validateString) {
          return this.validateString.apply(this, arguments);
        }
        throw 'Validator `' + this.name + '` only handles multiple values';
      }
    },
    // Parses `requirements` into an array of arguments,
    // according to `this.requirementType`
    parseRequirements: function parseRequirements(requirements, extraOptionReader) {
      if ('string' !== typeof requirements) {
        // Assume requirement already parsed
        // but make sure we return an array
        return Array.isArray(requirements) ? requirements : [requirements];
      }
      var type = this.requirementType;
      if (Array.isArray(type)) {
        var values = convertArrayRequirement(requirements, type.length);
        for (var i = 0; i < values.length; i++) values[i] = Utils.parseRequirement(type[i], values[i]);
        return values;
      } else if ($.isPlainObject(type)) {
        return convertExtraOptionRequirement(type, requirements, extraOptionReader);
      } else {
        return [Utils.parseRequirement(type, requirements)];
      }
    },
    // Defaults:
    requirementType: 'string',
    priority: 2
  };
  var ValidatorRegistry = function ValidatorRegistry(validators, catalog) {
    this.__class__ = 'ValidatorRegistry';
    // Default Parsley locale is en
    this.locale = 'en';
    this.init(validators || {}, catalog || {});
  };
  var typeTesters = {
    email: /^((([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/,
    // Follow https://www.w3.org/TR/html5/infrastructure.html#floating-point-numbers
    number: /^-?(\d*\.)?\d+(e[-+]?\d+)?$/i,
    integer: /^-?\d+$/,
    digits: /^\d+$/,
    alphanum: /^\w+$/i,
    date: {
      test: function test(value) {
        return Utils.parse.date(value) !== null;
      }
    },
    url: new RegExp("^" +
    // protocol identifier
    "(?:(?:https?|ftp)://)?" + // ** mod: make scheme optional
    // user:pass authentication
    "(?:\\S+(?::\\S*)?@)?" + "(?:" +
    // IP address exclusion
    // private & local networks
    // "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +   // ** mod: allow local networks
    // "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +  // ** mod: allow local networks
    // "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +  // ** mod: allow local networks
    // IP address dotted notation octets
    // excludes loopback network 0.0.0.0
    // excludes reserved space >= 224.0.0.0
    // excludes network & broacast addresses
    // (first & last IP address of each class)
    "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" + "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" + "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" + "|" +
    // host name
    '(?:(?:[a-zA-Z\\u00a1-\\uffff0-9]-*)*[a-zA-Z\\u00a1-\\uffff0-9]+)' +
    // domain name
    '(?:\\.(?:[a-zA-Z\\u00a1-\\uffff0-9]-*)*[a-zA-Z\\u00a1-\\uffff0-9]+)*' +
    // TLD identifier
    '(?:\\.(?:[a-zA-Z\\u00a1-\\uffff]{2,}))' + ")" +
    // port number
    "(?::\\d{2,5})?" +
    // resource path
    "(?:/\\S*)?" + "$")
  };
  typeTesters.range = typeTesters.number;
  // See http://stackoverflow.com/a/10454560/8279
  var decimalPlaces = function decimalPlaces(num) {
    var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) {
      return 0;
    }
    return Math.max(0,
    // Number of digits right of decimal point.
    (match[1] ? match[1].length : 0) - (
    // Adjust for scientific notation.
    match[2] ? +match[2] : 0));
  };
  // parseArguments('number', ['1', '2']) => [1, 2]
  var ValidatorRegistry__parseArguments = function ValidatorRegistry__parseArguments(type, args) {
    return args.map(Utils.parse[type]);
  };
  // operatorToValidator returns a validating function for an operator function, applied to the given type
  var ValidatorRegistry__operatorToValidator = function ValidatorRegistry__operatorToValidator(type, operator) {
    return function (value) {
      for (var _len = arguments.length, requirementsAndInput = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        requirementsAndInput[_key - 1] = arguments[_key];
      }
      requirementsAndInput.pop(); // Get rid of `input` argument
      return operator.apply(undefined, [value].concat(_toConsumableArray(ValidatorRegistry__parseArguments(type, requirementsAndInput))));
    };
  };
  var ValidatorRegistry__comparisonOperator = function ValidatorRegistry__comparisonOperator(operator) {
    return {
      validateDate: ValidatorRegistry__operatorToValidator('date', operator),
      validateNumber: ValidatorRegistry__operatorToValidator('number', operator),
      requirementType: operator.length <= 2 ? 'string' : ['string', 'string'], // Support operators with a 1 or 2 requirement(s)
      priority: 30
    };
  };
  ValidatorRegistry.prototype = {
    init: function init(validators, catalog) {
      this.catalog = catalog;
      // Copy prototype's validators:
      this.validators = _extends({}, this.validators);
      for (var name in validators) this.addValidator(name, validators[name].fn, validators[name].priority);
      window.Parsley.trigger('parsley:validator:init');
    },
    // Set new messages locale if we have dictionary loaded in ParsleyConfig.i18n
    setLocale: function setLocale(locale) {
      if ('undefined' === typeof this.catalog[locale]) throw new Error(locale + ' is not available in the catalog');
      this.locale = locale;
      return this;
    },
    // Add a new messages catalog for a given locale. Set locale for this catalog if set === `true`
    addCatalog: function addCatalog(locale, messages, set) {
      if ('object' === typeof messages) this.catalog[locale] = messages;
      if (true === set) return this.setLocale(locale);
      return this;
    },
    // Add a specific message for a given constraint in a given locale
    addMessage: function addMessage(locale, name, message) {
      if ('undefined' === typeof this.catalog[locale]) this.catalog[locale] = {};
      this.catalog[locale][name] = message;
      return this;
    },
    // Add messages for a given locale
    addMessages: function addMessages(locale, nameMessageObject) {
      for (var name in nameMessageObject) this.addMessage(locale, name, nameMessageObject[name]);
      return this;
    },
    // Add a new validator
    //
    //    addValidator('custom', {
    //        requirementType: ['integer', 'integer'],
    //        validateString: function(value, from, to) {},
    //        priority: 22,
    //        messages: {
    //          en: "Hey, that's no good",
    //          fr: "Aye aye, pas bon du tout",
    //        }
    //    })
    //
    // Old API was addValidator(name, function, priority)
    //
    addValidator: function addValidator(name, arg1, arg2) {
      if (this.validators[name]) Utils.warn('Validator "' + name + '" is already defined.');else if (Defaults.hasOwnProperty(name)) {
        Utils.warn('"' + name + '" is a restricted keyword and is not a valid validator name.');
        return;
      }
      return this._setValidator.apply(this, arguments);
    },
    hasValidator: function hasValidator(name) {
      return !!this.validators[name];
    },
    updateValidator: function updateValidator(name, arg1, arg2) {
      if (!this.validators[name]) {
        Utils.warn('Validator "' + name + '" is not already defined.');
        return this.addValidator.apply(this, arguments);
      }
      return this._setValidator.apply(this, arguments);
    },
    removeValidator: function removeValidator(name) {
      if (!this.validators[name]) Utils.warn('Validator "' + name + '" is not defined.');
      delete this.validators[name];
      return this;
    },
    _setValidator: function _setValidator(name, validator, priority) {
      if ('object' !== typeof validator) {
        // Old style validator, with `fn` and `priority`
        validator = {
          fn: validator,
          priority: priority
        };
      }
      if (!validator.validate) {
        validator = new Validator(validator);
      }
      this.validators[name] = validator;
      for (var locale in validator.messages || {}) this.addMessage(locale, name, validator.messages[locale]);
      return this;
    },
    getErrorMessage: function getErrorMessage(constraint) {
      var message;
      // Type constraints are a bit different, we have to match their requirements too to find right error message
      if ('type' === constraint.name) {
        var typeMessages = this.catalog[this.locale][constraint.name] || {};
        message = typeMessages[constraint.requirements];
      } else message = this.formatMessage(this.catalog[this.locale][constraint.name], constraint.requirements);
      return message || this.catalog[this.locale].defaultMessage || this.catalog.en.defaultMessage;
    },
    // Kind of light `sprintf()` implementation
    formatMessage: function formatMessage(string, parameters) {
      if ('object' === typeof parameters) {
        for (var i in parameters) string = this.formatMessage(string, parameters[i]);
        return string;
      }
      return 'string' === typeof string ? string.replace(/%s/i, parameters) : '';
    },
    // Here is the Parsley default validators list.
    // A validator is an object with the following key values:
    //  - priority: an integer
    //  - requirement: 'string' (default), 'integer', 'number', 'regexp' or an Array of these
    //  - validateString, validateMultiple, validateNumber: functions returning `true`, `false` or a promise
    // Alternatively, a validator can be a function that returns such an object
    //
    validators: {
      notblank: {
        validateString: function validateString(value) {
          return (/\S/.test(value)
          );
        },
        priority: 2
      },
      required: {
        validateMultiple: function validateMultiple(values) {
          return values.length > 0;
        },
        validateString: function validateString(value) {
          return (/\S/.test(value)
          );
        },
        priority: 512
      },
      type: {
        validateString: function validateString(value, type) {
          var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
          var _ref$step = _ref.step;
          var step = _ref$step === undefined ? 'any' : _ref$step;
          var _ref$base = _ref.base;
          var base = _ref$base === undefined ? 0 : _ref$base;
          var tester = typeTesters[type];
          if (!tester) {
            throw new Error('validator type `' + type + '` is not supported');
          }
          if (!tester.test(value)) return false;
          if ('number' === type) {
            if (!/^any$/i.test(step || '')) {
              var nb = Number(value);
              var decimals = Math.max(decimalPlaces(step), decimalPlaces(base));
              if (decimalPlaces(nb) > decimals) // Value can't have too many decimals
                return false;
              // Be careful of rounding errors by using integers.
              var toInt = function toInt(f) {
                return Math.round(f * Math.pow(10, decimals));
              };
              if ((toInt(nb) - toInt(base)) % toInt(step) != 0) return false;
            }
          }
          return true;
        },
        requirementType: {
          '': 'string',
          step: 'string',
          base: 'number'
        },
        priority: 256
      },
      pattern: {
        validateString: function validateString(value, regexp) {
          return regexp.test(value);
        },
        requirementType: 'regexp',
        priority: 64
      },
      minlength: {
        validateString: function validateString(value, requirement) {
          return value.length >= requirement;
        },
        requirementType: 'integer',
        priority: 30
      },
      maxlength: {
        validateString: function validateString(value, requirement) {
          return value.length <= requirement;
        },
        requirementType: 'integer',
        priority: 30
      },
      length: {
        validateString: function validateString(value, min, max) {
          return value.length >= min && value.length <= max;
        },
        requirementType: ['integer', 'integer'],
        priority: 30
      },
      mincheck: {
        validateMultiple: function validateMultiple(values, requirement) {
          return values.length >= requirement;
        },
        requirementType: 'integer',
        priority: 30
      },
      maxcheck: {
        validateMultiple: function validateMultiple(values, requirement) {
          return values.length <= requirement;
        },
        requirementType: 'integer',
        priority: 30
      },
      check: {
        validateMultiple: function validateMultiple(values, min, max) {
          return values.length >= min && values.length <= max;
        },
        requirementType: ['integer', 'integer'],
        priority: 30
      },
      min: ValidatorRegistry__comparisonOperator(function (value, requirement) {
        return value >= requirement;
      }),
      max: ValidatorRegistry__comparisonOperator(function (value, requirement) {
        return value <= requirement;
      }),
      range: ValidatorRegistry__comparisonOperator(function (value, min, max) {
        return value >= min && value <= max;
      }),
      equalto: {
        validateString: function validateString(value, refOrValue) {
          var $reference = $(refOrValue);
          if ($reference.length) return value === $reference.val();else return value === refOrValue;
        },
        priority: 256
      }
    }
  };
  var UI = {};
  var diffResults = function diffResults(newResult, oldResult, deep) {
    var added = [];
    var kept = [];
    for (var i = 0; i < newResult.length; i++) {
      var found = false;
      for (var j = 0; j < oldResult.length; j++) if (newResult[i].assert.name === oldResult[j].assert.name) {
        found = true;
        break;
      }
      if (found) kept.push(newResult[i]);else added.push(newResult[i]);
    }
    return {
      kept: kept,
      added: added,
      removed: !deep ? diffResults(oldResult, newResult, true).added : []
    };
  };
  UI.Form = {
    _actualizeTriggers: function _actualizeTriggers() {
      var _this2 = this;
      this.$element.on('submit.Parsley', function (evt) {
        _this2.onSubmitValidate(evt);
      });
      this.$element.on('click.Parsley', Utils._SubmitSelector, function (evt) {
        _this2.onSubmitButton(evt);
      });
      // UI could be disabled
      if (false === this.options.uiEnabled) return;
      this.element.setAttribute('novalidate', '');
    },
    focus: function focus() {
      this._focusedField = null;
      if (true === this.validationResult || 'none' === this.options.focus) return null;
      for (var i = 0; i < this.fields.length; i++) {
        var field = this.fields[i];
        if (true !== field.validationResult && field.validationResult.length > 0 && 'undefined' === typeof field.options.noFocus) {
          this._focusedField = field.$element;
          if ('first' === this.options.focus) break;
        }
      }
      if (null === this._focusedField) return null;
      return this._focusedField.focus();
    },
    _destroyUI: function _destroyUI() {
      // Reset all event listeners
      this.$element.off('.Parsley');
    }
  };
  UI.Field = {
    _reflowUI: function _reflowUI() {
      this._buildUI();
      // If this field doesn't have an active UI don't bother doing something
      if (!this._ui) return;
      // Diff between two validation results
      var diff = diffResults(this.validationResult, this._ui.lastValidationResult);
      // Then store current validation result for next reflow
      this._ui.lastValidationResult = this.validationResult;
      // Handle valid / invalid / none field class
      this._manageStatusClass();
      // Add, remove, updated errors messages
      this._manageErrorsMessages(diff);
      // Triggers impl
      this._actualizeTriggers();
      // If field is not valid for the first time, bind keyup trigger to ease UX and quickly inform user
      if ((diff.kept.length || diff.added.length) && !this._failedOnce) {
        this._failedOnce = true;
        this._actualizeTriggers();
      }
    },
    // Returns an array of field's error message(s)
    getErrorsMessages: function getErrorsMessages() {
      // No error message, field is valid
      if (true === this.validationResult) return [];
      var messages = [];
      for (var i = 0; i < this.validationResult.length; i++) messages.push(this.validationResult[i].errorMessage || this._getErrorMessage(this.validationResult[i].assert));
      return messages;
    },
    // It's a goal of Parsley that this method is no longer required [#1073]
    addError: function addError(name) {
      var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var message = _ref2.message;
      var assert = _ref2.assert;
      var _ref2$updateClass = _ref2.updateClass;
      var updateClass = _ref2$updateClass === undefined ? true : _ref2$updateClass;
      this._buildUI();
      this._addError(name, { message: message, assert: assert });
      if (updateClass) this._errorClass();
    },
    // It's a goal of Parsley that this method is no longer required [#1073]
    updateError: function updateError(name) {
      var _ref3 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var message = _ref3.message;
      var assert = _ref3.assert;
      var _ref3$updateClass = _ref3.updateClass;
      var updateClass = _ref3$updateClass === undefined ? true : _ref3$updateClass;
      this._buildUI();
      this._updateError(name, { message: message, assert: assert });
      if (updateClass) this._errorClass();
    },
    // It's a goal of Parsley that this method is no longer required [#1073]
    removeError: function removeError(name) {
      var _ref4 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var _ref4$updateClass = _ref4.updateClass;
      var updateClass = _ref4$updateClass === undefined ? true : _ref4$updateClass;
      this._buildUI();
      this._removeError(name);
      // edge case possible here: remove a standard Parsley error that is still failing in this.validationResult
      // but highly improbable cuz' manually removing a well Parsley handled error makes no sense.
      if (updateClass) this._manageStatusClass();
    },
    _manageStatusClass: function _manageStatusClass() {
      if (this.hasConstraints() && this.needsValidation() && true === this.validationResult) this._successClass();else if (this.validationResult.length > 0) this._errorClass();else this._resetClass();
    },
    _manageErrorsMessages: function _manageErrorsMessages(diff) {
      if ('undefined' !== typeof this.options.errorsMessagesDisabled) return;
      // Case where we have errorMessage option that configure an unique field error message, regardless failing validators
      if ('undefined' !== typeof this.options.errorMessage) {
        if (diff.added.length || diff.kept.length) {
          this._insertErrorWrapper();
          if (0 === this._ui.$errorsWrapper.find('.parsley-custom-error-message').length) this._ui.$errorsWrapper.append($(this.options.errorTemplate).addClass('parsley-custom-error-message'));
          return this._ui.$errorsWrapper.addClass('filled').find('.parsley-custom-error-message').html(this.options.errorMessage);
        }
        return this._ui.$errorsWrapper.removeClass('filled').find('.parsley-custom-error-message').remove();
      }
      // Show, hide, update failing constraints messages
      for (var i = 0; i < diff.removed.length; i++) this._removeError(diff.removed[i].assert.name);
      for (i = 0; i < diff.added.length; i++) this._addError(diff.added[i].assert.name, { message: diff.added[i].errorMessage, assert: diff.added[i].assert });
      for (i = 0; i < diff.kept.length; i++) this._updateError(diff.kept[i].assert.name, { message: diff.kept[i].errorMessage, assert: diff.kept[i].assert });
    },
    _addError: function _addError(name, _ref5) {
      var message = _ref5.message;
      var assert = _ref5.assert;
      this._insertErrorWrapper();
      this._ui.$errorClassHandler.attr('aria-describedby', this._ui.errorsWrapperId);
      this._ui.$errorsWrapper.addClass('filled').append($(this.options.errorTemplate).addClass('parsley-' + name).html(message || this._getErrorMessage(assert)));
    },
    _updateError: function _updateError(name, _ref6) {
      var message = _ref6.message;
      var assert = _ref6.assert;
      this._ui.$errorsWrapper.addClass('filled').find('.parsley-' + name).html(message || this._getErrorMessage(assert));
    },
    _removeError: function _removeError(name) {
      this._ui.$errorClassHandler.removeAttr('aria-describedby');
      this._ui.$errorsWrapper.removeClass('filled').find('.parsley-' + name).remove();
    },
    _getErrorMessage: function _getErrorMessage(constraint) {
      var customConstraintErrorMessage = constraint.name + 'Message';
      if ('undefined' !== typeof this.options[customConstraintErrorMessage]) return window.Parsley.formatMessage(this.options[customConstraintErrorMessage], constraint.requirements);
      return window.Parsley.getErrorMessage(constraint);
    },
    _buildUI: function _buildUI() {
      // UI could be already built or disabled
      if (this._ui || false === this.options.uiEnabled) return;
      var _ui = {};
      // Give field its Parsley id in DOM
      this.element.setAttribute(this.options.namespace + 'id', this.__id__);
      /** Generate important UI elements and store them in this **/
      // $errorClassHandler is the $element that woul have parsley-error and parsley-success classes
      _ui.$errorClassHandler = this._manageClassHandler();
      // $errorsWrapper is a div that would contain the various field errors, it will be appended into $errorsContainer
      _ui.errorsWrapperId = 'parsley-id-' + (this.options.multiple ? 'multiple-' + this.options.multiple : this.__id__);
      _ui.$errorsWrapper = $(this.options.errorsWrapper).attr('id', _ui.errorsWrapperId);
      // ValidationResult UI storage to detect what have changed bwt two validations, and update DOM accordingly
      _ui.lastValidationResult = [];
      _ui.validationInformationVisible = false;
      // Store it in this for later
      this._ui = _ui;
    },
    // Determine which element will have `parsley-error` and `parsley-success` classes
    _manageClassHandler: function _manageClassHandler() {
      // Class handled could also be determined by function given in Parsley options
      if ('string' === typeof this.options.classHandler && $(this.options.classHandler).length) return $(this.options.classHandler);
      // Class handled could also be determined by function given in Parsley options
      var $handlerFunction = this.options.classHandler;
      // It might also be the function name of a global function
      if ('string' === typeof this.options.classHandler && 'function' === typeof window[this.options.classHandler]) $handlerFunction = window[this.options.classHandler];
      if ('function' === typeof $handlerFunction) {
        var $handler = $handlerFunction.call(this, this);
        // If this function returned a valid existing DOM element, go for it
        if ('undefined' !== typeof $handler && $handler.length) return $handler;
      } else if ('object' === typeof $handlerFunction && $handlerFunction instanceof jQuery && $handlerFunction.length) {
        return $handlerFunction;
      } else if ($handlerFunction) {
        Utils.warn('The class handler `' + $handlerFunction + '` does not exist in DOM nor as a global JS function');
      }
      return this._inputHolder();
    },
    _inputHolder: function _inputHolder() {
      // if simple element (input, texatrea, select...) it will perfectly host the classes and precede the error container
      if (!this.options.multiple || this.element.nodeName === 'SELECT') return this.$element;
      // But if multiple element (radio, checkbox), that would be their parent
      return this.$element.parent();
    },
    _insertErrorWrapper: function _insertErrorWrapper() {
      var $errorsContainer = this.options.errorsContainer;
      // Nothing to do if already inserted
      if (0 !== this._ui.$errorsWrapper.parent().length) return this._ui.$errorsWrapper.parent();
      if ('string' === typeof $errorsContainer) {
        if ($($errorsContainer).length) return $($errorsContainer).append(this._ui.$errorsWrapper);else if ('function' === typeof window[$errorsContainer]) $errorsContainer = window[$errorsContainer];else Utils.warn('The errors container `' + $errorsContainer + '` does not exist in DOM nor as a global JS function');
      }
      if ('function' === typeof $errorsContainer) $errorsContainer = $errorsContainer.call(this, this);
      if ('object' === typeof $errorsContainer && $errorsContainer.length) return $errorsContainer.append(this._ui.$errorsWrapper);
      return this._inputHolder().after(this._ui.$errorsWrapper);
    },
    _actualizeTriggers: function _actualizeTriggers() {
      var _this3 = this;
      var $toBind = this._findRelated();
      var trigger;
      // Remove Parsley events already bound on this field
      $toBind.off('.Parsley');
      if (this._failedOnce) $toBind.on(Utils.namespaceEvents(this.options.triggerAfterFailure, 'Parsley'), function () {
        _this3._validateIfNeeded();
      });else if (trigger = Utils.namespaceEvents(this.options.trigger, 'Parsley')) {
        $toBind.on(trigger, function (event) {
          _this3._validateIfNeeded(event);
        });
      }
    },
    _validateIfNeeded: function _validateIfNeeded(event) {
      var _this4 = this;
      // For keyup, keypress, keydown, input... events that could be a little bit obstrusive
      // do not validate if val length < min threshold on first validation. Once field have been validated once and info
      // about success or failure have been displayed, always validate with this trigger to reflect every yalidation change.
      if (event && /key|input/.test(event.type)) if (!(this._ui && this._ui.validationInformationVisible) && this.getValue().length <= this.options.validationThreshold) return;
      if (this.options.debounce) {
        window.clearTimeout(this._debounced);
        this._debounced = window.setTimeout(function () {
          return _this4.validate();
        }, this.options.debounce);
      } else this.validate();
    },
    _resetUI: function _resetUI() {
      // Reset all event listeners
      this._failedOnce = false;
      this._actualizeTriggers();
      // Nothing to do if UI never initialized for this field
      if ('undefined' === typeof this._ui) return;
      // Reset all errors' li
      this._ui.$errorsWrapper.removeClass('filled').children().remove();
      // Reset validation class
      this._resetClass();
      // Reset validation flags and last validation result
      this._ui.lastValidationResult = [];
      this._ui.validationInformationVisible = false;
    },
    _destroyUI: function _destroyUI() {
      this._resetUI();
      if ('undefined' !== typeof this._ui) this._ui.$errorsWrapper.remove();
      delete this._ui;
    },
    _successClass: function _successClass() {
      this._ui.validationInformationVisible = true;
      this._ui.$errorClassHandler.removeClass(this.options.errorClass).addClass(this.options.successClass);
    },
    _errorClass: function _errorClass() {
      this._ui.validationInformationVisible = true;
      this._ui.$errorClassHandler.removeClass(this.options.successClass).addClass(this.options.errorClass);
    },
    _resetClass: function _resetClass() {
      this._ui.$errorClassHandler.removeClass(this.options.successClass).removeClass(this.options.errorClass);
    }
  };
  var Form = function Form(element, domOptions, options) {
    this.__class__ = 'Form';
    this.element = element;
    this.$element = $(element);
    this.domOptions = domOptions;
    this.options = options;
    this.parent = window.Parsley;
    this.fields = [];
    this.validationResult = null;
  };
  var Form__statusMapping = { pending: null, resolved: true, rejected: false };
  Form.prototype = {
    onSubmitValidate: function onSubmitValidate(event) {
      var _this5 = this;
      // This is a Parsley generated submit event, do not validate, do not prevent, simply exit and keep normal behavior
      if (true === event.parsley) return;
      // If we didn't come here through a submit button, use the first one in the form
      var submitSource = this._submitSource || this.$element.find(Utils._SubmitSelector)[0];
      this._submitSource = null;
      this.$element.find('.parsley-synthetic-submit-button').prop('disabled', true);
      if (submitSource && null !== submitSource.getAttribute('formnovalidate')) return;
      window.Parsley._remoteCache = {};
      var promise = this.whenValidate({ event: event });
      if ('resolved' === promise.state() && false !== this._trigger('submit')) {
        // All good, let event go through. We make this distinction because browsers
        // differ in their handling of `submit` being called from inside a submit event [#1047]
      } else {
          // Rejected or pending: cancel this submit
          event.stopImmediatePropagation();
          event.preventDefault();
          if ('pending' === promise.state()) promise.done(function () {
            _this5._submit(submitSource);
          });
        }
    },
    onSubmitButton: function onSubmitButton(event) {
      this._submitSource = event.currentTarget;
    },
    // internal
    // _submit submits the form, this time without going through the validations.
    // Care must be taken to "fake" the actual submit button being clicked.
    _submit: function _submit(submitSource) {
      if (false === this._trigger('submit')) return;
      // Add submit button's data
      if (submitSource) {
        var $synthetic = this.$element.find('.parsley-synthetic-submit-button').prop('disabled', false);
        if (0 === $synthetic.length) $synthetic = $('<input class="parsley-synthetic-submit-button" type="hidden">').appendTo(this.$element);
        $synthetic.attr({
          name: submitSource.getAttribute('name'),
          value: submitSource.getAttribute('value')
        });
      }
      this.$element.trigger(_extends($.Event('submit'), { parsley: true }));
    },
    // Performs validation on fields while triggering events.
    // @returns `true` if all validations succeeds, `false`
    // if a failure is immediately detected, or `null`
    // if dependant on a promise.
    // Consider using `whenValidate` instead.
    validate: function validate(options) {
      if (arguments.length >= 1 && !$.isPlainObject(options)) {
        Utils.warnOnce('Calling validate on a parsley form without passing arguments as an object is deprecated.');
        var _arguments = _slice.call(arguments);
        var group = _arguments[0];
        var force = _arguments[1];
        var event = _arguments[2];
        options = { group: group, force: force, event: event };
      }
      return Form__statusMapping[this.whenValidate(options).state()];
    },
    whenValidate: function whenValidate() {
      var _Utils$all$done$fail$always,
          _this6 = this;
      var _ref7 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var group = _ref7.group;
      var force = _ref7.force;
      var event = _ref7.event;
      this.submitEvent = event;
      if (event) {
        this.submitEvent = _extends({}, event, { preventDefault: function preventDefault() {
            Utils.warnOnce("Using `this.submitEvent.preventDefault()` is deprecated; instead, call `this.validationResult = false`");
            _this6.validationResult = false;
          } });
      }
      this.validationResult = true;
      // fire validate event to eventually modify things before every validation
      this._trigger('validate');
      // Refresh form DOM options and form's fields that could have changed
      this._refreshFields();
      var promises = this._withoutReactualizingFormOptions(function () {
        return $.map(_this6.fields, function (field) {
          return field.whenValidate({ force: force, group: group });
        });
      });
      return (_Utils$all$done$fail$always = Utils.all(promises).done(function () {
        _this6._trigger('success');
      }).fail(function () {
        _this6.validationResult = false;
        _this6.focus();
        _this6._trigger('error');
      }).always(function () {
        _this6._trigger('validated');
      })).pipe.apply(_Utils$all$done$fail$always, _toConsumableArray(this._pipeAccordingToValidationResult()));
    },
    // Iterate over refreshed fields, and stop on first failure.
    // Returns `true` if all fields are valid, `false` if a failure is detected
    // or `null` if the result depends on an unresolved promise.
    // Prefer using `whenValid` instead.
    isValid: function isValid(options) {
      if (arguments.length >= 1 && !$.isPlainObject(options)) {
        Utils.warnOnce('Calling isValid on a parsley form without passing arguments as an object is deprecated.');
        var _arguments2 = _slice.call(arguments);
        var group = _arguments2[0];
        var force = _arguments2[1];
        options = { group: group, force: force };
      }
      return Form__statusMapping[this.whenValid(options).state()];
    },
    // Iterate over refreshed fields and validate them.
    // Returns a promise.
    // A validation that immediately fails will interrupt the validations.
    whenValid: function whenValid() {
      var _this7 = this;
      var _ref8 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var group = _ref8.group;
      var force = _ref8.force;
      this._refreshFields();
      var promises = this._withoutReactualizingFormOptions(function () {
        return $.map(_this7.fields, function (field) {
          return field.whenValid({ group: group, force: force });
        });
      });
      return Utils.all(promises);
    },
    refresh: function refresh() {
      this._refreshFields();
      return this;
    },
    // Reset UI
    reset: function reset() {
      // Form case: emit a reset event for each field
      for (var i = 0; i < this.fields.length; i++) this.fields[i].reset();
      this._trigger('reset');
    },
    // Destroy Parsley instance (+ UI)
    destroy: function destroy() {
      // Field case: emit destroy event to clean UI and then destroy stored instance
      this._destroyUI();
      // Form case: destroy all its fields and then destroy stored instance
      for (var i = 0; i < this.fields.length; i++) this.fields[i].destroy();
      this.$element.removeData('Parsley');
      this._trigger('destroy');
    },
    _refreshFields: function _refreshFields() {
      return this.actualizeOptions()._bindFields();
    },
    _bindFields: function _bindFields() {
      var _this8 = this;
      var oldFields = this.fields;
      this.fields = [];
      this.fieldsMappedById = {};
      this._withoutReactualizingFormOptions(function () {
        _this8.$element.find(_this8.options.inputs).not(_this8.options.excluded).each(function (_, element) {
          var fieldInstance = new window.Parsley.Factory(element, {}, _this8);
          // Only add valid and not excluded `Field` and `FieldMultiple` children
          if (('Field' === fieldInstance.__class__ || 'FieldMultiple' === fieldInstance.__class__) && true !== fieldInstance.options.excluded) {
            var uniqueId = fieldInstance.__class__ + '-' + fieldInstance.__id__;
            if ('undefined' === typeof _this8.fieldsMappedById[uniqueId]) {
              _this8.fieldsMappedById[uniqueId] = fieldInstance;
              _this8.fields.push(fieldInstance);
            }
          }
        });
        $.each(Utils.difference(oldFields, _this8.fields), function (_, field) {
          field.reset();
        });
      });
      return this;
    },
    // Internal only.
    // Looping on a form's fields to do validation or similar
    // will trigger reactualizing options on all of them, which
    // in turn will reactualize the form's options.
    // To avoid calling actualizeOptions so many times on the form
    // for nothing, _withoutReactualizingFormOptions temporarily disables
    // the method actualizeOptions on this form while `fn` is called.
    _withoutReactualizingFormOptions: function _withoutReactualizingFormOptions(fn) {
      var oldActualizeOptions = this.actualizeOptions;
      this.actualizeOptions = function () {
        return this;
      };
      var result = fn();
      this.actualizeOptions = oldActualizeOptions;
      return result;
    },
    // Internal only.
    // Shortcut to trigger an event
    // Returns true iff event is not interrupted and default not prevented.
    _trigger: function _trigger(eventName) {
      return this.trigger('form:' + eventName);
    }
  };
  var Constraint = function Constraint(parsleyField, name, requirements, priority, isDomConstraint) {
    var validatorSpec = window.Parsley._validatorRegistry.validators[name];
    var validator = new Validator(validatorSpec);
    priority = priority || parsleyField.options[name + 'Priority'] || validator.priority;
    isDomConstraint = true === isDomConstraint;
    _extends(this, {
      validator: validator,
      name: name,
      requirements: requirements,
      priority: priority,
      isDomConstraint: isDomConstraint
    });
    this._parseRequirements(parsleyField.options);
  };
  var capitalize = function capitalize(str) {
    var cap = str[0].toUpperCase();
    return cap + str.slice(1);
  };
  Constraint.prototype = {
    validate: function validate(value, instance) {
      var _validator;
      return (_validator = this.validator).validate.apply(_validator, [value].concat(_toConsumableArray(this.requirementList), [instance]));
    },
    _parseRequirements: function _parseRequirements(options) {
      var _this9 = this;
      this.requirementList = this.validator.parseRequirements(this.requirements, function (key) {
        return options[_this9.name + capitalize(key)];
      });
    }
  };
  var Field = function Field(field, domOptions, options, parsleyFormInstance) {
    this.__class__ = 'Field';
    this.element = field;
    this.$element = $(field);
    // Set parent if we have one
    if ('undefined' !== typeof parsleyFormInstance) {
      this.parent = parsleyFormInstance;
    }
    this.options = options;
    this.domOptions = domOptions;
    // Initialize some properties
    this.constraints = [];
    this.constraintsByName = {};
    this.validationResult = true;
    // Bind constraints
    this._bindConstraints();
  };
  var parsley_field__statusMapping = { pending: null, resolved: true, rejected: false };
  Field.prototype = {
    // # Public API
    // Validate field and trigger some events for mainly `UI`
    // @returns `true`, an array of the validators that failed, or
    // `null` if validation is not finished. Prefer using whenValidate
    validate: function validate(options) {
      if (arguments.length >= 1 && !$.isPlainObject(options)) {
        Utils.warnOnce('Calling validate on a parsley field without passing arguments as an object is deprecated.');
        options = { options: options };
      }
      var promise = this.whenValidate(options);
      if (!promise) // If excluded with `group` option
        return true;
      switch (promise.state()) {
        case 'pending':
          return null;
        case 'resolved':
          return true;
        case 'rejected':
          return this.validationResult;
      }
    },
    // Validate field and trigger some events for mainly `UI`
    // @returns a promise that succeeds only when all validations do
    // or `undefined` if field is not in the given `group`.
    whenValidate: function whenValidate() {
      var _whenValid$always$done$fail$always,
          _this10 = this;
      var _ref9 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var force = _ref9.force;
      var group = _ref9.group;
      // do not validate a field if not the same as given validation group
      this.refresh();
      if (group && !this._isInGroup(group)) return;
      this.value = this.getValue();
      // Field Validate event. `this.value` could be altered for custom needs
      this._trigger('validate');
      return (_whenValid$always$done$fail$always = this.whenValid({ force: force, value: this.value, _refreshed: true }).always(function () {
        _this10._reflowUI();
      }).done(function () {
        _this10._trigger('success');
      }).fail(function () {
        _this10._trigger('error');
      }).always(function () {
        _this10._trigger('validated');
      })).pipe.apply(_whenValid$always$done$fail$always, _toConsumableArray(this._pipeAccordingToValidationResult()));
    },
    hasConstraints: function hasConstraints() {
      return 0 !== this.constraints.length;
    },
    // An empty optional field does not need validation
    needsValidation: function needsValidation(value) {
      if ('undefined' === typeof value) value = this.getValue();
      // If a field is empty and not required, it is valid
      // Except if `data-parsley-validate-if-empty` explicitely added, useful for some custom validators
      if (!value.length && !this._isRequired() && 'undefined' === typeof this.options.validateIfEmpty) return false;
      return true;
    },
    _isInGroup: function _isInGroup(group) {
      if (Array.isArray(this.options.group)) return -1 !== $.inArray(group, this.options.group);
      return this.options.group === group;
    },
    // Just validate field. Do not trigger any event.
    // Returns `true` iff all constraints pass, `false` if there are failures,
    // or `null` if the result can not be determined yet (depends on a promise)
    // See also `whenValid`.
    isValid: function isValid(options) {
      if (arguments.length >= 1 && !$.isPlainObject(options)) {
        Utils.warnOnce('Calling isValid on a parsley field without passing arguments as an object is deprecated.');
        var _arguments3 = _slice.call(arguments);
        var force = _arguments3[0];
        var value = _arguments3[1];
        options = { force: force, value: value };
      }
      var promise = this.whenValid(options);
      if (!promise) // Excluded via `group`
        return true;
      return parsley_field__statusMapping[promise.state()];
    },
    // Just validate field. Do not trigger any event.
    // @returns a promise that succeeds only when all validations do
    // or `undefined` if the field is not in the given `group`.
    // The argument `force` will force validation of empty fields.
    // If a `value` is given, it will be validated instead of the value of the input.
    whenValid: function whenValid() {
      var _this11 = this;
      var _ref10 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var _ref10$force = _ref10.force;
      var force = _ref10$force === undefined ? false : _ref10$force;
      var value = _ref10.value;
      var group = _ref10.group;
      var _refreshed = _ref10._refreshed;
      // Recompute options and rebind constraints to have latest changes
      if (!_refreshed) this.refresh();
      // do not validate a field if not the same as given validation group
      if (group && !this._isInGroup(group)) return;
      this.validationResult = true;
      // A field without constraint is valid
      if (!this.hasConstraints()) return $.when();
      // Value could be passed as argument, needed to add more power to 'field:validate'
      if ('undefined' === typeof value || null === value) value = this.getValue();
      if (!this.needsValidation(value) && true !== force) return $.when();
      var groupedConstraints = this._getGroupedConstraints();
      var promises = [];
      $.each(groupedConstraints, function (_, constraints) {
        // Process one group of constraints at a time, we validate the constraints
        // and combine the promises together.
        var promise = Utils.all($.map(constraints, function (constraint) {
          return _this11._validateConstraint(value, constraint);
        }));
        promises.push(promise);
        if (promise.state() === 'rejected') return false; // Interrupt processing if a group has already failed
      });
      return Utils.all(promises);
    },
    // @returns a promise
    _validateConstraint: function _validateConstraint(value, constraint) {
      var _this12 = this;
      var result = constraint.validate(value, this);
      // Map false to a failed promise
      if (false === result) result = $.Deferred().reject();
      // Make sure we return a promise and that we record failures
      return Utils.all([result]).fail(function (errorMessage) {
        if (!(_this12.validationResult instanceof Array)) _this12.validationResult = [];
        _this12.validationResult.push({
          assert: constraint,
          errorMessage: 'string' === typeof errorMessage && errorMessage
        });
      });
    },
    // @returns Parsley field computed value that could be overrided or configured in DOM
    getValue: function getValue() {
      var value;
      // Value could be overriden in DOM or with explicit options
      if ('function' === typeof this.options.value) value = this.options.value(this);else if ('undefined' !== typeof this.options.value) value = this.options.value;else value = this.$element.val();
      // Handle wrong DOM or configurations
      if ('undefined' === typeof value || null === value) return '';
      return this._handleWhitespace(value);
    },
    // Reset UI
    reset: function reset() {
      this._resetUI();
      return this._trigger('reset');
    },
    // Destroy Parsley instance (+ UI)
    destroy: function destroy() {
      // Field case: emit destroy event to clean UI and then destroy stored instance
      this._destroyUI();
      this.$element.removeData('Parsley');
      this.$element.removeData('FieldMultiple');
      this._trigger('destroy');
    },
    // Actualize options and rebind constraints
    refresh: function refresh() {
      this._refreshConstraints();
      return this;
    },
    _refreshConstraints: function _refreshConstraints() {
      return this.actualizeOptions()._bindConstraints();
    },
    refreshConstraints: function refreshConstraints() {
      Utils.warnOnce("Parsley's refreshConstraints is deprecated. Please use refresh");
      return this.refresh();
    },
    /**
    * Add a new constraint to a field
    *
    * @param {String}   name
    * @param {Mixed}    requirements      optional
    * @param {Number}   priority          optional
    * @param {Boolean}  isDomConstraint   optional
    */
    addConstraint: function addConstraint(name, requirements, priority, isDomConstraint) {
      if (window.Parsley._validatorRegistry.validators[name]) {
        var constraint = new Constraint(this, name, requirements, priority, isDomConstraint);
        // if constraint already exist, delete it and push new version
        if ('undefined' !== this.constraintsByName[constraint.name]) this.removeConstraint(constraint.name);
        this.constraints.push(constraint);
        this.constraintsByName[constraint.name] = constraint;
      }
      return this;
    },
    // Remove a constraint
    removeConstraint: function removeConstraint(name) {
      for (var i = 0; i < this.constraints.length; i++) if (name === this.constraints[i].name) {
        this.constraints.splice(i, 1);
        break;
      }
      delete this.constraintsByName[name];
      return this;
    },
    // Update a constraint (Remove + re-add)
    updateConstraint: function updateConstraint(name, parameters, priority) {
      return this.removeConstraint(name).addConstraint(name, parameters, priority);
    },
    // # Internals
    // Internal only.
    // Bind constraints from config + options + DOM
    _bindConstraints: function _bindConstraints() {
      var constraints = [];
      var constraintsByName = {};
      // clean all existing DOM constraints to only keep javascript user constraints
      for (var i = 0; i < this.constraints.length; i++) if (false === this.constraints[i].isDomConstraint) {
        constraints.push(this.constraints[i]);
        constraintsByName[this.constraints[i].name] = this.constraints[i];
      }
      this.constraints = constraints;
      this.constraintsByName = constraintsByName;
      // then re-add Parsley DOM-API constraints
      for (var name in this.options) this.addConstraint(name, this.options[name], undefined, true);
      // finally, bind special HTML5 constraints
      return this._bindHtml5Constraints();
    },
    // Internal only.
    // Bind specific HTML5 constraints to be HTML5 compliant
    _bindHtml5Constraints: function _bindHtml5Constraints() {
      // html5 required
      if (null !== this.element.getAttribute('required')) this.addConstraint('required', true, undefined, true);
      // html5 pattern
      if (null !== this.element.getAttribute('pattern')) this.addConstraint('pattern', this.element.getAttribute('pattern'), undefined, true);
      // range
      var min = this.element.getAttribute('min');
      var max = this.element.getAttribute('max');
      if (null !== min && null !== max) this.addConstraint('range', [min, max], undefined, true);
      // HTML5 min
      else if (null !== min) this.addConstraint('min', min, undefined, true);
        // HTML5 max
        else if (null !== max) this.addConstraint('max', max, undefined, true);
      // length
      if (null !== this.element.getAttribute('minlength') && null !== this.element.getAttribute('maxlength')) this.addConstraint('length', [this.element.getAttribute('minlength'), this.element.getAttribute('maxlength')], undefined, true);
      // HTML5 minlength
      else if (null !== this.element.getAttribute('minlength')) this.addConstraint('minlength', this.element.getAttribute('minlength'), undefined, true);
        // HTML5 maxlength
        else if (null !== this.element.getAttribute('maxlength')) this.addConstraint('maxlength', this.element.getAttribute('maxlength'), undefined, true);
      // html5 types
      var type = Utils.getType(this.element);
      // Small special case here for HTML5 number: integer validator if step attribute is undefined or an integer value, number otherwise
      if ('number' === type) {
        return this.addConstraint('type', ['number', {
          step: this.element.getAttribute('step') || '1',
          base: min || this.element.getAttribute('value')
        }], undefined, true);
        // Regular other HTML5 supported types
      } else if (/^(email|url|range|date)$/i.test(type)) {
          return this.addConstraint('type', type, undefined, true);
        }
      return this;
    },
    // Internal only.
    // Field is required if have required constraint without `false` value
    _isRequired: function _isRequired() {
      if ('undefined' === typeof this.constraintsByName.required) return false;
      return false !== this.constraintsByName.required.requirements;
    },
    // Internal only.
    // Shortcut to trigger an event
    _trigger: function _trigger(eventName) {
      return this.trigger('field:' + eventName);
    },
    // Internal only
    // Handles whitespace in a value
    // Use `data-parsley-whitespace="squish"` to auto squish input value
    // Use `data-parsley-whitespace="trim"` to auto trim input value
    _handleWhitespace: function _handleWhitespace(value) {
      if (true === this.options.trimValue) Utils.warnOnce('data-parsley-trim-value="true" is deprecated, please use data-parsley-whitespace="trim"');
      if ('squish' === this.options.whitespace) value = value.replace(/\s{2,}/g, ' ');
      if ('trim' === this.options.whitespace || 'squish' === this.options.whitespace || true === this.options.trimValue) value = Utils.trimString(value);
      return value;
    },
    _isDateInput: function _isDateInput() {
      var c = this.constraintsByName.type;
      return c && c.requirements === 'date';
    },
    // Internal only.
    // Returns the constraints, grouped by descending priority.
    // The result is thus an array of arrays of constraints.
    _getGroupedConstraints: function _getGroupedConstraints() {
      if (false === this.options.priorityEnabled) return [this.constraints];
      var groupedConstraints = [];
      var index = {};
      // Create array unique of priorities
      for (var i = 0; i < this.constraints.length; i++) {
        var p = this.constraints[i].priority;
        if (!index[p]) groupedConstraints.push(index[p] = []);
        index[p].push(this.constraints[i]);
      }
      // Sort them by priority DESC
      groupedConstraints.sort(function (a, b) {
        return b[0].priority - a[0].priority;
      });
      return groupedConstraints;
    }
  };
  var parsley_field = Field;
  var Multiple = function Multiple() {
    this.__class__ = 'FieldMultiple';
  };
  Multiple.prototype = {
    // Add new `$element` sibling for multiple field
    addElement: function addElement($element) {
      this.$elements.push($element);
      return this;
    },
    // See `Field._refreshConstraints()`
    _refreshConstraints: function _refreshConstraints() {
      var fieldConstraints;
      this.constraints = [];
      // Select multiple special treatment
      if (this.element.nodeName === 'SELECT') {
        this.actualizeOptions()._bindConstraints();
        return this;
      }
      // Gather all constraints for each input in the multiple group
      for (var i = 0; i < this.$elements.length; i++) {
        // Check if element have not been dynamically removed since last binding
        if (!$('html').has(this.$elements[i]).length) {
          this.$elements.splice(i, 1);
          continue;
        }
        fieldConstraints = this.$elements[i].data('FieldMultiple')._refreshConstraints().constraints;
        for (var j = 0; j < fieldConstraints.length; j++) this.addConstraint(fieldConstraints[j].name, fieldConstraints[j].requirements, fieldConstraints[j].priority, fieldConstraints[j].isDomConstraint);
      }
      return this;
    },
    // See `Field.getValue()`
    getValue: function getValue() {
      // Value could be overriden in DOM
      if ('function' === typeof this.options.value) return this.options.value(this);else if ('undefined' !== typeof this.options.value) return this.options.value;
      // Radio input case
      if (this.element.nodeName === 'INPUT') {
        var type = Utils.getType(this.element);
        if (type === 'radio') return this._findRelated().filter(':checked').val() || '';
        // checkbox input case
        if (type === 'checkbox') {
          var values = [];
          this._findRelated().filter(':checked').each(function () {
            values.push($(this).val());
          });
          return values;
        }
      }
      // Select multiple case
      if (this.element.nodeName === 'SELECT' && null === this.$element.val()) return [];
      // Default case that should never happen
      return this.$element.val();
    },
    _init: function _init() {
      this.$elements = [this.$element];
      return this;
    }
  };
  var Factory = function Factory(element, options, parsleyFormInstance) {
    this.element = element;
    this.$element = $(element);
    // If the element has already been bound, returns its saved Parsley instance
    var savedparsleyFormInstance = this.$element.data('Parsley');
    if (savedparsleyFormInstance) {
      // If the saved instance has been bound without a Form parent and there is one given in this call, add it
      if ('undefined' !== typeof parsleyFormInstance && savedparsleyFormInstance.parent === window.Parsley) {
        savedparsleyFormInstance.parent = parsleyFormInstance;
        savedparsleyFormInstance._resetOptions(savedparsleyFormInstance.options);
      }
      if ('object' === typeof options) {
        _extends(savedparsleyFormInstance.options, options);
      }
      return savedparsleyFormInstance;
    }
    // Parsley must be instantiated with a DOM element or jQuery $element
    if (!this.$element.length) throw new Error('You must bind Parsley on an existing element.');
    if ('undefined' !== typeof parsleyFormInstance && 'Form' !== parsleyFormInstance.__class__) throw new Error('Parent instance must be a Form instance');
    this.parent = parsleyFormInstance || window.Parsley;
    return this.init(options);
  };
  Factory.prototype = {
    init: function init(options) {
      this.__class__ = 'Parsley';
      this.__version__ = '2.8.1';
      this.__id__ = Utils.generateID();
      // Pre-compute options
      this._resetOptions(options);
      // A Form instance is obviously a `<form>` element but also every node that is not an input and has the `data-parsley-validate` attribute
      if (this.element.nodeName === 'FORM' || Utils.checkAttr(this.element, this.options.namespace, 'validate') && !this.$element.is(this.options.inputs)) return this.bind('parsleyForm');
      // Every other element is bound as a `Field` or `FieldMultiple`
      return this.isMultiple() ? this.handleMultiple() : this.bind('parsleyField');
    },
    isMultiple: function isMultiple() {
      var type = Utils.getType(this.element);
      return type === 'radio' || type === 'checkbox' || this.element.nodeName === 'SELECT' && null !== this.element.getAttribute('multiple');
    },
    // Multiples fields are a real nightmare :(
    // Maybe some refactoring would be appreciated here...
    handleMultiple: function handleMultiple() {
      var _this13 = this;
      var name;
      var multiple;
      var parsleyMultipleInstance;
      // Handle multiple name
      this.options.multiple = this.options.multiple || (name = this.element.getAttribute('name')) || this.element.getAttribute('id');
      // Special select multiple input
      if (this.element.nodeName === 'SELECT' && null !== this.element.getAttribute('multiple')) {
        this.options.multiple = this.options.multiple || this.__id__;
        return this.bind('parsleyFieldMultiple');
        // Else for radio / checkboxes, we need a `name` or `data-parsley-multiple` to properly bind it
      } else if (!this.options.multiple) {
          Utils.warn('To be bound by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option.', this.$element);
          return this;
        }
      // Remove special chars
      this.options.multiple = this.options.multiple.replace(/(:|\.|\[|\]|\{|\}|\$)/g, '');
      // Add proper `data-parsley-multiple` to siblings if we have a valid multiple name
      if (name) {
        $('input[name="' + name + '"]').each(function (i, input) {
          var type = Utils.getType(input);
          if (type === 'radio' || type === 'checkbox') input.setAttribute(_this13.options.namespace + 'multiple', _this13.options.multiple);
        });
      }
      // Check here if we don't already have a related multiple instance saved
      var $previouslyRelated = this._findRelated();
      for (var i = 0; i < $previouslyRelated.length; i++) {
        parsleyMultipleInstance = $($previouslyRelated.get(i)).data('Parsley');
        if ('undefined' !== typeof parsleyMultipleInstance) {
          if (!this.$element.data('FieldMultiple')) {
            parsleyMultipleInstance.addElement(this.$element);
          }
          break;
        }
      }
      // Create a secret Field instance for every multiple field. It will be stored in `data('FieldMultiple')`
      // And will be useful later to access classic `Field` stuff while being in a `FieldMultiple` instance
      this.bind('parsleyField', true);
      return parsleyMultipleInstance || this.bind('parsleyFieldMultiple');
    },
    // Return proper `Form`, `Field` or `FieldMultiple`
    bind: function bind(type, doNotStore) {
      var parsleyInstance;
      switch (type) {
        case 'parsleyForm':
          parsleyInstance = $.extend(new Form(this.element, this.domOptions, this.options), new Base(), window.ParsleyExtend)._bindFields();
          break;
        case 'parsleyField':
          parsleyInstance = $.extend(new parsley_field(this.element, this.domOptions, this.options, this.parent), new Base(), window.ParsleyExtend);
          break;
        case 'parsleyFieldMultiple':
          parsleyInstance = $.extend(new parsley_field(this.element, this.domOptions, this.options, this.parent), new Multiple(), new Base(), window.ParsleyExtend)._init();
          break;
        default:
          throw new Error(type + 'is not a supported Parsley type');
      }
      if (this.options.multiple) Utils.setAttr(this.element, this.options.namespace, 'multiple', this.options.multiple);
      if ('undefined' !== typeof doNotStore) {
        this.$element.data('FieldMultiple', parsleyInstance);
        return parsleyInstance;
      }
      // Store the freshly bound instance in a DOM element for later access using jQuery `data()`
      this.$element.data('Parsley', parsleyInstance);
      // Tell the world we have a new Form or Field instance!
      parsleyInstance._actualizeTriggers();
      parsleyInstance._trigger('init');
      return parsleyInstance;
    }
  };
  var vernums = $.fn.jquery.split('.');
  if (parseInt(vernums[0]) <= 1 && parseInt(vernums[1]) < 8) {
    throw "The loaded version of jQuery is too old. Please upgrade to 1.8.x or better.";
  }
  if (!vernums.forEach) {
    Utils.warn('Parsley requires ES5 to run properly. Please include https://github.com/es-shims/es5-shim');
  }
  // Inherit `on`, `off` & `trigger` to Parsley:
  var Parsley = _extends(new Base(), {
    element: document,
    $element: $(document),
    actualizeOptions: null,
    _resetOptions: null,
    Factory: Factory,
    version: '2.8.1'
  });
  // Supplement Field and Form with Base
  // This way, the constructors will have access to those methods
  _extends(parsley_field.prototype, UI.Field, Base.prototype);
  _extends(Form.prototype, UI.Form, Base.prototype);
  // Inherit actualizeOptions and _resetOptions:
  _extends(Factory.prototype, Base.prototype);
  // ### jQuery API
  // `$('.elem').parsley(options)` or `$('.elem').psly(options)`
  $.fn.parsley = $.fn.psly = function (options) {
    if (this.length > 1) {
      var instances = [];
      this.each(function () {
        instances.push($(this).parsley(options));
      });
      return instances;
    }
    // Return undefined if applied to non existing DOM element
    if (this.length == 0) {
      return;
    }
    return new Factory(this[0], options);
  };
  // ### Field and Form extension
  // Ensure the extension is now defined if it wasn't previously
  if ('undefined' === typeof window.ParsleyExtend) window.ParsleyExtend = {};
  // ### Parsley config
  // Inherit from ParsleyDefault, and copy over any existing values
  Parsley.options = _extends(Utils.objectCreate(Defaults), window.ParsleyConfig);
  window.ParsleyConfig = Parsley.options; // Old way of accessing global options
  // ### Globals
  window.Parsley = window.psly = Parsley;
  Parsley.Utils = Utils;
  window.ParsleyUtils = {};
  $.each(Utils, function (key, value) {
    if ('function' === typeof value) {
      window.ParsleyUtils[key] = function () {
        Utils.warnOnce('Accessing `window.ParsleyUtils` is deprecated. Use `window.Parsley.Utils` instead.');
        return Utils[key].apply(Utils, arguments);
      };
    }
  });
  // ### Define methods that forward to the registry, and deprecate all access except through window.Parsley
  var registry = window.Parsley._validatorRegistry = new ValidatorRegistry(window.ParsleyConfig.validators, window.ParsleyConfig.i18n);
  window.ParsleyValidator = {};
  $.each('setLocale addCatalog addMessage addMessages getErrorMessage formatMessage addValidator updateValidator removeValidator hasValidator'.split(' '), function (i, method) {
    window.Parsley[method] = function () {
      return registry[method].apply(registry, arguments);
    };
    window.ParsleyValidator[method] = function () {
      var _window$Parsley;
      Utils.warnOnce('Accessing the method \'' + method + '\' through Validator is deprecated. Simply call \'window.Parsley.' + method + '(...)\'');
      return (_window$Parsley = window.Parsley)[method].apply(_window$Parsley, arguments);
    };
  });
  // ### UI
  // Deprecated global object
  window.Parsley.UI = UI;
  window.ParsleyUI = {
    removeError: function removeError(instance, name, doNotUpdateClass) {
      var updateClass = true !== doNotUpdateClass;
      Utils.warnOnce('Accessing UI is deprecated. Call \'removeError\' on the instance directly. Please comment in issue 1073 as to your need to call this method.');
      return instance.removeError(name, { updateClass: updateClass });
    },
    getErrorsMessages: function getErrorsMessages(instance) {
      Utils.warnOnce('Accessing UI is deprecated. Call \'getErrorsMessages\' on the instance directly.');
      return instance.getErrorsMessages();
    }
  };
  $.each('addError updateError'.split(' '), function (i, method) {
    window.ParsleyUI[method] = function (instance, name, message, assert, doNotUpdateClass) {
      var updateClass = true !== doNotUpdateClass;
      Utils.warnOnce('Accessing UI is deprecated. Call \'' + method + '\' on the instance directly. Please comment in issue 1073 as to your need to call this method.');
      return instance[method](name, { message: message, assert: assert, updateClass: updateClass });
    };
  });
  // ### PARSLEY auto-binding
  // Prevent it by setting `ParsleyConfig.autoBind` to `false`
  if (false !== window.ParsleyConfig.autoBind) {
    $(function () {
      // Works only on `data-parsley-validate`.
      if ($('[data-parsley-validate]').length) $('[data-parsley-validate]').parsley();
    });
  }
  var o = $({});
  var deprecated = function deprecated() {
    Utils.warnOnce("Parsley's pubsub module is deprecated; use the 'on' and 'off' methods on parsley instances or window.Parsley");
  };
  // Returns an event handler that calls `fn` with the arguments it expects
  function adapt(fn, context) {
    // Store to allow unbinding
    if (!fn.parsleyAdaptedCallback) {
      fn.parsleyAdaptedCallback = function () {
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift(this);
        fn.apply(context || o, args);
      };
    }
    return fn.parsleyAdaptedCallback;
  }
  var eventPrefix = 'parsley:';
  // Converts 'parsley:form:validate' into 'form:validate'
  function eventName(name) {
    if (name.lastIndexOf(eventPrefix, 0) === 0) return name.substr(eventPrefix.length);
    return name;
  }
  // $.listen is deprecated. Use Parsley.on instead.
  $.listen = function (name, callback) {
    var context;
    deprecated();
    if ('object' === typeof arguments[1] && 'function' === typeof arguments[2]) {
      context = arguments[1];
      callback = arguments[2];
    }
    if ('function' !== typeof callback) throw new Error('Wrong parameters');
    window.Parsley.on(eventName(name), adapt(callback, context));
  };
  $.listenTo = function (instance, name, fn) {
    deprecated();
    if (!(instance instanceof parsley_field) && !(instance instanceof Form)) throw new Error('Must give Parsley instance');
    if ('string' !== typeof name || 'function' !== typeof fn) throw new Error('Wrong parameters');
    instance.on(eventName(name), adapt(fn));
  };
  $.unsubscribe = function (name, fn) {
    deprecated();
    if ('string' !== typeof name || 'function' !== typeof fn) throw new Error('Wrong arguments');
    window.Parsley.off(eventName(name), fn.parsleyAdaptedCallback);
  };
  $.unsubscribeTo = function (instance, name) {
    deprecated();
    if (!(instance instanceof parsley_field) && !(instance instanceof Form)) throw new Error('Must give Parsley instance');
    instance.off(eventName(name));
  };
  $.unsubscribeAll = function (name) {
    deprecated();
    window.Parsley.off(eventName(name));
    $('form,input,textarea,select').each(function () {
      var instance = $(this).data('Parsley');
      if (instance) {
        instance.off(eventName(name));
      }
    });
  };
  // $.emit is deprecated. Use jQuery events instead.
  $.emit = function (name, instance) {
    var _instance;
    deprecated();
    var instanceGiven = instance instanceof parsley_field || instance instanceof Form;
    var args = Array.prototype.slice.call(arguments, instanceGiven ? 2 : 1);
    args.unshift(eventName(name));
    if (!instanceGiven) {
      instance = window.Parsley;
    }
    (_instance = instance).trigger.apply(_instance, _toConsumableArray(args));
  };
  var pubsub = {};
  $.extend(true, Parsley, {
    asyncValidators: {
      'default': {
        fn: function fn(xhr) {
          // By default, only status 2xx are deemed successful.
          // Note: we use status instead of state() because responses with status 200
          // but invalid messages (e.g. an empty body for content type set to JSON) will
          // result in state() === 'rejected'.
          return xhr.status >= 200 && xhr.status < 300;
        },
        url: false
      },
      reverse: {
        fn: function fn(xhr) {
          // If reverse option is set, a failing ajax request is considered successful
          return xhr.status < 200 || xhr.status >= 300;
        },
        url: false
      }
    },
    addAsyncValidator: function addAsyncValidator(name, fn, url, options) {
      Parsley.asyncValidators[name] = {
        fn: fn,
        url: url || false,
        options: options || {}
      };
      return this;
    }
  });
  Parsley.addValidator('remote', {
    requirementType: {
      '': 'string',
      'validator': 'string',
      'reverse': 'boolean',
      'options': 'object'
    },
    validateString: function validateString(value, url, options, instance) {
      var data = {};
      var ajaxOptions;
      var csr;
      var validator = options.validator || (true === options.reverse ? 'reverse' : 'default');
      if ('undefined' === typeof Parsley.asyncValidators[validator]) throw new Error('Calling an undefined async validator: `' + validator + '`');
      url = Parsley.asyncValidators[validator].url || url;
      // Fill current value
      if (url.indexOf('{value}') > -1) {
        url = url.replace('{value}', encodeURIComponent(value));
      } else {
        data[instance.element.getAttribute('name') || instance.element.getAttribute('id')] = value;
      }
      // Merge options passed in from the function with the ones in the attribute
      var remoteOptions = $.extend(true, options.options || {}, Parsley.asyncValidators[validator].options);
      // All `$.ajax(options)` could be overridden or extended directly from DOM in `data-parsley-remote-options`
      ajaxOptions = $.extend(true, {}, {
        url: url,
        data: data,
        type: 'GET'
      }, remoteOptions);
      // Generate store key based on ajax options
      instance.trigger('field:ajaxoptions', instance, ajaxOptions);
      csr = $.param(ajaxOptions);
      // Initialise querry cache
      if ('undefined' === typeof Parsley._remoteCache) Parsley._remoteCache = {};
      // Try to retrieve stored xhr
      var xhr = Parsley._remoteCache[csr] = Parsley._remoteCache[csr] || $.ajax(ajaxOptions);
      var handleXhr = function handleXhr() {
        var result = Parsley.asyncValidators[validator].fn.call(instance, xhr, url, options);
        if (!result) // Map falsy results to rejected promise
          result = $.Deferred().reject();
        return $.when(result);
      };
      return xhr.then(handleXhr, handleXhr);
    },
    priority: -1
  });
  Parsley.on('form:submit', function () {
    Parsley._remoteCache = {};
  });
  Base.prototype.addAsyncValidator = function () {
    Utils.warnOnce('Accessing the method `addAsyncValidator` through an instance is deprecated. Simply call `Parsley.addAsyncValidator(...)`');
    return Parsley.addAsyncValidator.apply(Parsley, arguments);
  };
  // This is included with the Parsley library itself,
  // thus there is no use in adding it to your project.
  Parsley.addMessages('en', {
    defaultMessage: "This value seems to be invalid.",
    type: {
      email: "This value should be a valid email.",
      url: "This value should be a valid url.",
      number: "This value should be a valid number.",
      integer: "This value should be a valid integer.",
      digits: "This value should be digits.",
      alphanum: "This value should be alphanumeric."
    },
    notblank: "This value should not be blank.",
    required: "This value is required.",
    pattern: "This value seems to be invalid.",
    min: "This value should be greater than or equal to %s.",
    max: "This value should be lower than or equal to %s.",
    range: "This value should be between %s and %s.",
    minlength: "This value is too short. It should have %s characters or more.",
    maxlength: "This value is too long. It should have %s characters or fewer.",
    length: "This value length is invalid. It should be between %s and %s characters long.",
    mincheck: "You must select at least %s choices.",
    maxcheck: "You must select %s choices or fewer.",
    check: "You must select between %s and %s choices.",
    equalto: "This value should be the same."
  });
  Parsley.setLocale('en');
  /**
   * inputevent - Alleviate browser bugs for input events
   * https://github.com/marcandre/inputevent
   * @version v0.0.3 - (built Thu, Apr 14th 2016, 5:58 pm)
   * @author Marc-Andre Lafortune <github@marc-andre.ca>
   * @license MIT
   */
  function InputEvent() {
    var _this14 = this;
    var globals = window || global;
    // Slightly odd way construct our object. This way methods are force bound.
    // Used to test for duplicate library.
    _extends(this, {
      // For browsers that do not support isTrusted, assumes event is native.
      isNativeEvent: function isNativeEvent(evt) {
        return evt.originalEvent && evt.originalEvent.isTrusted !== false;
      },
      fakeInputEvent: function fakeInputEvent(evt) {
        if (_this14.isNativeEvent(evt)) {
          $(evt.target).trigger('input');
        }
      },
      misbehaves: function misbehaves(evt) {
        if (_this14.isNativeEvent(evt)) {
          _this14.behavesOk(evt);
          $(document).on('change.inputevent', evt.data.selector, _this14.fakeInputEvent);
          _this14.fakeInputEvent(evt);
        }
      },
      behavesOk: function behavesOk(evt) {
        if (_this14.isNativeEvent(evt)) {
          $(document) // Simply unbinds the testing handler
          .off('input.inputevent', evt.data.selector, _this14.behavesOk).off('change.inputevent', evt.data.selector, _this14.misbehaves);
        }
      },
      // Bind the testing handlers
      install: function install() {
        if (globals.inputEventPatched) {
          return;
        }
        globals.inputEventPatched = '0.0.3';
        var _arr = ['select', 'input[type="checkbox"]', 'input[type="radio"]', 'input[type="file"]'];
        for (var _i = 0; _i < _arr.length; _i++) {
          var selector = _arr[_i];
          $(document).on('input.inputevent', selector, { selector: selector }, _this14.behavesOk).on('change.inputevent', selector, { selector: selector }, _this14.misbehaves);
        }
      },
      uninstall: function uninstall() {
        delete globals.inputEventPatched;
        $(document).off('.inputevent');
      }
    });
  };
  var inputevent = new InputEvent();
  inputevent.install();
  var parsley = Parsley;
  return parsley;
});
//# sourceMappingURL=parsley.js.map
/*
== Page scroll to id == 
Version: 1.5.8 
Plugin URI: http://manos.malihu.gr/page-scroll-to-id/
Author: malihu
Author URI: http://manos.malihu.gr
License: MIT License (MIT)
*/
/*
Copyright 2013  malihu  (email: manos@malihu.gr)
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
;(function($,window,document,undefined){
	/* plugin namespace, prefix, default selector(s) */
	var pluginNS="mPageScroll2id",
		pluginPfx="mPS2id",
		defaultSelector=".m_PageScroll2id,a[rel~='m_PageScroll2id'],.page-scroll-to-id,a[rel~='page-scroll-to-id'],._ps2id",
	/* default options */
		defaults={
			/* scroll animation speed in milliseconds: Integer */
			scrollSpeed:1000,
			/* auto-adjust animation speed (according to target element position and window scroll): Boolean */
			autoScrollSpeed:true,
			/* scroll animation easing when page is idle: String */
			scrollEasing:"easeInOutQuint",
			/* scroll animation easing while page is scrolling: String */
			scrollingEasing:"easeOutQuint",
			/* end of page "smooth scrolling" (auto-adjust the scroll-to position when bottom elements are too short): Boolean */
			pageEndSmoothScroll:true,
			/* 
			page layout defines scrolling direction: String 
			values: "vertical", "horizontal", "auto" 
			*/
			layout:"vertical",
			/* extra space in pixels for the target element position: Integer */
			offset:0,
			/* highlight the main/default selectors or insert a different set: Boolean, String */
			highlightSelector:false,
			/* class of the clicked element: String */
			clickedClass:pluginPfx+"-clicked",
			/* class of the current target element: String */
			targetClass:pluginPfx+"-target",
			/* class of the highlighted element: String */
			highlightClass:pluginPfx+"-highlight",
			/* force a single highlighted element each time: Boolean */
			forceSingleHighlight:false,
			/* keep element highlighted until next (one element always stays highlighted): boolean */
			keepHighlightUntilNext:false,
			/* highlight elements according to their target and next target position (useful when targets have zero dimensions). Non "auto" layouts only: boolean */
			highlightByNextTarget:false,
			/* disable plugin below [x,y] screen size: boolean, integer, array ([x,y]) */
			disablePluginBelow:false,
			/* enable/disable click events for all selectors */
			clickEvents:true,
			/* append hash to URL/address bar */
			appendHash:false,
			/* user callback functions: fn */
			onStart:function(){},
			onComplete:function(){},
			/* enable/disable the default selector: Boolean */
			defaultSelector:false,
			/* highlight elements now and in the future */
			live:true,
			/* set specific live selector(s): String */
			liveSelector:false
		},
	/* vars, constants */
		selector,opt,_init,_trigger,_clicked,_target,_to,_axis,_offset,_dataOffset,_totalInstances=0,_liveTimer,_speed,
	/* 
	---------------
	methods 
	---------------
	*/
		methods={
			/* plugin initialization method */
			init:function(options){
				/* extend options, store each option in jquery data */
				var options=$.extend(true,{},defaults,options);
				$(document).data(pluginPfx,options);
				opt=$(document).data(pluginPfx);
				/* check/set jquery (deprecated) selector property if not defined */
				if(!this.selector){
					var selectorClass="__"+pluginPfx;
					this.each(function(){
						var el=$(this);
						if(!el.hasClass(selectorClass)){
							el.addClass(selectorClass);
						}
					});
					this.selector="."+selectorClass;
				}
				/* live selector */
				if(opt.liveSelector) this.selector+=","+opt.liveSelector;
				/* set selector */
				selector=(!selector) ? this.selector : selector+","+this.selector;
				if(opt.defaultSelector){
					if(typeof $(selector)!=="object" || $(selector).length===0){
						selector=defaultSelector;
					}
				}
				/* plugin events */
				if(opt.clickEvents){
					$(document)
					.undelegate("."+pluginPfx)
					.delegate(selector,"click."+pluginPfx,function(e){
						if(functions._isDisabled.call(null)){
							functions._removeClasses.call(null);
							return;
						}
						var $this=$(this),
							href=$this.attr("href"),
							hrefProp=$this.prop("href");
						if(href && href.indexOf("#/")!==-1){
							return;
						}
						functions._reset.call(null);
						_dataOffset=$this.data("ps2id-offset") || 0;
						if(functions._isValid.call(null,href,hrefProp) && functions._findTarget.call(null,href)){
							e.preventDefault();
							_trigger="selector";
							_clicked=$this;
							functions._setClasses.call(null,true);
							functions._scrollTo.call(null);
						}
					});
				}
				$(window)
				.unbind("."+pluginPfx)
				.bind("scroll."+pluginPfx+" resize."+pluginPfx,function(){
					if(functions._isDisabled.call(null)){
						functions._removeClasses.call(null);
						return;
					}
					var targets=$("._"+pluginPfx+"-t");
					targets.each(function(i){
						var t=$(this),id=t.attr("id"),
							h=functions._findHighlight.call(null,id);
						functions._setClasses.call(null,false,t,h);
						if(i==targets.length-1){functions._extendClasses.call(null);}
					});
				});
				/* plugin has initialized */
				_init=true;
				/* setup selectors, target elements, basic plugin classes etc. */
				functions._setup.call(null);
				/* 
				monitor for elements matching the current highlight selector and call plugin setup when found (now and in the future) 
				to manually enable/disable: $(document).data("mPS2id").live=boolean 
				*/
				functions._live.call(null);
			},
			/* scrollTo method */
			scrollTo:function(id,options){
				if(functions._isDisabled.call(null)){
					functions._removeClasses.call(null);
					return;
				}
				if(id && typeof id!=="undefined"){
					functions._isInit.call(null);
					var defaults={
							layout:opt.layout,
							offset:opt.offset,
							clicked:false
						},
						options=$.extend(true,{},defaults,options);
					functions._reset.call(null);
					_axis=options.layout;
					_offset=options.offset;
					id=(id.indexOf("#")!==-1) ? id : "#"+id;
					if(functions._isValid.call(null,id) && functions._findTarget.call(null,id)){
						_trigger="scrollTo";
						_clicked=options.clicked;
						if(_clicked){
							functions._setClasses.call(null,true);
						}
						functions._scrollTo.call(null);
					}
				}
			},
			/* destroy method */
			destroy:function(){
				$(window).unbind("."+pluginPfx);
				$(document).undelegate("."+pluginPfx).removeData(pluginPfx);
				$("._"+pluginPfx+"-t").removeData(pluginPfx);
				functions._removeClasses.call(null,true);
			}
		},
	/* 
	---------------
	functions
	---------------
	*/
		functions={
			/* checks if screen size ([x,y]) is below the value(s) set in disablePluginBelow option */
			_isDisabled:function(){
				var e=window,a="inner",
					val=opt.disablePluginBelow instanceof Array ? [opt.disablePluginBelow[0] || 0,opt.disablePluginBelow[1] || 0] : [opt.disablePluginBelow || 0,0];
				if(!("innerWidth" in window )){
					a="client";
					e=document.documentElement || document.body;
				}
				return e[a+"Width"]<=val[0] || e[a+"Height"]<=val[1];
			},
			/* checks if href attribute is valid */
			_isValid:function(href,hrefProp){
				if(!href){
					return;
				}
				hrefProp=(!hrefProp) ? href : hrefProp;
				var str=(hrefProp.indexOf("#/")!==-1) ? hrefProp.split("#/")[0] : hrefProp.split("#")[0],
					loc=window.location.toString().split("#")[0];
				return href!=="#" && href.indexOf("#")!==-1 && (str==="" || decodeURIComponent(str)===decodeURIComponent(loc));
			},
			/* setup selectors, target elements, basic plugin classes etc. */
			_setup:function(){
				var el=functions._highlightSelector(),i=1,tp=0;
				return $(el).each(function(){
					var $this=$(this),href=$this.attr("href"),hrefProp=$this.prop("href");
					if(functions._isValid.call(null,href,hrefProp)){
						var id=(href.indexOf("#/")!==-1) ? href.split("#/")[1] : href.split("#")[1],t=$("#"+id); 
						if(t.length>0){
							if(opt.highlightByNextTarget){
								if(t!==tp){
									if(!tp){t.data(pluginPfx,{tn:"0"});}else{tp.data(pluginPfx,{tn:t});}
									tp=t;
								}
							}
							if(!t.hasClass("_"+pluginPfx+"-t")){
								t.addClass("_"+pluginPfx+"-t");
							}
							t.data(pluginPfx,{i:i});
							if(!$this.hasClass("_"+pluginPfx+"-h")){
								$this.addClass("_"+pluginPfx+"-h");
							}
							var h=functions._findHighlight.call(null,id);
							functions._setClasses.call(null,false,t,h);
							_totalInstances=i;
							i++
							if(i==$(el).length){functions._extendClasses.call(null);}
						}
					}
				});
			},
			/* returns the highlight selector */
			_highlightSelector:function(){
				return (opt.highlightSelector && opt.highlightSelector!=="") ? opt.highlightSelector : selector;
			},
			/* finds the target element */
			_findTarget:function(str){
				var val=(str.indexOf("#/")!==-1) ? str.split("#/")[1] : str.split("#")[1], 
					el=$("#"+val);
				if(el.length<1 || el.css("position")==="fixed"){
					if(val==="top"){
						el=$("body");
					}else{
						return;
					}
				}
				_target=el;
				if(!_axis){
					_axis=opt.layout;
				}
				_offset=functions._setOffset.call(null);
				_to=[(el.offset().top-_offset[0]).toString(),(el.offset().left-_offset[1]).toString()]; 
				_to[0]=(_to[0]<0) ? 0 : _to[0];
				_to[1]=(_to[1]<0) ? 0 : _to[1];
				return _to;
			},
			/* sets the offset value (pixels, objects etc.) */
			_setOffset:function(){
				if(!_offset){
					_offset=(opt.offset) ? opt.offset : 0;
				}
				if(_dataOffset){
					_offset=_dataOffset;
				}
				var val,obj,y,x;
				switch(typeof _offset){
					case "object":
					case "string":
						val=[(_offset["y"]) ? _offset["y"] : _offset,(_offset["x"]) ? _offset["x"] : _offset];
						obj=[(val[0] instanceof jQuery) ? val[0] : $(val[0]),(val[1] instanceof jQuery) ? val[1] : $(val[1])];
						if(obj[0].length>0){ // js/jquery object
							y=obj[0].height();
							if(obj[0].css("position")==="fixed"){ // include position for fixed elements
								y+=obj[0][0].offsetTop;
							}
						}else if(!isNaN(parseFloat(val[0])) && isFinite(val[0])){ // numeric string
							y=parseInt(val[0]);
						}else{
							y=0; // non-existing value
						}
						if(obj[1].length>0){ // js/jquery object
							x=obj[1].width();
							if(obj[1].css("position")==="fixed"){ // include position for fixed elements
								x+=obj[1][0].offsetLeft;
							}
						}else if(!isNaN(parseFloat(val[1])) && isFinite(val[1])){ // numeric string
							x=parseInt(val[1]);
						}else{
							x=0; // non-existing value
						}
						break;
					case "function":
						val=_offset.call(null); // function (single value or array)
						if(val instanceof Array){
							y=val[0];
							x=val[1];
						}else{
							y=x=val;
						}
						break;
					default:
						y=x=parseInt(_offset); // number
				}
				return [y,x];
			},
			/* finds the element that should be highlighted */
			_findHighlight:function(id){
				var wLoc=window.location,loc=wLoc.toString().split("#")[0],locPath=wLoc.pathname;
				return $("._"+pluginPfx+"-h[href='#"+id+"'],._"+pluginPfx+"-h[href='"+loc+"#"+id+"'],._"+pluginPfx+"-h[href='"+locPath+"#"+id+"'],._"+pluginPfx+"-h[href='#/"+id+"'],._"+pluginPfx+"-h[href='"+loc+"#/"+id+"'],._"+pluginPfx+"-h[href='"+locPath+"#/"+id+"']");
			},
			/* sets plugin classes */
			_setClasses:function(c,t,h){
				var cc=opt.clickedClass,tc=opt.targetClass,hc=opt.highlightClass;
				if(c && cc && cc!==""){
					$("."+cc).removeClass(cc);
					_clicked.addClass(cc);
				}else if(t && tc && tc!=="" && h && hc && hc!==""){
					if(functions._currentTarget.call(null,t)){
						t.addClass(tc);
						h.addClass(hc);
					}else{
						if(!opt.keepHighlightUntilNext || $("."+hc).length>1){
							t.removeClass(tc);
							h.removeClass(hc);
						}
					}
				}
			},
			/* extends plugin classes */
			_extendClasses:function(){
				var tc=opt.targetClass,hc=opt.highlightClass,
					$tc=$("."+tc),$hc=$("."+hc),ftc=tc+"-first",ltc=tc+"-last",fhc=hc+"-first",lhc=hc+"-last";
				$("._"+pluginPfx+"-t").removeClass(ftc+" "+ltc);
				$("._"+pluginPfx+"-h").removeClass(fhc+" "+lhc);
				if(!opt.forceSingleHighlight){
					$tc.slice(0,1).addClass(ftc).end().slice(-1).addClass(ltc);
					$hc.slice(0,1).addClass(fhc).end().slice(-1).addClass(lhc);
				}else{
					if(opt.keepHighlightUntilNext && $tc.length>1){
						$tc.slice(0,1).removeClass(tc); $hc.slice(0,1).removeClass(hc);
					}else{
						$tc.slice(1).removeClass(tc); $hc.slice(1).removeClass(hc);
					}
				}
			},
			/* removes plugin classes */
			_removeClasses:function(destroy){
				$("."+opt.clickedClass).removeClass(opt.clickedClass);
				$("."+opt.targetClass).removeClass(opt.targetClass+" "+opt.targetClass+"-first "+opt.targetClass+"-last");
				$("."+opt.highlightClass).removeClass(opt.highlightClass+" "+opt.highlightClass+"-first "+opt.highlightClass+"-last");
				if(destroy){
					$("._"+pluginPfx+"-t").removeClass("_"+pluginPfx+"-t");
					$("._"+pluginPfx+"-h").removeClass("_"+pluginPfx+"-h");
				}
			},
			/* checks if target element is in viewport */
			_currentTarget:function(t){
				var o=opt["target_"+t.data(pluginPfx).i],
					dataTarget=t.data("ps2id-target"),
					rect=dataTarget && $(dataTarget)[0] ? $(dataTarget)[0].getBoundingClientRect() : t[0].getBoundingClientRect();
				if(typeof o!=="undefined"){
					var y=t.offset().top,x=t.offset().left,
						from=(o.from) ? o.from+y : y,to=(o.to) ? o.to+y : y,
						fromX=(o.fromX) ? o.fromX+x : x,toX=(o.toX) ? o.toX+x : x;
					return(
						rect.top >= to && rect.top <= from && 
						rect.left >= toX && rect.left <= fromX
					);
				}else{
					var wh=$(window).height(),ww=$(window).width(),
						th=dataTarget ? $(dataTarget).height() : t.height(),tw=dataTarget ? $(dataTarget).width() : t.width(),
						base=1+(th/wh),
						top=base,bottom=(th<wh) ? base*(wh/th) : base,
						baseX=1+(tw/ww),
						left=baseX,right=(tw<ww) ? baseX*(ww/tw) : baseX,
						val=[rect.top <= wh/top,rect.bottom >= wh/bottom,rect.left <= ww/left,rect.right >= ww/right];
					if(opt.highlightByNextTarget){
						var tn=t.data(pluginPfx).tn;
						if(tn){
							var rectn=tn[0].getBoundingClientRect();
							if(opt.layout==="vertical"){
								val=[rect.top <= wh/2,rectn.top > wh/2,1,1];
							}else if(opt.layout==="horizontal"){
								val=[1,1,rect.left <= ww/2,rectn.left > ww/2];
							}
						}
					}
					return(val[0] && val[1] && val[2] && val[3]);
				}
			},
			/* scrolls the page */
			_scrollTo:function(){
				_speed=functions._scrollSpeed.call(null);
				_to=(opt.pageEndSmoothScroll) ? functions._pageEndSmoothScroll.call(null) : _to;
				var _scrollable=$("html,body"),
					speed=(opt.autoScrollSpeed) ? functions._autoScrollSpeed.call(null) : _speed,
					easing=(_scrollable.is(":animated")) ? opt.scrollingEasing : opt.scrollEasing,
					_t=$(window).scrollTop(),_l=$(window).scrollLeft();
				switch(_axis){
					case "horizontal":
						if(_l!=_to[1]){
							functions._callbacks.call(null,"onStart");
							_scrollable.stop().animate({scrollLeft:_to[1]},speed,easing).promise().then(function(){
								functions._callbacks.call(null,"onComplete");
							});
						}
						break;
					case "auto":
						if(_t!=_to[0] || _l!=_to[1]){
							functions._callbacks.call(null,"onStart");
							if(navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)){ // mobile fix
								var left;
								_scrollable.stop().animate({pageYOffset:_to[0],pageXOffset:_to[1]},{
								    duration:speed,
								    easing:easing,
								    step:function(now,fx){
								        if(fx.prop=='pageXOffset'){
								            left=now;
								        }else if(fx.prop=='pageYOffset'){
								            window.scrollTo(left,now);
								        }
								    }
								}).promise().then(function(){
									functions._callbacks.call(null,"onComplete");
								});
							}else{
								_scrollable.stop().animate({scrollTop:_to[0],scrollLeft:_to[1]},speed,easing).promise().then(function(){
									functions._callbacks.call(null,"onComplete");
								});
							}
						}
						break;
					default:
						if(_t!=_to[0]){
							functions._callbacks.call(null,"onStart");
							_scrollable.stop().animate({scrollTop:_to[0]},speed,easing).promise().then(function(){
								functions._callbacks.call(null,"onComplete");
							});
						}
				}
			},
			/* sets end of page "smooth scrolling" position */
			_pageEndSmoothScroll:function(){
				var _dh=$(document).height(),_dw=$(document).width(),
					_wh=$(window).height(),_ww=$(window).width();
				return [((_dh-_to[0])<_wh) ? _dh-_wh : _to[0],((_dw-_to[1])<_ww) ? _dw-_ww : _to[1]];
			},
			/* sets animation speed (link-specific speed via ps2id-speed-VALUE class on link or link's parent) */
			_scrollSpeed:function(){
				var speed=opt.scrollSpeed;
				if(_clicked && _clicked.length){
					_clicked.add(_clicked.parent()).each(function(){
						var $this=$(this);
						if($this.attr("class")){
							var clickedClasses=$this.attr("class").split(" ");
							for(var index in clickedClasses){
								if(String(clickedClasses[index]).match(/^ps2id-speed-\d+$/)){
									speed=clickedClasses[index].split("ps2id-speed-")[1];
									break;
								}
							}
						}
					});
				}
				return parseInt(speed);
			},
			/* sets the auto-adjusted animation speed */
			_autoScrollSpeed:function(){
				var _t=$(window).scrollTop(),_l=$(window).scrollLeft(),
					_h=$(document).height(),_w=$(document).width(),
					val=[
						_speed+((_speed*(Math.floor((Math.abs(_to[0]-_t)/_h)*100)))/100),
						_speed+((_speed*(Math.floor((Math.abs(_to[1]-_l)/_w)*100)))/100)
					];
				return Math.max.apply(Math,val);
			},
			/* user callback functions */
			_callbacks:function(c){
				if(!opt){
					return;
				}
				this[pluginPfx]={
					trigger:_trigger,clicked:_clicked,target:_target,scrollTo:{y:_to[0],x:_to[1]}
				};
				switch(c){
					case "onStart":
						//append hash to URL/address bar
						if(opt.appendHash && window.history && window.history.pushState && _clicked && _clicked.length){
							var h="#"+_clicked.attr("href").split("#")[1];
							if(h!==window.location.hash) history.pushState("","",h);
						}
						opt.onStart.call(null,this[pluginPfx]);
						break;
					case "onComplete":
						opt.onComplete.call(null,this[pluginPfx]);
						break;
				}
			},
			/* resets/clears vars and constants */
			_reset:function(){
				_axis=_offset=_dataOffset=false;
			},
			/* checks if plugin has initialized */
			_isInit:function(){
				if(!_init){
					methods.init.apply(this);
				}
			},
			/* live fn */
			_live:function(){
				_liveTimer=setTimeout(function(){
					if(opt.live){
						if($(functions._highlightSelector()).length!==_totalInstances){
							functions._setup.call(null);
						}
					}else{
						if(_liveTimer){clearTimeout(_liveTimer);}
					}
					functions._live.call(null);
				},1000);
			},
			/* extends jquery with custom easings (as jquery ui) */
			_easing:function(){
				$.easing.easeInQuad=$.easing.easeInQuad || function(x){
					return x*x;
				};
				$.easing.easeOutQuad=$.easing.easeOutQuad || function(x){
					return 1-(1-x)*(1-x);
				};
				$.easing.easeInOutQuad=$.easing.easeInOutQuad || function(x){
					return x<0.5 ? 2*x*x : 1-Math.pow(-2*x+2,2)/2;
				};
				$.easing.easeInCubic=$.easing.easeInCubic || function(x){
					return x*x*x;
				};
				$.easing.easeOutCubic=$.easing.easeOutCubic || function(x){
					return 1-Math.pow(1-x,3);
				};
				$.easing.easeInOutCubic=$.easing.easeInOutCubic || function(x){
					return x<0.5 ? 4*x*x*x : 1-Math.pow(-2*x+2,3)/2;
				};
				$.easing.easeInQuart=$.easing.easeInQuart || function(x){
					return x*x*x*x;
				};
				$.easing.easeOutQuart=$.easing.easeOutQuart || function(x){
					return 1-Math.pow(1-x,4);
				};
				$.easing.easeInOutQuart=$.easing.easeInOutQuart || function(x){
					return x<0.5 ? 8*x*x*x*x : 1-Math.pow(-2*x+2,4)/2;
				};
				$.easing.easeInQuint=$.easing.easeInQuint || function(x){
					return x*x*x*x*x;
				};
				$.easing.easeOutQuint=$.easing.easeOutQuint || function(x){
					return 1-Math.pow(1-x,5);
				};
				$.easing.easeInOutQuint=$.easing.easeInOutQuint || function(x){
					return x<0.5 ? 16*x*x*x*x*x : 1-Math.pow(-2*x+2,5)/2;
				};
				$.easing.easeInExpo=$.easing.easeInExpo || function(x){
					return x===0 ? 0 : Math.pow(2,10*x-10);
				};
				$.easing.easeOutExpo=$.easing.easeOutExpo || function(x){
					return x===1 ? 1 : 1-Math.pow(2,-10*x);
				};
				$.easing.easeInOutExpo=$.easing.easeInOutExpo || function(x){
					return x===0 ? 0 : x===1 ? 1 : x<0.5 ? Math.pow(2,20*x-10)/2 : (2-Math.pow(2,-20*x+10))/2;
				};
				$.easing.easeInSine=$.easing.easeInSine || function(x){
					return 1-Math.cos(x*Math.PI/2);
				};
				$.easing.easeOutSine=$.easing.easeOutSine || function(x){
					return Math.sin(x*Math.PI/2);
				};
				$.easing.easeInOutSine=$.easing.easeInOutSine || function(x){
					return -(Math.cos(Math.PI*x)-1)/2;
				};
				$.easing.easeInCirc=$.easing.easeInCirc || function(x){
					return 1-Math.sqrt(1-Math.pow(x,2));
				};
				$.easing.easeOutCirc=$.easing.easeOutCirc || function(x){
					return Math.sqrt(1-Math.pow(x-1,2));
				};
				$.easing.easeInOutCirc=$.easing.easeInOutCirc || function(x){
					return x<0.5 ? (1-Math.sqrt(1-Math.pow(2*x,2)))/2 : (Math.sqrt(1-Math.pow(-2*x+2,2))+1)/2;
				};
				$.easing.easeInElastic=$.easing.easeInElastic || function(x){
					return x===0 ? 0 : x===1 ? 1 : -Math.pow(2,10*x-10)*Math.sin((x*10-10.75)*((2*Math.PI)/3));
				};
				$.easing.easeOutElastic=$.easing.easeOutElastic || function(x){
					return x===0 ? 0 : x===1 ? 1 : Math.pow(2,-10*x)*Math.sin((x*10-0.75)*((2*Math.PI)/3))+1;
				};
				$.easing.easeInOutElastic=$.easing.easeInOutElastic || function(x){
					return x===0 ? 0 : x===1 ? 1 : x<0.5 ? -(Math.pow(2,20*x-10)*Math.sin((20*x-11.125)*((2*Math.PI)/4.5)))/2 : Math.pow(2,-20*x+10)*Math.sin((20*x-11.125)*((2*Math.PI)/4.5))/2+1;
				};
				$.easing.easeInBack=$.easing.easeInBack || function(x){
					return (1.70158+1)*x*x*x-1.70158*x*x;
				};
				$.easing.easeOutBack=$.easing.easeOutBack || function(x){
					return 1+(1.70158+1)*Math.pow(x-1,3)+1.70158*Math.pow(x-1,2);
				};
				$.easing.easeInOutBack=$.easing.easeInOutBack || function(x){
					return x<0.5 ? (Math.pow(2*x,2)*(((1.70158*1.525)+1)*2*x-(1.70158*1.525)))/2 : (Math.pow(2*x-2,2)*(((1.70158*1.525)+1)*(x*2-2)+(1.70158*1.525))+2)/2;
				};
				$.easing.easeInBounce=$.easing.easeInBounce || function(x){
					return 1-__bounceOut(1-x);
				};
				$.easing.easeOutBounce=$.easing.easeOutBounce || __bounceOut;
				$.easing.easeInOutBounce=$.easing.easeInOutBounce || function(x){
					return x<0.5 ? (1-__bounceOut(1-2*x))/2 : (1+__bounceOut(2*x-1))/2;
				};
				function __bounceOut(x){
					var n1=7.5625,d1=2.75;
					if(x<1/d1){
						return n1*x*x;
					}else if(x<2/d1){
						return n1*(x-=(1.5/d1))*x+.75;
					}else if(x<2.5/d1){
						return n1*(x-=(2.25/d1))*x+.9375;
					}else{
						return n1*(x-=(2.625/d1))*x+.984375;
					}
				}
			}
		}
	/* 
	---------------
	plugin setup 
	---------------
	*/
	/* extend jquery with custom easings */
	functions._easing.call();
	/* plugin constructor functions */
	$.fn[pluginNS]=function(method){
		if(methods[method]){
			return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
		}else if(typeof method==="object" || !method){
			return methods.init.apply(this,arguments);
		}else{
			$.error("Method "+method+" does not exist");
		}
	};
	$[pluginNS]=function(method){
		if(methods[method]){
			return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
		}else if(typeof method==="object" || !method){
			return methods.init.apply(this,arguments);
		}else{
			$.error("Method "+method+" does not exist");
		}
	};
	/* 
	allow setting plugin default options. 
	example: $.plugin_name.defaults.option_name="option_value"; 
	*/
	$[pluginNS].defaults=defaults;
})(jQuery,window,document);/*!
 * The Final Countdown for jQuery v2.2.0 (http://hilios.github.io/jQuery.countdown/)
 * Copyright (c) 2016 Edson Hilios
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function(factory) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], factory);
    } else {
        factory(jQuery);
    }
})(function($) {
    "use strict";
    var instances = [], matchers = [], defaultOptions = {
        precision: 100,
        elapse: false,
        defer: false
    };
    matchers.push(/^[0-9]*$/.source);
    matchers.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
    matchers.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
    matchers = new RegExp(matchers.join("|"));
    function parseDateString(dateString) {
        if (dateString instanceof Date) {
            return dateString;
        }
        if (String(dateString).match(matchers)) {
            if (String(dateString).match(/^[0-9]*$/)) {
                dateString = Number(dateString);
            }
            if (String(dateString).match(/\-/)) {
                dateString = String(dateString).replace(/\-/g, "/");
            }
            return new Date(dateString);
        } else {
            throw new Error("Couldn't cast `" + dateString + "` to a date object.");
        }
    }
    var DIRECTIVE_KEY_MAP = {
        Y: "years",
        m: "months",
        n: "daysToMonth",
        d: "daysToWeek",
        w: "weeks",
        W: "weeksToMonth",
        H: "hours",
        M: "minutes",
        S: "seconds",
        D: "totalDays",
        I: "totalHours",
        N: "totalMinutes",
        T: "totalSeconds"
    };
    function escapedRegExp(str) {
        var sanitize = str.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        return new RegExp(sanitize);
    }
    function strftime(offsetObject) {
        return function(format) {
            var directives = format.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
            if (directives) {
                for (var i = 0, len = directives.length; i < len; ++i) {
                    var directive = directives[i].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/), regexp = escapedRegExp(directive[0]), modifier = directive[1] || "", plural = directive[3] || "", value = null;
                    directive = directive[2];
                    if (DIRECTIVE_KEY_MAP.hasOwnProperty(directive)) {
                        value = DIRECTIVE_KEY_MAP[directive];
                        value = Number(offsetObject[value]);
                    }
                    if (value !== null) {
                        if (modifier === "!") {
                            value = pluralize(plural, value);
                        }
                        if (modifier === "") {
                            if (value < 10) {
                                value = "0" + value.toString();
                            }
                        }
                        format = format.replace(regexp, value.toString());
                    }
                }
            }
            format = format.replace(/%%/, "%");
            return format;
        };
    }
    function pluralize(format, count) {
        var plural = "s", singular = "";
        if (format) {
            format = format.replace(/(:|;|\s)/gi, "").split(/\,/);
            if (format.length === 1) {
                plural = format[0];
            } else {
                singular = format[0];
                plural = format[1];
            }
        }
        if (Math.abs(count) > 1) {
            return plural;
        } else {
            return singular;
        }
    }
    var Countdown = function(el, finalDate, options) {
        this.el = el;
        this.$el = $(el);
        this.interval = null;
        this.offset = {};
        this.options = $.extend({}, defaultOptions);
        this.instanceNumber = instances.length;
        instances.push(this);
        this.$el.data("countdown-instance", this.instanceNumber);
        if (options) {
            if (typeof options === "function") {
                this.$el.on("update.countdown", options);
                this.$el.on("stoped.countdown", options);
                this.$el.on("finish.countdown", options);
            } else {
                this.options = $.extend({}, defaultOptions, options);
            }
        }
        this.setFinalDate(finalDate);
        if (this.options.defer === false) {
            this.start();
        }
    };
    $.extend(Countdown.prototype, {
        start: function() {
            if (this.interval !== null) {
                clearInterval(this.interval);
            }
            var self = this;
            this.update();
            this.interval = setInterval(function() {
                self.update.call(self);
            }, this.options.precision);
        },
        stop: function() {
            clearInterval(this.interval);
            this.interval = null;
            this.dispatchEvent("stoped");
        },
        toggle: function() {
            if (this.interval) {
                this.stop();
            } else {
                this.start();
            }
        },
        pause: function() {
            this.stop();
        },
        resume: function() {
            this.start();
        },
        remove: function() {
            this.stop.call(this);
            instances[this.instanceNumber] = null;
            delete this.$el.data().countdownInstance;
        },
        setFinalDate: function(value) {
            this.finalDate = parseDateString(value);
        },
        update: function() {
            if (this.$el.closest("html").length === 0) {
                this.remove();
                return;
            }
            var hasEventsAttached = $._data(this.el, "events") !== undefined, now = new Date(), newTotalSecsLeft;
            newTotalSecsLeft = this.finalDate.getTime() - now.getTime();
            newTotalSecsLeft = Math.ceil(newTotalSecsLeft / 1e3);
            newTotalSecsLeft = !this.options.elapse && newTotalSecsLeft < 0 ? 0 : Math.abs(newTotalSecsLeft);
            if (this.totalSecsLeft === newTotalSecsLeft || !hasEventsAttached) {
                return;
            } else {
                this.totalSecsLeft = newTotalSecsLeft;
            }
            this.elapsed = now >= this.finalDate;
            this.offset = {
                seconds: this.totalSecsLeft % 60,
                minutes: Math.floor(this.totalSecsLeft / 60) % 60,
                hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                daysToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 % 30.4368),
                weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                weeksToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7) % 4,
                months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368),
                years: Math.abs(this.finalDate.getFullYear() - now.getFullYear()),
                totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
                totalHours: Math.floor(this.totalSecsLeft / 60 / 60),
                totalMinutes: Math.floor(this.totalSecsLeft / 60),
                totalSeconds: this.totalSecsLeft
            };
            if (!this.options.elapse && this.totalSecsLeft === 0) {
                this.stop();
                this.dispatchEvent("finish");
            } else {
                this.dispatchEvent("update");
            }
        },
        dispatchEvent: function(eventName) {
            var event = $.Event(eventName + ".countdown");
            event.finalDate = this.finalDate;
            event.elapsed = this.elapsed;
            event.offset = $.extend({}, this.offset);
            event.strftime = strftime(this.offset);
            this.$el.trigger(event);
        }
    });
    $.fn.countdown = function() {
        var argumentsArray = Array.prototype.slice.call(arguments, 0);
        return this.each(function() {
            var instanceNumber = $(this).data("countdown-instance");
            if (instanceNumber !== undefined) {
                var instance = instances[instanceNumber], method = argumentsArray[0];
                if (Countdown.prototype.hasOwnProperty(method)) {
                    instance[method].apply(instance, argumentsArray.slice(1));
                } else if (String(method).match(/^[$A-Z_][0-9A-Z_$]*$/i) === null) {
                    instance.setFinalDate.call(instance, method);
                    instance.start();
                } else {
                    $.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, method));
                }
            } else {
                new Countdown(this, argumentsArray[0], argumentsArray[1]);
            }
        });
    };
});//---------------------------------------//// Подключаем плагины npm//---------------------------------------////---------------------------------------//// Подключаем плагины, которые в папке ( plugins )//---------------------------------------///*!
 * jReject (jQuery Browser Rejection Plugin)
 * Version 1.1.x
 * URL: http://jreject.turnwheel.com/
 * Description: jReject is a easy method of rejecting specific browsers on your site
 * Author: Steven Bower (TurnWheel Designs) http://turnwheel.com/
 * Copyright: Copyright (c) 2009-2014 Steven Bower under dual MIT/GPLv2 license.
 */
(function($) {
$.reject = function(options) {
	var opts = $.extend(true, {
		// Specifies which browsers/versions will be blocked
		reject : {
			all: false, // Covers Everything (Nothing blocked)
			msie: 6 // Covers MSIE <= 6 (Blocked by default)
			/*
			 * Many possible combinations.
			 * You can specify browser (msie, chrome, firefox)
			 * You can specify rendering engine (geko, trident)
			 * You can specify OS (Win, Mac, Linux, Solaris, iPhone, iPad)
			 *
			 * You can specify versions of each.
			 * Examples: msie9: true, firefox8: true,
			 *
			 * You can specify the highest number to reject.
			 * Example: msie: 9 (9 and lower are rejected.
			 *
			 * There is also "unknown" that covers what isn't detected
			 * Example: unknown: true
			 */
		},
		display: [], // What browsers to display and their order (default set below)
		browserShow: true, // Should the browser options be shown?
		browserInfo: { // Settings for which browsers to display
			chrome: {
				// Text below the icon
				text: 'Google Chrome',
				// URL For icon/text link
				url: 'http://www.google.com/chrome/'
				// (Optional) Use "allow" to customized when to show this option
				// Example: to show chrome only for IE users
				// allow: { all: false, msie: true }
			},
			firefox: {
				text: 'Mozilla Firefox',
				url: 'http://www.mozilla.com/firefox/'
			},
			safari: {
				text: 'Safari',
				url: 'http://www.apple.com/safari/download/'
			},
			opera: {
				text: 'Opera',
				url: 'http://www.opera.com/download/'
			},
			msie: {
				text: 'Internet Explorer',
				url: 'http://www.microsoft.com/windows/Internet-explorer/'
			}
		},
		// Pop-up Window Text
		header: 'Did you know that your Internet Browser is out of date?',
		paragraph1: 'Your browser is out of date, and may not be compatible with '+
					'our website. A list of the most popular web browsers can be '+
					'found below.',
		paragraph2: 'Just click on the icons to get to the download page',
		// Allow closing of window
		close: true,
		// Message displayed below closing link
		closeMessage: 'By closing this window you acknowledge that your experience '+
						'on this website may be degraded',
		closeLink: 'Close This Window',
		closeURL: '#',
		// Allows closing of window with esc key
		closeESC: true,
		// Use cookies to remmember if window was closed previously?
		closeCookie: false,
		// Cookie settings are only used if closeCookie is true
		cookieSettings: {
			// Path for the cookie to be saved on
			// Should be root domain in most cases
			path: '/',
			// Expiration Date (in seconds)
			// 0 (default) means it ends with the current session
			expires: 0
		},
		// Path where images are located
		imagePath: './images/',
		// Background color for overlay
		overlayBgColor: '#000',
		// Background transparency (0-1)
		overlayOpacity: 0.8,
		// Fade in time on open ('slow','medium','fast' or integer in ms)
		fadeInTime: 'fast',
		// Fade out time on close ('slow','medium','fast' or integer in ms)
		fadeOutTime: 'fast',
		// Google Analytics Link Tracking (Optional)
		// Set to true to enable
		// Note: Analytics tracking code must be added separately
		analytics: false
	}, options);
	// Set default browsers to display if not already defined
	if (opts.display.length < 1) {
		opts.display = [ 'chrome','firefox','safari','opera','msie' ];
	}
	// beforeRject: Customized Function
	if ($.isFunction(opts.beforeReject)) {
		opts.beforeReject();
	}
	// Disable 'closeESC' if closing is disabled (mutually exclusive)
	if (!opts.close) {
		opts.closeESC = false;
	}
	// This function parses the advanced browser options
	var browserCheck = function(settings) {
		// Check 1: Look for 'all' forced setting
		// Check 2: Browser+major version (optional) (eg. 'firefox','msie','{msie: 6}')
		// Check 3: Browser+major version (eg. 'firefox3','msie7','chrome4')
		// Check 4: Rendering engine+version (eg. 'webkit', 'gecko', '{webkit: 537.36}')
		// Check 5: Operating System (eg. 'win','mac','linux','solaris','iphone')
		var layout = settings[$.layout.name],
			browser = settings[$.browser.name];
		return !!(settings['all']
			|| (browser && (browser === true || $.browser.versionNumber <= browser))
			|| settings[$.browser.className]
			|| (layout && (layout === true || $.layout.versionNumber <= layout))
			|| settings[$.os.name]);
	};
	// Determine if we need to display rejection for this browser, or exit
	if (!browserCheck(opts.reject)) {
		// onFail: Optional Callback
		if ($.isFunction(opts.onFail)) {
			opts.onFail();
		}
		return false;
	}
	// If user can close and set to remmember close, initiate cookie functions
	if (opts.close && opts.closeCookie) {
		// Local global setting for the name of the cookie used
		var COOKIE_NAME = 'jreject-close';
		// Cookies Function: Handles creating/retrieving/deleting cookies
		// Cookies are only used for opts.closeCookie parameter functionality
		var _cookie = function(name, value) {
			// Save cookie
			if (typeof value != 'undefined') {
				var expires = '';
				// Check if we need to set an expiration date
				if (opts.cookieSettings.expires !== 0) {
					var date = new Date();
					date.setTime(date.getTime()+(opts.cookieSettings.expires*1000));
					expires = "; expires="+date.toGMTString();
				}
				// Get path from settings
				var path = opts.cookieSettings.path || '/';
				// Set Cookie with parameters
				document.cookie = name+'='+
					encodeURIComponent((!value) ? '' : value)+expires+
					'; path='+path;
				return true;
			}
			// Get cookie
			else {
				var cookie,val = null;
				if (document.cookie && document.cookie !== '') {
					var cookies = document.cookie.split(';');
					// Loop through all cookie values
					var clen = cookies.length;
					for (var i = 0; i < clen; ++i) {
						cookie = $.trim(cookies[i]);
						// Does this cookie string begin with the name we want?
						if (cookie.substring(0,name.length+1) == (name+'=')) {
							var len = name.length;
							val = decodeURIComponent(cookie.substring(len+1));
							break;
						}
					}
				}
				// Returns cookie value
				return val;
			}
		};
		// If cookie is set, return false and don't display rejection
		if (_cookie(COOKIE_NAME)) {
			return false;
		}
	}
	// Load background overlay (jr_overlay) + Main wrapper (jr_wrap) +
	// Inner Wrapper (jr_inner) w/ opts.header (jr_header) +
	// opts.paragraph1/opts.paragraph2 if set
	var html = '<div id="jr_overlay"></div><div id="jr_wrap"><div id="jr_inner">'+
		'<h1 id="jr_header">'+opts.header+'</h1>'+
		(opts.paragraph1 === '' ? '' : '<p>'+opts.paragraph1+'</p>')+
		(opts.paragraph2 === '' ? '' : '<p>'+opts.paragraph2+'</p>');
	var displayNum = 0;
	if (opts.browserShow) {
		html += '<ul>';
		// Generate the browsers to display
		for (var x in opts.display) {
			var browser = opts.display[x]; // Current Browser
			var info = opts.browserInfo[browser] || false; // Browser Information
			// If no info exists for this browser
			// or if this browser is not suppose to display to this user
			// based on "allow" flag
			if (!info || (info['allow'] != undefined && !browserCheck(info['allow']))) {
				continue;
			}
			var url = info.url || '#'; // URL to link text/icon to
			// Generate HTML for this browser option
			html += '<li id="jr_'+browser+'"><div class="jr_icon"></div>'+
					'<div><a href="'+url+'">'+(info.text || 'Unknown')+'</a>'+
					'</div></li>';
			++displayNum;
		}
		html += '</ul>';
	}
	// Close list and #jr_list
	html += '<div id="jr_close">'+
	// Display close links/message if set
	(opts.close ? '<a href="'+opts.closeURL+'">'+opts.closeLink+'</a>'+
		'<p>'+opts.closeMessage+'</p>' : '')+'</div>'+
	// Close #jr_inner and #jr_wrap
	'</div></div>';
	var element = $('<div>'+html+'</div>'); // Create element
	var size = _pageSize(); // Get page size
	var scroll = _scrollSize(); // Get page scroll
	// This function handles closing this reject window
	// When clicked, fadeOut and remove all elements
	element.bind('closejr', function() {
		// Make sure the permission to close is granted
		if (!opts.close) {
			return false;
		}
		// Customized Function
		if ($.isFunction(opts.beforeClose)) {
			opts.beforeClose();
		}
		// Remove binding function so it
		// doesn't get called more than once
		$(this).unbind('closejr');
		// Fade out background and modal wrapper
		$('#jr_overlay,#jr_wrap').fadeOut(opts.fadeOutTime,function() {
			$(this).remove(); // Remove element from DOM
			// afterClose: Customized Function
			if ($.isFunction(opts.afterClose)) {
				opts.afterClose();
			}
		});
		// Show elements that were hidden for layering issues
		var elmhide = 'embed.jr_hidden, object.jr_hidden, select.jr_hidden, applet.jr_hidden';
		$(elmhide).show().removeClass('jr_hidden');
		// Set close cookie for next run
		if (opts.closeCookie) {
			_cookie(COOKIE_NAME, 'true');
		}
		return true;
	});
	// Tracks clicks in Google Analytics (category 'External Links')
	// only if opts.analytics is enabled
	var analytics = function(url) {
		if (!opts.analytics) {
			return false;
		}
		// Get just the hostname
		var host = url.split(/\/+/g)[1];
		// Send external link event to Google Analaytics
		// Attempts both versions of analytics code. (Newest first)
		try {
			// Newest analytics code
			ga('send', 'event', 'External', 'Click', host, url);
		} catch (e) {
			try {
				_gaq.push([ '_trackEvent', 'External Links',  host, url ]);
			} catch (e) { }
		}
	};
	// Called onClick for browser links (and icons)
	// Opens link in new window
	var openBrowserLinks = function(url) {
		// Send link to analytics if enabled
		analytics(url);
		// Open window, generate random id value
		window.open(url, 'jr_'+ Math.round(Math.random()*11));
		return false;
	};
	/*
	 * Trverse through element DOM and apply JS variables
	 * All CSS elements that do not require JS will be in
	 * css/jquery.jreject.css
	 */
	// Creates 'background' (div)
	element.find('#jr_overlay').css({
		width: size[0],
		height: size[1],
		background: opts.overlayBgColor,
		opacity: opts.overlayOpacity
	});
	// Wrapper for our pop-up (div)
	element.find('#jr_wrap').css({
		top: scroll[1]+(size[3]/4),
		left: scroll[0]
	});
	// Wrapper for inner centered content (div)
	element.find('#jr_inner').css({
		minWidth: displayNum*100,
		maxWidth: displayNum*140,
		// min/maxWidth not supported by IE
		width: $.layout.name == 'trident' ? displayNum*155 : 'auto'
	});
//	element.find('#jr_inner li').css({ // Browser list items (li)
//		background: 'transparent url("'+opts.imagePath+'background_browser.gif") '+
//					'no-repeat scroll left top'
//	});
	element.find('#jr_inner li .jr_icon').each(function() {
		// Dynamically sets the icon background image
		var self = $(this);
		self.css('background-image','url('+opts.imagePath+'browser_'+
				(self.parent('li').attr('id').replace(/jr_/,''))+'.svg)');
		// Send link clicks to openBrowserLinks
		self.click(function () {
			var url = $(this).next('div').children('a').attr('href');
			openBrowserLinks(url);
		});
	});
	element.find('#jr_inner li a').click(function() {
		openBrowserLinks($(this).attr('href'));
		return false;
	});
	// Bind closing event to trigger closejr
	// to be consistant with ESC key close function
	element.find('#jr_close a').click(function() {
		$(this).trigger('closejr');
		// If plain anchor is set, return false so there is no page jump
		if (opts.closeURL === '#') {
			return false;
		}
	});
	// Set focus (fixes ESC key issues with forms and other focus bugs)
	$('#jr_overlay').focus();
	// Hide elements that won't display properly
	$('embed, object, select, applet').each(function() {
		if ($(this).is(':visible')) {
			$(this).hide().addClass('jr_hidden');
		}
	});
	// Append element to body of document to display
	$('body').append(element.hide().fadeIn(opts.fadeInTime));
	// Handle window resize/scroll events and update overlay dimensions
	$(window).bind('resize scroll',function() {
		var size = _pageSize(); // Get size
		// Update overlay dimensions based on page size
		$('#jr_overlay').css({
			width: size[0],
			height: size[1]
		});
		var scroll = _scrollSize(); // Get page scroll
		// Update modal position based on scroll
		$('#jr_wrap').css({
			top: scroll[1] + (size[3]/4),
			left: scroll[0]
		});
	});
	// Add optional ESC Key functionality
	if (opts.closeESC) {
		$(document).bind('keydown',function(event) {
			// ESC = Keycode 27
			if (event.keyCode == 27) {
				element.trigger('closejr');
			}
		});
	}
	// afterReject: Customized Function
	if ($.isFunction(opts.afterReject)) {
		opts.afterReject();
	}
	return true;
};
// Based on compatibility data from quirksmode.com
// This is used to help calculate exact center of the page
var _pageSize = function() {
	var xScroll = window.innerWidth && window.scrollMaxX ?
				window.innerWidth + window.scrollMaxX :
				(document.body.scrollWidth > document.body.offsetWidth ?
				document.body.scrollWidth : document.body.offsetWidth);
	var yScroll = window.innerHeight && window.scrollMaxY ?
				window.innerHeight + window.scrollMaxY :
				(document.body.scrollHeight > document.body.offsetHeight ?
				document.body.scrollHeight : document.body.offsetHeight);
	var windowWidth = window.innerWidth ? window.innerWidth :
				(document.documentElement && document.documentElement.clientWidth ?
				document.documentElement.clientWidth : document.body.clientWidth);
	var windowHeight = window.innerHeight ? window.innerHeight :
				(document.documentElement && document.documentElement.clientHeight ?
				document.documentElement.clientHeight : document.body.clientHeight);
	return [
		xScroll < windowWidth ? xScroll : windowWidth, // Page Width
		yScroll < windowHeight ? windowHeight : yScroll, // Page Height
		windowWidth,windowHeight
	];
};
// Based on compatibility data from quirksmode.com
var _scrollSize = function() {
	return [
		// scrollSize X
		window.pageXOffset ? window.pageXOffset : (document.documentElement &&
				document.documentElement.scrollTop ?
				document.documentElement.scrollLeft : document.body.scrollLeft),
		// scrollSize Y
		window.pageYOffset ? window.pageYOffset : (document.documentElement &&
				document.documentElement.scrollTop ?
				document.documentElement.scrollTop : document.body.scrollTop)
	];
};
})(jQuery);
/*
 * jQuery Browser Plugin
 * Version 2.4 / jReject 1.0.x
 * URL: http://jquery.thewikies.com/browser
 * Description: jQuery Browser Plugin extends browser detection capabilities and
 * can assign browser selectors to CSS classes.
 * Author: Nate Cavanaugh, Minhchau Dang, Jonathan Neal, & Gregory Waxman
 * Updated By: Steven Bower for use with jReject plugin
 * Copyright: Copyright (c) 2008 Jonathan Neal under dual MIT/GPL license.
 */
(function ($) {
	$.browserTest = function (a, z) {
		var u = 'unknown',
			x = 'X',
			m = function (r, h) {
				for (var i = 0; i < h.length; i = i + 1) {
					r = r.replace(h[i][0], h[i][1]);
				}
				return r;
			}, c = function (i, a, b, c) {
				var r = {
					name: m((a.exec(i) || [u, u])[1], b)
				};
				r[r.name] = true;
				if (!r.opera) {
					r.version = (c.exec(i) || [x, x, x, x])[3];
				}
				else {
					r.version = window.opera.version();
				}
				if (/safari/.test(r.name)) {
					var safariversion = /(safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/;
					var res = safariversion.exec(i);
					if (res && res[3] && res[3] < 400) {
						r.version = '2.0';
					}
				}
				else if (r.name === 'presto') {
					r.version = ($.browser.version > 9.27) ? 'futhark' : 'linear_b';
				}
				if (/msie/.test(r.name) && r.version === x) {
					var ieVersion = /rv:(\d+\.\d+)/.exec(i);
					r.version = ieVersion[1];
				}
				r.versionNumber = parseFloat(r.version, 10) || 0;
				var minorStart = 1;
				if (r.versionNumber < 100 && r.versionNumber > 9) {
					minorStart = 2;
				}
				r.versionX = (r.version !== x) ? r.version.substr(0, minorStart) : x;
				r.className = r.name + r.versionX;
				return r;
			};
		a = (/Opera|Navigator|Minefield|KHTML|Chrome|CriOS/.test(a) ? m(a, [
			[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/, ''],
			['Chrome Safari', 'Chrome'],
			['CriOS', 'Chrome'],
			['KHTML', 'Konqueror'],
			['Minefield', 'Firefox'],
			['Navigator', 'Netscape']
		]) : a).toLowerCase();
		$.browser = $.extend((!z) ? $.browser : {}, c(a,
			/(camino|chrome|crios|firefox|netscape|konqueror|lynx|msie|trident|opera|safari)/,
			[
				['trident', 'msie']
			],
			/(camino|chrome|crios|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|rv|safari)(:|\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));
		$.layout = c(a, /(gecko|konqueror|msie|trident|opera|webkit)/, [
			['konqueror', 'khtml'],
			['msie', 'trident'],
			['opera', 'presto']
		], /(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);
		$.os = {
			name: (/(win|mac|linux|sunos|solaris|iphone|ipad)/.
					exec(navigator.platform.toLowerCase()) || [u])[0].replace('sunos', 'solaris')
		};
		if (!z) {
			$('html').addClass([$.os.name, $.browser.name, $.browser.className,
				$.layout.name, $.layout.className].join(' '));
		}
	};
	$.browserTest(navigator.userAgent);
}(jQuery));
/* dropDown menu */var dropMenu = (function() {	var popupObj = {		changeState: function( $this, setting) {			var modals = setting.drop,				parentBlocks = $(setting.parent),				$modal = parentBlocks.find(modals),				titleLink = $this.parent();			if ($modal.hasClass('active') && setting.overlay) {				$modal.removeClass('active');				titleLink.removeClass('active');				$(parentBlocks).removeClass('active');				$('html').removeClass('overlay-overflow');				$(setting.overlay).removeClass('active');				popupObj.removeHeight(setting);			} else if (!$modal.hasClass('active') && setting.overlay) {				$modal.addClass('active');				titleLink.addClass('active');				$(parentBlocks).addClass('active');				$('html').addClass('overlay-overflow');				$(setting.overlay).addClass('active');				popupObj.fixHeight($this, setting);			} else if ($modal.hasClass('active') && !setting.overlay) {				$modal.removeClass('active');				$(parentBlocks).removeClass('active');				titleLink.removeClass('active');			} else if (!$modal.hasClass('active') && !setting.overlay) {				$modal.addClass('active');				$(parentBlocks).addClass('active');				titleLink.addClass('active');			}			console.log('changeState popup');			$('.js-clsoe-navBar').parent().removeClass('active');		},		closePopup: function(setting) {			if ( $(setting.drop).hasClass('active') && ( $(setting.overlay).hasClass('active') && $('html').hasClass('overlay-overflow')) && !setting.noMenu ) {				$(setting.drop).removeClass('active');				$(setting.overlay).removeClass('active');				$(setting.link).parent().removeClass('active');				$(setting.parent).removeClass('active');				$('html').removeClass('overlay-overflow');				popupObj.removeHeight(setting);			}else if ( setting.noMenu &&  $(setting.drop).hasClass('active') && ( $(setting.overlay).hasClass('active')  ) ) {				$(setting.drop).removeClass('active');				$(setting.overlay).removeClass('active');				$(setting.link).parent().removeClass('active');				$(setting.parent).removeClass('active');				popupObj.removeHeight(setting);			}else if ( !setting.overlay && $(setting.drop).hasClass('active') ) {				$(setting.drop).removeClass('active');				$(setting.link).parent().removeClass('active');				$(setting.parent).removeClass('active');			}		},		fixHeight: function($this, setting) {			var windowHeight = $(window).outerHeight(),					box = $(setting.drop),					boxHeight = box.outerHeight();					boxTop = box.offset().top			function checkHeight() {				if ( windowHeight < boxHeight + boxTop ) {					box.css('height', windowHeight - boxTop );				}else {					box.css('height', '');				}			}			checkHeight();		},		removeHeight: function(setting) {			var box = $(setting.drop);			box.css('height', '');		},		changePopup: function( $this ) {			var $popupBlocks = $('.modal-lk-block');			var linkId = $this.attr('href');			$popupBlocks.each(function() {				if ( '#' + $(this).attr('id') == linkId ) {					$popupBlocks.css('display', 'none');					$popupBlocks.find('.modal-lk__form-input').val('');					$(this).css('display', 'block');				}			})		},		hidePopup: function(setting) {			if ( $(setting.drop).hasClass('active') ) {				$(setting.drop).removeClass('active');				$(setting.parent).removeClass('active');				popupObj.removeHeight(setting);				console.log('hidePopup popup');			}		},		changePos: function( $this, setting ) {			var parentBox = $this.parents(setting.parent);			var filterLink = parentBox.find(setting.link);			var dropBox = parentBox.find(setting.drop);			var windW = $(window).outerWidth();			var parentBoxW = parentBox.outerWidth();			var parentBoxL = parentBox.offset().left;			var parentBoxR = windW - parentBoxL - parentBoxW;			var dropBoxW = dropBox.outerWidth();			if ( parentBoxR < dropBoxW ) {				dropBox.addClass('position-right');				filterLink.addClass('link-pos-right');			}else {				dropBox.removeClass('position-right');				filterLink.removeClass('link-pos-right');			}		},		eventClick: function(setting) {			var openLink = $(setting.link);			var closeLink = $(setting.drop).find('.modal__close');			//open popup			openLink.on('click', function(e) {				var modal = setting.drop,						parentBlock = setting.parent;				if ( $(this).parents(parentBlock).find(modal).length ) {					popupObj.changeState( $(this), setting );					if ( setting.changePos ) {						popupObj.changePos( $(this), setting );					}					e.preventDefault();				}			});			//close popup			closeLink.on('click', function(e) {				popupObj.closePopup(setting);				e.preventDefault();			});			//change popup			$('.modal-lk__bottom-link').on('click', function(e) {				popupObj.changePopup( $(this) );				e.preventDefault();			});			//close popup			$(window).on('click', function(e) {				var $this = $(e.target);				//console.log($this);				if ( $(setting.drop).hasClass('active') && !$this.closest(setting.parent).length && !$this.closest('.js-overlay').length ) {					popupObj.closePopup(setting);				}else if (  $(setting.drop).hasClass('active') && !$this.closest(setting.parent).length && $this.closest('.js-overlay').length ) {					popupObj.hidePopup(setting);				}				if ( $this.hasClass('overlay2') ) {					//popupObj.closePopup(setting);					//$('.js-clsoe-navBar').trigger('click');				}				if ( $(setting.drop).hasClass('active') && $this.closest('.js-overlay').length && !$this.closest('.header-mob-menu__list-item') ) {					console.log('12');				}			});			// close modal			$('.js-close-modal').on('click', function(e) {				popupObj.closePopup(setting);				e.preventDefault();			});			// mob close modal nav			$('.header-mob-menu__drop-lk .modal__close, .header-mob-menu__messengers .modal__close, .js-mob-search-parent .header-search__close').on('click', function(e) {				$('.js-clsoe-navBar').trigger('click');				e.preventDefault();			});			//mob search nav focus			$('.js-mob-search-nav-btn').on('click', function(e) {				$(this).parents('.header-search').find('.header-search__input').focus();				e.preventDefault();			});		}	};	return {		drop: function(setting) {			popupObj.eventClick(setting);		}	}}());/* exampledropMenu.drop({	link: '.js-filters-brand',	drop: '.js-filters-brand-drop', 	parent: '.js-filters-brand-parent',	noMenu: false,	overlay: false,});*//* dropDown menu end*//* filter blocks */var FilterBlocks = function(setting) {	//constructor props	this.input = $(setting.input);	this.blocks = $(setting.blocks);	this.title = $(setting.title);	this.events();};//proto methodsFilterBlocks.prototype = {	markMatch: function(text, term, $this) {		// Find where the match is    var match = text.toUpperCase().indexOf(term.toUpperCase());    //console.log(match);    var $result = $('<span></span>');    // If there is no match, move on    if (match < 0) {    	$this.hide();      return $result.text(text);    }    // Put in whatever text is before the match    $result.text(text.substring(0, match));    // Mark the match    var $match = $('<b></b>');    $match.text(text.substring(match, match + term.length));    // Append the matching text    $result.append($match);    // Put in whatever is after the match    $result.append(text.substring(match + term.length));    $this.show();    return $result;	},	filterBlocks: function(val) {		var thet = this;		var $title = this.title;		var val = val.toLowerCase();		var $blocks = this.blocks;		$blocks.show();		$blocks.each(function() {			var thisText = $(this).find($title).text();			var result = thet.markMatch(thisText, val, $(this));			$(this).find($title).html(result)		})	},	events: function() {		var _this = this;		this.input.on('input', function() {			_this.filterBlocks( $(this).val() )		})	}}/* examplevar mySearch = new FilterBlocks({	input: '.js-filter-input',	blocks: '.product-filter-check__row',	title: '.checkbox__text'});*//* filter blocks end*/$.fn.spinner = function(options) {	options = $.extend({     min: 0  }, options);  var make = function() {			var self = $(this),				$input = self.find('input'),				$plus = self.find('.js-spinner-plus'),				$minus = self.find('.js-spinner-minus'),				min = self.data('min'),				max = self.data('max');			function disable() {				if (parseInt($input.val(), 10) <= min) {					$minus.addClass('disable');					$input.val(min)				} else if (parseInt($input.val(), 10) >= max) {					$plus.addClass('disable');				} else {					$minus.removeClass('disable');					$plus.removeClass('disable');				}			} 			disable();			$input.val(min).on('keydown', function(e){e.preventDefault()});			$plus.on('click', function(e) {				e.preventDefault();				if(parseInt($input.val(), 10) >= max){					return false;				} else {					$input.val( parseInt($input.val(), 10) + 1);					disable();					self.trigger('plus');					self.trigger('update');				}			});			$minus.on('click', function(e) {				e.preventDefault();				if(parseInt($input.val(), 10) <= min){					return false;				} else {					$input.val( parseInt($input.val(), 10) - 1);					disable();					self.trigger('minus');					self.trigger('update');				}			});		}  return this.each(make); }function checkMaskPhone(val) {	var arr = val.split('_');	for(var i = 0; i < arr.length; i++) {		if( arr[i] == '' ) {			return false		}	}	return true;}function openPopup( form ) {	var $btn = $(form).find('button[type="submit"]'),			popupPath = $btn.data('src');	$.fancybox.open({		src: popupPath	});};/*! * Simple jQuery Equal Heights * * Copyright (c) 2013 Matt Banks * Dual licensed under the MIT and GPL licenses. * Uses the same license as jQuery, see: * http://docs.jquery.com/License * * @version 1.5.1 */(function($) {    $.fn.equalHeights = function() {        var maxHeight = 0,            $this = $(this);        $this.each( function() {            var height = $(this).innerHeight();            if ( height > maxHeight ) { maxHeight = height; }        });        return $this.css('height', maxHeight);    };    // auto-initialize plugin    $('[data-equal]').each(function(){        var $this = $(this),            target = $this.data('equal');        $this.find(target).equalHeights();    });})(jQuery);$.fn.dropDown = function(options) {	options = $.extend({    dropClass: '.js-drop-cont',    linkClass: '.js-drop-link'  }, options);	$links = this.find(options.linkClass);	$links.on('click', function(e) {		var $drop = $(this).parent().find(options.dropClass);		$(this).parent().find(options.dropClass).slideToggle();		$links.not($(this)).parent().find(options.dropClass).slideUp();		$links.not($(this)).removeClass('active');		$(this).toggleClass('active');		e.preventDefault();	})	return this;}function formatNumber(val) {	return val.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');}function formatStringToNumber(val) {	val = val.replace(' ', '');	val = parseInt( val , 10 )	return val;}var keys = {37: 1, 38: 1, 39: 1, 40: 1};function preventDefault(e) {  e = e || window.event;  if (e.preventDefault)      e.preventDefault();  e.returnValue = false;  }function preventDefaultForScrollKeys(e) {    if (keys[e.keyCode]) {        preventDefault(e);        return false;    }}function disableScroll() {  if (window.addEventListener) // older FF      window.addEventListener('DOMMouseScroll', preventDefault, false);  window.onwheel = preventDefault; // modern standard  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE  window.ontouchmove  = preventDefault; // mobile  document.onkeydown  = preventDefaultForScrollKeys;}function enableScroll() {    if (window.removeEventListener)        window.removeEventListener('DOMMouseScroll', preventDefault, false);    window.onmousewheel = document.onmousewheel = null;     window.onwheel = null;     window.ontouchmove = null;      document.onkeydown = null;  };// Numeric only control handlerjQuery.fn.ForceNumericOnly =function(){    return this.each(function()    {        $(this).keydown(function(e)        {            var key = e.charCode || e.keyCode || 0;            // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY            // home, end, period, and numpad decimal            return (                key == 8 ||                 key == 9 ||                key == 13 ||                key == 46 ||                key == 110 ||                key == 190 ||                (key >= 35 && key <= 40) ||                (key >= 48 && key <= 57) ||                (key >= 96 && key <= 105));        });    });};/*
 * jQuery Form Styler v2.0.2
 * https://github.com/Dimox/jQueryFormStyler
 *
 * Copyright 2012-2017 Dimox (http://dimox.name/)
 * Released under the MIT license.
 *
 * Date: 2017.10.22
 *
 */
;(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		module.exports = factory($ || require('jquery'));
	} else {
		factory(jQuery);
	}
}(function($) {
	'use strict';
	var pluginName = 'styler',
			defaults = {
				idSuffix: '-styler',
				filePlaceholder: 'Файл не выбран',
				fileBrowse: 'Обзор...',
				fileNumber: 'Выбрано файлов: %s',
				selectPlaceholder: 'Выберите...',
				selectSearch: false,
				selectSearchLimit: 10,
				selectSearchNotFound: 'Совпадений не найдено',
				selectSearchPlaceholder: 'Поиск...',
				selectVisibleOptions: 0,
				selectSmartPositioning: true,
				locale: 'ru',
				locales: {
					'en': {
						filePlaceholder: 'No file selected',
						fileBrowse: 'Browse...',
						fileNumber: 'Selected files: %s',
						selectPlaceholder: 'Select...',
						selectSearchNotFound: 'No matches found',
						selectSearchPlaceholder: 'Search...'
					}
				},
				onSelectOpened: function() {},
				onSelectClosed: function() {},
				onFormStyled: function() {}
			};
	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);
		var locale = this.options.locale;
		if (this.options.locales[locale] !== undefined) {
			$.extend(this.options, this.options.locales[locale]);
		}
		this.init();
	}
	Plugin.prototype = {
		// инициализация
		init: function() {
			var el = $(this.element);
			var opt = this.options;
			var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/i) && !navigator.userAgent.match(/(Windows\sPhone)/i)) ? true : false;
			var Android = (navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/(Windows\sPhone)/i)) ? true : false;
			function Attributes() {
				if (el.attr('id') !== undefined && el.attr('id') !== '') {
					this.id = el.attr('id') + opt.idSuffix;
				}
				this.title = el.attr('title');
				this.classes = el.attr('class');
				this.data = el.data();
			}
			// checkbox
			if (el.is(':checkbox')) {
				var checkboxOutput = function() {
					var att = new Attributes();
					var checkbox = $('<div class="jq-checkbox"><div class="jq-checkbox__div"></div></div>')
						.attr({
							id: att.id,
							title: att.title
						})
						.addClass(att.classes)
						.data(att.data)
					;
					el.after(checkbox).prependTo(checkbox);
					if (el.is(':checked')) checkbox.addClass('checked');
					if (el.is(':disabled')) checkbox.addClass('disabled');
					// клик на псевдочекбокс
					checkbox.click(function(e) {
						e.preventDefault();
						el.triggerHandler('click');
						if (!checkbox.is('.disabled')) {
							if (el.is(':checked')) {
								el.prop('checked', false);
								checkbox.removeClass('checked');
							} else {
								el.prop('checked', true);
								checkbox.addClass('checked');
							}
							el.focus().change();
						}
					});
					// клик на label
					el.closest('label').add('label[for="' + el.attr('id') + '"]').on('click.styler', function(e) {
						if (!$(e.target).is('a') && !$(e.target).closest(checkbox).length) {
							checkbox.triggerHandler('click');
							e.preventDefault();
						}
					});
					// переключение по Space или Enter
					el.on('change.styler', function() {
						if (el.is(':checked')) checkbox.addClass('checked');
						else checkbox.removeClass('checked');
					})
					// чтобы переключался чекбокс, который находится в теге label
					.on('keydown.styler', function(e) {
						if (e.which == 32) checkbox.click();
					})
					.on('focus.styler', function() {
						if (!checkbox.is('.disabled')) checkbox.addClass('focused');
					})
					.on('blur.styler', function() {
						checkbox.removeClass('focused');
					});
				}; // end checkboxOutput()
				checkboxOutput();
				// обновление при динамическом изменении
				el.on('refresh', function() {
					el.closest('label').add('label[for="' + el.attr('id') + '"]').off('.styler');
					el.off('.styler').parent().before(el).remove();
					checkboxOutput();
				});
			// end checkbox
			// radio
			} else if (el.is(':radio')) {
				var radioOutput = function() {
					var att = new Attributes();
					var radio = $('<div class="jq-radio"><div class="jq-radio__div"></div></div>')
						.attr({
							id: att.id,
							title: att.title
						})
						.addClass(att.classes)
						.data(att.data)
					;
					el.after(radio).prependTo(radio);
					if (el.is(':checked')) radio.addClass('checked');
					if (el.is(':disabled')) radio.addClass('disabled');
					// определяем общего родителя у радиокнопок с одинаковым name
					// http://stackoverflow.com/a/27733847
					$.fn.commonParents = function() {
						var cachedThis = this;
						return cachedThis.first().parents().filter(function() {
							return $(this).find(cachedThis).length === cachedThis.length;
						});
					};
					$.fn.commonParent = function() {
						return $(this).commonParents().first();
					};
					// клик на псевдорадиокнопке
					radio.click(function(e) {
						e.preventDefault();
						el.triggerHandler('click');
						if (!radio.is('.disabled')) {
							var inputName = $('input[name="' + el.attr('name') + '"]');
							inputName.commonParent().find(inputName).prop('checked', false).parent().removeClass('checked');
							el.prop('checked', true).parent().addClass('checked');
							el.focus().change();
						}
					});
					// клик на label
					el.closest('label').add('label[for="' + el.attr('id') + '"]').on('click.styler', function(e) {
						if (!$(e.target).is('a') && !$(e.target).closest(radio).length) {
							radio.triggerHandler('click');
							e.preventDefault();
						}
					});
					// переключение стрелками
					el.on('change.styler', function() {
						el.parent().addClass('checked');
					})
					.on('focus.styler', function() {
						if (!radio.is('.disabled')) radio.addClass('focused');
					})
					.on('blur.styler', function() {
						radio.removeClass('focused');
					});
				}; // end radioOutput()
				radioOutput();
				// обновление при динамическом изменении
				el.on('refresh', function() {
					el.closest('label').add('label[for="' + el.attr('id') + '"]').off('.styler');
					el.off('.styler').parent().before(el).remove();
					radioOutput();
				});
			// end radio
			// file
			} else if (el.is(':file')) {
				var fileOutput = function() {
					var att = new Attributes();
					var placeholder = el.data('placeholder');
					if (placeholder === undefined) placeholder = opt.filePlaceholder;
					var browse = el.data('browse');
					if (browse === undefined || browse === '') browse = opt.fileBrowse;
					var file =
						$('<div class="jq-file">' +
								'<div class="jq-file__name">' + placeholder + '</div>' +
								'<div class="jq-file__browse">' + browse + '</div>' +
							'</div>')
						.attr({
							id: att.id,
							title: att.title
						})
						.addClass(att.classes)
						.data(att.data)
					;
					el.after(file).appendTo(file);
					if (el.is(':disabled')) file.addClass('disabled');
					var value = el.val();
					var name = $('div.jq-file__name', file);
					// чтобы при динамическом изменении имя файла не сбрасывалось
					if (value) name.text(value.replace(/.+[\\\/]/, ''));
					el.on('change.styler', function() {
						var value = el.val();
						if (el.is('[multiple]')) {
							value = '';
							var files = el[0].files.length;
							if (files > 0) {
								var number = el.data('number');
								if (number === undefined) number = opt.fileNumber;
								number = number.replace('%s', files);
								value = number;
							}
						}
						name.text(value.replace(/.+[\\\/]/, ''));
						if (value === '') {
							name.text(placeholder);
							file.removeClass('changed');
						} else {
							file.addClass('changed');
						}
					})
					.on('focus.styler', function() {
						file.addClass('focused');
					})
					.on('blur.styler', function() {
						file.removeClass('focused');
					})
					.on('click.styler', function() {
						file.removeClass('focused');
					});
				}; // end fileOutput()
				fileOutput();
				// обновление при динамическом изменении
				el.on('refresh', function() {
					el.off('.styler').parent().before(el).remove();
					fileOutput();
				});
			// end file
			// number
			} else if (el.is('input[type="number"]')) {
				var numberOutput = function() {
					var att = new Attributes();
					var number =
						$('<div class="jq-number">' +
								'<div class="jq-number__spin minus"></div>' +
								'<div class="jq-number__spin plus"></div>' +
							'</div>')
						.attr({
							id: att.id,
							title: att.title
						})
						.addClass(att.classes)
						.data(att.data)
					;
					el.after(number).prependTo(number).wrap('<div class="jq-number__field"></div>');
					if (el.is(':disabled')) number.addClass('disabled');
					var min,
							max,
							step,
							timeout = null,
							interval = null;
					if (el.attr('min') !== undefined) min = el.attr('min');
					if (el.attr('max') !== undefined) max = el.attr('max');
					if (el.attr('step') !== undefined && $.isNumeric(el.attr('step')))
						step = Number(el.attr('step'));
					else
						step = Number(1);
					var changeValue = function(spin) {
						var value = el.val(),
								newValue;
						if (!$.isNumeric(value)) {
							value = 0;
							el.val('0');
						}
						if (spin.is('.minus')) {
							newValue = Number(value) - step;
						} else if (spin.is('.plus')) {
							newValue = Number(value) + step;
						}
						// определяем количество десятичных знаков после запятой в step
						var decimals = (step.toString().split('.')[1] || []).length;
						if (decimals > 0) {
							var multiplier = '1';
							while (multiplier.length <= decimals) multiplier = multiplier + '0';
							// избегаем появления лишних знаков после запятой
							newValue = Math.round(newValue * multiplier) / multiplier;
						}
						if ($.isNumeric(min) && $.isNumeric(max)) {
							if (newValue >= min && newValue <= max) el.val(newValue);
						} else if ($.isNumeric(min) && !$.isNumeric(max)) {
							if (newValue >= min) el.val(newValue);
						} else if (!$.isNumeric(min) && $.isNumeric(max)) {
							if (newValue <= max) el.val(newValue);
						} else {
							el.val(newValue);
						}
					};
					if (!number.is('.disabled')) {
						number.on('mousedown', 'div.jq-number__spin', function() {
							var spin = $(this);
							changeValue(spin);
							timeout = setTimeout(function(){
								interval = setInterval(function(){ changeValue(spin); }, 40);
							}, 350);
						}).on('mouseup mouseout', 'div.jq-number__spin', function() {
							clearTimeout(timeout);
							clearInterval(interval);
						}).on('mouseup', 'div.jq-number__spin', function() {
							el.change().trigger('input');
						});
						el.on('focus.styler', function() {
							number.addClass('focused');
						})
						.on('blur.styler', function() {
							number.removeClass('focused');
						});
					}
				}; // end numberOutput()
				numberOutput();
				// обновление при динамическом изменении
				el.on('refresh', function() {
					el.off('.styler').closest('.jq-number').before(el).remove();
					numberOutput();
				});
			// end number
			// select
			} else if (el.is('select')) {
				var selectboxOutput = function() {
					// запрещаем прокрутку страницы при прокрутке селекта
					function preventScrolling(selector) {
						var scrollDiff = selector.prop('scrollHeight') - selector.outerHeight(),
								wheelDelta = null,
								scrollTop = null;
						selector.off('mousewheel DOMMouseScroll').on('mousewheel DOMMouseScroll', function(e) {
							/**
							 * нормализация направления прокрутки
							 * (firefox < 0 || chrome etc... > 0)
							 * (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0)
							 */
							wheelDelta = (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) ? 1 : -1; // направление прокрутки (-1 вниз, 1 вверх)
							scrollTop = selector.scrollTop(); // позиция скролла
							if ((scrollTop >= scrollDiff && wheelDelta < 0) || (scrollTop <= 0 && wheelDelta > 0)) {
								e.stopPropagation();
								e.preventDefault();
							}
						});
					}
					var option = $('option', el);
					var list = '';
					// формируем список селекта
					function makeList() {
						for (var i = 0; i < option.length; i++) {
							var op = option.eq(i);
							var li = '',
									liClass = '',
									liClasses = '',
									id = '',
									title = '',
									dataList = '',
									optionClass = '',
									optgroupClass = '',
									dataJqfsClass = '';
							var disabled = 'disabled';
							var selDis = 'selected sel disabled';
							if (op.prop('selected')) liClass = 'selected sel';
							if (op.is(':disabled')) liClass = disabled;
							if (op.is(':selected:disabled')) liClass = selDis;
							if (op.attr('id') !== undefined && op.attr('id') !== '') id = ' id="' + op.attr('id') + opt.idSuffix + '"';
							if (op.attr('title') !== undefined && option.attr('title') !== '') title = ' title="' + op.attr('title') + '"';
							if (op.attr('class') !== undefined) {
								optionClass = ' ' + op.attr('class');
								dataJqfsClass = ' data-jqfs-class="' + op.attr('class') + '"';
							}
							var data = op.data();
							for (var k in data) {
								if (data[k] !== '') dataList += ' data-' + k + '="' + data[k] + '"';
							}
							if ( (liClass + optionClass) !== '' )   liClasses = ' class="' + liClass + optionClass + '"';
							li = '<li' + dataJqfsClass + dataList + liClasses + title + id + '>'+ op.html() +'</li>';
							// если есть optgroup
							if (op.parent().is('optgroup')) {
								if (op.parent().attr('class') !== undefined) optgroupClass = ' ' + op.parent().attr('class');
								li = '<li' + dataJqfsClass + dataList + ' class="' + liClass + optionClass + ' option' + optgroupClass + '"' + title + id + '>'+ op.html() +'</li>';
								if (op.is(':first-child')) {
									li = '<li class="optgroup' + optgroupClass + '">' + op.parent().attr('label') + '</li>' + li;
								}
							}
							list += li;
						}
					} // end makeList()
					// одиночный селект
					function doSelect() {
						var att = new Attributes();
						var searchHTML = '';
						var selectPlaceholder = el.data('placeholder');
						var selectSearch = el.data('search');
						var selectSearchLimit = el.data('search-limit');
						var selectSearchNotFound = el.data('search-not-found');
						var selectSearchPlaceholder = el.data('search-placeholder');
						var selectSmartPositioning = el.data('smart-positioning');
						if (selectPlaceholder === undefined) selectPlaceholder = opt.selectPlaceholder;
						if (selectSearch === undefined || selectSearch === '') selectSearch = opt.selectSearch;
						if (selectSearchLimit === undefined || selectSearchLimit === '') selectSearchLimit = opt.selectSearchLimit;
						if (selectSearchNotFound === undefined || selectSearchNotFound === '') selectSearchNotFound = opt.selectSearchNotFound;
						if (selectSearchPlaceholder === undefined) selectSearchPlaceholder = opt.selectSearchPlaceholder;
						if (selectSmartPositioning === undefined || selectSmartPositioning === '') selectSmartPositioning = opt.selectSmartPositioning;
						var selectbox =
							$('<div class="jq-selectbox jqselect">' +
									'<div class="jq-selectbox__select">' +
										'<div class="jq-selectbox__select-text"></div>' +
										'<div class="jq-selectbox__trigger">' +
											'<div class="jq-selectbox__trigger-arrow"></div></div>' +
									'</div>' +
								'</div>')
							.attr({
								id: att.id,
								title: att.title
							})
							.addClass(att.classes)
							.data(att.data)
						;
						el.after(selectbox).prependTo(selectbox);
						var selectzIndex = selectbox.css('z-index');
						selectzIndex = (selectzIndex > 0 ) ? selectzIndex : 1;
						var divSelect = $('div.jq-selectbox__select', selectbox);
						var divText = $('div.jq-selectbox__select-text', selectbox);
						var optionSelected = option.filter(':selected');
						makeList();
						if (selectSearch) searchHTML =
							'<div class="jq-selectbox__search"><input type="search" autocomplete="off" placeholder="' + selectSearchPlaceholder + '"></div>' +
							'<div class="jq-selectbox__not-found">' + selectSearchNotFound + '</div>';
						var dropdown =
							$('<div class="jq-selectbox__dropdown">' +
									searchHTML + '<ul class="js-scroll">' + list + '</ul>' +
								'</div>');
						selectbox.append(dropdown);
						var ul = $('ul', dropdown);
						var li = $('li', dropdown);
						var search = $('input', dropdown);
						var notFound = $('div.jq-selectbox__not-found', dropdown).hide();
						if (li.length < selectSearchLimit) search.parent().hide();
						// показываем опцию по умолчанию
						// если у 1-й опции нет текста, она выбрана по умолчанию и параметр selectPlaceholder не false, то показываем плейсхолдер
						if (option.first().text() === '' && option.first().is(':selected') && selectPlaceholder !== false) {
							divText.text(selectPlaceholder).addClass('placeholder');
						} else {
							divText.text(optionSelected.text());
						}
						// определяем самый широкий пункт селекта
						var liWidthInner = 0,
								liWidth = 0;
						li.css({'display': 'inline-block'});
						li.each(function() {
							var l = $(this);
							if (l.innerWidth() > liWidthInner) {
								liWidthInner = l.innerWidth();
								liWidth = l.width();
							}
						});
						li.css({'display': ''});
						// подстраиваем ширину свернутого селекта в зависимости
						// от ширины плейсхолдера или самого широкого пункта
						if (divText.is('.placeholder') && (divText.width() > liWidthInner)) {
							divText.width(divText.width());
						} else {
							var selClone = selectbox.clone().appendTo('body').width('auto');
							var selCloneWidth = selClone.outerWidth();
							selClone.remove();
							if (selCloneWidth == selectbox.outerWidth()) {
								divText.width(liWidth);
							}
						}
						// подстраиваем ширину выпадающего списка в зависимости от самого широкого пункта
						if (liWidthInner > selectbox.width()) dropdown.width(liWidthInner);
						// прячем 1-ю пустую опцию, если она есть и если атрибут data-placeholder не пустой
						// если все же нужно, чтобы первая пустая опция отображалась, то указываем у селекта: data-placeholder=""
						if (option.first().text() === '' && el.data('placeholder') !== '') {
							li.first().hide();
						}
						var selectHeight = selectbox.outerHeight(true);
						var searchHeight = search.parent().outerHeight(true) || 0;
						var isMaxHeight = ul.css('max-height');
						var liSelected = li.filter('.selected');
						if (liSelected.length < 1) li.first().addClass('selected sel');
						if (li.data('li-height') === undefined) {
							var liOuterHeight = li.outerHeight();
							if (selectPlaceholder !== false) liOuterHeight = li.eq(1).outerHeight();
							li.data('li-height', liOuterHeight);
						}
						var position = dropdown.css('top');
						if (dropdown.css('left') == 'auto') dropdown.css({left: 0});
						if (dropdown.css('top') == 'auto') {
							dropdown.css({top: selectHeight});
							position = selectHeight;
						}
						dropdown.hide();
						// если выбран не дефолтный пункт
						if (liSelected.length) {
							// добавляем класс, показывающий изменение селекта
							if (option.first().text() != optionSelected.text()) {
								selectbox.addClass('changed');
							}
							// передаем селекту класс выбранного пункта
							selectbox.data('jqfs-class', liSelected.data('jqfs-class'));
							selectbox.addClass(liSelected.data('jqfs-class'));
						}
						// если селект неактивный
						if (el.is(':disabled')) {
							selectbox.addClass('disabled');
							return false;
						}
						// при клике на псевдоселекте
						divSelect.click(function() {
							// колбек при закрытии селекта
							if ($('div.jq-selectbox').filter('.opened').length) {
								opt.onSelectClosed.call($('div.jq-selectbox').filter('.opened'));
							}
							el.focus();
							// если iOS, то не показываем выпадающий список,
							// т.к. отображается нативный и неизвестно, как его спрятать
							if (iOS) return;
							// умное позиционирование
							var win = $(window);
							var liHeight = li.data('li-height');
							var topOffset = selectbox.offset().top;
							var bottomOffset = win.height() - selectHeight - (topOffset - win.scrollTop());
							var visible = el.data('visible-options');
							if (visible === undefined || visible === '') visible = opt.selectVisibleOptions;
							var minHeight = liHeight * 5;
							var newHeight = liHeight * visible;
							if (visible > 0 && visible < 6) minHeight = newHeight;
							if (visible === 0) newHeight = 'auto';
							var dropDown = function() {
								dropdown.height('auto').css({bottom: 'auto', top: position});
								var maxHeightBottom = function() {
									ul.css('max-height', Math.floor((bottomOffset - 20 - searchHeight) / liHeight) * liHeight);
								};
								maxHeightBottom();
								ul.css('max-height', newHeight);
								if (isMaxHeight != 'none') {
									ul.css('max-height', isMaxHeight);
								}
								if (bottomOffset < (dropdown.outerHeight() + 20)) {
									maxHeightBottom();
								}
							};
							var dropUp = function() {
								dropdown.height('auto').css({top: 'auto', bottom: position});
								var maxHeightTop = function() {
									ul.css('max-height', Math.floor((topOffset - win.scrollTop() - 20 - searchHeight) / liHeight) * liHeight);
								};
								maxHeightTop();
								ul.css('max-height', newHeight);
								if (isMaxHeight != 'none') {
									ul.css('max-height', isMaxHeight);
								}
								if ((topOffset - win.scrollTop() - 20) < (dropdown.outerHeight() + 20)) {
									maxHeightTop();
								}
							};
							if (selectSmartPositioning === true || selectSmartPositioning === 1) {
								// раскрытие вниз
								if (bottomOffset > (minHeight + searchHeight + 20)) {
									dropDown();
									selectbox.removeClass('dropup').addClass('dropdown');
								// раскрытие вверх
								} else {
									dropUp();
									selectbox.removeClass('dropdown').addClass('dropup');
								}
							} else if (selectSmartPositioning === false || selectSmartPositioning === 0) {
								// раскрытие вниз
								if (bottomOffset > (minHeight + searchHeight + 20)) {
									dropDown();
									selectbox.removeClass('dropup').addClass('dropdown');
								}
							} else {
								// если умное позиционирование отключено
								dropdown.height('auto').css({bottom: 'auto', top: position});
								ul.css('max-height', newHeight);
								if (isMaxHeight != 'none') {
									ul.css('max-height', isMaxHeight);
								}
							}
							// если выпадающий список выходит за правый край окна браузера,
							// то меняем позиционирование с левого на правое
							if (selectbox.offset().left + dropdown.outerWidth() > win.width()) {
								dropdown.css({left: 'auto', right: 0});
							}
							// конец умного позиционирования
							$('div.jqselect').css({zIndex: (selectzIndex - 1)}).removeClass('opened');
							selectbox.css({zIndex: selectzIndex});
							if (dropdown.is(':hidden')) {
								$('div.jq-selectbox__dropdown:visible').hide();
								dropdown.show();
								selectbox.addClass('opened focused');
								// колбек при открытии селекта
								opt.onSelectOpened.call(selectbox);
							} else {
								dropdown.hide();
								selectbox.removeClass('opened dropup dropdown');
								// колбек при закрытии селекта
								if ($('div.jq-selectbox').filter('.opened').length) {
									opt.onSelectClosed.call(selectbox);
								}
							}
							// поисковое поле
							if (search.length) {
								search.val('').keyup();
								notFound.hide();
								search.keyup(function() {
									var query = $(this).val();
									li.each(function() {
										if (!$(this).html().match(new RegExp('.*?' + query + '.*?', 'i'))) {
											$(this).hide();
										} else {
											$(this).show();
										}
									});
									// прячем 1-ю пустую опцию
									if (option.first().text() === '' && el.data('placeholder') !== '') {
										li.first().hide();
									}
									if (li.filter(':visible').length < 1) {
										notFound.show();
									} else {
										notFound.hide();
									}
								});
							}
							// прокручиваем до выбранного пункта при открытии списка
							if (li.filter('.selected').length) {
								if (el.val() === '') {
									ul.scrollTop(0);
								} else {
									// если нечетное количество видимых пунктов,
									// то высоту пункта делим пополам для последующего расчета
									if ( (ul.innerHeight() / liHeight) % 2 !== 0 ) liHeight = liHeight / 2;
									ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - ul.innerHeight() / 2 + liHeight);
								}
							}
							preventScrolling(ul);
						}); // end divSelect.click()
						// при наведении курсора на пункт списка
						li.hover(function() {
							$(this).siblings().removeClass('selected');
						});
						var selectedText = li.filter('.selected').text();
						// при клике на пункт списка
						li.filter(':not(.disabled):not(.optgroup)').click(function() {
							el.focus();
							var t = $(this);
							var liText = t.text();
							if (!t.is('.selected')) {
								var index = t.index();
								index -= t.prevAll('.optgroup').length;
								t.addClass('selected sel').siblings().removeClass('selected sel');
								option.prop('selected', false).eq(index).prop('selected', true);
								selectedText = liText;
								divText.text(liText);
								// передаем селекту класс выбранного пункта
								if (selectbox.data('jqfs-class')) selectbox.removeClass(selectbox.data('jqfs-class'));
								selectbox.data('jqfs-class', t.data('jqfs-class'));
								selectbox.addClass(t.data('jqfs-class'));
								el.change();
							}
							dropdown.hide();
							selectbox.removeClass('opened dropup dropdown');
							// колбек при закрытии селекта
							opt.onSelectClosed.call(selectbox);
						});
						dropdown.mouseout(function() {
							$('li.sel', dropdown).addClass('selected');
						});
						// изменение селекта
						el.on('change.styler', function() {
							divText.text(option.filter(':selected').text()).removeClass('placeholder');
							li.removeClass('selected sel').not('.optgroup').eq(el[0].selectedIndex).addClass('selected sel');
							// добавляем класс, показывающий изменение селекта
							if (option.first().text() != li.filter('.selected').text()) {
								selectbox.addClass('changed');
							} else {
								selectbox.removeClass('changed');
							}
						})
						.on('focus.styler', function() {
							selectbox.addClass('focused');
							$('div.jqselect').not('.focused').removeClass('opened dropup dropdown').find('div.jq-selectbox__dropdown').hide();
						})
						.on('blur.styler', function() {
							selectbox.removeClass('focused');
						})
						// изменение селекта с клавиатуры
						.on('keydown.styler keyup.styler', function(e) {
							var liHeight = li.data('li-height');
							if (el.val() === '') {
								divText.text(selectPlaceholder).addClass('placeholder');
							} else {
								divText.text(option.filter(':selected').text());
							}
							li.removeClass('selected sel').not('.optgroup').eq(el[0].selectedIndex).addClass('selected sel');
							// вверх, влево, Page Up, Home
							if (e.which == 38 || e.which == 37 || e.which == 33 || e.which == 36) {
								if (el.val() === '') {
									ul.scrollTop(0);
								} else {
									ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top);
								}
							}
							// вниз, вправо, Page Down, End
							if (e.which == 40 || e.which == 39 || e.which == 34 || e.which == 35) {
								ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - ul.innerHeight() + liHeight);
							}
							// закрываем выпадающий список при нажатии Enter
							if (e.which == 13) {
								e.preventDefault();
								dropdown.hide();
								selectbox.removeClass('opened dropup dropdown');
								// колбек при закрытии селекта
								opt.onSelectClosed.call(selectbox);
							}
						}).on('keydown.styler', function(e) {
							// открываем выпадающий список при нажатии Space
							if (e.which == 32) {
								e.preventDefault();
								divSelect.click();
							}
						});
						// прячем выпадающий список при клике за пределами селекта
						if (!onDocumentClick.registered) {
							$(document).on('click', onDocumentClick);
							onDocumentClick.registered = true;
						}
					} // end doSelect()
					// мультиселект
					function doMultipleSelect() {
						var att = new Attributes();
						var selectbox =
							$('<div class="jq-select-multiple jqselect"></div>')
							.attr({
								id: att.id,
								title: att.title
							})
							.addClass(att.classes)
							.data(att.data)
						;
						el.after(selectbox);
						makeList();
						selectbox.append('<ul>' + list + '</ul>');
						var ul = $('ul', selectbox);
						var li = $('li', selectbox);
						var size = el.attr('size');
						var ulHeight = ul.outerHeight();
						var liHeight = li.outerHeight();
						if (size !== undefined && size > 0) {
							ul.css({'height': liHeight * size});
						} else {
							ul.css({'height': liHeight * 4});
						}
						if (ulHeight > selectbox.height()) {
							ul.css('overflowY', 'scroll');
							preventScrolling(ul);
							// прокручиваем до выбранного пункта
							if (li.filter('.selected').length) {
								ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top);
							}
						}
						// прячем оригинальный селект
						el.prependTo(selectbox);
						// если селект неактивный
						if (el.is(':disabled')) {
							selectbox.addClass('disabled');
							option.each(function() {
								if ($(this).is(':selected')) li.eq($(this).index()).addClass('selected');
							});
						// если селект активный
						} else {
							// при клике на пункт списка
							li.filter(':not(.disabled):not(.optgroup)').click(function(e) {
								el.focus();
								var clkd = $(this);
								if(!e.ctrlKey && !e.metaKey) clkd.addClass('selected');
								if(!e.shiftKey) clkd.addClass('first');
								if(!e.ctrlKey && !e.metaKey && !e.shiftKey) clkd.siblings().removeClass('selected first');
								// выделение пунктов при зажатом Ctrl
								if(e.ctrlKey || e.metaKey) {
									if (clkd.is('.selected')) clkd.removeClass('selected first');
										else clkd.addClass('selected first');
									clkd.siblings().removeClass('first');
								}
								// выделение пунктов при зажатом Shift
								if(e.shiftKey) {
									var prev = false,
											next = false;
									clkd.siblings().removeClass('selected').siblings('.first').addClass('selected');
									clkd.prevAll().each(function() {
										if ($(this).is('.first')) prev = true;
									});
									clkd.nextAll().each(function() {
										if ($(this).is('.first')) next = true;
									});
									if (prev) {
										clkd.prevAll().each(function() {
											if ($(this).is('.selected')) return false;
												else $(this).not('.disabled, .optgroup').addClass('selected');
										});
									}
									if (next) {
										clkd.nextAll().each(function() {
											if ($(this).is('.selected')) return false;
												else $(this).not('.disabled, .optgroup').addClass('selected');
										});
									}
									if (li.filter('.selected').length == 1) clkd.addClass('first');
								}
								// отмечаем выбранные мышью
								option.prop('selected', false);
								li.filter('.selected').each(function() {
									var t = $(this);
									var index = t.index();
									if (t.is('.option')) index -= t.prevAll('.optgroup').length;
									option.eq(index).prop('selected', true);
								});
								el.change();
							});
							// отмечаем выбранные с клавиатуры
							option.each(function(i) {
								$(this).data('optionIndex', i);
							});
							el.on('change.styler', function() {
								li.removeClass('selected');
								var arrIndexes = [];
								option.filter(':selected').each(function() {
									arrIndexes.push($(this).data('optionIndex'));
								});
								li.not('.optgroup').filter(function(i) {
									return $.inArray(i, arrIndexes) > -1;
								}).addClass('selected');
							})
							.on('focus.styler', function() {
								selectbox.addClass('focused');
							})
							.on('blur.styler', function() {
								selectbox.removeClass('focused');
							});
							// прокручиваем с клавиатуры
							if (ulHeight > selectbox.height()) {
								el.on('keydown.styler', function(e) {
									// вверх, влево, PageUp
									if (e.which == 38 || e.which == 37 || e.which == 33) {
										ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - liHeight);
									}
									// вниз, вправо, PageDown
									if (e.which == 40 || e.which == 39 || e.which == 34) {
										ul.scrollTop(ul.scrollTop() + li.filter('.selected:last').position().top - ul.innerHeight() + liHeight * 2);
									}
								});
							}
						}
					} // end doMultipleSelect()
					if (el.is('[multiple]')) {
						// если Android или iOS, то мультиселект не стилизуем
						// причина для Android - в стилизованном селекте нет возможности выбрать несколько пунктов
						// причина для iOS - в стилизованном селекте неправильно отображаются выбранные пункты
						if (Android || iOS) return;
						doMultipleSelect();
					} else {
						doSelect();
					}
				}; // end selectboxOutput()
				selectboxOutput();
				// обновление при динамическом изменении
				el.on('refresh', function() {
					el.off('.styler').parent().before(el).remove();
					selectboxOutput();
				});
			// end select
			// reset
			} else if (el.is(':reset')) {
				el.on('click', function() {
					setTimeout(function() {
						el.closest('form').find('input, select').trigger('refresh');
					}, 1);
				});
			} // end reset
		}, // init: function()
		// деструктор
		destroy: function() {
			var el = $(this.element);
			if (el.is(':checkbox') || el.is(':radio')) {
				el.removeData('_' + pluginName).off('.styler refresh').removeAttr('style').parent().before(el).remove();
				el.closest('label').add('label[for="' + el.attr('id') + '"]').off('.styler');
			} else if (el.is('input[type="number"]')) {
				el.removeData('_' + pluginName).off('.styler refresh').closest('.jq-number').before(el).remove();
			} else if (el.is(':file') || el.is('select')) {
				el.removeData('_' + pluginName).off('.styler refresh').removeAttr('style').parent().before(el).remove();
			}
		} // destroy: function()
	}; // Plugin.prototype
	$.fn[pluginName] = function(options) {
		var args = arguments;
		if (options === undefined || typeof options === 'object') {
			this.each(function() {
				if (!$.data(this, '_' + pluginName)) {
					$.data(this, '_' + pluginName, new Plugin(this, options));
				}
			})
			// колбек после выполнения плагина
			.promise()
			.done(function() {
				var opt = $(this[0]).data('_' + pluginName);
				if (opt) opt.options.onFormStyled.call();
			});
			return this;
		} else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
			var returns;
			this.each(function() {
				var instance = $.data(this, '_' + pluginName);
				if (instance instanceof Plugin && typeof instance[options] === 'function') {
					returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
				}
			});
			return returns !== undefined ? returns : this;
		}
	};
	// прячем выпадающий список при клике за пределами селекта
	function onDocumentClick(e) {
		// e.target.nodeName != 'OPTION' - добавлено для обхода бага в Opera на движке Presto
		// (при изменении селекта с клавиатуры срабатывает событие onclick)
		if (!$(e.target).parents().hasClass('jq-selectbox') && e.target.nodeName != 'OPTION') {
			if ($('div.jq-selectbox.opened').length) {
				var selectbox = $('div.jq-selectbox.opened'),
						search = $('div.jq-selectbox__search input', selectbox),
						dropdown = $('div.jq-selectbox__dropdown', selectbox),
						opt = selectbox.find('select').data('_' + pluginName).options;
				// колбек при закрытии селекта
				opt.onSelectClosed.call(selectbox);
				if (search.length) search.val('').keyup();
				dropdown.hide().find('li.sel').addClass('selected');
				selectbox.removeClass('focused opened dropup dropdown');
			}
		}
	}
	onDocumentClick.registered = false;
}));/*! flip - v1.1.2 - 2016-10-20* https://github.com/nnattawat/flip* Copyright (c) 2016 Nattawat Nonsung; Licensed MIT */!function(a){var b=function(){var a,b=document.createElement("fakeelement"),c={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(a in c)if(void 0!==b.style[a])return c[a]},c=function(b,c,d){this.setting={axis:"y",reverse:!1,trigger:"click",speed:500,forceHeight:!1,forceWidth:!1,autoSize:!0,front:".front",back:".back"},this.setting=a.extend(this.setting,c),"string"!=typeof c.axis||"x"!==c.axis.toLowerCase()&&"y"!==c.axis.toLowerCase()||(this.setting.axis=c.axis.toLowerCase()),"boolean"==typeof c.reverse&&(this.setting.reverse=c.reverse),"string"==typeof c.trigger&&(this.setting.trigger=c.trigger.toLowerCase());var e=parseInt(c.speed);isNaN(e)||(this.setting.speed=e),"boolean"==typeof c.forceHeight&&(this.setting.forceHeight=c.forceHeight),"boolean"==typeof c.forceWidth&&(this.setting.forceWidth=c.forceWidth),"boolean"==typeof c.autoSize&&(this.setting.autoSize=c.autoSize),("string"==typeof c.front||c.front instanceof a)&&(this.setting.front=c.front),("string"==typeof c.back||c.back instanceof a)&&(this.setting.back=c.back),this.element=b,this.frontElement=this.getFrontElement(),this.backElement=this.getBackElement(),this.isFlipped=!1,this.init(d)};a.extend(c.prototype,{flipDone:function(a){var c=this;c.element.one(b(),function(){c.element.trigger("flip:done"),"function"==typeof a&&a.call(c.element)})},flip:function(a){if(!this.isFlipped){this.isFlipped=!0;var b="rotate"+this.setting.axis;this.frontElement.css({transform:b+(this.setting.reverse?"(-180deg)":"(180deg)"),"z-index":"0"}),this.backElement.css({transform:b+"(0deg)","z-index":"1"}),this.flipDone(a)}},unflip:function(a){if(this.isFlipped){this.isFlipped=!1;var b="rotate"+this.setting.axis;this.frontElement.css({transform:b+"(0deg)","z-index":"1"}),this.backElement.css({transform:b+(this.setting.reverse?"(180deg)":"(-180deg)"),"z-index":"0"}),this.flipDone(a)}},getFrontElement:function(){return this.setting.front instanceof a?this.setting.front:this.element.find(this.setting.front)},getBackElement:function(){return this.setting.back instanceof a?this.setting.back:this.element.find(this.setting.back)},init:function(a){var b=this,c=b.frontElement.add(b.backElement),d="rotate"+b.setting.axis,e=2*b.element["outer"+("rotatex"===d?"Height":"Width")](),f={perspective:e,position:"relative"},g={transform:d+"("+(b.setting.reverse?"180deg":"-180deg")+")","z-index":"0",position:"relative"},h={"backface-visibility":"hidden","transform-style":"preserve-3d",position:"absolute","z-index":"1"};b.setting.forceHeight?c.outerHeight(b.element.height()):b.setting.autoSize&&(h.height="100%"),b.setting.forceWidth?c.outerWidth(b.element.width()):b.setting.autoSize&&(h.width="100%"),(window.chrome||window.Intl&&Intl.v8BreakIterator)&&"CSS"in window&&(f["-webkit-transform-style"]="preserve-3d"),c.css(h).find("*").css({"backface-visibility":"hidden"}),b.element.css(f),b.backElement.css(g),setTimeout(function(){var d=b.setting.speed/1e3||.5;c.css({transition:"all "+d+"s ease-out"}),"function"==typeof a&&a.call(b.element)},20),b.attachEvents()},clickHandler:function(b){b||(b=window.event),this.element.find(a(b.target).closest('button, a, input[type="submit"]')).length||(this.isFlipped?this.unflip():this.flip())},hoverHandler:function(){var b=this;b.element.off("mouseleave.flip"),b.flip(),setTimeout(function(){b.element.on("mouseleave.flip",a.proxy(b.unflip,b)),b.element.is(":hover")||b.unflip()},b.setting.speed+150)},attachEvents:function(){var b=this;"click"===b.setting.trigger?b.element.on(a.fn.tap?"tap.flip":"click.flip",a.proxy(b.clickHandler,b)):"hover"===b.setting.trigger&&(b.element.on("mouseenter.flip",a.proxy(b.hoverHandler,b)),b.element.on("mouseleave.flip",a.proxy(b.unflip,b)))},flipChanged:function(a){this.element.trigger("flip:change"),"function"==typeof a&&a.call(this.element)},changeSettings:function(a,b){var c=this,d=!1;if(void 0!==a.axis&&c.setting.axis!==a.axis.toLowerCase()&&(c.setting.axis=a.axis.toLowerCase(),d=!0),void 0!==a.reverse&&c.setting.reverse!==a.reverse&&(c.setting.reverse=a.reverse,d=!0),d){var e=c.frontElement.add(c.backElement),f=e.css(["transition-property","transition-timing-function","transition-duration","transition-delay"]);e.css({transition:"none"});var g="rotate"+c.setting.axis;c.isFlipped?c.frontElement.css({transform:g+(c.setting.reverse?"(-180deg)":"(180deg)"),"z-index":"0"}):c.backElement.css({transform:g+(c.setting.reverse?"(180deg)":"(-180deg)"),"z-index":"0"}),setTimeout(function(){e.css(f),c.flipChanged(b)},0)}else c.flipChanged(b)}}),a.fn.flip=function(b,d){return"function"==typeof b&&(d=b),"string"==typeof b||"boolean"==typeof b?this.each(function(){var c=a(this).data("flip-model");"toggle"===b&&(b=!c.isFlipped),b?c.flip(d):c.unflip(d)}):this.each(function(){if(a(this).data("flip-model")){var e=a(this).data("flip-model");!b||void 0===b.axis&&void 0===b.reverse||e.changeSettings(b,d)}else a(this).data("flip-model",new c(a(this),b||{},d))}),this}}(jQuery);//# sourceMappingURL=jquery.flip.min.js.map/*
 jQuery Masked Input Plugin
 Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
 Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
 Version: 1.4.1
 */
!function(factory) {
    "function" == typeof define && define.amd ? define([ "jquery" ], factory) : factory("object" == typeof exports ? require("jquery") : jQuery);
}(function($) {
    var caretTimeoutId, ua = navigator.userAgent, iPhone = /iphone/i.test(ua), chrome = /chrome/i.test(ua), android = /android/i.test(ua);
    $.mask = {
        definitions: {
            "n": "[0-9]",
            a: "[A-Za-z]",
            "*": "[A-Za-z0-9]"
        },
        autoclear: !0,
        dataName: "rawMaskFn",
        placeholder: "_"
    }, $.fn.extend({
        caret: function(begin, end) {
            var range;
            if (0 !== this.length && !this.is(":hidden")) return "number" == typeof begin ? (end = "number" == typeof end ? end : begin,
                this.each(function() {
                    this.setSelectionRange ? this.setSelectionRange(begin, end) : this.createTextRange && (range = this.createTextRange(),
                            range.collapse(!0), range.moveEnd("character", end), range.moveStart("character", begin),
                            range.select());
                })) : (this[0].setSelectionRange ? (begin = this[0].selectionStart, end = this[0].selectionEnd) : document.selection && document.selection.createRange && (range = document.selection.createRange(),
                    begin = 0 - range.duplicate().moveStart("character", -1e5), end = begin + range.text.length),
                {
                    begin: begin,
                    end: end
                });
        },
        unmask: function() {
            return this.trigger("unmask");
        },
        mask: function(mask, settings) {
            var input, defs, tests, partialPosition, firstNonMaskPos, lastRequiredNonMaskPos, len, oldVal;
            if (!mask && this.length > 0) {
                input = $(this[0]);
                var fn = input.data($.mask.dataName);
                return fn ? fn() : void 0;
            }
            return settings = $.extend({
                autoclear: $.mask.autoclear,
                placeholder: $.mask.placeholder,
                completed: null
            }, settings), defs = $.mask.definitions, tests = [], partialPosition = len = mask.length,
                firstNonMaskPos = null, $.each(mask.split(""), function(i, c) {
                "?" == c ? (len--, partialPosition = i) : defs[c] ? (tests.push(new RegExp(defs[c])),
                null === firstNonMaskPos && (firstNonMaskPos = tests.length - 1), partialPosition > i && (lastRequiredNonMaskPos = tests.length - 1)) : tests.push(null);
            }), this.trigger("unmask").each(function() {
                function tryFireCompleted() {
                    if (settings.completed) {
                        for (var i = firstNonMaskPos; lastRequiredNonMaskPos >= i; i++) if (tests[i] && buffer[i] === getPlaceholder(i)) return;
                        settings.completed.call(input);
                    }
                }
                function getPlaceholder(i) {
                    return settings.placeholder.charAt(i < settings.placeholder.length ? i : 0);
                }
                function seekNext(pos) {
                    for (;++pos < len && !tests[pos]; ) ;
                    return pos;
                }
                function seekPrev(pos) {
                    for (;--pos >= 0 && !tests[pos]; ) ;
                    return pos;
                }
                function shiftL(begin, end) {
                    var i, j;
                    if (!(0 > begin)) {
                        for (i = begin, j = seekNext(end); len > i; i++) if (tests[i]) {
                            if (!(len > j && tests[i].test(buffer[j]))) break;
                            buffer[i] = buffer[j], buffer[j] = getPlaceholder(j), j = seekNext(j);
                        }
                        writeBuffer(), input.caret(Math.max(firstNonMaskPos, begin));
                    }
                }
                function shiftR(pos) {
                    var i, c, j, t;
                    for (i = pos, c = getPlaceholder(pos); len > i; i++) if (tests[i]) {
                        if (j = seekNext(i), t = buffer[i], buffer[i] = c, !(len > j && tests[j].test(t))) break;
                        c = t;
                    }
                }
                function androidInputEvent() {
                    var curVal = input.val(), pos = input.caret();
                    if (oldVal && oldVal.length && oldVal.length > curVal.length) {
                        for (checkVal(!0); pos.begin > 0 && !tests[pos.begin - 1]; ) pos.begin--;
                        if (0 === pos.begin) for (;pos.begin < firstNonMaskPos && !tests[pos.begin]; ) pos.begin++;
                        input.caret(pos.begin, pos.begin);
                    } else {
                        for (checkVal(!0); pos.begin < len && !tests[pos.begin]; ) pos.begin++;
                        input.caret(pos.begin, pos.begin);
                    }
                    tryFireCompleted();
                }
                function blurEvent() {
                    checkVal(), input.val() != focusText && input.change();
                }
                function keydownEvent(e) {
                    if (!input.prop("readonly")) {
                        var pos, begin, end, k = e.which || e.keyCode;
                        oldVal = input.val(), 8 === k || 46 === k || iPhone && 127 === k ? (pos = input.caret(),
                            begin = pos.begin, end = pos.end, end - begin === 0 && (begin = 46 !== k ? seekPrev(begin) : end = seekNext(begin - 1),
                            end = 46 === k ? seekNext(end) : end), clearBuffer(begin, end), shiftL(begin, end - 1),
                            e.preventDefault()) : 13 === k ? blurEvent.call(this, e) : 27 === k && (input.val(focusText),
                                input.caret(0, checkVal()), e.preventDefault());
                    }
                }
                function keypressEvent(e) {
                    if (!input.prop("readonly")) {
                        var p, c, next, k = e.which || e.keyCode, pos = input.caret();
                        if (!(e.ctrlKey || e.altKey || e.metaKey || 32 > k) && k && 13 !== k) {
                            if (pos.end - pos.begin !== 0 && (clearBuffer(pos.begin, pos.end), shiftL(pos.begin, pos.end - 1)),
                                    p = seekNext(pos.begin - 1), len > p && (c = String.fromCharCode(k), tests[p].test(c))) {
                                if (shiftR(p), buffer[p] = c, writeBuffer(), next = seekNext(p), android) {
                                    var proxy = function() {
                                        $.proxy($.fn.caret, input, next)();
                                    };
                                    setTimeout(proxy, 0);
                                } else input.caret(next);
                                pos.begin <= lastRequiredNonMaskPos && tryFireCompleted();
                            }
                            e.preventDefault();
                        }
                    }
                }
                function clearBuffer(start, end) {
                    var i;
                    for (i = start; end > i && len > i; i++) tests[i] && (buffer[i] = getPlaceholder(i));
                }
                function writeBuffer() {
                    input.val(buffer.join(""));
                }
                function checkVal(allow) {
                    var i, c, pos, test = input.val(), lastMatch = -1;
                    for (i = 0, pos = 0; len > i; i++) if (tests[i]) {
                        for (buffer[i] = getPlaceholder(i); pos++ < test.length; ) if (c = test.charAt(pos - 1),
                                tests[i].test(c)) {
                            buffer[i] = c, lastMatch = i;
                            break;
                        }
                        if (pos > test.length) {
                            clearBuffer(i + 1, len);
                            break;
                        }
                    } else buffer[i] === test.charAt(pos) && pos++, partialPosition > i && (lastMatch = i);
                    return allow ? writeBuffer() : partialPosition > lastMatch + 1 ? settings.autoclear || buffer.join("") === defaultBuffer ? (input.val() && input.val(""),
                        clearBuffer(0, len)) : writeBuffer() : (writeBuffer(), input.val(input.val().substring(0, lastMatch + 1))),
                        partialPosition ? i : firstNonMaskPos;
                }
                var input = $(this), buffer = $.map(mask.split(""), function(c, i) {
                    return "?" != c ? defs[c] ? getPlaceholder(i) : c : void 0;
                }), defaultBuffer = buffer.join(""), focusText = input.val();
                input.data($.mask.dataName, function() {
                    return $.map(buffer, function(c, i) {
                        return tests[i] && c != getPlaceholder(i) ? c : null;
                    }).join("");
                }), input.one("unmask", function() {
                    input.off(".mask").removeData($.mask.dataName);
                }).on("focus.mask", function() {
                    if (!input.prop("readonly")) {
                        clearTimeout(caretTimeoutId);
                        var pos;
                        focusText = input.val(), pos = checkVal(), caretTimeoutId = setTimeout(function() {
                            input.get(0) === document.activeElement && (writeBuffer(), pos == mask.replace("?", "").length ? input.caret(0, pos) : input.caret(pos));
                        }, 10);
                    }
                }).on("blur.mask", blurEvent).on("keydown.mask", keydownEvent).on("keypress.mask", keypressEvent).on("input.mask paste.mask", function() {
                    input.prop("readonly") || setTimeout(function() {
                        var pos = checkVal(!0);
                        input.caret(pos), tryFireCompleted();
                    }, 0);
                }), chrome && android && input.off("input.mask").on("input.mask", androidInputEvent),
                    checkVal();
            });
        }
    });
});var toast = $('.js-toast');
var toastClose = $('.js-toast-close');
if (toast.length) {
    var close = function (targetToast) {
        targetToast.slideUp(400);
    };
    var open = function (targetToast) {
        targetToast.slideDown(400);
    };
    toastClose.on('click', function () {
        close($(this).closest('.js-toast'));
    });
    //other toast functions
    if($('.auth').length) {
        $('.js-auth-tel-validator').parsley().on('field:error', function () {
            open($('#errorMessage').closest('.js-toast'))
        });
        $('.js-auth-tel-validator').parsley().on('field:success', function () {
            close($('#errorMessage').closest('.js-toast'))
        });
        $('.js-auth-tel-code-validator').parsley().on('field:error', function () {
            open($('#errorMessage').closest('.js-toast'))
        });
        $('.js-auth-tel-code-validator').parsley().on('field:success', function () {
            close($('#errorMessage').closest('.js-toast'));
        });
    }
}
