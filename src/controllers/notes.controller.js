const notesCtrl = {}

notesCtrl.renderNoteForm = (req, res) => {
    res.render('notes/new-note')
}

notesCtrl.createNewNote = (req, res) => {
    console.log(req.body)
    res.send('New note')
}

notesCtrl.renderNotes = (req, res) => {
    res.send('Render note')
}

notesCtrl.renderEditForm = (req, res) => {
    res.send('Render edit fomr')
}

notesCtrl.updateNote = (req, res) => {
    res.send('Update fomr')
}

notesCtrl.deleteNote = (req, res) => {
    res.send('Deleted form')
}

module.exports = notesCtrl