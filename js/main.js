// toast
const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
})
}

// ~ variables
const input = document.querySelector('input[type="text"]');
const addBtn = document.querySelector('.add-btn');
const updateBtn = document.querySelector('.update-btn');
const deleteBtn = document.querySelector('.delete-btn');
const todosList = document.getElementById('todos');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let updateIndex;



SetDataAtLocasStorageAndDisplay();


// ? Functions
// add todo
function CreateTodo(){
    let todo = input.value;
    todos.push(todo);
    console.log(todos);
    input.value = '';

    SetDataAtLocasStorageAndDisplay();
}

// display todos in UI
function DisplayTodos(list){
    todosList.innerHTML = ``;
    for (let i = 0; i < list.length; i++) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class="d-flex align-items-center">
            <input type="checkbox" class="form-check-input"  />
                    <div class="task-text ms-3">
                        <p>Task ${i+1}</p>
                        <p>${list[i]}</p>
                    </div>
                </div>
                <div class="icons">
                    <button onclick="GetTodoInfo(${i})" type="button" class="btn btn-sm">
                        <img src="./icons/pen-to-square-regular.svg" class="icon" alt="" />
                    </button>
                    <button type="button" class="btn btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img src="./icons/trash-can-regular.svg" class="icon" alt="" />
                    </button>
            </div>
        `;
        todosList.appendChild(listItem);
    }
}

// set a todo to local storage
function SetDataAtLocasStorageAndDisplay(){
    localStorage.setItem('todos', JSON.stringify(todos));
    DisplayTodos(todos);
}

// get the clicked todo
function GetTodoInfo(index){
    updateIndex = index;
    addBtn.classList.replace('d-block', 'd-none');
    updateBtn.classList.replace('d-none', 'd-block');    
    input.value = todos[index];
}

// update todo
function UpdateTodo(){
    todos[updateIndex] = input.value;
    SetDataAtLocasStorageAndDisplay();
    input.value = '';
}

function DeleteTodo(index){
    updateIndex = index;
    todos.splice(updateIndex, 1);
    SetDataAtLocasStorageAndDisplay();
}

function HideModal(){
    const modal = document.querySelector('.modal');
    modal.style = 'display: none';

    const body = document.querySelector('body')
    body.removeChild(document.querySelector('.modal-backdrop'));
}

function toggleTodo() {
    const li = document.querySelector('li');
    li.classList.toggle('checked');
}

// ! Event Listeners
addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    CreateTodo();
})

updateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    UpdateTodo();
})

deleteBtn.addEventListener('click', () => {
    DeleteTodo();
    HideModal();
})

// toggle todo
const check = document.querySelector('input[type="checkbox"]');
check.addEventListener('click', () => {
    const li = document.querySelector('li');
    li.classList.toggle('checked');
})