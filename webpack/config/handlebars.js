const Handlebars = require("handlebars/runtime");
Handlebars.registerHelper("loud", function (aString) {
  return aString.toUpperCase();
});
Handlebars.registerHelper("JSONstringify", (obj, indent = 2) => {
  let cache = [];
  const retVal = JSON.stringify(
    obj,
    (key, value) =>
      typeof value === "object" && value !== null
        ? cache.includes(value)
          ? undefined // Duplicate reference found, discard key
          : cache.push(value) && value // Store value in our collection
        : value,
    indent
  );
  cache = null;
  return retVal;
});
Handlebars.registerHelper("eq", (obj1, obj2) => {
  return obj1 === obj2;
});
module.exports = Handlebars;
