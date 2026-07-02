export const styles = `

*{
margin:0;
padding:0;
box-sizing:border-box;
}

:root{

--bg:#0f172a;
--surface:#1e293b;
--surface-2:#111827;

--border:#334155;

--text:#ffffff;
--muted:#94a3b8;

--primary:#2563eb;

--success:#22c55e;
--warning:#f59e0b;
--danger:#ef4444;
--info:#3b82f6;

}

body{

background:var(--bg);

color:var(--text);

background:var(--bg);

color:var(--text);

font-family:"Roboto Condensed",sans-serif;

-webkit-font-smoothing:antialiased;

-moz-osx-font-smoothing:grayscale;

text-rendering:optimizeLegibility;

padding:40px;

line-height:1.5;

}

.container{

max-width:1150px;

margin:auto;

}

h2{

margin:42px 0 20px;

font-size:26px;

}

table{

width:100%;

border-collapse:collapse;

}

th{

background:#273449;

padding:16px;

text-align:left;

font-size:13px;

text-transform:uppercase;

letter-spacing:.5px;

}

td{

padding:16px;

border-top:1px solid var(--border);

vertical-align:top;

}

.hero{

text-align:center;

margin-bottom:50px;

}

.hero h1{

font-size:52px;

margin-bottom:12px;

}

.hero p{

color:var(--muted);

font-size:18px;

margin-bottom:24px;

}

.score-wrapper{

display:flex;

flex-direction:column;

align-items:center;

margin:40px 0 50px;

}

.score-ring{

width:220px;

height:220px;

border-radius:50%;

display:flex;

justify-content:center;

align-items:center;

position:relative;

flex-shrink:0;

}

.score-ring::before{

content:"";

position:absolute;

width:180px;

height:180px;

background:var(--bg);

border-radius:50%;

}

.score-value{

position:relative;

z-index:2;

display:flex;

flex-direction:column;

align-items:center;

justify-content:center;

font-size:64px;

font-weight:700;

line-height:1;

}

.score-value span{

margin-top:8px;

font-size:22px;

font-weight:500;

color:var(--muted);

}

.score-wrapper h2{

margin-top:24px;

font-size:22px;

font-weight:500;

color:var(--muted);

}

.stats{

display:grid;

grid-template-columns:repeat(3,1fr);

gap:20px;

margin-bottom:50px;

}

.card{

background:linear-gradient(
180deg,
var(--surface),
#172033
);

border:1px solid var(--border);

border-radius:16px;

padding:28px;

position:relative;

overflow:hidden;

transition:.25s;

}

.card::before{

content:"";

position:absolute;

left:0;

top:0;

width:100%;

height:4px;

background:var(--accent);

}

.card:hover{

transform:translateY(-4px);

border-color:#4f46e5;

box-shadow:0 12px 30px rgba(0,0,0,.30);

}

.card h3{

font-size:14px;

color:var(--muted);

margin-bottom:14px;

}

.card p{

font-size:34px;

font-weight:700;

}

.icon{

font-size:36px;

margin-bottom:18px;

filter:drop-shadow(
0 0 8px rgba(255,255,255,.15)
);

}

.dashboard-grid{

display:grid;

grid-template-columns:1fr 1fr;

gap:24px;

margin:40px 0 50px;

}

.dashboard-card{

background:var(--surface);

border:1px solid var(--border);

border-radius:18px;

padding:24px;

box-shadow:0 4px 20px rgba(0,0,0,.18);

}

.dashboard-card h2{

margin-top:0;

}

.issues-table{

width:100%;

border-collapse:collapse;

margin-top:24px;

background:var(--surface);

border-radius:14px;

overflow:hidden;

}

.issues-table tr:hover{

background:#263548;

}

.severity{

display:inline-block;

padding:6px 12px;

border-radius:999px;

font-size:12px;

font-weight:700;

}

.error{

background:#7f1d1d;

color:#fecaca;

}

.warning{

background:#78350f;

color:#fde68a;

}

.info{

background:#1e3a8a;

color:#bfdbfe;

}

.rule-bars{

display:flex;

flex-direction:column;

gap:18px;

margin-top:24px;

}

.rule-row{

display:flex;

flex-direction:column;

gap:8px;

}

.rule-header{

display:flex;

justify-content:space-between;

align-items:center;

font-weight:600;

}

.bar{

height:10px;

background:var(--border);

border-radius:999px;

overflow:hidden;

}

.fill{

height:100%;

border-radius:999px;

background:linear-gradient(
90deg,
#3b82f6,
#8b5cf6
);

}

.worst-files{

display:flex;

flex-direction:column;

gap:20px;

margin-top:20px;

}

.worst-file{

background:var(--surface-2);

border:1px solid var(--border);

border-radius:14px;

padding:20px;

}

.wf-header{

display:flex;

justify-content:space-between;

align-items:center;

margin-bottom:12px;

}

.wf-name{

font-weight:600;

font-size:15px;

}

.wf-score{

font-weight:700;

font-size:15px;

}

.wf-bar{

height:12px;

background:var(--border);

border-radius:999px;

overflow:hidden;

margin-bottom:10px;

}

.wf-fill{

height:100%;

border-radius:999px;

transition:width .35s ease;

}

.wf-footer{

font-size:13px;

color:var(--muted);

}

/* ===========================
   DataGrid
=========================== */

.table-toolbar{

display:flex;

justify-content:space-between;

align-items:center;

gap:20px;

margin-bottom:20px;

}

.table-search{

flex:1;

background:var(--surface-2);

border:1px solid var(--border);

border-radius:10px;

padding:12px 16px;

color:white;

font-size:14px;

outline:none;

}

.table-search:focus{

border-color:var(--primary);

}

.rows-select{

background:var(--surface-2);

border:1px solid var(--border);

border-radius:10px;

padding:12px 16px;

color:white;

cursor:pointer;

}

.table-footer{

display:flex;

justify-content:space-between;

align-items:center;

margin-top:20px;

}

.page-info{

font-size:14px;

color:var(--muted);

}

.pagination{

display:flex;

gap:8px;

flex-wrap:wrap;

}

.pagination button{

background:#1f2937;

border:1px solid var(--border);

color:white;

padding:8px 14px;

border-radius:8px;

cursor:pointer;

transition:.2s;

}

.pagination button:hover{

background:#374151;

}

.pagination button.active{

background:var(--primary);

}

.pagination button:disabled{

opacity:.35;

cursor:not-allowed;

}

/* ===========================
   Recommendations
=========================== */

.recommendation-grid{

display:grid;

grid-template-columns:repeat(auto-fit,minmax(320px,1fr));

gap:20px;

margin-top:20px;

}

.recommendation-card{

background:var(--surface);

border-left:4px solid var(--primary);

border-radius:14px;

padding:24px;

transition:.25s;

}

.recommendation-card:hover{

transform:translateY(-3px);

background:#263548;

}

.recommendation-card h3{

font-size:14px;

margin-bottom:12px;

}

.recommendation-card h4{

font-size:20px;

margin-bottom:12px;

}

.recommendation-card p{

color:var(--muted);

line-height:1.7;

}

/* ===========================
   Accordion
=========================== */

.accordion{

margin:36px 0;

background:var(--surface);

border:1px solid var(--border);

border-radius:18px;

overflow:hidden;

}

.accordion summary{

display:flex;

align-items:center;

padding:22px 28px;

cursor:pointer;

font-size:22px;

font-weight:700;

list-style:none;

user-select:none;

}

.accordion summary::-webkit-details-marker{

display:none;

}

.accordion-badge{

margin-left:auto;

background:var(--primary);

color:white;

padding:5px 12px;

border-radius:999px;

font-size:12px;

font-weight:700;

}

.accordion summary::after{

content:"▼";

margin-left:16px;

font-size:13px;

transition:.25s;

}

.accordion:not([open]) summary::after{

transform:rotate(-90deg);

}

.accordion-content{

padding:28px;

border-top:1px solid var(--border);

}

/* ===========================
   Footer
=========================== */

.footer{

margin-top:80px;

padding:40px 0;

color:var(--muted);

}

.footer hr{

border:none;

border-top:1px solid var(--border);

margin-bottom:28px;

}

.footer-content{

display:flex;

justify-content:space-between;

align-items:center;

flex-wrap:wrap;

gap:20px;

font-size:14px;

}

.footer-content strong{

color:white;

}

.footer a{

color:#60a5fa;

text-decoration:none;

}

.footer a:hover{

text-decoration:underline;

}

/* ===========================
   Responsive
=========================== */

@media (max-width:1000px){

.stats{

grid-template-columns:repeat(2,1fr);

}

.dashboard-grid{

grid-template-columns:1fr;

}

}


.score-meta{

margin-top:18px;

color:var(--muted);

font-size:14px;

font-weight:500;

}

@media (max-width:700px){

body{

padding:20px;

}

.stats{

grid-template-columns:1fr;

}

.table-toolbar{

flex-direction:column;

align-items:stretch;

}

.table-footer{

flex-direction:column;

gap:16px;

align-items:flex-start;

}

.issues-table{

display:block;

overflow-x:auto;

white-space:nowrap;

}

.score-ring{

width:180px;

height:180px;

}

.score-ring::before{

width:145px;

height:145px;

}

.score-value{

font-size:48px;

}

.hero h1{

font-size:38px;

}

h2{

font-size:22px;

}

}

`;
