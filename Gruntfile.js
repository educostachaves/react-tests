module.exports = function (grunt) {

    // Configurable paths
    var config = {
        srcPath:    'assets',
        buildPath:  'assets/build',
    };

    // Project configuration.
    grunt.initConfig({

        // Project settings of path
        config: config,

        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ';'
            },
            libs: {
                src: [
                    '<%= config.srcPath %>/javascripts/libs/vendor/modernizr.js',
                    '<%= config.srcPath %>/javascripts/libs/vendor/jquery.js',
                    '<%= config.srcPath %>/javascripts/libs/vendor/jquery.validate.min.js',
                    '<%= config.srcPath %>/javascripts/libs/vendor/jquery.validate.unobtrusive.js',
                    '<%= config.srcPath %>/javascripts/libs/vendor/jquery.unobtrusive-ajax.js',
                    '<%= config.srcPath %>/javascripts/libs/vendor/fastclick.js',
                    '<%= config.srcPath %>/javascripts/libs/vendor/InitUnveilImgLazyLoader.js',
                    '<%= config.srcPath %>/javascripts/libs/metrics/modified-mixpanel.js',
                    '<%= config.srcPath %>/javascripts/libs/metrics/google-tag-manager.js',
                ],
                dest: '<%= config.buildPath %>/javascripts/libs.js'
            }
        },

        // Minify all JS "compress"
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            my_target: {
                files: {
                    '<%= config.buildPath %>/javascripts/libs.js': ['<%= config.buildPath %>/javascripts/libs.js'],
                }
            }
        },

        // Compile SASS for CSS
        compass: {
            dist: {
                options: {
                    sassDir: '<%= config.srcPath %>/scss',
                    cssDir: '<%= config.buildPath %>/css',
                    outputStyle: 'compressed'
                }
            },
        },

        // Preview all the packages modified in project
        watch: {
            css: {
                files: ['<%= config.srcPath %>/scss/**/*.scss'],
                tasks: ['compass']
            },
            scripts: {
                files: ['<%= config.srcPath %>/javascripts/**/*.js'],
                tasks: ['concat']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default Task(s).
    grunt.registerTask('build', ['concat', 'uglify', 'compass']);
    // Basic Test Task(s).
    grunt.registerTask('basic', ['concat', 'compass']);
    // Only JS Task(s)
    grunt.registerTask('js', ['concat', 'uglify']);
};
