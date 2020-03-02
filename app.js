const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

//custom yargs version
yargs.version('1.1.0');

// add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title:{
            describe: 'Note title',
            demandOption: true, //make the option required
            type: 'string' //only accept string, prevent receive an empty object
        },
        body: {
            describe:'describing something',
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv){
        notes.addNote(argv.title, argv.body)
    }
});

// remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title:{
            type:'string',
            demandOption: true
        }
    },
    handler (argv) {
        notes.removeNotes(argv.title);
    }
});

//list command
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler() {
        notes.listNotes();
    }
});

//read command
yargs.command({
    command: 'read',
    describe: 'read a note',
    builder:{
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNotes(argv.title);
    }
})

yargs.parse()