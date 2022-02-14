const { create, findAll, findOne, update, _delete } = require('./notes.service');

const createNote =(req, res, next) => {
    // Save Note in the database
    create(req, res, next).then(data => {
        
        res.send(data);
    }).catch(err => {
        next(err)
    });
}

const getAllNotes =(req, res, next) => {
    findAll().then(notes => {
        res.send(notes);
    }).catch(err => {
        next(err)
    });
}

const getNoteById = (req, res, next) => {
    findOne(req).then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });                
        }
        next(err)
    });
}

const updateNote = (req, res, next) => {
    update(req).then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });                
        }
        next(err)
    });
}

const deleteNote = (req, res, next) => {
    _delete(req).then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });                
        }
        next(err)
    });
}

module.exports = {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote
}