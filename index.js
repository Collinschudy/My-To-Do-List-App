const formElem = document.querySelector(".form")
const inputElement = document.querySelector("input")
const listGroup = document.querySelector(".list")
let list = JSON.parse(localStorage.getItem("list"));
list.forEach(task=>{
    myToDoList(task)
})
let DateElement = document.querySelector('.date')

function date(){
    let currentDate = new Date()
    let local = currentDate.toLocaleString()
    DateElement.innerText = local
    setInterval(date, 1000)
}
date();



formElem.addEventListener("submit", (e)=>{
    e.preventDefault();
    myToDoList()
})

function myToDoList(task){
    let doTask = inputElement.value;
    if(doTask.trim() === "") {
        return;
    }
    if(task){
        doTask = task.name
    }
    const listElem = document.createElement("li");
    if (task && task.checked){
        listElem.classList.add('checked');
    }
    listElem.innerText = doTask;
    listGroup.appendChild(listElem)
    inputElement.value = "";
    const checkBtnElement = document.createElement('div')
    checkBtnElement.innerHTML = `<i class="fa fa-check-square"></i> `;
    listElem.appendChild(checkBtnElement);

    const trashBtnElement = document.createElement('div');

    trashBtnElement.innerHTML = `<i class="fa fa-trash"></i> `;
    listElem.appendChild(trashBtnElement);

    checkBtnElement.addEventListener("click", ()=>{
        listElem.classList.toggle('checked')
        updateLocalStorage()
    })
    trashBtnElement.addEventListener("click", ()=>{
         listElem.remove();
         updateLocalStorage()
    })
    updateLocalStorage()
}

function updateLocalStorage(){
    const listElems = document.querySelectorAll("li")
    list = []
    listElems.forEach(listElem=>{
        list.push({
            name: listElem.innerText,
            checked: listElem.classList.contains("checked")

        })
    })
    localStorage.setItem("list", JSON.stringify(list));
}
 