"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expensiveRenderRule = exports.lazyImageRule = exports.bundleBudgetRule = exports.dynamicImportRule = exports.blockingImportRule = exports.performanceRules = void 0;
const blocking_import_1 = require("./blocking-import");
Object.defineProperty(exports, "blockingImportRule", { enumerable: true, get: function () { return blocking_import_1.blockingImportRule; } });
const dynamic_import_1 = require("./dynamic-import");
Object.defineProperty(exports, "dynamicImportRule", { enumerable: true, get: function () { return dynamic_import_1.dynamicImportRule; } });
const bundle_budget_1 = require("./bundle-budget");
Object.defineProperty(exports, "bundleBudgetRule", { enumerable: true, get: function () { return bundle_budget_1.bundleBudgetRule; } });
const lazy_image_1 = require("./lazy-image");
Object.defineProperty(exports, "lazyImageRule", { enumerable: true, get: function () { return lazy_image_1.lazyImageRule; } });
const expensive_render_1 = require("./expensive-render");
Object.defineProperty(exports, "expensiveRenderRule", { enumerable: true, get: function () { return expensive_render_1.expensiveRenderRule; } });
exports.performanceRules = [
    blocking_import_1.blockingImportRule,
    dynamic_import_1.dynamicImportRule,
    bundle_budget_1.bundleBudgetRule,
    lazy_image_1.lazyImageRule,
    expensive_render_1.expensiveRenderRule
];
