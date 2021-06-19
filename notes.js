const fs = require('fs')
const chalk = require('chalk');

// Job is to retrieve notes
const getNotes = function () {
    return ("Your notes...")
}

// Job is to get the note saved to the data store
const addNote = function (title, body) {
    const notes = loadNotes()
    // returns a filtered array based on the boolean returning condition specified in the function logic. If true means it is a duplicate
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })

    if (duplicateNotes.length === 0) { // i.e. no duplicates since duplicateNotes array is empty
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
const removeNote = function (title) {
    // Load existing notes
    const notes = loadNotes()

    // See if note exists in array using title as unique key. Array.filter() returns a subset of original array
    const notesToKeep = notes.filter(function (note) {
        return note.title !== title // filter condition. Anything true will get pushed to filtered array
    })

    // Save filtered array and give user the right messaging
    if (notesToKeep.length === notes.length) { // which means nothing was filtered out
        console.log(chalk.red.inverse('Note with title "' + title + '" doesn\'t exist. Did you provide the right title?'))
    } else {
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse('Note with title "' + title + '" deleted!'))
    }
}

// Reusable helper function
const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

// Reusable helper function
const saveNotes = function (notes) {
    fs.writeFileSync('notes.json', JSON.stringify(notes))
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}