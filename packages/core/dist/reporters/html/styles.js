"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styles = void 0;
exports.styles = `
*{
margin:0;
padding:0;
box-sizing:border-box;
}

body{

background:#0f172a;

color:white;

font-family:
Inter,
system-ui,
sans-serif;

padding:40px;

}

.container{

max-width:1200px;

margin:auto;

}

.hero{

text-align:center;

margin-bottom:40px;

}

.hero h1{

font-size:48px;

margin-bottom:12px;

}

.hero p{

color:#94a3b8;

margin-bottom:24px;

}

.score{

font-size:72px;

font-weight:bold;

}

.score span{

font-size:26px;

color:#94a3b8;

}

.stats{

display:grid;

grid-template-columns:repeat(3,1fr);

gap:20px;

margin-bottom:40px;

}

.card{

background:#1e293b;

padding:24px;

border-radius:12px;

}

.card{

background:linear-gradient(
180deg,
#1e293b,
#172033
);

border:1px solid #334155;

border-radius:16px;

padding:28px;

transition:all .25s ease;

cursor:default;

position:relative;

overflow:hidden;

}

.card:hover{

transform:translateY(-4px);

border-color:#4f46e5;

box-shadow:
0 12px 30px rgba(0,0,0,.30);

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

.card p{

font-size:32px;

font-weight:bold;

}

table{

width:100%;

border-collapse:collapse;

}

th{

text-align:left;

padding:16px;

background:#1e293b;

}

td{

padding:16px;

border-bottom:1px solid #334155;

}

h2{

margin-bottom:20px;

margin-top:40px;

}
.score-wrapper{

display:flex;

flex-direction:column;

align-items:center;

margin-top:40px;

margin-bottom:50px;

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
    background:#0f172a;
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
    color:#94a3b8;
    font-weight:500;
}

display:flex;

justify-content:center;

align-items:center;

}

.score-ring::before{

content:"";

width:180px;

height:180px;

background:#0f172a;

border-radius:50%;

display:block;

position:absolute;

}

.score-value{

position:absolute;

font-size:64px;

font-weight:700;

z-index:10;

}

.score-value span{

font-size:22px;

color:#94a3b8;

}

.score-wrapper h2{

margin-top:25px;

font-size:22px;

font-weight:500;

color:#94a3b8;

}

.issues-table{

width:100%;

border-collapse:collapse;

margin-top:25px;

background:#1e293b;

border-radius:12px;

overflow:hidden;

}

.issues-table th{

background:#273449;

padding:16px;

text-align:left;

font-size:13px;

letter-spacing:.5px;

text-transform:uppercase;

}

.issues-table td{

padding:16px;

border-top:1px solid #334155;

vertical-align:top;

}

.issues-table tr:hover{

background:#263548;

}

.severity{

padding:6px 12px;

border-radius:30px;

font-size:12px;

font-weight:700;

display:inline-block;

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

margin-top:30px;

}

.rule-row{

margin-bottom:18px;

}

.rule-header{

display:flex;

justify-content:space-between;

margin-bottom:8px;

font-weight:600;

}

.bar{

height:10px;

background:#334155;

border-radius:20px;

overflow:hidden;

}

.fill{

height:100%;

background:linear-gradient(
90deg,
#3b82f6,
#8b5cf6
);

border-radius:20px;

}

.recommendation-grid{

display:grid;

grid-template-columns:repeat(auto-fit,minmax(320px,1fr));

gap:20px;

margin-top:25px;

}

.recommendation-card{

background:#1e293b;

border-left:4px solid #3b82f6;

padding:24px;

border-radius:12px;

transition:.2s;

}

.recommendation-card:hover{

transform:translateY(-3px);

background:#263548;

}

.recommendation-card h3{

margin-bottom:12px;

font-size:14px;

}

.recommendation-card h4{

margin-bottom:10px;

font-size:20px;

}

.recommendation-card p{

color:#94a3b8;

line-height:1.6;

}

.footer{

margin-top:80px;

padding:40px 0;

color:#94a3b8;

}

.footer hr{

border:none;

border-top:1px solid #334155;

margin-bottom:30px;

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
.dashboard-grid{

display:grid;

grid-template-columns:1fr 1fr;

gap:24px;

margin-top:40px;

margin-bottom:50px;

}

.dashboard-card{

background:#1e293b;

padding:24px;

border-radius:18px;

border:1px solid #334155;

box-shadow:

0 4px 20px rgba(0,0,0,.18);

}

.dashboard-card h2{

margin-top:0;

margin-bottom:24px;

}


.icon{

font-size: 16px;

margin-bottom:18px;

filter:drop-shadow(
0 0 8px rgba(255,255,255,.15)
);

}

.worst-files{

display:flex;

flex-direction:column;

gap:24px;

margin-top:20px;

}

.worst-file{

padding:20px;

background:#111827;

border-radius:14px;

border:1px solid #334155;

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

font-size:15px;

font-weight:700;

}

.wf-bar{

height:12px;

background:#334155;

border-radius:20px;

overflow:hidden;

margin-bottom:10px;

}

.wf-fill{

height:100%;

border-radius:20px;

transition:width .5s ease;

}

.wf-footer{

font-size:13px;

color:#94a3b8;

}

@media (max-width:900px){

.dashboard-grid{

grid-template-columns:1fr;

}

.stats{

grid-template-columns:repeat(2,1fr);

}

}
`;
