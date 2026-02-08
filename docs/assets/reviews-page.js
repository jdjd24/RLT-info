(function () {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  if ((month + 1) % 2 === 0) {
    month -= 1;
    if (month < 0) {
      month = 10;
      year -= 1;
    }
  }
  var names = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var label = names[month] + " " + year;
  var el = document.getElementById("last-updated");
  if (el) {
    el.textContent = label;
  }
})();
