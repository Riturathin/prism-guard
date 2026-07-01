"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unstableContextRule = exports.nestedComponentRule = exports.excessiveUseEffectRule = exports.noLargeComponentRule = exports.noAnonymousComponentRule = exports.noArrayIndexKeyRule = exports.noInlineCallbackRule = exports.reactRules = void 0;
const no_inline_callback_1 = require("./no-inline-callback");
Object.defineProperty(exports, "noInlineCallbackRule", { enumerable: true, get: function () { return no_inline_callback_1.noInlineCallbackRule; } });
const no_array_index_key_1 = require("./no-array-index-key");
Object.defineProperty(exports, "noArrayIndexKeyRule", { enumerable: true, get: function () { return no_array_index_key_1.noArrayIndexKeyRule; } });
const no_anonymous_component_1 = require("./no-anonymous-component");
Object.defineProperty(exports, "noAnonymousComponentRule", { enumerable: true, get: function () { return no_anonymous_component_1.noAnonymousComponentRule; } });
const no_large_component_1 = require("./no-large-component");
Object.defineProperty(exports, "noLargeComponentRule", { enumerable: true, get: function () { return no_large_component_1.noLargeComponentRule; } });
const excessive_useeffect_1 = require("./excessive-useeffect");
Object.defineProperty(exports, "excessiveUseEffectRule", { enumerable: true, get: function () { return excessive_useeffect_1.excessiveUseEffectRule; } });
const nested_component_1 = require("./nested-component");
Object.defineProperty(exports, "nestedComponentRule", { enumerable: true, get: function () { return nested_component_1.nestedComponentRule; } });
const unstable_context_1 = require("./unstable-context");
Object.defineProperty(exports, "unstableContextRule", { enumerable: true, get: function () { return unstable_context_1.unstableContextRule; } });
exports.reactRules = [
    no_inline_callback_1.noInlineCallbackRule,
    no_array_index_key_1.noArrayIndexKeyRule,
    no_anonymous_component_1.noAnonymousComponentRule,
    no_large_component_1.noLargeComponentRule,
    excessive_useeffect_1.excessiveUseEffectRule,
    nested_component_1.nestedComponentRule,
    unstable_context_1.unstableContextRule
];
