let currentLevel = 1;
let questions = [];
let index = 0;
let score = 0;
let totalQuestions = 10;

/* ============================= */
/* LATINICA → ĆIRILICA */
/* ============================= */

function normalize(text){
text=text.toLowerCase().trim();

const map={
"a":"а","b":"б","c":"ц","č":"ч","ć":"ћ",
"d":"д","đ":"ђ","e":"е","f":"ф",
"g":"г","h":"х","i":"и","j":"ј",
"k":"к","l":"л","m":"м","n":"н",
"o":"о","p":"п","r":"р","s":"с",
"š":"ш","t":"т","u":"у","v":"в",
"z":"з","ž":"ж"
};

let result="";
for(let char of text){
result+=map[char]||char;
}
return result.replace(/\s+/g,"");
}

function normalizeList(text){
return text.replace(/\s/g,"")
.split(",")
.filter(n=>n!=="")
.map(Number)
.sort((a,b)=>a-b);
}

/* ============================= */
/* SRCA */
/* ============================= */

function hearts(){
for(let i=0;i<10;i++){
let h=document.createElement("div");
h.className="heart";
h.innerHTML="❤";
h.style.left=Math.random()*100+"vw";
document.body.appendChild(h);
setTimeout(()=>h.remove(),3000);
}
}

/* ============================= */
/* OTKLJUČAVANJE */
/* ============================= */

function unlockNextLevel(){

let unlocked = JSON.parse(localStorage.getItem("princessUnlocked")) || [1];

let next = currentLevel + 1;

if(next<=5 && !unlocked.includes(next)){
unlocked.push(next);
localStorage.setItem("princessUnlocked",JSON.stringify(unlocked));
}

applyUnlocked();
}

function applyUnlocked(){

let unlocked = JSON.parse(localStorage.getItem("princessUnlocked")) || [1];

for(let i=1;i<=5;i++){
let el=document.getElementById("level"+i);
if(el && unlocked.includes(i)){
el.classList.remove("locked");
el.onclick=function(){startLevel(i);}
}
}
}

window.onload=function(){
applyUnlocked();
};

/* ============================= */
/* START NIVOA */
/* ============================= */

function startLevel(level){

let name=document.getElementById("studentName").value;
if(!name){
alert("УНЕСИ ИМЕ 👑");
return;
}

currentLevel=level;
index=0;
score=0;

document.getElementById("map").classList.add("hidden");
document.getElementById("gameArea").classList.remove("hidden");

buildQuestions(level);
showQuestion();
}

/* ============================= */
/* PITANJA */
/* ============================= */

function shuffle(arr){
return arr.sort(()=>Math.random()-0.5);
}

