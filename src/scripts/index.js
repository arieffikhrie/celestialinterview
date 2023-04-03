import $ from "jquery";

$(() => {
  if (isIE11) {
    $("html").addClass("isIE11");
  }
});

// Add your code here
console.log("Hello");
