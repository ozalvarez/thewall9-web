/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        less: {
            app: {
                files: {
                    "wwwroot/src/css/app.css": "wwwroot/src/css/app.less"
                }
            },
            development: {
                files: {
                    "lib/bootstrap/bootstrap.css": "bower_components/bootstrap/less/bootstrap.less",
                    "wwwroot/src/css/clean-blog/clean-blog.css": "wwwroot/src/css/clean-blog/clean-blog.less"
                }
            }
        },
        cssmin: {
            app: {
                files: {
                    'wwwroot/build/css/app.min.css': "wwwroot/src/css/app.css"
                }
            },
            home_vendors: {
                files: {
                    'wwwroot/build/css/home.vendors.min.css': "wwwroot/src/css/simpletextrotator.css"
                }
            },
            vendors: {
                files: {
                    'wwwroot/build/css/vendors.min.css': [
                        'lib/bootstrap/bootstrap.css',
                        'bower_components/font-awesome/css/font-awesome.css'
                    ]
                }
            }
        },
        uglify: {
            modernizr: {
                files: { 'wwwroot/build/js/modernizr.js': ['lib/modernizr/modernizr.js'] }
            },
            vendors: {
                files: {
                    'wwwroot/build/js/vendors.min.js': [
                            'lib/jquery/jquery.js',
                            'lib/bootstrap/bootstrap.js'
                    ]
                }
            },
            app: {
                files: {
                    'wwwroot/build/js/app.min.js': [
                            'wwwroot/src/js/app.js'
                    ]
                }
            },
            home_vendors: {
                files: {
                    'wwwroot/build/js/home.vendors.min.js': [
                        'wwwroot/src/js/jquery.simple-text-rotator.min.js',
                            'wwwroot/src/js/grained.min.js'
                        
                    ]
                }
            },
            home: {
                files: {
                    'wwwroot/build/js/home.min.js': [
                        'wwwroot/src/js/home.js'
                    ]
                }
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: 'lib',
                    layout: 'byType',
                    install: true,
                    verbose: false,
                    cleanTargetDir: false,
                    cleanBowerDir: false,
                    bowerOptions: {}
                }
            }
        },
        watch: {
            css: {
                files: ['wwwroot/src/css/*.less'],
                tasks: ['less:app', 'postcss', 'cssmin:app']
            },
            app: {
                files: ['wwwroot/src/js/app.js'],
                tasks: ['uglify:app']
            },
            js: {
                files: ['wwwroot/src/js/home.js'],
                tasks: ['uglify:home']
            }
        },
        copy: {
            fontAwesome: {
                files: [
                  {
                      cwd: 'bower_components/font-awesome/fonts',
                      src: '**/*',
                      dest: 'wwwroot/build/fonts',
                      expand: true
                  },
                ],
            },
            bootstrap: {
                files: [
                  {
                      cwd: 'bower_components/bootstrap/fonts',
                      src: '**/*',
                      dest: 'wwwroot/build/fonts',
                      expand: true
                  },
                ],
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({ browsers: ['last 2 version'] })
                ]
            },
            dist: {
                src: 'wwwroot/src/css/app.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');

    // Default task.
    grunt.registerTask('build', ['bower', 'less', 'postcss', 'uglify', 'copy', 'cssmin']);
    grunt.registerTask('buildWATCH', ['bower', 'less', 'postcss', 'uglify', 'copy', 'cssmin', 'watch']);

};
