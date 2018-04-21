const fs = require('fs');
const vsprintf = require("sprintf-js").vsprintf;

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
    let str = '';

    if (args.length) {
        str = vsprintf(args[0], args.splice(1));
    }

    fs.writeSync(process.stdout.fd, getColoredText(str, color));
}

// times
const times = {};

/**
 * @param {String} name
 * @returns {undefined}
 */
function displayTime(name) {
    if (!times[name]) {
        return;
    }

    const diff = Date.now() - times[name];

    delete times[name];

    displayText(['Time: %s ms', diff], 'blue');
}

// exports console object
module.exports = {
    log: function() { displayText(Array.from(arguments), 'blue'); },
    error: function() { displayText(Array.from(arguments), 'red'); },
    warn: function() { displayText(Array.from(arguments), 'yellow'); },
    info: function() { displayText(Array.from(arguments), 'cyan'); },
    time: name => times[name] = Date.now(),
    timeEnd: name => displayTime(name),
};
