const fs = require('fs')
const chalk = require('chalk')


const addNote = (title,body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
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

const removeNote = (title) => {
    const notes = loadNotes()
    const remainingNotes = notes.filter((note) => note.title !== title)

    if (remainingNotes.length !== notes.length) {
        console.log(chalk.green.inverse('Note removed!'))
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
    saveNotes(remainingNotes)
}

const listNotes = () => {
    const notes = loadNotes()

    if (notes.length > 0) {
        console.log(chalk.blue.bold('Your notes:'))

        notes.forEach((note) => {
            console.log(note.title)
        })

    } else {
        console.log(chalk.yellow.inverse('No notes exist!'))
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const findNote = notes.find((note) => note.title === title)
    
    if (findNote) {
        console.log(chalk.green.bold.inverse(findNote.title))
        console.log(findNote.body)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}


const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
    
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}