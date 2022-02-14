import { combineReducers } from 'redux';

import { authentication } from './login.reducer';
import { registration } from './register.reducer';
import { alert } from './alert.reducer';
import { notes } from './note.reducer';


const rootReducer = combineReducers({
    authentication,
    registration,
    alert,
    notes
});

export default rootReducer;