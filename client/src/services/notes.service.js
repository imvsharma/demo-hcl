import { authHeader } from "../helpers";
import { userService } from "./user.service";


const apiURL = "http://localhost:3000";
 
const handleResponse = (response) => {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiURL}/notes/${id}`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiURL}/notes/`, requestOptions).then(handleResponse);
}

function deleteNote(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiURL}/notes/${id}`, requestOptions).then(handleResponse);
}

function update(note, id) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(note)
    };

    return fetch(`${apiURL}/notes/${id}`, requestOptions).then(handleResponse);;
}

function create(note, id) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(note)
    };

    return fetch(`${apiURL}/notes/create`, requestOptions).then(handleResponse);;
}

export const notesService = {
    getById,
    getAll,
    deleteNote,
    update,
    create
}

