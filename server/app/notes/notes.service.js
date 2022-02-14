const db = require('../../helpers/db');
const Note = db.Note
const User = db.User

const create = async (req, res, next) => {
    const author = await req.user
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Note
    const note = new Note({
        title: req.body.title || "Untitled Note", 
        content: req.body.content,
        author: author.sub
    });

    // Save Note in the database
    return await note.save();
}

const findAll = async () => {
    return await Note.find();
};

const findOne = async (req) => {
    return await Note.findById(req.params.id);
}

const update = async req => {
    return await Note.findByIdAndUpdate(req.params.id, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
}

const _delete = async req => {
    return await Note.findByIdAndRemove(req.params.id)
}

module.exports = {
    create,
    findAll,
    findOne,
    update,
    _delete
}