const Run = (() => { 

    const app = () => {
        getItems();
        showFolders();
    }

    let notes = [
        [
            {
                'name': 'Click this note.',
                'description': 'Hi! You can create folders by clicking "+ Folder", and then You can add notes to it by clicking green +. Have fun!'
            },
        ],
    ];

    let folders = [
        {
            'name': 'Welcome!',
            'notes': notes[0]
        },
    ];

    const rightNote = document.getElementById('note');

    const showFolders = () => {
        let content = document.getElementById('content')
        content.innerHTML = '';
        for (let i = 0; i < folders.length; i++) {
            let div = document.createElement('div');
            div.className = 'folder';
            div.innerText = folders[i].name;
            content.appendChild(div);
            
            let remove = document.createElement('button');
            remove.className = 'remove';
            remove.innerText = '-';
            div.appendChild(remove);

            remove.addEventListener('click', () => {
                rightNote.innerHTML = '';
                folders.splice(i, 1);
                notes.splice(i, 1);
                setItems();
                showFolders();
            });
            
            let add = document.createElement('button');
            add.className = 'add';
            add.innerText = '+';
            div.appendChild(add);

            add.addEventListener('click', () => {
                let name = prompt('Name:');
                if (name === null) {
                } else { 
                    notes[i].push(createNote(name));
                    setItems();
                    showFolders();
                }
            });
        }
        showNotes();
    }

    const showNotes = () => {
        for (let i = 0; i < folders.length; i++) {
            for (let j = 0; j < folders[i].notes.length; j++) {
                let note = document.createElement('div');
                note.className = 'note';
                note.innerText = folders[i].notes[j].name;
                let currentFolder = document.getElementsByClassName('folder')[i];
                currentFolder.appendChild(note);

                let removenote = document.createElement('button');
                removenote.className = 'removenote';
                removenote.innerText = '-';
                note.appendChild(removenote);

                removenote.addEventListener('click', (event) => {
                    event.stopPropagation();
                    rightNote.innerHTML = '';
                    folders[i].notes.splice(j, 1);
                    setItems();
                    showFolders();
                });

                let textarea = document.createElement('textarea');
                note.addEventListener('click', () => {
                    showActiveNote();
                    note.classList.add('noteactive');
                    rightNote.innerHTML = '';
                    textarea.value = folders[i].notes[j].description;
                    rightNote.appendChild(textarea);
                    textarea.focus();
                });
                textarea.addEventListener('keyup', () => {
                    folders[i].notes[j].description = textarea.value;
                    setItems();
                });
            }
        }
    }


    const createFolder = (name, num) => {
        const newFolder = () => {
            notes.push([]);
            return notes[num];
        }
        return {
            'name': name,
            'notes': newFolder(),
        }
    }

    const addFolder = () => {
        let name = prompt('Name:');
        if (name === null) {
        } else { 
            let l = folders.length;
            folders.push(createFolder(name, l));
            showFolders();
            setItems();
        }
    }

    document.getElementById('folder').addEventListener('click', () => {
        addFolder();
    });

    document.getElementById('logo').addEventListener('click', () => {
        rightNote.innerHTML = '';
    });

    const createNote = (name) => {
        return {
            'name': name,
            'description': '',
        }
    }

    const showActiveNote = () => {
        let allnotes = document.querySelectorAll('.note');
        allnotes.forEach((anote) => {
            anote.classList.remove('noteactive');
        });
    }

    const setItems = () => {
        localStorage.clear();
        localStorage.notes = JSON.stringify(notes);
        localStorage.folders = JSON.stringify(folders);
    }

    const getItems = () => {
        if (localStorage.folders) {
        notes = JSON.parse(localStorage.notes);
        folders = JSON.parse(localStorage.folders);
        }
    }

    return {
        app
    }

})();

Run.app();