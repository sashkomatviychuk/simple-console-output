const _console = require('./index');

_console.time('time1');
_console.log('Im here!', 'Its fine');
_console.log();
_console.error('Its error message');
_console.info('Message with argument %s', 'its_arg_value', 'and its not an argument');
_console.timeEnd('time1');
