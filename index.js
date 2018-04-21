const fs = require('fs');

// list of colors
const colors = {
	red: '\033[0;31m{text}\n\033[0m',
	blue: '\033[0;34m{text}\n\033[0m',
	yellow: '\033[0;33m{text}\n\033[0m',
	cyan: '\033[0;36m{text}\n\033[0m',
};

/**
 * @param {String} str
 * @param {String} color
 * @returns {String}
 */
function getColoredText(str, color) {
	const pattern = colors[color];

	if (!pattern) return str;

	return pattern.replace('{text}', str);
}

/**
 * @param {Array} args
 * @param {String} color
 * @returns {undefined}
 */
function displayText(args, color) {
	const len = args.length;
	let str = '';

	if (len) {
		str = args[0];
	}

	const otherArgs = [];

	for (let i = 1; i < len; i++) {
		if (str.indexOf('%s') === -1) {
			otherArgs.push(args[i]);
		} else {
			str = str.replace('%s', String(args[i]));
		}
	}

	otherArgs.unshift(str);

	str = otherArgs.join(' ');

	fs.writeSync(process.stdout.fd, getColoredText(str, color));
}

// exports console object
module.exports = {
	log: function() { displayText(Array.from(arguments), 'blue'); },
	error: function() { displayText(Array.from(arguments), 'red'); },
	warn: function() { displayText(Array.from(arguments), 'yellow'); },
	info: function() { displayText(Array.from(arguments), 'cyan'); },
};
