const addBtn = document.getElementById('add-btn');
const noteContainer = document.querySelector('.notes-container')

const notes = JSON.parse(localStorage.getItem('notes'))
if(notes) {
    notes.forEach(note => addNewNote(note))
}

addBtn.addEventListener('click', () => addNewNote())

function addNewNote(text = '') {
    const note = document.createElement('div')
    note.classList.add('note')

    note.innerHTML =   `
    <span class="note-header">
        <button class="edit">
            <span class="iconify" data-icon="bx:bxs-edit" data-inline="false"></span>
        </button>  
        <button class="share">
            <span class="iconify" data-icon="bi:share" data-inline="false"></span>
        </button>
        <button class="delete">
            <span class="iconify" data-icon="fluent:delete-20-filled" data-inline="false"></span>
        </button>
    </span> 
    <span class="text-area">
    <div class="main ${text ? "": "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    </span>
    <div class="overlay"></div>

    `

    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');
    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea')
    const shareBtn = note.querySelector('.share')
    const shareModal = document.querySelector('.share-btns');
    const title = window.document.title;
    const url = window.document.location;
    const overlay = document.querySelector('.overlay');

    
    shareBtn.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: `${title}`,
                url: `${url, text}`
            }).then(() => {
                console.log('Thanks for sharing');
            })
            .catch(console.error)
        } else {
            overlay.classList.add('show-share');
            shareModal.classList.add('show-share')
        }

    })
    overlay.addEventListener('click', () => {
        overlay.classList.remove('show-share')
        shareModal.classList.remove("show-share")
    })


    textArea.value = text
    main.innerHTML = marked(text)


    deleteBtn.addEventListener('click', () => {
        note.remove()

        updateLS()
    })

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
    })


    textArea.addEventListener('input', (e) => {
        const { value } = e.target

        main.innerHTML = marked(value)
        updateLS()
    })

    noteContainer.appendChild(note)
}

function updateLS() {
    const notesText= document.querySelectorAll('textarea')

    const notes = [] 

    notesText.forEach(note => notes.push(note.value))

    localStorage.setItem('notes', JSON.stringify(notes))
}


// const shareBtns = document.querySelector('.share-btn');
// const title = window.document.title;
// const url = window.document.location;
// const overlay = document.querySelector('.overlay');
