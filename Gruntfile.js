module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            react: {
                files: [ './app/components/*.jsx', './app/components/*/*.jsx', './app/js/*.js' ],
                tasks: [ 'browserify' ]
            },
			sass: {
				files: [ './app/css/*.scss' ],
				tasks: [ 'sass' ]
			}
        },

        browserify: {
            options: {
                transform: [ require('grunt-react').browserify ]
            },
            client: {
                src: [ './app/components/*.jsx', './app/components/*/*.jsx' ],
                dest: './build/app.built.js'
            },
            background: {
            	src: [ './app/js/background.js', './app/js/contexts.js' ],
            	dest: './build/background.built.js'
            },
			content: {
				src: [ './app/js/content.js' ],
				dest: './build/content.built.js'
			}
        },
		
		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'./build/style.css': './app/css/style.scss',
                    './build/fix.css': './app/css/select2-fix.scss'
				}
			}
		},

        copy: {
            dist: {
                files: [{
                    expand: true,
                    src: [ './**/*.*' ],
                    dest: './build/',
                    cwd: './app/assets/'
                }]
            }
        },

        clean: [ './build' ]
    });

    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('default', [
        'clean',
        'browserify',
		'sass',
        'copy'
    ]);
};
