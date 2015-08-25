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
                        cwd: 'front/styles',
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
                src: ['front/js/*.js', 'helpers/shared/*.js'],
                dest: 'public/js/<%= pkg.name %>.js',
                options: {
                    process: function(content, srcpath) {
                        return '// processed' + content;
                        //.replace(/<!-- local -->[\w\W]*<!-- end_of_local -->/, '<script src="visic.js" type="text/javascript"></script>');
                    }
                }
            }
        },

        /*
        concat: {
            options: {
                separator: grunt.util.linefeed + grunt.util.linefeed
            },
            js: {
                src: ['public/js/<%= pkg.name %>.js'],
                dest: 'public/js/<%= pkg.name %>.js',
                options: {
                    process: function(content, srcpath) {
                        return 'content;
                    }
                }
            }
        },
        */

        copy: {
            js: {
                src: ['public/js/<%= pkg.name %>.js'],
                dest: 'public/js/<%= pkg.name %>.js',
                options: {
                    // This procedure replace [[[NAME]]] found in JS with the corresponding values 
                    // from 'config' in package.json
                    process: function(content, srcpath) {

                        var pkg = grunt.file.readJSON('package.json');

                        function replacer(match, p1, offset, string) {

                            var configPath = p1.split('.');
                            var pathIsValid = true;
                            var configValue = pkg.config;

                            for (var i = 0; i < configPath.length; ++i) {
                                var key = configPath[i].trim();
                                var value = configValue[key];
                                if (!value) {
                                    pathIsValid = false;
                                    break;
                                }
                                configValue = value;
                            }

                            if (pathIsValid) {
                                if (typeof configValue === 'number' || 
                                    typeof configValue === 'boolean') {
                                    return '' + configValue;
                                }
                                if (typeof configValue === 'string') {
                                    return '\'' + configValue + '\'';
                                }
                            }

                            grunt.log.error();
                            grunt.log.error('Grunt config parser:');
                            grunt.log.error('-  no value for "' + p1 + '" in "config" entry of package.json: ');
                            throw new Error();
                        }
                        return content.replace(/\[\[\[([\w\.]+)\]\]\]/gi, replacer);
                    }
                }
            },
            libs: {
                expand: true,
                cwd: 'front/libs/',
                src: '**',
                dest: 'public/libs/'
            },
            images: {
                expand: true,
                cwd: 'front/images/',
                src: '**/*.png',
                dest: 'public/images/',
                flatten: false
            },
            fonts: {
                expand: true,
                cwd: 'front/fonts/',
                src: '*.*',
                dest: 'public/fonts/',
                flatten: true,
                filter: 'isFile'
            }
        },

        // Include this taks only if using nginx to serve with the static pages
        jade: {
            options: {
                pretty: true,
                processContent: function (content, filename) {
                    return content.replace(/( href| src)\=\'\//g, '$1=\'..\/');
                }
            },
            compile: {
                files: [{
                    expand: true,
                    cwd: 'views/static/',
                    src: ['**/*.jade'],
                    dest: 'public/html/',
                    ext: '.html',
                    filter: 'isFile'
                }],
            }
        },
        
        watch: {
            options: {
                livereload: true,
            },
            jade: {
                files: 'views/**',
                tasks: ['jade']
            },
            js: {
                files: 'front/js/**',
                tasks: ['browserify:gazenet']
            },
            shared: {
                files: 'helpers/shared/**',
                tasks: ['browserify']
            },
            less: {
                files: 'front/styles/*.less',
                tasks: ['less', 'autoprefixer', 'concat:css', 'clean']
            },
            libs: {
                files: 'front/libs/**',
                tasks: ['copy:libs']
            },
            images: {
                files: 'front/images/**',
                tasks: ['copy:images']
            },
            fonts: {
                files: 'front/fonts/**',
                tasks: ['copy:fonts']
            }
        },
        
        connect: {
            server: {
                options: {
                    port: 0,
                    base: ['public', 'helpers/shared'],
                    keepalive: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jade');

    grunt.registerTask('default', ['clean', 'less', 'autoprefixer', 'browserify', 'copy', 'jade']);
};