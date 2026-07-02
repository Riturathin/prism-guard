export const styles = `
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

.card h3{

color:#94a3b8;

font-size:14px;

margin-bottom:10px;

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
`;