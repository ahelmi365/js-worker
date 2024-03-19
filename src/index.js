import {
  enableBtnElement,
  disableBtnElement,
  addTodosList,
} from "./utils/utils.js";

const startWorkerBtn = document.getElementById("startWorker");
const stopWorkerBtn = document.getElementById("stopWorker");
let apiWorker;

// Cleanup function
const stopWorker = () => {
  // Terminate the worker when the component unmounts
  apiWorker?.terminate();

  enableBtnElement(startWorkerBtn, "start-btn");
  disableBtnElement(stopWorkerBtn, "stop-btn");
};

const startWorkder = () => {
  // Create the worker
  apiWorker = new Worker("../public/worker.js");
  if (apiWorker) {
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

// start worker

startWorkerBtn.addEventListener("click", () => {
  startWorkder();
});

// end worker
stopWorkerBtn.addEventListener("click", () => {
  stopWorker();
});
