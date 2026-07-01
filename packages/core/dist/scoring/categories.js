"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CATEGORY_WEIGHT = exports.Category = void 0;
var Category;
(function (Category) {
    Category["Architecture"] = "architecture";
    Category["Performance"] = "performance";
    Category["Maintainability"] = "maintainability";
    Category["Accessibility"] = "accessibility";
})(Category || (exports.Category = Category = {}));
exports.CATEGORY_WEIGHT = {
    [Category.Architecture]: 0.35,
    [Category.Performance]: 0.30,
    [Category.Maintainability]: 0.25,
    [Category.Accessibility]: 0.10
};
