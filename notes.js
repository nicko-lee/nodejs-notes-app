const fs = require('fs')
const chalk = require('chalk');
const yargs = require('yargs');

// Job is to retrieve and list all notes
const listnote = () => {
    const notes = loadNotes()

    console.log(chalk.bold.blue.inverse('Your notes')) // Give it a styled header

    notes.forEach(note => console.log(note.title)); // Print out each individual note
}

// Job is to read a specific note
const readNote = (title) => {
    const notes = loadNotes()

    // Search for the note
    const noteFound = notes.find((note) => note.title === title) // this var might contain an object and it might not. That's what we test for below

    if (noteFound) {
        console.log(chalk.bold.inverse(noteFound.title))
        console.log(noteFound.body)
    } else {
        console.log(chalk.red.inverse('Note with title "' + title + '" doesn\'t exist'))
    }
}

// Job is to get the note saved to the data store
const addNote = (title, body) => {
    const notes = loadNotes()
    
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) { // i.e. there is no duplicate note. Also could check for if duplicateNote === undefined
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

// Job is to remove a note
const removeNote = (title) => {
    // Load existing notes
    const notes = loadNotes()

    // See if note exists in array using title as unique key. Array.filter() returns a subset of original array
    // Filter condition: anything true will get pushed to filtered array
    const notesToKeep = notes.filter((note) => note.title !== title)

    // Save filtered array and give user the right messaging
    if (notesToKeep.length === notes.length) { // which means nothing was filtered out
        console.log(chalk.red.inverse('Note with title "' + title + '" doesn\'t exist. Did you provide the right title?'))
    } else {
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse('Note with title "' + title + '" deleted!'))
    }
}

// Reusable helper function
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

// Reusable helper function
const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes))
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listnote: listnote,
    readNote: readNote
}