if ("Worker" in navigator) {
  window.addEventListener("load", function() {
    navigator.Worker
      .register("/assets/js/Worker.js")
      .then(res => console.log("worker registered"))
      .catch(err => console.log("worker not registered", err))
  })
}
