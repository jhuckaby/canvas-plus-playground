// SpeechBubble Utilities

function timeNow(floor) {
	// return current epoch time
	var epoch = (new Date()).getTime() / 1000;
	return floor ? Math.floor(epoch) : epoch;
};

function generateUniqueID(len, salt) {
	// Get unique ID using MD5, hires time, pseudo-random number and static counter.
	if (this.__unique_id_counter) this.__unique_id_counter = 0;
	this.__unique_id_counter++;
	return hex_md5( '' + timeNow() + Math.random() + this.__unique_id_counter + (salt || '') ).substring(0, len || 32);
};

// Sets the value of a custom CSS variable at the document level.
var setDocumentVariable = function(propertyName, value) {
	if (!propertyName.match(/^\-\-/)) propertyName = '--' + propertyName;
 	document.documentElement.style.setProperty(propertyName, value);
};

function placeCaretAtEnd(el) {
	// move caret to end of contentEditable element
	el.focus();
	
	// need DOM element, not jQuery wrapper, from this point on
	if (el.jquery) el = el[0];
	
	var range = document.createRange();
	range.selectNodeContents(el);
	range.collapse(false);
	
	var sel = window.getSelection();
	sel.removeAllRanges();
	sel.addRange(range);
};

function isCaretAtStart(el) {
	// return true if insertion caret is located at the start of the specified element, false otherwise
	if (el.jquery) el = el[0];
	var sel = window.getSelection();
	if (sel.rangeCount) {
		var range = sel.getRangeAt(0);
		
		if (range && range.collapsed && range.startContainer && range.endContainer) {
			var preCaretRange = range.cloneRange();
			preCaretRange.selectNodeContents(el);
			preCaretRange.setEnd(range.endContainer, range.endOffset);
			
			var offset = preCaretRange.toString().length;
			if (offset == 0) return true; // yes!
		} // range
	} // rangeCount
	
	return false;
};

function isCaretAtEnd(el) {
	// return true if insertion caret is located at the end of the specified element, false otherwise
	if (el.jquery) el = el[0];
	var sel = window.getSelection();
	if (sel.rangeCount) {
		var range = sel.getRangeAt(0);
		
		if (range && range.collapsed && range.startContainer && range.endContainer) {
			var postCaretRange = range.cloneRange();
			postCaretRange.selectNodeContents(el);
			postCaretRange.setStart(range.startContainer, range.startOffset);
			
			var offset = postCaretRange.toString().length;
			if (offset == 0) return true; // yes!
		} // range
	} // rangeCount
	
	return false;
};

function findClosestSiblingWithClass($elem, dir, class_name) {
	// find closest sibling above or below with given class
	// dir should be 'next' or 'prev'
	if (!$elem.jquery) $elem = $($elem);
	
	while (true) {
		$elem = $elem[dir]();
		if (!$elem || !$elem.length) return false;
		if ($elem.hasClass(class_name)) return $elem;
	}
};

function isTextAreaFocused() {
	// returns true if a textarea is currently focused, false otherwise
	var elem = document.activeElement;
	return elem ? ($(elem).attr('type') == 'textarea') : false;
};

function buildRegExpFromCSV(csv, flags) {
	// build regexp to match any CSV value, or "never match" if empty/false
	if (csv) {
		return new RegExp(
			"\\b(" + csv.split(/\,\s*/).map( function(str) {
				return escapeRegExp(str);
			} ).join('|') + ")\\b", flags || ''
		);
	}
	else {
		return new RegExp('(?!)'); // always fail to match, no matter what
	}
};

function findTextNodeWithRegexp($elem, regex) {
	// walk dom looking for text nodes, and return first one that matches regex
	if (!$elem.jquery) $elem = $($elem);
	var nodes = $elem.contents();
	
	for (var idx = 0, len = nodes.length; idx < len; idx++) {
		var node = nodes[idx];
		if (node.nodeType == Node.TEXT_NODE) {
			if (node.nodeValue.match(regex)) return node;
		}
		else if (node.nodeType == Node.ELEMENT_NODE) {
			var result = findTextNodeWithRegexp(node, regex);
			if (result) return result;
		}
	}
	
	return false;
};

