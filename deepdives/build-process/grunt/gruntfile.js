module.exports = function(grunt) {
	grunt.initConfig({
            //set package.json file
            pkg: grunt.file.readJSON('package.json'),

            //Define Browserify Task
            browserify: {
                //name set of src->dest files, could be anything but I like to be descriptive
                js: {
                    src: ['client/**/*.jsx'],
                    dest: 'public/javascripts/build.js'
                },
            },

            //Babel Task
            babel: {
                js: {
                    options: {
                        //tell babel to make us a source map
                        'sourceMap': true,
                        //use ES6
                        presets: ['es2015']
                    },
                    dist: {
                        files: {
                            // Use this file and output to that file
                            'public/javascripts/build.js': 'public/javascripts/build.js'
                        }
                    }
                }
            },

            //Concatenate Css Together Task
            concat_css: {
                all: {
                    src: ["public/stylesheets/**/*.css"],
                    dest: "public/stylesheets/build.css"
                }
            },

            //Minify CSS Task
            cssmin {
                all: {
                    src: "public/stylesheets/build.css",
                    dest: "public/stylesheets/build.css"
                }
            }

            //create watch task which runs specified tasks when noted files have changed
            watch: {
                //When a file in 'client/*/*.js' changes, run the browserify task and then the babel task
                js: {
                    files: ['client/*/*.js'],
                    tasks: ['browserify', 'babel']
                }

                //When a file in 'public/stylesheets/**/*.css' changes, run the concat_css task and then the cssmin task
                css: {
                    files ['public/stylesheets/**/*.css'],
                    tasks: ['concat_css', 'cssmin']
                }
            },
    });

    //Load the tasks
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-concat_css');

    //Register the tasks
    grunt.registerTask('default', [
    'browserify', 'concat_css', 'cssmin'
    ]);
};
