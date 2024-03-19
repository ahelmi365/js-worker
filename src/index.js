let apiWorker;

// Cleanup function
const stopWorker = () => {
  // Terminate the worker when the component unmounts
  apiWorker.terminate();
};

const startWorkder = () => {
  // Create the worker
  apiWorker = new Worker("../public/worker.js");
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
const startWorkerBtn = document.getElementById("startWorker");
startWorkerBtn.addEventListener("click", () => {
  startWorkder();
});

// end worker
const endWorkerBtn = document.getElementById("endWorker");
endWorkerBtn.addEventListener("click", () => {
  stopWorker();
});
