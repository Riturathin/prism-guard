import { styles } from "./styles";

export function template(content: string): string {
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

${styles}

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