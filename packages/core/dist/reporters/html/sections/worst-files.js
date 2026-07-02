"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.worstFiles = worstFiles;
const path_1 = __importDefault(require("path"));
function worstFiles(model) {
    const rows = model.files
        .slice(0, 5)
        .map(file => `

        <tr>

        <td>${path_1.default.basename(file.file)}</td>

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
