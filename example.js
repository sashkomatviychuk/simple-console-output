const _console = require('./index');

_console.time('time1');
_console.log('Im here!');
_console.log();
_console.error('Its error message');
_console.info('Message with argument %s', 'its_arg_value');
_console.timeEnd('time1');
