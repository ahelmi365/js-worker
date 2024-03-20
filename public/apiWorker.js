// init worker to call api every interval time
self.addEventListener("message", (eventMessage) => {
  const interval = eventMessage.data.interval;
  const url = eventMessage.data.url;

  const getDataFromAPI = async () => {
    try {
      const response = await fetch(url);
      if (response.status === 200 && response.ok) {
        const data = await response.json();
        self.postMessage(data);
      } else {
        self.reportError(error);
      }
    } catch (error) {
      console.log("error worker");
      self.reportError(error);
    }
  };

  // initial api call
  getDataFromAPI();

  // call the api every interval time
  const intervalId = setInterval(() => {
    getDataFromAPI();
  }, interval);

  // terminate api worker when needed
  self.addEventListener("terminate", () => {
    clearInterval(intervalId);
    self.close();
  });
});
