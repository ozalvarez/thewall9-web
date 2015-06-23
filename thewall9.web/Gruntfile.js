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
                    "lib/bootstrap/bootstrap.css": "bower_components/bootstrap/less/bootstrap.less"
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    'Content/min/app.css': [
                        'lib/bootstrap/bootstrap.css',
                        'lib/font-awesome/font-awesome.css',
                        "Content/site.css"
                    ],
                    'content/min/sider.dark.css': 'Content/jquery.sidr.dark.css',
                    'content/min/sider.light.css': 'Content/jquery.sidr.light.css',
                    'content/min/text-rotator.css': 'Content/simpletextrotator.css'
                }
            }
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
                            'scripts/jquery.sidr.min.js'
                    ]
                }
            },
            textrotator: {
                files: { 'scripts/min/text-rotator.js': ['scripts/jquery.simple-text-rotator.min'] }
            },
            vide: {
                files: { 'scripts/min/vide.js': ['lib/vide/jquery.vide.js'] }
            },
            home: {
                files: {
                    'scripts/min/home.js': [
                        'lib/vide/jquery.vide.js',
                        'scripts/jquery.simple-text-rotator.min.js'
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
                files: ['Content/site.less'],
                tasks: ['less']
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
