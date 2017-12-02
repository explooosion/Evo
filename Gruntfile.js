var grunt = require('grunt');

grunt.config.init({
    pkg: grunt.file.readJSON('gruntPackage.json'),
    'create-windows-installer': {
        ia32: {
            appDirectory: 'Evo-win32-ia32',
            authors: 'Robby',
            exe: 'Evo.exe',
            description: 'kom tool',
        }
    }
})

grunt.loadNpmTasks('grunt-electron-installer');
grunt.registerTask('default', ['create-windows-installer']);