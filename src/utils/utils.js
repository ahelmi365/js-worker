export const disableBtnElement = (btnElement, btnClassNameToRemove) => {
  btnElement.setAttribute("disabled", true);
  btnElement.classList.remove(btnClassNameToRemove);
};
export const enableBtnElement = (btnElement, btnClassNameToRemove) => {
  btnElement.removeAttribute("disabled");
  btnElement.classList.add(btnClassNameToRemove);
};

export const addTodosList = (ulElement, todos) => {
  ulElement.textContent = "";

  const ulFragment = document.createDocumentFragment();

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = `${todo.title} - ${todo.completed ? "Done" : "Not Done"}`;
    ulFragment.appendChild(li);
  });
  ulElement.appendChild(ulFragment);
};

export const appendUsersDataDocument = (usersDataElem, usersData) => {
  // const userDataFragment = document.createDocumentFragment();
  console.log({ usersData });
  let userCardMarkup = "";
  usersData.forEach((user) => {
    userCardMarkup += `
    <div class="user-card">
        <div class="user-card-name">
            <p><span class="f-bold">Name</span>: ${user.name}</p>
        </div>
        <div class="user-card-email">
            <p><span class="f-bold">Email</span>: ${user.email}</p>
        </div>
        <div class="user-card-phone">
            <p><span class="f-bold">Phone</span>: ${user.phone}</p>
        </div>
        <div class="user-card-website">
            <p><span class="f-bold">Website</span>: ${user.website}</p>
        </div>
    </div>`;
  });
  // userDataFragment.appendChild;
  usersDataElem.innerHTML = userCardMarkup;
  // usersDataElem.appendChild(userDataFragment);
};
