import { notesConstants } from "../constants";
import { notesService } from "../services";


const getAll = () => {
    return dispatch => {

        notesService.getAll()
            .then(
                notes => {
                    console.log(notes)
                    dispatch(success(notes))
                },
                error => console.log("Error in fetching notes")
            );
    };
    function success(notes) { return { type: notesConstants.GETALL_NOTES_SUCCESS, notes } }
}

const getNote = id => {
    return dispatch => {
        dispatch(request(id));

        notesService.getById(id)
            .then(
                note => dispatch(success(note, id)),
                error => dispatch(failure(error.toString(), id))
            );
    };

    function request(id) { return { type: notesConstants.GET_NOTE_REQUEST, id } }
    function success(note, id) { return { type: notesConstants.GET_NOTE_SUCCESS, note } }
    function failure(error, id) { return { type: notesConstants.GET_NOTE_FAILURE, error, id } }
}

const createNote = note => {
    return dispatch => {
        notesService.create(note)
            .then(
                note => dispatch(success(note)),
                error => dispatch("Error in creating note")
            );
    };

    function success(note) { return { type: notesConstants.CREATE_NOTE_SUCCESS, note } }
}

const updateNote = (note, id) => {
    return dispatch => {
        dispatch(request(note, id));

        notesService.update(note, id)
            .then(
                note => dispatch(success(note, id)),
                error => dispatch(failure(error.toString(), id))
            );
    };

    function request(note, id) { return { type: notesConstants.UPDATE_NOTE_REQUEST, note, id } }
    function success(note, id) { return { type: notesConstants.UPDATE_NOTE_SUCCESS, note, id } }
    function failure(error, id) { return { type: notesConstants.UPDATE_NOTE_FAILURE, error, id } }
}

const deleteNote = id => {
    return dispatch => {
        dispatch(request(id));

        notesService.deleteNote(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: notesConstants.DELETE_NOTE_REQUEST, id } }
    function success(id) { return { type: notesConstants.DELETE_NOTE_SUCCESS, id } }
    function failure(id, error) { return { type: notesConstants.DELETE_NOTE_FAILURE, id, error } }
}

export const notesActions = {
    getAll,
    getNote,
    createNote,
    updateNote,
    deleteNote
}