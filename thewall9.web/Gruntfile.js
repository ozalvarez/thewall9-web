/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: {
                    "Content/site.css": "Content/site.less",
                    "lib/bootstrap/bootstrap.css": "bower_components/bootstrap/less/bootstrap.less",
                    "Content/clean-blog/clean-blog.css": "Content/clean-blog/clean-blog.less"
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    'Content/min/app.css': [
                        'lib/bootstrap/bootstrap.css',
                        'lib/font-awesome/font-awesome.css',
                        "Content/clean-blog/clean-blog.css",
                        "Content/site.css"
                    ],
                    'content/min/text-rotator.css': 'Content/simpletextrotator.css'                                                                                                                                                                                                                                               
                }
            },
        },
        uglify: {
            modernizr: {
                files: { 'scripts/min/modernizr.js': ['lib/modernizr/modernizr.js'] }
            },
            app: {
                files: {
                    'Scripts/min/app.js': [
                            'lib/jquery/jquery.js',
                            'lib/bootstrap/bootstrap.js',
                    ]
                }
            },
            textrotator: {
                files: { 'scripts/min/text-rotator.js': ['scripts/jquery.simple-text-rotator.min.js'] }
            },
            home: {
                files: {
                    'scripts/min/home.js': [
                        'scripts/jquery.simple-text-rotator.min.js',
                        'scripts/grained.min.js',
                        'scripts/app/home.js'
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
                files: ['content/site.less', 'content/clean-blog/clean-blog.less', 'content/clean-blog/variables.less'],
                tasks: ['less','cssmin:target']
            },
            js: {
                files: ['scripts/app/*'],
                tasks: ['uglify:home']
            }
        },
        copy: {
            fontAwesome: {
                files: [
                  {
                      cwd: 'bower_components/font-awesome/fonts',
                      src: '**/*',
                      dest: 'content/fonts',
                      expand: true
                  },
                ],
            },
            bootstrap: {
                files: [
                  {
                      cwd: 'bower_components/bootstrap/fonts',
                      src: '**/*',
                      dest: 'content/fonts',
                      expand: true
                  },
                ],
            },
        }
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('build', ['bower', 'less', 'uglify', 'copy', 'cssmin']);
    grunt.registerTask('buildWATCH', ['bower', 'less', 'uglify', 'copy', 'cssmin', 'watch']);

};
