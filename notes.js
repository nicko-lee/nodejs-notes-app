const fs = require('fs')

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
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const saveNotes = function (notes) {
    fs.writeFileSync('notes.json', JSON.stringify(notes))
}


module.exports = {
    getNotes: getNotes,
    addNote: addNote
}