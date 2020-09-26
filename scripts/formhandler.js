(function (window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;
  var modal = document.getElementById("modal");
  var payment = document.getElementById("submitPayment");
  var span = document.getElementsByClassName("close")[0];

  function FormHandler(selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }
    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    }
  }

  payment.onclick = function () {
    modal.style.display = "block";
  };
  span.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function () {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  FormHandler.prototype.addSubmitHandler = function (fn) {
    console.log("Setting submit handler for form");
    this.$formElement.on("submit", function (event) {
      event.preventDefault();
      var data = {};
      $(this)
        .serializeArray()
        .forEach(function (item) {
          data[item.name] = item.value;
          console.log(item.name + " is " + item.value);
        });
      console.log(data);
      fn(data);
      this.reset();
      this.elements[0].focus();
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
