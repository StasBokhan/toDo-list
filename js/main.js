// находим форму

const form = document.querySelector("#form"),
  taskInput = document.querySelector("#taskInput"),
  h1Text = document.querySelector("#emptyList"),
  taskList = document.querySelector("#tasksList");

const checkEmptyList = () => {
  if (tasks.length === 0) {
    const emptyListElement = `<li id="emptyList" class="list-group-item empty-list">
      <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3" />
      <div class="empty-list__title">Список дел пуст</div>
    </li>`;
    taskList.insertAdjacentHTML("afterbegin", emptyListElement);
  } else {
    const emptyListEl = document.querySelector("#emptyList");
    emptyListEl ? emptyListEl.remove() : null;
  }
};

let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

tasks.forEach((element) => {
  const cssClass = element.done ? "task-title task-title--done" : "task-title";

  const taskHtml = `<li id ='${element.id}' class="list-group-item d-flex justify-content-between task-item">
                 <span class="${cssClass}">${element.text}</span>
                 <div class="task-item__buttons">
                   <button type="button" data-action="done" class="btn-action">
                     <img src="./img/tick.svg" alt="Done" width="18" height="18" />
                   </button>
                   <button type="button" data-action="delete" class="btn-action">
                     <img src="./img/cross.svg" alt="Done" width="18" height="18" />
                   </button>
                 </div>
               </li>`;

  taskList.insertAdjacentHTML("beforeend", taskHtml);
});

checkEmptyList();

const addTask = (event) => {
  event.preventDefault(); // отменяем перезагрузку
  const inputText = taskInput.value; // извлекаем содержимое инпута

  const newTask = {
    id: Date.now(),
    text: inputText,
    done: false,
  };

  tasks.push(newTask);
  savetoLocalSt();

  savetoLocalSt();
  console.log(tasks);
  const cssClass = newTask.done ? "task-title task-title--done" : "task-title";

  const taskHtml = `<li id ='${newTask.id}' class="list-group-item d-flex justify-content-between task-item">
                 <span class="${cssClass}">${newTask.text}</span>
                 <div class="task-item__buttons">
                   <button type="button" data-action="done" class="btn-action">
                     <img src="./img/tick.svg" alt="Done" width="18" height="18" />
                   </button>
                   <button type="button" data-action="delete" class="btn-action">
                     <img src="./img/cross.svg" alt="Done" width="18" height="18" />
                   </button>
                 </div>
               </li>`;

  taskList.insertAdjacentHTML("beforeend", taskHtml);

  taskInput.value = "";
  taskInput.focus();
  checkEmptyList();
};

const deleteTask = (event) => {
  if (event.target.dataset.action !== "delete") {
    return;
  } else {
    const parentNode = event.target.closest("li"),
      id = Number(parentNode.id);

    tasks = tasks.filter((item) => item.id != id);
    savetoLocalSt();
    parentNode.remove();
  }
  checkEmptyList();
};

const completeTask = (event) => {
  if (event.target.dataset.action !== "done") {
    return;
  } else {
    const parentNode = event.target.closest("li");
    const id = Number(parentNode.id);

    const task = tasks.find((item) => item.id === id);
    task.done = !task.done;

    savetoLocalSt();

    const textTitle = parentNode.querySelector(".task-title");
    textTitle.classList.toggle("task-title--done");

    savetoLocalSt();
  }
};

taskList.addEventListener("click", deleteTask);
taskList.addEventListener("click", completeTask);
form.addEventListener("submit", addTask);

const savetoLocalSt = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