function buildQuestions(level){

let pool=[];

/* ===== NIVO 1 (NOVI ZADACI) ===== */

if(level===1){

totalQuestions=10;

pool=[
{q:"НАПИШИ ЦИФРАМА: ЈЕДАНАЕСТ",a:"11"},
{q:"НАПИШИ ЦИФРАМА: СЕДАМНАЕСТ",a:"17"},
{q:"НАПИШИ РЕЧИМА БРОЈ 18",a:"осамнаест"},
{q:"НАПИШИ РЕЧИМА БРОЈ 14",a:"четрнаест"},
{q:"КОЛИКО ДЕСЕТИЦА ИМА БРОЈ 13?",a:"1"},
{q:"КОЛИКО ЈЕДИНИЦА ИМА БРОЈ 18?",a:"8"},
{q:"ПРЕТХОДНИК БРОЈА 12",a:"11"},
{q:"СЛЕДБЕНИК БРОЈА 18",a:"19"},
{q:"УПИШИ ЗНАК: 15 __ 12",a:">"},
{q:"УПИШИ ЗНАК: 14 __ 14",a:"="},
{q:"НАЈМАЊИ ПАРНИ БРОЈ ДО 10",a:"2"},
{q:"НАЈВЕЋИ НЕПАРНИ БРОЈ ДО 20",a:"19"},
{q:"БРОЈ ИЗМЕЂУ 12 И 14",a:"13"},
{q:"КОЛИКО ЈЕДИНИЦА ИМА БРОЈ 10?",a:"0"},
{q:"НАПИШИ ЦИФРАМА: ПЕТНАЕСТ",a:"15"}
];

}

/* ===== NIVO 2 ===== */

if(level===2){

totalQuestions=10;

pool=[
{q:"НАПИШИ СВЕ ПАРНЕ БРОЈЕВЕ ДО 20",a:"2,4,6,8,10,12,14,16,18,20",type:"subset"},
{q:"НАПИШИ СВЕ НЕПАРНЕ БРОЈЕВЕ ДО 20",a:"1,3,5,7,9,11,13,15,17,19",type:"subset"},
{q:"ПАРНИ ПРЕТХОДНИК БРОЈА 19",a:"18"},
{q:"НЕПАРНИ СЛЕДБЕНИК БРОЈА 18",a:"19"},
{q:"ДА ЛИ ЈЕ 16 ПАРАН? (ДА/НЕ)",a:"да"},
{q:"ДА ЛИ ЈЕ 13 ПАРАН? (ДА/НЕ)",a:"не"},
{q:"НАЈВЕЋИ ПАРНИ БРОЈ ДО 18",a:"18"},
{q:"НАЈМАЊИ НЕПАРНИ БРОЈ ДРУГЕ ДЕСЕТИЦЕ",a:"11"},
{q:"ПАРАН БРОЈ ИЗМЕЂУ 14 И 18",a:"16"},
{q:"НЕПАРАН БРОЈ ИЗМЕЂУ 10 И 14",a:"11"},
{q:"НАПИШИ СВЕ ПАРНЕ БРОЈЕВЕ ОД 12 ДО 20",a:"12,14,16,18,20",type:"subset"},
{q:"НАПИШИ СВЕ НЕПАРНЕ БРОЈЕВЕ ОД 11 ДО 19",a:"11,13,15,17,19",type:"subset"}
];

}

/* ===== NIVO 3 ===== */

if(level===3){

totalQuestions=10;

pool=[
{q:"НАСТАВИ НИЗ: 2,4,6,__,__",a:"8,10"},
{q:"НАСТАВИ НИЗ: 3,6,9,__,__",a:"12,15"},
{q:"НАСТАВИ НИЗ: 19,17,15,__,__",a:"13,11"},
{q:"НАСТАВИ НИЗ: 10,12,14,__,__",a:"16,18"},
{q:"НАСТАВИ НИЗ: 5,10,15,__,__",a:"20,25"},
{q:"НАПИШИ СВЕ БРОЈЕВЕ ДРУГЕ ДЕСЕТИЦЕ",a:"11,12,13,14,15,16,17,18,19,20"},
{q:"НАПИШИ СВЕ ПАРНЕ БРОЈЕВЕ ДРУГЕ ДЕСЕТИЦЕ",a:"12,14,16,18,20"},
{q:"НАПИШИ СВЕ НЕПАРНЕ БРОЈЕВЕ ДРУГЕ ДЕСЕТИЦЕ",a:"11,13,15,17,19"},
{q:"НАСТАВИ НИЗ: 1,3,5,__,__",a:"7,9"},
{q:"НАСТАВИ НИЗ: 20,18,16,__,__",a:"14,12"},
{q:"НАСТАВИ НИЗ: 4,8,12,__,__",a:"16,20"}
];

}

/* ===== NIVO 4 ===== */

if(level===4){

totalQuestions=10;

pool=[
{q:"АНА ЈЕ ИМАЛА 18 ЈАБУКА. ПОЈЕЛА ЈЕ 6. НАПИШИ ПОСТУПАК.",a:12,type:"oduz"},
{q:"МИЛИЦА ЈЕ ИМАЛА 15 БОМБОНА. ДАЛА ЈЕ 7. НАПИШИ ПОСТУПАК.",a:8,type:"oduz"},
{q:"ПЕТАР ЈЕ ИМАО 20 ЛОПТИ. ИЗГУБИО ЈЕ 9. НАПИШИ ПОСТУПАК.",a:11,type:"oduz"},
{q:"ЈОВАН ЈЕ ИМАО 17 КЊИГА. ПОКЛОНИО ЈЕ 5. НАПИШИ ПОСТУПАК.",a:12,type:"oduz"},
{q:"САРА ЈЕ ИМАЛА 14 ЦВЕТОВА. УБРАЛА ЈЕ 4. НАПИШИ ПОСТУПАК.",a:10,type:"oduz"},
{q:"ИЗРАЧУНАЈ 18 - 7",a:"11"},
{q:"ИЗРАЧУНАЈ 20 - 8",a:"12"},
{q:"ИЗРАЧУНАЈ 16 - 9",a:"7"},
{q:"ИЗРАЧУНАЈ 19 - 5",a:"14"},
{q:"ИЗРАЧУНАЈ 17 - 6",a:"11"},
{q:"ЛЕНА ЈЕ ИМАЛА 13 ЦВЕТОВА. УБРАЛА ЈЕ 3. НАПИШИ ПОСТУПАК.",a:10,type:"oduz"}
];

}

/* ===== NIVO 5 ===== */

if(level===5){
totalQuestions=30;
let all=[];
for(let i=1;i<=4;i++){
buildQuestions(i);
all=all.concat(questions);
}
pool=all;
}

questions = shuffle(pool).slice(0,totalQuestions);
}

/* ============================= */
/* PROVERA */
/* ============================= */

function smartCheck(user,q){

if(q.type==="oduz"){
let cleaned=user.replace(/\s+/g,"").replace("–","-");
let match=cleaned.match(/^(\d+)-(\d+)=(\d+)$/);
if(!match) return false;
let a=parseInt(match[1]);
let b=parseInt(match[2]);
let result=parseInt(match[3]);
return (a-b===result)&&(result==q.a);
}

if(q.type==="subset"){
let userArr=normalizeList(user);
let correctArr=normalizeList(q.a);
for(let n of userArr){
if(!correctArr.includes(n)) return false;
}
return userArr.length>0;
}

if(!isNaN(q.a)){
return Number(user)===Number(q.a);
}

return normalize(user)===normalize(q.a);
}

function showQuestion(){
document.getElementById("question").innerText=
"ПИТАЊЕ "+(index+1)+" ОД "+totalQuestions+": "+questions[index].q;
document.getElementById("answer").value="";
document.getElementById("feedback").innerText="";
}

function checkAnswer(){

let user=document.getElementById("answer").value;
if(user.trim()===""){ alert("УНЕСИ ОДГОВОР 👑"); return; }

let q=questions[index];

if(smartCheck(user,q)){
score++;
document.getElementById("feedback").innerText="ТАЧНО 💖";
hearts();
}else{
document.getElementById("feedback").innerText="НЕТАЧНО ❌";
}

index++;

if(index<totalQuestions){
setTimeout(showQuestion,800);
}else{
finishLevel();
}
}

function finishLevel(){

let percent=Math.round((score/totalQuestions)*100);

if(totalQuestions===10 && score>=8){
unlockNextLevel();
}

setTimeout(()=>{
document.getElementById("gameArea").classList.add("hidden");
document.getElementById("map").classList.remove("hidden");
},2500);
}
