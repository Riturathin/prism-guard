"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectReact = detectReact;
function detectReact(files) {
    return files.some(file => file.endsWith(".jsx") ||
        file.endsWith(".tsx"));
}
