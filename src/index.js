import { format } from 'date-fns';

const Run = (() => {
    const app = () => {
        getItems();
        showFolders();
    }

    let notes = [
        [
            {
                'name': 'Click this note.',
                'description': 'Hi!\n\n\n              Create folders by clicking "+ Folder"\n\n              Create notes by clicking ✖️\n\n              Rename folder by clicking ✏️\n\n              Delete folder and its content by clicking ➖\n\n              Delete individual note by clicking ➖ next to it\n\n\n                                                                         Have fun!',
                'created': '',
                'lastedited': ''
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
        setItems();
        let content = document.getElementById('content')
        content.innerHTML = '';
        for (let i = 0; i < folders.length; i++) {
            let div = document.createElement('div');
            div.className = 'folder';
            content.appendChild(div);

            let foldername = document.createElement('div');
            foldername.className = 'foldername';
            foldername.innerText = folders[i].name;
            div.appendChild(foldername);

            let renamefolder = document.createElement('textarea');
            renamefolder.className = 'renamefolder';
            div.appendChild(renamefolder);

            let buttons = document.createElement('div');
            buttons.className = 'buttons';
            div.appendChild(buttons);

            let rename = document.createElement('button');
            rename.className = 'rename';
            rename.innerText = '✏️';
            buttons.appendChild(rename);

            rename.addEventListener('click', () => {
                if (renamefolder.classList.contains('show')) {
                    renamefolder.classList.remove('show');
                    foldername.innerText = renamefolder.value;
                    rename.innerText = '✏️';
                } else {
                    foldername.innerText = '';
                    renamefolder.value = folders[i].name;
                    renamefolder.classList.add('show');
                    renamefolder.focus();
                    rename.innerText = '💾';
                }
                renamefolder.addEventListener('input', () => {
                    folders[i].name = renamefolder.value;
                    setItems();
                });
            });

            let remove = document.createElement('button');
            remove.className = 'remove';
            remove.innerText = '➖';
            buttons.appendChild(remove);

            remove.addEventListener('click', () => {
                rightNote.innerHTML = '';
                folders.splice(i, 1);
                notes.splice(i, 1);
                showFolders();
            });

            let add = document.createElement('button');
            add.className = 'add';
            add.innerText = '✖️';
            buttons.appendChild(add);

            add.addEventListener('click', () => {
                folders[i].notes.push(createNote());
                showFolders();
                let currentNotesLength = folders[i].notes.length;
                let clickIt = document.querySelector(`#content > div:nth-child(${i + 1}) > div:nth-child(${currentNotesLength + 3})`);
                clickIt.click();
                let noteName = document.getElementsByClassName('notename');
                for (let i = 0; i < noteName.length; i++) {
                    noteName.item(i).focus();
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
                removenote.innerText = '➖';
                note.appendChild(removenote);

                removenote.addEventListener('click', (event) => {
                    event.stopPropagation();
                    rightNote.innerHTML = '';
                    folders[i].notes.splice(j, 1);
                    showFolders();
                });

                let noteName = document.createElement('textarea');
                let mainText = document.createElement('textarea');
                let lastedited = document.createElement('div');
                let created = document.createElement('div');
                let edited = document.createElement('div');
                note.addEventListener('click', () => {
                    showActiveNote();
                    note.classList.add('noteactive');
                    rightNote.innerHTML = '';
                    noteName.className = 'notename';
                    noteName.value = folders[i].notes[j].name;
                    rightNote.appendChild(noteName);
                    mainText.className = 'maintext';
                    mainText.value = folders[i].notes[j].description;
                    rightNote.appendChild(mainText);
                    mainText.focus();
                    lastedited.className = 'lastedited';
                    rightNote.appendChild(lastedited);
                    created.className = 'created';
                    if (folders[i].notes[j].created === '') {
                    folders[i].notes[j].created = format(new Date(), "yyyy-MM-dd HH:mm:ss");
                    folders[i].notes[j].lastedited = format(new Date(), "yyyy-MM-dd HH:mm:ss");
                    }
                    created.innerText = 'Created: ' + folders[i].notes[j].created;
                    edited.className = 'edited';
                    edited.innerText = 'Edited:' + `${'\xa0'.repeat(3)}` + folders[i].notes[j].lastedited;
                    lastedited.appendChild(edited);
                    lastedited.appendChild(created);
                });
                noteName.addEventListener('input', () => {
                    folders[i].notes[j].name = noteName.value;
                    note.innerText = noteName.value;
                    note.appendChild(removenote);
                    folders[i].notes[j].lastedited = format(new Date(), "yyyy-MM-dd HH:mm:ss");
                    edited.innerHTML = 'Edited:' + `${'\xa0'.repeat(3)}` + folders[i].notes[j].lastedited;
                    setItems();
                });
                mainText.addEventListener('input', () => {
                    folders[i].notes[j].description = mainText.value;
                    folders[i].notes[j].lastedited = format(new Date(), "yyyy-MM-dd HH:mm:ss");
                    edited.innerText = 'Edited:' + `${'\xa0'.repeat(3)}` + folders[i].notes[j].lastedited;
                    setItems();
                    console.log(folders);
                });
            }
        }
    }


    const createFolder = (num) => {
        const newFolder = () => {
            notes.push([],);
            return notes[num];
        }
        return {
            'name': '',
            'notes': newFolder()
        }
    }

    const addFolder = () => {
        let l = folders.length;
        folders.push(createFolder(l));
        showFolders();
        let clickRename = document.querySelector(`#content > div:nth-child(${l + 1}) > div.buttons > button.rename`)
        clickRename.click();
    }

    document.getElementById('folder').addEventListener('click', () => {
        addFolder();
    });

    document.getElementById('logo').addEventListener('click', () => {
        showActiveNote();
        rightNote.innerHTML = '';
    });

    const createNote = () => {
        return {
            'name': '',
            'description': '',
            'created': '',
            'lastedited': ''
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