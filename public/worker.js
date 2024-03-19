/* eslint-disable no-restricted-globals */

// worker.js
self.addEventListener("message", function (e) {
  // Receive message from main thread
  const interval = e.data.interval;

  // Function to call the API
  const getTodos = async () => {
    console.log("Calling API...");

    const res = await fetch("https://jsonplaceholder.typicode.com/todos");

    const todos = await res.json();

    // console.log({ todos });
    self.postMessage({ todos });
  };

  // Call the API initially
  getTodos();

  // Set interval to call the API
  const apiInterval = setInterval(function () {
    getTodos();
  }, interval);

  // Terminate worker if needed
  self.addEventListener("terminate", function () {
    clearInterval(apiInterval);
    self.close();
  });
});
