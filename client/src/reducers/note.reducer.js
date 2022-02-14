import { notesConstants } from '../constants';


export function notes (notes = [], action) {
    console.log(action)
    switch (action.type) {
        case notesConstants.GETALL_NOTES_SUCCESS:
            return [...action.notes]
            
        case notesConstants.GET_NOTE_SUCCESS:
            return {
                notes: notes.filter(note => note._id === action.id)
            };
        
        case notesConstants.CREATE_NOTE_SUCCESS:
            const note = action.note;
            return [...notes, note]
        
        case notesConstants.UPDATE_NOTE_SUCCESS:
            const Note = action.note
            return {
                notes: notes.map(note => note._id === action.id ? {...note, Note} : note)
            };
        
        case notesConstants.DELETE_NOTE_SUCCESS:
            return  [...notes.filter(note => note._id !== action.id)];
        default:
            return notes
    }
}