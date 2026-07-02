"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = template;
const styles_1 = require("./styles");
function template(content) {
    return `
<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8"/>

<meta
    name="viewport"
    content="width=device-width, initial-scale=1"
/>

<title>Prism Guard Report</title>

<style>

${styles_1.styles}

</style>

</head>

<body>

<div class="container">

${content}

</div>

</body>

</html>
`;
}
