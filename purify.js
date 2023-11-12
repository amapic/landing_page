// import purify from "purify-css";
const purify = require("purify-css")

// let content = ""
// let css = ""
// let options = {
//     output: "filepath/output.css"
// }
// purify(content, css, options)

var content = ["**/components/*.jsx","**/pages/index.jsx","**/index.html"];
var css = ["**.css"];

var options = {
  // Will write purified CSS to this file.
  output: "./purified.css",
  
};

purify(content, css, options);
