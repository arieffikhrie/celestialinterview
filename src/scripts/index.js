import $ from "jquery";

const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

$(() => {
  if (isIE11) {
    $("html").addClass("isIE11");
  }
});

// Add your code here
console.log("Hello");
