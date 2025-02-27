document.getElementById('add-note').addEventListener('click', function () {
    const title = document.getElementById('note-title').value;
    const content = document.getElementById('note-content').innerHTML;

    if (title && content) {
        addNote(title, content);
        document.getElementById('note-title').value = '';
        document.getElementById('note-content').innerHTML = '';
    } else {
        alert('Lütfen not başlığı ve içeriği girin.');
    }
});

function addNote(title, content) {
    const notesContainer = document.getElementById('notes-container');

    const noteElement = document.createElement('div');
    noteElement.classList.add('note');

    const noteTitle = document.createElement('h3');
    noteTitle.textContent = title;

    const noteContent = document.createElement('div');
    noteContent.innerHTML = content;

    const noteActions = document.createElement('div');
    noteActions.classList.add('note-actions');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '🗑️';
    deleteButton.addEventListener('click', function () {
        notesContainer.removeChild(noteElement);
        saveNotes();
    });

    const editButton = document.createElement('button');
    editButton.textContent = '✏️';
    editButton.addEventListener('click', function () {
        document.getElementById('note-title').value = title;
        document.getElementById('note-content').innerHTML = content;
        notesContainer.removeChild(noteElement);
    });

    noteActions.appendChild(editButton);
    noteActions.appendChild(deleteButton);

    noteElement.appendChild(noteTitle);
    noteElement.appendChild(noteContent);
    noteElement.appendChild(noteActions);

    notesContainer.appendChild(noteElement);
    saveNotes();
}

function saveNotes() {
    const notes = [];
    document.querySelectorAll('.note').forEach(note => {
        const title = note.querySelector('h3').textContent;
        const content = note.querySelector('div').innerHTML;
        notes.push({ title, content });
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => addNote(note.title, note.content));
}

document.addEventListener('DOMContentLoaded', loadNotes);

// Metin Stili Butonları
document.getElementById('bold-btn').addEventListener('click', function () {
    applyStyle('bold');
});

document.getElementById('italic-btn').addEventListener('click', function () {
    applyStyle('italic');
});

document.getElementById('underline-btn').addEventListener('click', function () {
    applyStyle('underline');
});

document.getElementById('strike-btn').addEventListener('click', function () {
    applyStyle('strikeThrough');
});

function applyStyle(style) {
    const contentEditable = document.getElementById('note-content');
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    const span = document.createElement('span');
    span.style.fontWeight = style === 'bold' ? 'bold' : 'normal';
    span.style.fontStyle = style === 'italic' ? 'italic' : 'normal';
    span.style.textDecoration = style === 'underline' ? 'underline' :
                                style === 'strikeThrough' ? 'line-through' : 'none';

    range.surroundContents(span);
    selection.removeAllRanges();
    selection.addRange(range);
    contentEditable.focus();
}