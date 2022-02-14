const express = require('express');
const { authenticateToken } = require('../../middlewares/auth.middleware');
const { createNote, getAllNotes, getNoteById, updateNote, deleteNote } = require('./notes.controller');
const router = express.Router();

// routes
router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.post('/create',authenticateToken, createNote);
router.put('/:id',authenticateToken, updateNote);
router.delete('/:id',authenticateToken, deleteNote);

module.exports = router;