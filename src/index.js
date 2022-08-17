const Run = (() => { 

    const app = () => {
        showFolders();
        removeFolder();
    }

    const notes0 = [
        {
            'name': 'Shopping list',
            'description': 'Milk, Eggs, Apples'
        },
        {
            'name': 'Dog',
            'description': 'Milk'
        },
        {
            'name': 'Cat',
            'description': 'Milk, Eggs'
        },
        {
            'name': 'Car',
            'description': 'Apples'
        },
        {
            'name': 'Hey',
            'description': 'Milkpples'
        },
    ];

    const notes1 = [
        {
            'name': '12321321',
            'description': 'M Eggs, Apples'
        },
        {
            'name': '12412414',
            'description': 'Mies'
        },

    ];

    const folders = [
        {
            'name': 'ASAP',
            'notes': notes0
        },
        {
            'name': 'HOT',
            'notes': notes1
        },
        {
            'name': 'Books'
        }
    ];

    const showFolders = () => {
        let content = document.getElementById('content')
        content.innerHTML = '';
        for (let i = 0; i < folders.length; i++) {
            let div = document.createElement('div');
            div.className = 'folder'
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
            if (folders[i].hasOwnProperty('notes')) {
                for (const value of folders[i].notes) {
                    let note = document.createElement('div');
                    note.className = 'note';
                    note.innerText = value.name;
                    content.appendChild(note);
                    let input = document.createElement('input');
                    note.addEventListener('click', () => {
                        rightNote.innerHTML = '';
                        input.value = value.description;
                        rightNote.appendChild(input);
                    });
                    input.addEventListener('keyup', () => {
                        value.description = input.value;
                    });
                }
            }
        }
    }

    const createFolder = (name) => {
        return {
            'name': name
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
                showFolders(); 
                removeFolder();
            })
        }
    }

    return {
        app
    }

})();

Run.app();