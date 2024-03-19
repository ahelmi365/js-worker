export const disableBtnElement = (btnElement, btnClassNameToRemove) => {
  btnElement.setAttribute("disabled", true);
  btnElement.classList.remove(btnClassNameToRemove);
};
export const enableBtnElement = (btnElement, btnClassNameToRemove) => {
  btnElement.removeAttribute("disabled");
  btnElement.classList.add(btnClassNameToRemove);
};

export const addTodosList = (todos) => {
  const ulElement = document.getElementById("todosList");
  ulElement.textContent = "";

  const ulFragment = document.createDocumentFragment();

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = `${todo.title} - ${todo.completed ? "Done" : "Not Done"}`;
    ulFragment.appendChild(li);
  });
  ulElement.appendChild(ulFragment);
};
