localStorage.setItem("apiWorker", false);
const startWorkerBtn = document.getElementById("startWorker");
const stopWorkerBtn = document.getElementById("stopWorker");
let apiWorker;

// Cleanup function
const stopWorker = () => {
  // Terminate the worker when the component unmounts
  apiWorker?.terminate();
  localStorage.setItem("apiWorker", false);

  enableBtnElement(startWorkerBtn, "start-btn");
  disableBtnElement(stopWorkerBtn, "stop-btn");
};

const startWorkder = () => {
  // Create the worker
  apiWorker = new Worker("../public/worker.js");
  if (apiWorker) {
    localStorage.setItem("apiWorker", true);

    disableBtnElement(startWorkerBtn, "start-btn");
    enableBtnElement(stopWorkerBtn, "stop-btn");
  }
  console.log({ apiWorker });
  // Send message to the worker with the interval
  const interval = 5000; // 5 seconds
  apiWorker.postMessage({ interval: interval });

  // Handle messages from the worker
  apiWorker.onmessage = function (event) {
    console.log("Message from worker: ", event.data);
    // Handle the response from the worker as needed
    const todos = event?.data?.todos;
    addTodosList(todos);
  };
};

const addTodosList = (todos) => {
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

// start worker

startWorkerBtn.addEventListener("click", () => {
  startWorkder();
});

// end worker
stopWorkerBtn.addEventListener("click", () => {
  stopWorker();
});

// disable "stop worker" btn if not worker
const isApiWorker = localStorage.getItem("apiWorker");
console.log({ isApiWorker });

const disableBtnElement = (btnElement, btnClassNameToRemove) => {
  btnElement.setAttribute("disabled", true);
  btnElement.classList.remove(btnClassNameToRemove);
};
const enableBtnElement = (btnElement, btnClassNameToRemove) => {
  btnElement.removeAttribute("disabled");
  btnElement.classList.add(btnClassNameToRemove);
};
