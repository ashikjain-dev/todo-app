const todoULEl = document.querySelector(".todos");
const searchEL = document.getElementById("input");
const formEl = document.getElementById("form");
const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach((todoEl) => {
    const { text, completed } = todoEl;
    const li = document.createElement("li");
    li.innerHTML = text;
    if (completed) {
      li.classList.add("completed");
    }
    todoULEl.appendChild(li);
  });
}
todoULEl.addEventListener("click", (e) => {
  e.target.classList.toggle("completed");
  updateLS();
});

todoULEl.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  e.target.remove();
  updateLS();
});
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  if (searchEL.value) {
    const li = document.createElement("li");
    li.innerHTML = searchEL.value;
    searchEL.value = "";
    todoULEl.appendChild(li);
    updateLS();
  }
});

function updateLS() {
  const todoLiEl = document.querySelectorAll("li");

  const listItemArray = [];
  todoLiEl.forEach((ele) => {
    listItemArray.push({
      text: ele.innerHTML,
      completed: ele.classList.contains("completed"),
    });
  });
  localStorage.setItem("todos", JSON.stringify(listItemArray));
}
