// let container = document.querySelector(".container");
let inpName = document.querySelector("#name");
let inpPhone = document.querySelector("#phone");
let inpImg = document.querySelector("#img");
let btn = document.querySelector("from btn");
let list = document.querySelector('#list')
let form = document.querySelector('form')
console.log(inpImg);

createTask();
function createTask() {
  if (!localStorage.getItem("tasks-data")) {
    localStorage.setItem("tasks-data", "[]")
  }
  let data = JSON.parse(localStorage.getItem('tasks-data'));
  console.log(data);
  list.innerHTML = "";
  data.forEach((elem, index) => {
    list.innerHTML += `
    <li>
    ${elem.name}
    <span style="background-color:pink">${elem.name}</span>
    <img src="${elem.img}" alt="Girl in a jacket" width="700" height="800">
    <button id="btnDel" onclick="deleteTask(${index})">delete</button> 
    <button  id="btnEdit" onclick="editTask(${index})">Edit</button> 
    `;
  });
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
   if (!inpName.value.trim() || !inpPhone.value.trim() || !inpImg.value.trim()){
    alert("Напиши что нибудь!");
    return;
   }
let obj = {
  name: inpName.value,
  phone: inpPhone.value,
  img:  inpImg.value,
};

let data = JSON.parse(localStorage.getItem("tasks-data"));
data.push(obj);
localStorage.setItem("tasks-data", JSON.stringify(data));
obj.value = "";
createTask();
});


// ? Delete 
function deleteTask(index) {
  let data = JSON.parse(localStorage.getItem("tasks-data"));
  data.splice(index, 1);
  localStorage.setItem("tasks-data", JSON.stringify(data));
  createTask()
}

//  ? Edit

//!  Edit-изменение 
// стягиваем из html документа следующие элементы 
let modal = document.querySelector(".modal"); 
let inpEdit = document.querySelector(".modal_body input"); 
let btnSave = document.querySelector(".modal_body button"); 
let closeModal = document.querySelector(".modal_footer button"); 
 
// функция Edit принимает индекс объекта ,который надо изменить в виде аргумента 
function editTask(index) { 
  modal.style.display = "block"; 
  // стягиваем данные с localStorage  
  // для изменения определнного объекта 
  let data = JSON.parse(localStorage.getItem('tasks-data')) 
  // изменяем значение input , который будет содержать старое занчение 
  inpEdit.value = data[index].task 
  inpEdit.setAttribute('id',index) 
} 
// закрытие модального окна при нажатии на кнопку 
closeModal.addEventListener('click', () => { 
  modal.style.display='none' 
}) 
// Сохранение измененного объекта 
btnSave.addEventListener('click', () => { 
  let id = inpEdit.id 
  // стягиваем данные с localStorage  
  let data = JSON.parse(localStorage.getItem('tasks-data')) 
  // формирование объекта , котрый мы хотим поместить вместо старого 
  let newObj = { 
    task:inpEdit.value, 
  } 
  // добавляем новый объект через метод splice ,  
  // который принимает индекс старого(удаляемого объекта) , 
  // кол-во удаляемых объектов и новый добавляемый объект   
  data.splice(id,1,newObj) 
  // кладем данные в localStorage 
  localStorage.setItem('tasks-data', JSON.stringify(data)) 
  // закрываем модалку 
  modal.style.display='none' 
  // обновление списка  
  createTask() 
})