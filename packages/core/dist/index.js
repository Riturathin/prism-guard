"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportSarif = exports.reportHtml = exports.reportJson = exports.reportConsole = exports.createDiagnostic = exports.loc = exports.isSourceFile = exports.isReactFile = exports.parseSource = exports.findCycles = exports.buildImportGraph = exports.shouldFail = exports.RuleRegistry = exports.analyze = exports.detectReact = exports.discoverFiles = exports.validateConfig = exports.DEFAULT_CONFIG = exports.loadConfig = void 0;
var config_1 = require("./config");
Object.defineProperty(exports, "loadConfig", { enumerable: true, get: function () { return config_1.loadConfig; } });
Object.defineProperty(exports, "DEFAULT_CONFIG", { enumerable: true, get: function () { return config_1.DEFAULT_CONFIG; } });
var validate_1 = require("./validate");
Object.defineProperty(exports, "validateConfig", { enumerable: true, get: function () { return validate_1.validateConfig; } });
var files_1 = require("./files");
Object.defineProperty(exports, "discoverFiles", { enumerable: true, get: function () { return files_1.discoverFiles; } });
var framework_1 = require("./framework");
Object.defineProperty(exports, "detectReact", { enumerable: true, get: function () { return framework_1.detectReact; } });
var analyzer_1 = require("./analyzer");
Object.defineProperty(exports, "analyze", { enumerable: true, get: function () { return analyzer_1.analyze; } });
var registry_1 = require("./registry");
Object.defineProperty(exports, "RuleRegistry", { enumerable: true, get: function () { return registry_1.RuleRegistry; } });
Object.defineProperty(exports, "shouldFail", { enumerable: true, get: function () { return registry_1.shouldFail; } });
var import_graph_1 = require("./import-graph");
Object.defineProperty(exports, "buildImportGraph", { enumerable: true, get: function () { return import_graph_1.buildImportGraph; } });
Object.defineProperty(exports, "findCycles", { enumerable: true, get: function () { return import_graph_1.findCycles; } });
var ast_1 = require("./utils/ast");
Object.defineProperty(exports, "parseSource", { enumerable: true, get: function () { return ast_1.parseSource; } });
Object.defineProperty(exports, "isReactFile", { enumerable: true, get: function () { return ast_1.isReactFile; } });
Object.defineProperty(exports, "isSourceFile", { enumerable: true, get: function () { return ast_1.isSourceFile; } });
Object.defineProperty(exports, "loc", { enumerable: true, get: function () { return ast_1.loc; } });
var diagnostic_1 = require("./utils/diagnostic");
Object.defineProperty(exports, "createDiagnostic", { enumerable: true, get: function () { return diagnostic_1.createDiagnostic; } });
var console_1 = require("./reporters/console");
Object.defineProperty(exports, "reportConsole", { enumerable: true, get: function () { return console_1.reportConsole; } });
var json_1 = require("./reporters/json");
Object.defineProperty(exports, "reportJson", { enumerable: true, get: function () { return json_1.reportJson; } });
var html_1 = require("./reporters/html");
Object.defineProperty(exports, "reportHtml", { enumerable: true, get: function () { return html_1.reportHtml; } });
var sarif_1 = require("./reporters/sarif");
Object.defineProperty(exports, "reportSarif", { enumerable: true, get: function () { return sarif_1.reportSarif; } });
__exportStar(require("./scoring/score"), exports);
__exportStar(require("./scoring/file-score"), exports);
