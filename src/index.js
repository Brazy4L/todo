const folders = ['Hot', 'Archive'];

const showFolders = () => {
    let content = document.getElementById('content')
    content.innerHTML = ''
    folders.forEach((item) => {
        let div = document.createElement('div');
        div.className = 'folder'
        div.innerText = item;
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
    })
}

showFolders();

const addFolder = () => {
    let name = prompt('Name:')
    folders.push(name);
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

removeFolder();

const createNote = (tit, desc) => {
    return {
        title: tit,
        description: desc,
    }
}

let note1 = createNote('ASAP', 'Buy milk');