var grunt = require("grunt");

grunt.config.init({
    pkg: grunt.file.readJSON('gruntPackage.json'),
    'create-windows-installer': {
        ia32: {
            appDirectory: 'evo-win32-ia32',
            authors: 'Robby',
            exe: 'evo.exe',
            description: "this is a test",
        }
    }
})

grunt.loadNpmTasks('grunt-electron-installer');
grunt.registerTask('default', ['create-windows-installer']);