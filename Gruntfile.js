module.exports = function(grunt){
	grunt.initConfig({
		nodemon:{
			local:{
				script: 'server.js'
			}
		}
	});
	require('load-grunt-tasks')(grunt);
	grunt.registerTask('default', ['nodemon']);
};
