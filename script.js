let currentLevel = 1;
let questions = [];
let index = 0;
let score = 0;
let totalQuestions = 10;

/* ============================= */
/* NORMALIZACIJA LATINICA → ĆIRILICA */
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
/* START NIVOA */
/* ============================= */

function startLevel(level){

let name=document.getElementById("studentName").value;
if(!name){
alert("УНЕСИ ИМЕ 👑");
return;
}

currentLevel = level;
index=0;
score=0;

document.getElementById("map").classList.add("hidden");
document.getElementById("gameArea").classList.remove("hidden");

buildQuestions(level);
showQuestion();
}

/* ============================= */
/* BAZA PITANJA */
/* ============================= */

function shuffle(array){
return array.sort(()=>Math.random()-0.5);
}

function buildQuestions(level){

let pool=[];

/* NIVO 1 */
if(level===1){
totalQuestions=10;

pool=[
{q:"НАПИШИ ЦИФРАМА: ДЕВЕТНАЕСТ",a:"19"},
{q:"НАПИШИ ЦИФРАМА: ЧЕТРНАЕСТ",a:"14"},
{q:"НАПИШИ РЕЧИМА БРОЈ 16",a:"шеснаест"},
{q:"КОЛИКО ЈЕДИНИЦА ИМА БРОЈ 20?",a:"0"},
{q:"ПРЕТХОДНИК БРОЈА 15",a:"14"},
{q:"СЛЕДБЕНИК БРОЈА 19",a:"20"},
{q:"УПИШИ ЗНАК: 18 __ 20",a:"<"},
{q:"УПИШИ ЗНАК: 17 __ 1Д7Ј",a:"="},
{q:"НАЈМАЊИ НЕПАРНИ ДВОЦИФРЕНИ БРОЈ",a:"11"},
{q:"НАЈВЕЋИ ПАРНИ БРОЈ ПРВЕ ДЕСЕТИЦЕ",a:"10"}
];
}

/* NIVO 2 */
if(level===2){
totalQuestions=10;

pool=[
{q:"НАПИШИ СВЕ ПАРНЕ БРОЈЕВЕ ДО 20",a:"2,4,6,8,10,12,14,16,18,20",type:"subset"},
{q:"НАПИШИ СВЕ НЕПАРНЕ БРОЈЕВЕ ДО 20",a:"1,3,5,7,9,11,13,15,17,19",type:"subset"},
{q:"ДА ЛИ ЈЕ 18 ПАРАН? (ДА/НЕ)",a:"да"},
{q:"ДА ЛИ ЈЕ 17 ПАРАН? (ДА/НЕ)",a:"не"},
{q:"ПАРНИ ПРЕТХОДНИК БРОЈА 15",a:"14"},
{q:"НЕПАРНИ СЛЕДБЕНИК БРОЈА 14",a:"15"},
{q:"НАЈВЕЋИ НЕПАРНИ БРОЈ ДРУГЕ ДЕСЕТИЦЕ",a:"19"},
{q:"НАЈМАЊИ ПАРНИ БРОЈ ПРВЕ ДЕСЕТИЦЕ",a:"2"},
{q:"ПАРАН БРОЈ ИЗМЕЂУ 10 И 14",a:"12"},
{q:"НЕПАРАН БРОЈ ИЗМЕЂУ 14 И 18",a:"15"}
];
}

/* NIVO 3 */
if(level===3){
totalQuestions=10;

pool=[
{q:"НАСТАВИ НИЗ: 2,4,6,__,__",a:"8,10"},
{q:"НАСТАВИ НИЗ: 11,13,15,__,__",a:"17,19"},
{q:"НАСТАВИ НИЗ: 19,17,15,__,__",a:"13,11"},
{q:"НАСТАВИ НИЗ: 10,12,14,__,__",a:"16,18"},
{q:"НАПИШИ СВЕ БРОЈЕВЕ ДРУГЕ ДЕСЕТИЦЕ",a:"11,12,13,14,15,16,17,18,19,20"},
{q:"НАПИШИ СВЕ ПАРНЕ БРОЈЕВЕ ДРУГЕ ДЕСЕТИЦЕ",a:"12,14,16,18,20"},
{q:"НАПИШИ СВЕ НЕПАРНЕ БРОЈЕВЕ ДРУГЕ ДЕСЕТИЦЕ",a:"11,13,15,17,19"},
{q:"НАСТАВИ НИЗ: 1,3,5,__,__",a:"7,9"},
{q:"НАСТАВИ НИЗ: 20,18,16,__,__",a:"14,12"},
{q:"НАСТАВИ НИЗ: 5,10,15,__,__",a:"20,25"}
];
}

/* NIVO 4 */
if(level===4){
totalQuestions=10;

pool=[
{q:"АНА ЈЕ ИМАЛА 18 ЈАБУКА. ПОЈЕЛА ЈЕ 6. НАПИШИ ПОСТУПАК.",a:12,type:"oduz"},
{q:"МИЛИЦА ЈЕ ИМАЛА 15 БОМБОНА. ДАЛА ЈЕ 7. НАПИШИ ПОСТУПАК.",a:8,type:"oduz"},
{q:"ПЕТАР ЈЕ ИМАО 20 ЛОПТИ. ИЗГУБИО ЈЕ 9. НАПИШИ ПОСТУПАК.",a:11,type:"oduz"},
{q:"ИЗРАЧУНАЈ 18 - 7",a:"11"},
{q:"ИЗРАЧУНАЈ 20 - 8",a:"12"},
{q:"ИЗРАЧУНАЈ 16 - 9",a:"7"},
{q:"ИЗРАЧУНАЈ 19 - 5",a:"14"},
{q:"ИЗРАЧУНАЈ 17 - 6",a:"11"},
{q:"САРА ЈЕ ИМАЛА 14 ЦВЕТОВА. УБРАЛА ЈЕ 4. НАПИШИ ПОСТУПАК.",a:10,type:"oduz"},
{q:"ЛЕНА ЈЕ ИМАЛА 13 ЦВЕТОВА. УБРАЛА ЈЕ 3. НАПИШИ ПОСТУПАК.",a:10,type:"oduz"}
];
}

/* NIVO 5 */
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
let grade=1;

if(percent>=90) grade=5;
else if(percent>=75) grade=4;
else if(percent>=60) grade=3;
else if(percent>=40) grade=2;

document.getElementById("result").innerHTML=
"🌸 РЕЗУЛТАТ 🌸<br>"+
"ТАЧНО: "+score+" ОД "+totalQuestions+"<br>"+
"ПРОЦЕНАТ: "+percent+"%<br>"+
"ОЦЕНА: "+grade;

setTimeout(()=>{
document.getElementById("gameArea").classList.add("hidden");
document.getElementById("map").classList.remove("hidden");
},3000);

}
