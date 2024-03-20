import {
  enableBtnElement,
  disableBtnElement,
  appendUsersDataDocument,
} from "./utils.js";

const startWorkerBtn = document.getElementById("startWorker");
const stopWorkerBtn = document.getElementById("stopWorker");
const usersDataElm = document.getElementById("usersData");
const loadingElm = document.getElementById("loading");
const workerDataContainerElm = document.getElementById("workerDataContainer");
let apiWorker;

// Cleanup function
const stopWorker = () => {
  // Terminate the worker when the component unmounts
  apiWorker?.terminate();

  enableBtnElement(startWorkerBtn, "start-btn");
  disableBtnElement(stopWorkerBtn, "stop-btn");
  workerDataContainerElm.classList.add("d-none");
};

const startWorkder = () => {
  // Create the worker
  apiWorker = new Worker("../public/usersWorker.js");
  if (apiWorker) {
    disableBtnElement(startWorkerBtn, "start-btn");
    enableBtnElement(stopWorkerBtn, "stop-btn");
  }
  // Send message to the worker with the interval
  const interval = 5000; // 5 seconds
  apiWorker.postMessage({ interval: interval });

  // Handle messages from the worker
  apiWorker.onmessage = function (event) {
    console.log("Message from worker: ", event.data);
    workerDataContainerElm.classList.remove("d-none");
    const usersData = event?.data?.usersData;
    appendUsersDataDocument(usersDataElm, usersData);
    // Show/hide loading indicator based on API calls
    loadingElm.classList.remove("visible-hide");
    setTimeout(() => {
      loadingElm.classList.add("visible-hide");
    }, 300);
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
