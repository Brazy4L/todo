const Run = (() => { 

    const app = () => {
        showFolders();
        removeFolder();
    }

    const notes = [
        {
            'name': 'Shopping list',
            'description': 'Milk, Eggs, Apples'
        }
    ]

    const folders = [
        {
            'name': 'ASAP',
            notes
        },
        {
            'name': 'HOT'
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
            if (folders[i].hasOwnProperty('notes')) {
                let note = document.createElement('div');
                note.className = 'note';
                note.innerText = folders[i].notes[0].name;
                content.appendChild(note);
            }
        };
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