import { styles } from "./styles";
import { script } from "./script";

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

<link rel="preconnect" href="https://fonts.googleapis.com">

<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<link
href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;500;700&display=swap"
rel="stylesheet"
/>

<style>

${styles}

</style>

</head>

<body>

<div class="container">

${content}

</div>

<script>

${script}

</script>

</body>

</html>
`;
}