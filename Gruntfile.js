module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            react: {
                files: ['components/*.jsx', 'components/*/*.jsx', 'js/*.js'],
                tasks: ['browserify']
            },
			sass: {
				files: ['css/*.scss'],
				tasks: ['sass']
			}
        },

        browserify: {
            options: {
                transform: [ require('grunt-react').browserify ]
            },
            client: {
                src: ['components/*.jsx', 'components/*/*.jsx', 'secret.js'],
                dest: 'app.built.js'
            },
            background: {
            	src: 'js/background.js',
            	dest: 'background.built.js'
            },
			content: {
				src: 'js/content.js',
				dest: 'content.built.js'
			}
        },
		
		sass : {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'./style.css': './css/style.scss'
				}
			}
		}
    });

    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('default', [
        'browserify',
		'sass'
    ]);
};
