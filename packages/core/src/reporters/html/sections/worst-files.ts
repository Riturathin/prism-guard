import path from "path";
import type { HtmlReportModel } from "../model";

export function worstFiles(model: HtmlReportModel): string {

    const rows = model.files
        .slice(0,5)
        .map(file=>`

        <tr>

        <td>${path.basename(file.file)}</td>

        <td>${file.score}</td>

        </tr>

        `)
        .join("");

        return `

        <section>

        <h2>Worst Files</h2>

        <table>

        <thead>

        <tr>

        <th>File</th>

        <th>Score</th>

        </tr>

        </thead>

        <tbody>

        ${rows}

        </tbody>

        </table>

        </section>

`;

}