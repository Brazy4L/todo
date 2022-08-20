const Run = (() => { 

    const app = () => {
        showFolders();
    }

    const notes = [
        [
            {
                'name': 'Shopping list',
                'description': 'Milk, Eggs, Apples'
            },
            {
                'name': 'Dog',
                'description': 'Cat'
            },
            {
                'name': 'VS',
                'description': 'Code'
            },
        ],
        [
            {
                'name': 'Books',
                'description': 'None'
            },
        ],
        [
            {
                'name': 'Hey',
                'description': 'Bye'
            },
        ],
    ];

    const folders = [
        {
            'name': 'ASAP',
            'notes': notes[0]
        },
        {
            'name': 'HOT',
            'notes': notes[1]
        },
        {
            'name': 'Books',
            'notes': notes[2]
        },
    ];

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
                folders.splice(i, 1);
                notes.splice(i, 1);
                showFolders();
            });
            
            let add = document.createElement('button');
            add.className = 'add';
            add.innerText = '+';
            div.appendChild(add);

            add.addEventListener('click', () => {
                let name = prompt('Name:');
                notes[i].push(createNote(name));
                showFolders();
            });
            
            let collapse = document.createElement('button');
            collapse.className = 'collapse';
            collapse.innerText = '⌵';
            div.appendChild(collapse);
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

                removenote.addEventListener('click', () => {
                    notes[i].splice(j, 1);
                    showFolders();
                });
            }
        }
    }

    const noteText = () => {
        let rightNote = document.getElementById('note');
        let textarea = document.createElement('textarea');
        note.addEventListener('click', () => {
            rightNote.innerHTML = '';
            textarea.value = folders[i].notes[j].description;
            rightNote.appendChild(textarea);
            textarea.focus();
        });
        textarea.addEventListener('keyup', () => {
            folders[i].notes[j].description = textarea.value;
        });
    }

    const createFolder = (name) => {
        return {
            'name': name,
            'notes': '',
        }
    }

    const addFolder = () => {
        let name = prompt('Name:');
        folders.push(createFolder(name));
        showFolders();
    }

    document.getElementById('folder').addEventListener(('click'), () => {
        addFolder();
    });


    const createNote = (name) => {
        return {
            'name': name,
            'description': '',
        }
    }

    return {
        app
    }

})();

Run.app();