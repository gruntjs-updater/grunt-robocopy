var process = require('child_process'),
    robocopy = require('./robocopy.js');

module.exports = function(grunt) {
    grunt.registerTask('robocopy', 'Runs robocopy.', function() {
        var options = this.options();

        var command = robocopy.buildCommand(options);

        console.log();
        console.log(command.path + ' ' + command.args.join(' '));
        console.log();

        var taskComplete = this.async();
        var robocopyProcess = process.spawn(command.path, command.args, { windowsVerbatimArguments: true });

        var log = function(message) { console.log(message.toString('utf8')); };

        robocopyProcess.stdout.on('data', log);
        robocopyProcess.stderr.on('data', log);

        robocopyProcess.on('exit', function(code) { 
            if (code > 8) grunt.fail.fatal('Tests failed.');
            taskComplete();
        });    
    });
};