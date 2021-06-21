const yargs = require('yargs')

const notes = require('./notes')


// Customize yargs version
yargs.version('2.0')

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
            describe: 'Note body text',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.addNote(argv.title, argv.body)
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note!',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        }
    },
    handler: (argv) => notes.removeNote(argv.title)
})


// Create list command
yargs.command({
    command: 'list',
    describe: 'List notes!',
    handler: () => notes.listnote()
})

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note!',
    handler: () => console.log('Reading the note!')
})

yargs.parse()

