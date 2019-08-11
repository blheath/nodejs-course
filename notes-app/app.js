const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

// Customize yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        // console.log('Adding a new note!', argv)
        notes.addNote(argv.title, argv.body)
    }
})


// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv){
        // console.log('Removing note: ', argv.title)
        notes.removeNote(argv.title)
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'Listing all notes place holder',
    handler: function () {
        console.log('Here\'s a list of your notes:')
    }
})


// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: function (){
        console.log('Reading the note specified')
    }
})

yargs.parse()