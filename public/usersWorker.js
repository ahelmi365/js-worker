/* eslint-disable no-restricted-globals */
self.addEventListener("message", function (e) {
  // Receive message from main thread
  const interval = e.data.interval;

  // Function to call the API
  const getUsersData = async () => {
    console.log("Calling API...");

    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const usersData = await res.json();
    self.postMessage({ usersData });
  };

  // Call the API initially
  getUsersData();

  // Set interval to call the API
  const apiInterval = setInterval(function () {
    getUsersData();
  }, interval);

  // Terminate worker if needed
  self.addEventListener("terminate", function () {
    clearInterval(apiInterval);
    self.close();
  });
});
