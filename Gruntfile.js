'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        mochaTest: {
            test: {
                src: ['test/**/*.js']
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'index.js', 'test/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        }
    });

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('test', ['mochaTest', 'jshint']);
};