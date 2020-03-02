const fs = require('fs');
const chalk = require('chalk');


const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);
     
                               

    if (!duplicateNote){ //if theres no duplicate note, 'll push
                                     //if true, means that is duplicated
        notes.push({
            title:title,
            body: body
        });
    
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added'));
    } else{
        console.log(chalk.yellow.inverse('Title already been taken'));
    }   

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes); //to save need to turn to string
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
} catch (e) {
    return []

    }
}

const removeNotes = (title) => {
    const allNotes = loadNotes();
    const matchedNote = allNotes.filter((note) => note.title != title); //could return true or false
    
    
    if (matchedNote.length < allNotes.length){ 
                        
        saveNotes(matchedNote);        
        console.log(chalk.redBright.inverse('The note has been removed'));
    } else{
        console.log(chalk.red.inverse('Title doesnt exist'));
}
}

const listNotes = () => {

    console.log(chalk.blueBright.inverse`This is your notes`)
    const allNotes2 = loadNotes();
    allNotes2.forEach((note) => {
        console.log(note.title);
    });   
    
}

const readNotes = (title) => {
    const allNotes = loadNotes();
    const matchedNote = allNotes.find((note) => note.title === title);
    
    if (matchedNote){
        console.log(chalk.blue.inverse (matchedNote.title));
        console.log(matchedNote.body);
    } else{
        console.log(chalk.red.inverse('Note not found'));
    }
}

module.exports = {
    addNote: addNote,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
};