// Debounce Function Generator
// Fires once immediately, then never again until freq ms
function debounce(func, freq) {
	var timeout = null;
	var requestFire = false;
	
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (requestFire) {
				func.apply(context, args);
				requestFire = false;
			}
		};
		if (!timeout) {
			func.apply(context, args);
			timeout = setTimeout(later, freq);
			requestFire = false;
		}
		else {
			requestFire = true;
		}
	};
};

function htmlToText(html, decode_emoji) {
	// convert HTML to text, mainly for inline code snippets
	var text = html;
	if (decode_emoji) {
		text = text.replace(/<img[^>]*?data\-emoji\=\"([\w\-\+]+)\"[^>]+>/g, ':$1:');
	}
	text = text.replace(/<(\/p|\/div|\/h\d|br)\w?\/?>/ig, "\n");
	text = text.replace(/<[A-Za-z\/][^<>]*>/ig, "");
	text = text.replace(/\n{3,}/g, "\n\n");
	text = decodeEntities(text).trim();
	return text;
};

function decodeEntities(text) {
	// Decode XML entities into raw ASCII
	if (text == null) return '';

	if (text && text.replace) {
		text = text.replace(/\&lt\;/g, "<");
		text = text.replace(/\&gt\;/g, ">");
		text = text.replace(/\&quot\;/g, '"');
		text = text.replace(/\&apos\;/g, "'");
		text = text.replace(/\&nbsp\;/g, " ");
		text = text.replace(/\&amp\;/g, "&"); // MUST BE LAST
	}

	return text;
};

function encodeEntities(text) {
	// Simple entitize function for composing XML
	if (text == null) return '';

	if (text && text.replace) {
		text = text.replace(/\&/g, "&amp;"); // MUST BE FIRST
		text = text.replace(/</g, "&lt;");
		text = text.replace(/>/g, "&gt;");
	}

	return text;
};

function encodeAttribEntities(text) {
	// Simple entitize function for composing XML attributes
	if (text == null) return '';
	if (text && text.replace) {
		text = text.replace(/\&/g, "&amp;"); // MUST BE FIRST
		text = text.replace(/</g, "&lt;");
		text = text.replace(/>/g, "&gt;");
		text = text.replace(/\"/g, "&quot;");
		text = text.replace(/\'/g, "&apos;");
	}
	return text;
};

function escapeRegExp(text) {
	// escape text for regular expression
	return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

function toTitleCase(str) {
	return str.toLowerCase().replace(/\b\w/g, function (txt) { return txt.toUpperCase(); });
};

function metricsFloat(value) {
	// int if >= 1, otherwise limit to 2 decimal digits
	return (value >= 1) ? Math.floor(value) : shortFloat(value);
};

function shortFloat(value) {
	// Shorten floating-point decimal to 2 places, unless they are zeros.
	if (!value) value = 0;
	return parseFloat( value.toString().replace(/^(\-?\d+\.[0]*\d{2}).*$/, '$1') );
};

function parseQueryString(url) {
	// parse query string into key/value pairs and return as object
	// dupe query params become array
	var query = {}; 
	
	url.replace(/^.*\?/, '').replace(/([^\=]+)\=([^\&]*)\&?/g, function(match, key, value) {
		var value = decodeURIComponent(value);
		if (value.match(/^\-?\d+$/)) value = parseInt(value);
		else if (value.match(/^\-?\d*\.\d+$/)) value = parseFloat(value);
		if (key in query) {
			if (isaArray(query[key])) query[key].push( value );
			else query[key] = [ query[key], value ];
		}
		else query[key] = value;
		return '';
	} );
	
	return query; 
};

function composeQueryString(queryObj) {
	// compose key/value pairs into query string
	// supports duplicate keys (i.e. arrays)
	// Note: DOES NOT encode slashes in query values
	var qs = '';
	for (var key in queryObj) {
		var value = queryObj[key];
		if (!isaArray(value)) value = [value];
		for (var idx = 0, len = value.length; idx < len; idx++) {
			qs += (qs.length ? '&' : '?') + encodeURIComponent(key) + '=' + encodeURIComponent(value[idx]).replace(/\%2F/g, '/');
		}
	}
	return qs;
};

function trim(text) {
	// strip whitespace from beginning and end of string
	if (text == null) return '';
	
	if (text && text.replace) {
		text = text.replace(/^\s+/, "");
		text = text.replace(/\s+$/, "");
	}
	
	return text;
};

function findObjectsIdx(arr, crit, max) {
	// find idx of all objects that match crit keys/values
	var idxs = [];
	var num_crit = 0;
	for (var a in crit) num_crit++;
	
	for (var idx = 0, len = arr.length; idx < len; idx++) {
		var matches = 0;
		for (var key in crit) {
			if (arr[idx][key] == crit[key]) matches++;
		}
		if (matches == num_crit) {
			idxs.push(idx);
			if (max && (idxs.length >= max)) return idxs;
		}
	} // foreach elem
	
	return idxs;
};

function findObjectIdx(arr, crit) {
	// find idx of first matched object, or -1 if not found
	var idxs = findObjectsIdx(arr, crit, 1);
	return idxs.length ? idxs[0] : -1;
};

function findObject(arr, crit) {
	// return first found object matching crit keys/values, or null if not found
	var idx = findObjectIdx(arr, crit);
	return (idx > -1) ? arr[idx] : null;
};

function findObjects(arr, crit) {
	// find and return all objects that match crit keys/values
	var idxs = findObjectsIdx(arr, crit);
	var objs = [];
	for (var idx = 0, len = idxs.length; idx < len; idx++) {
		objs.push( arr[idxs[idx]] );
	}
	return objs;
};

function deleteObject(arr, crit) {
	// walk array looking for nested object matching criteria object
	// delete first object found
	var idx = findObjectIdx(arr, crit);
	if (idx > -1) {
		arr.splice( idx, 1 );
		return true;
	}
	return false;
};

function numKeys(hash) {
	// count keys in hash
	// Object.keys(hash).length may be faster, but this uses far less memory
	var count = 0;
	for (var key in hash) { count++; }
	return count;
};

function firstKey(hash) {
	// return first key in hash (key order is undefined)
	for (var key in hash) return key;
	return null; // no keys in hash
};

function hashKeysToArray(hash) {
	// convert hash keys to array (discard values)
	var arr = [];
	for (var key in hash) arr.push(key);
	return arr;
};

function hashValuesToArray(hash) {
	// convert hash values to array (discard keys)
	var arr = [];
	for (var key in hash) arr.push( hash[key] );
	return arr;
};

function isaHash(arg) {
	// determine if arg is a hash or hash-like
	return( !!arg && (typeof(arg) == 'object') && (typeof(arg.length) == 'undefined') );
};

function isaArray(arg) {
	// determine if arg is an array or is array-like
	return( !!arg && (typeof(arg) == 'object') && (typeof(arg.length) != 'undefined') );
};

function copyHash(hash, deep) {
	// copy hash to new one, with optional deep mode (uses JSON)
	if (deep) {
		// deep copy
		return JSON.parse( JSON.stringify(hash) );
	}
	else {
		// shallow copy
		var output = {};
		for (var key in hash) {
			output[key] = hash[key];
		}
		return output;
	}
};

function copyHashRemoveKeys(hash, remove) {
	// shallow copy hash, excluding some keys
	var output = {};
	for (var key in hash) {
		if (!remove[key]) output[key] = hash[key];
	}
	return output;
};

function mergeHashes(a, b) {
	// shallow-merge keys from a and b into c and return c
	// b has precedence over a
	if (!a) a = {};
	if (!b) b = {};
	var c = {};
	
	for (var key in a) c[key] = a[key];
	for (var key in b) c[key] = b[key];
	
	return c;
};

function mergeHashInto(a, b) {
	// shallow-merge keys from b into a
	for (var key in b) a[key] = b[key];
};

function dirname(path) {
	// return path excluding file at end (same as POSIX function of same name)
	return path.toString().replace(/\/$/, "").replace(/\/[^\/]+$/, "");
};

function basename(path) {
	// return filename, strip path (same as POSIX function of same name)
	return path.toString().replace(/\/$/, "").replace(/^(.*)\/([^\/]+)$/, "$2");
};

var month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var weekday_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function getDateArgs(thingy) {
	// return hash containing year, mon, mday, hour, min, sec
	// given epoch seconds, date object or date string
	var date = (typeof(thingy) == 'object') ? thingy : (new Date( (typeof(thingy) == 'number') ? (thingy * 1000) : thingy ));
	var args = {
		epoch: Math.floor( date.getTime() / 1000 ),
		year: date.getFullYear(),
		mon: date.getMonth() + 1,
		mday: date.getDate(),
		wday: date.getDay(),
		hour: date.getHours(),
		min: date.getMinutes(),
		sec: date.getSeconds(),
		msec: date.getMilliseconds(),
		offset: 0 - (date.getTimezoneOffset() / 60)
	};
	
	args.yyyy = '' + args.year;
	if (args.mon < 10) args.mm = "0" + args.mon; else args.mm = '' + args.mon;
	if (args.mday < 10) args.dd = "0" + args.mday; else args.dd = '' + args.mday;
	if (args.hour < 10) args.hh = "0" + args.hour; else args.hh = '' + args.hour;
	if (args.min < 10) args.mi = "0" + args.min; else args.mi = '' + args.min;
	if (args.sec < 10) args.ss = "0" + args.sec; else args.ss = '' + args.sec;
	
	if (args.hour >= 12) {
		args.ampm = 'pm';
		args.hour12 = args.hour - 12;
		if (!args.hour12) args.hour12 = 12;
	}
	else {
		args.ampm = 'am';
		args.hour12 = args.hour;
		if (!args.hour12) args.hour12 = 12;
	}
	
	args.yyyy_mm_dd = args.yyyy + '/' + args.mm + '/' + args.dd;
	args.hh_mi_ss = args.hh + ':' + args.mi + ':' + args.ss;
	args.tz = 'GMT' + (args.offset >= 0 ? '+' : '') + args.offset;
	args.month = month_names[ args.mon - 1 ];
	args.weekday = weekday_names[ args.wday ];
	
	return args;
};

function lookupPath(path, obj) {
	// walk through object tree, psuedo-XPath-style
	// supports arrays as well as objects
	// return final object or value
	// always start query with a slash, i.e. /something/or/other
	path = path.replace(/\/$/, ""); // strip trailing slash
	
	while (/\/[^\/]+/.test(path) && (typeof(obj) == 'object')) {
		// find first slash and strip everything up to and including it
		var slash = path.indexOf('/');
		path = path.substring( slash + 1 );
		
		// find next slash (or end of string) and get branch name
		slash = path.indexOf('/');
		if (slash == -1) slash = path.length;
		var name = path.substring(0, slash);

		// advance obj using branch
		if ((typeof(obj.length) == 'undefined') || name.match(/\D/)) {
			// obj is probably a hash
			if (typeof(obj[name]) != 'undefined') obj = obj[name];
			else return null;
		}
		else {
			// obj is array
			var idx = parseInt(name, 10);
			if (isNaN(idx)) return null;
			if (typeof(obj[idx]) != 'undefined') obj = obj[idx];
			else return null;
		}

	} // while path contains branch

	return obj;
};

function substitute(text, args, fatal) {
	// perform simple [placeholder] substitution using supplied
	// args object (or eval) and return transformed text
	if (typeof(text) == 'undefined') text = '';
	text = '' + text;
	if (!args) args = {};
	
	while (text.indexOf('[') > -1) {
		var open_bracket = text.indexOf('[');
		var close_bracket = text.indexOf(']');
		
		var before = text.substring(0, open_bracket);
		var after = text.substring(close_bracket + 1, text.length);
		
		var name = text.substring( open_bracket + 1, close_bracket );
		var value = '';
		
		if (name.indexOf('/') == 0) {
			value = lookupPath(name, args);
			if (value === null) {
				if (fatal) return null;
				else value = '__APLB__' + name + '__APRB__';
			}
		}
		else if (typeof(args[name]) != 'undefined') value = args[name];
		else {
			if (fatal) return null;
			else value = '__APLB__' + name + '__APRB__';
		}
		
		text = before + value + after;
	} // while text contains [
	
	return text.replace(/__APLB__/g, '[').replace(/__APRB__/g, ']');
};

function getTextFromBytes(bytes, precision) {
	// convert raw bytes to english-readable format
	// set precision to 1 for ints, 10 for 1 decimal point (default), 100 for 2, etc.
	bytes = Math.floor(bytes);
	if (!precision) precision = 10;
	
	if (bytes >= 1024) {
		bytes = Math.floor( (bytes / 1024) * precision ) / precision;
		if (bytes >= 1024) {
			bytes = Math.floor( (bytes / 1024) * precision ) / precision;
			if (bytes >= 1024) {
				bytes = Math.floor( (bytes / 1024) * precision ) / precision;
				if (bytes >= 1024) {
					bytes = Math.floor( (bytes / 1024) * precision ) / precision;
					return bytes + ' TB';
				} 
				else return bytes + ' GB';
			} 
			else return bytes + ' MB';
		}
		else return bytes + ' K';
	}
	else return bytes + pluralize(' byte', bytes);
};

function pluralize(word, num) {
	// apply english pluralization to word if 'num' is not equal to 1
	if (num != 1) {
		return word.replace(/y$/, 'ie') + 's';
	}
	else return word;
};

function getInnerWindowSize(dom) {
	// get size of inner window
	if (!dom) dom = window;
	var myWidth = 0, myHeight = 0;
	
	if( typeof( dom.innerWidth ) == 'number' ) {
		// Non-IE
		myWidth = dom.innerWidth;
		myHeight = dom.innerHeight;
	}
	else if( dom.document.documentElement && ( dom.document.documentElement.clientWidth || dom.document.documentElement.clientHeight ) ) {
		// IE 6+ in 'standards compliant mode'
		myWidth = dom.document.documentElement.clientWidth;
		myHeight = dom.document.documentElement.clientHeight;
	}
	else if( dom.document.body && ( dom.document.body.clientWidth || dom.document.body.clientHeight ) ) {
		// IE 4 compatible
		myWidth = dom.document.body.clientWidth;
		myHeight = dom.document.body.clientHeight;
	}
	return { width: myWidth, height: myHeight };
};

function parseColor(color) {
	// parse rgb(), rgba() or #hex
	color = ('' + color).toLowerCase();
	
	if (color.match(/^\#?([0-9a-f]{6})$/)) {
		var hex = RegExp.$1;
		return {
			r: parseInt(hex.substring(0, 2), 16),
			g: parseInt(hex.substring(2, 4), 16),
			b: parseInt(hex.substring(4, 6), 16),
			a: 255
		};
	}
	else if (color.match(/^\#?([0-9a-f]{3})$/)) {
		var hex = RegExp.$1;
		return {
			r: parseInt(hex.substring(0, 1) + hex.substring(0, 1), 16),
			g: parseInt(hex.substring(1, 2) + hex.substring(1, 2), 16),
			b: parseInt(hex.substring(2, 3) + hex.substring(2, 3), 16),
			a: 255
		};
	}
	else if (color.match(/^rgba\(([\d\,\.\s]+)\)$/)) {
		var csv = RegExp.$1;
		var parts = csv.split(/\,\s*/);
		return {
			r: Math.min(255, parseInt( parts[0] || 0 )),
			g: Math.min(255, parseInt( parts[1] || 0 )),
			b: Math.min(255, parseInt( parts[2] || 0 )),
			a: Math.min(255, Math.floor( parseFloat( parts[3] || 0 ) * 255 ))
		};
	}
	else if (color.match(/^rgb\(([\d\,\.\s]+)\)$/)) {
		var csv = RegExp.$1;
		var parts = csv.split(/\,\s*/);
		return {
			r: Math.min(255, parseInt( parts[0] || 0 )),
			g: Math.min(255, parseInt( parts[1] || 0 )),
			b: Math.min(255, parseInt( parts[2] || 0 )),
			a: 255
		};
	}
	else {
		return { r:0, g:0, b:0, a:255 };
	}
};

function zeroPad(value, len) {
	// Pad a number with zeroes to achieve a desired total length (max 10)
	return ('0000000000' + value).slice(0 - len);
};

function stripHigh(str) {
	// strip all high-ascii and unicode characters from string
	return str.toString().replace(/([\x80-\xFF\x00-\x08\x0B-\x0C\x0E-\x1F\u00FF-\uFFFF])/g, "");
};

function freeze(obj) {
	// pack object into serialized string, as small as possible, preserving unicode, base64 output
	var str = JSON.stringify(obj);
	
	// pre-encode tilde chars, as they will be our unicode control char
	str = str.replace(/\~/g, '~7E');
	
	// now encode all high-ascii / unicode to hex using tilde prefix
	str = str.replace(/([\x80-\xFF\x00-\x08\x0B-\x0C\x0E-\x1F\u00FF-\uFFFF]+)/g, function(m_all, m_g1) {
		return encodeURIComponent(m_g1).replace(/\%/g, '~');
	});
	
	// finally, base-64 the whole thing
	return btoa(str);
};

function defrost(b64) {
	// unpack and decode base-64 frozen string, return original object
	var str = atob(b64);
	
	// decode special tilde-hex syntax for high-ascii (and natural tildes)
	str = str.replace(/(\~[0-9A-F\~]+)/g, function(m_all, m_g1) {
		return decodeURIComponent( m_g1.replace(/\~/g, '%') );
	});
	
	// finally, parse JSON back into object
	return JSON.parse(str);
};

// Math polyfills
if (!Math.clamp) Math.clamp = function(val, min, max) {
	return Math.max(min, Math.min(max, val));
};
if (!Math.average) Math.average = function() {
	var total = 0, len = arguments.length;
	for (var idx = 0; idx < len; idx++) {
		total += arguments[idx];
	}
	return total / (len || 1);
};

var Debug = {
	
	enabled: false,
	categories: { all: 1 },
	backlog: [],
	
	colors: ["#001F3F", "#0074D9", "#7FDBFF", "#39CCCC", "#3D9970", "#2ECC40", "#01FF70", "#FFDC00", "#FF851B", "#FF4136", "#F012BE", "#B10DC9", "#85144B"],
	nextColorIdx: 0,
	catColors: {},
	
	enable: function(cats) {
		// enable debug logging and flush backlog if applicable
		if (cats) this.categories = cats;
		this.enabled = true;
		this._dump();
	},
	
	disable: function() {
		// disable debug logging, but keep backlog
		this.enabled = false;
	},
	
	trace: function(cat, msg, data) {
		// trace one line to console, or store in backlog
		// allow msg, cat + msg, msg + data, or cat + msg + data
		if (arguments.length == 1) {
			msg = cat; 
			cat = 'debug'; 
		}
		else if ((arguments.length == 2) && (typeof(arguments[arguments.length - 1]) == 'object')) {
			data = msg;
			msg = cat;
			cat = 'debug';
		}
		
		var now = new Date();
		var timestamp = '' + 
			this._zeroPad( now.getHours(), 2 ) + ':' + 
			this._zeroPad( now.getMinutes(), 2 ) + ':' + 
			this._zeroPad( now.getSeconds(), 2 ) + '.' + 
			this._zeroPad( now.getMilliseconds(), 3 );
		
		if (data && (typeof(data) == 'object')) data = JSON.stringify(data);
		if (!data) data = false;
		
		if (this.enabled) {
			if (this.categories.all || this.categories[cat]) {
				this._print(timestamp, cat, msg, data);
			}
		}
		else {
			this.backlog.push([ timestamp, cat, msg, data ]);
			if (this.backlog.length > 1000) this.backlog.shift();
		}
	},
	
	_dump: function() {
		// dump backlog to console
		for (var idx = 0, len = this.backlog.length; idx < len; idx++) {
			this._print.apply( this, this.backlog[idx] );
		}
		this.backlog = [];
	},
	
	_print: function(timestamp, cat, msg, data) {
		// format and print one message to the console
		var color = this.catColors[cat] || '';
		if (!color) {
			color = this.catColors[cat] = this.colors[this.nextColorIdx];
			this.nextColorIdx = (this.nextColorIdx + 1) % this.colors.length;
		}
		
		console.log( timestamp + ' %c[' + cat + ']%c ' + msg, 'color:' + color + '; font-weight:bold', 'color:inherit; font-weight:normal' );
		if (data) console.log(data);
	},
	
	_zeroPad: function(value, len) {
		// Pad a number with zeroes to achieve a desired total length (max 10)
		return ('0000000000' + value).slice(0 - len);
	}
};
