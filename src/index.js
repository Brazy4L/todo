const Run = (() => { 

    const app = () => {
        showFolders();
        removeFolder();
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
            
            let add = document.createElement('button');
            add.className = 'add';
            add.innerText = '+';
            div.appendChild(add);
            
            let collapse = document.createElement('button');
            collapse.className = 'collapse';
            collapse.innerText = '⌵';
            div.appendChild(collapse);
            
            let rightNote = document.getElementById('note');

            for (const value of folders[i].notes) {

                let note = document.createElement('div');
                note.className = 'note';
                note.innerText = value.name;
                content.appendChild(note);

                let removenote = document.createElement('button');
                removenote.className = 'removenote';
                removenote.innerText = '-';
                note.appendChild(removenote);

                removenote.addEventListener('click', () => {
                    notes[i].splice(1, 1);
                    showFolders();
                });

                let textarea = document.createElement('textarea');
                note.addEventListener('click', () => {
                    rightNote.innerHTML = '';
                    textarea.value = value.description;
                    rightNote.appendChild(textarea);
                    textarea.focus();
                });
                
                textarea.addEventListener('keyup', () => {
                    value.description = textarea.value;
                });
            }
        }
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
        removeFolder();
    }

    document.getElementById('folder').addEventListener(('click'), () => {
        addFolder();
    });

    const removeFolder = () => {
        for (let i = 0; i < folders.length; i++) {
            document.querySelectorAll('.remove')[i].addEventListener('click', () => {
                folders.splice(i, 1);
                notes[i] = {};
                showFolders(); 
                removeFolder();
            });
        }
    }

    return {
        app
    }

})();

Run.app();