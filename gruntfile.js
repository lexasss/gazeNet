/*
 - include '<script src="http://localhost:35729/livereload.js"></script>' before </body>
 - run 'grunt watch'
 */

module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: ['public/'],

        less: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'ui/styles',
                        src: ['*.less'],
                        dest: 'public/styles/',
                        ext: '.css'
                    }
                ]
            }
        },

        autoprefixer: {
            all: {
                src: 'public/styles/*.css'
            }
        },

        browserify: {
            options: {
                debug: true
            },
            gazenet: {
                src: ['ui/js/*.js', 'helpers/shared/*.js'],
                dest: 'public/js/gazeNet.js'
            }
        },

        /*
        concat: {
            options: {
                separator: grunt.util.linefeed + grunt.util.linefeed
            },
            js: {
                src: ['ui/js/gazeNet/*.js', 'helpers/shared/*.js'],
                dest: 'public/js/gazeNet.js'
            }
        },
        */
        copy: {
            libs: {
                expand: true,
                cwd: 'ui/libs/',
                src: '**',
                dest: 'public/libs/'
            },
            images: {
                expand: true,
                cwd: 'ui/images/',
                src: '**/*.png',
                dest: 'public/images/',
                flatten: false
            },
            fonts: {
                expand: true,
                cwd: 'ui/fonts/',
                src: '*.*',
                dest: 'public/fonts/',
                flatten: true,
                filter: 'isFile'
            }
        },
        
        watch: {
            options: {
                livereload: true,
            },
            js: {
                files: 'ui/js/**',
                tasks: ['browserify:gazenet']
            },
            shared: {
                files: 'helpers/shared/**',
                tasks: ['browserify']
            },
            less: {
                files: 'ui/styles/*.less',
                tasks: ['less', 'autoprefixer', 'concat:css', 'clean']
            },
            libs: {
                files: 'ui/libs/**',
                tasks: ['copy:libs']
            },
            images: {
                files: 'ui/images/**',
                tasks: ['copy:images']
            },
            fonts: {
                files: 'ui/fonts/**',
                tasks: ['copy:fonts']
            }
        },
        
        /*
        connect: {
            server: {
                options: {
                    port: 8001,
                    base: 'build',
                    keepalive: true
                }
            }
        }
        */
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    
    grunt.registerTask('default', ['clean', 'less', 'autoprefixer', 'browserify', 'copy']);
    grunt.registerTask('listen', ['connect']);
};