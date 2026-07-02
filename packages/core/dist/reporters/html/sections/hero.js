"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hero = hero;
const score_ring_1 = require("./score-ring");
function hero(model) {
    return `

<section class="hero">

<h1>

Prism Guard

</h1>

<p>

Frontend Architecture Intelligence Platform

</p>

${(0, score_ring_1.scoreRing)(model)}

</section>

`;
}
