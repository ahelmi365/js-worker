import { enableBtnElement, disableBtnElement } from "./utils.js";

const startWorkerBtn = document.getElementById("startWorker");
const stopWorkerBtn = document.getElementById("stopWorker");
let apiWorker;

// Cleanup function
const stopWorker = () => {
  // if we use react, we should add this cleanup function in the useEffect
  // Terminate the worker
  apiWorker?.terminate();

  enableBtnElement(startWorkerBtn, "start-btn");
  disableBtnElement(stopWorkerBtn, "stop-btn");
};

const startAPIWorker = () => {
  const interval = 5000; // 5 seconds
  const url = "https://jsonplaceholder.typicode.com/users";

  apiWorker = new Worker("../public/apiWorker.js");
  handleActiveWorkerBtns(apiWorker);
  // send message to the worker
  apiWorker.postMessage({ interval, url });

  // recieve message from the worker
  apiWorker.onmessage = (eventMessage) => {
    console.log(eventMessage.data);
  };

  // handle error from the worker
  apiWorker.onerror = (error) => {
    console.log("this is error");
    console.log(error.message);
  };
};
// start worker
startWorkerBtn.addEventListener("click", () => {
  startAPIWorker();
});

// stop worker
stopWorkerBtn.addEventListener("click", () => {
  stopWorker();
});

// handle active worker
const handleActiveWorkerBtns = (apiWorker) => {
  if (apiWorker) {
    disableBtnElement(startWorkerBtn, "start-btn");
    enableBtnElement(stopWorkerBtn, "stop-btn");
  }
};
