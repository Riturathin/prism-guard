"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = template;
const styles_1 = require("./styles");
const script_1 = require("./script");
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

<link rel="preconnect" href="https://fonts.googleapis.com">

<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<link
href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;500;700&display=swap"
rel="stylesheet"
/>

<style>

${styles_1.styles}

</style>

</head>

<body>

<div class="container">

${content}

</div>

<script>

${script_1.script}

</script>

</body>

</html>
`;
}
