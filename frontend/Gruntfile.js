module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        css_combo: {
            options: {
                debug: false,
                compress: false
            },
            css: {
                files: {'./style.css': ['css/bundle.css']}
            }
        },

        cssmin: {
            css: {
                files: [{
                    src: './style.css',
                    dest: '../server/public/stylesheets/style.css'
                }]
            }
        },

        watch: {
            options: {
                livereload: true,
                debounceDelay: 1000
            },
            css: {
                files: 'css/*.css',
                tasks: ['css_combo']
            },
            cssmin: {
                files: './style.css',
                tasks: ['cssmin']
            }
        }


    });

    // Load the plugin
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-css-combo');

    // Default task(s).
    grunt.registerTask('default', ['css_combo', 'cssmin']);

};
