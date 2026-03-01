let currentLevel = 1;
let questions = [];
let index = 0;
let score = 0;
let wrong = 0;
let totalQuestions = 10;

function normalize(text){
return text.toLowerCase().trim().replace(/\s+/g,"");
}

function normalizeList(text){
return text.replace(/\s/g,"")
.split(",")
.filter(n=>n!=="")
.map(Number)
.sort((a,b)=>a-b);
}

function hearts(){
for(let i=0;i<12;i++){
let h=document.createElement("div");
h.className="heart";
h.innerHTML="❤";
h.style.left=Math.random()*100+"vw";
document.body.appendChild(h);
setTimeout(()=>h.remove(),3000);
}
}

function startLevel(level){

let name=document.getElementById("studentName").value;
if(!name){
alert("УНЕСИ ИМЕ ПРИНЦЕЗО 👑");
return;
}

currentLevel = level;
index=0;
score=0;
wrong=0;

document.getElementById("map").classList.add("hidden");
document.getElementById("gameArea").classList.remove("hidden");

buildQuestions(level);
showQuestion();
}

function buildQuestions(level){

questions=[];

if(level===1){
totalQuestions=10;
questions=[
{q:"НАПИШИ ЦИФРАМА: ДЕВЕТНАЕСТ",a:"19"},
{q:"НАПИШИ РЕЧИМА БРОЈ 16",a:"шеснаест"},
{q:"КОЛИКО ЈЕДИНИЦА ИМА БРОЈ 20?",a:"0"},
{q:"КОЛИКО ДЕСЕТИЦА ИМА БРОЈ 20?",a:"2"},
{q:"НАЈМАЊИ НЕПАРНИ ДВОЦИФРЕНИ БРОЈ",a:"11"},
{q:"НАЈВЕЋИ ПАРНИ БРОЈ ПРВЕ ДЕСЕТИЦЕ",a:"10"},
{q:"ПРЕТХОДНИК БРОЈА 15",a:"14"},
{q:"СЛЕДБЕНИК БРОЈА 19",a:"20"},
{q:"УПИШИ ЗНАК: 18 __ 20",a:"<"},
{q:"УПИШИ ЗНАК: 17 __ 1Д7Ј",a:"="}
];
}

if(level===2){
totalQuestions=10;
questions=[
{q:"НАПИШИ СВЕ ПАРНЕ БРОЈЕВЕ ДО 20",a:"2,4,6,8,10,12,14,16,18,20",type:"subset"},
{q:"НАПИШИ СВЕ НЕПАРНЕ БРОЈЕВЕ ДО 20",a:"1,3,5,7,9,11,13,15,17,19",type:"subset"},
{q:"НАПИШИ СВЕ ПАРНЕ БРОЈЕВЕ ОД 12 ДО 20",a:"12,14,16,18,20",type:"subset"},
{q:"НАПИШИ СВЕ НЕПАРНЕ БРОЈЕВЕ ОД 11 ДО 19",a:"11,13,15,17,19",type:"subset"},
{q:"ПАРНИ ПРЕТХОДНИК БРОЈА 15",a:"14"},
{q:"НЕПАРНИ СЛЕДБЕНИК БРОЈА 14",a:"15"},
{q:"НАЈВЕЋИ НЕПАРНИ БРОЈ ДРУГЕ ДЕСЕТИЦЕ",a:"19"},
{q:"НАЈМАЊИ ПАРНИ БРОЈ ПРВЕ ДЕСЕТИЦЕ",a:"2"},
{q:"ДА ЛИ ЈЕ 18 ПАРАН? (ДА/НЕ)",a:"да"},
{q:"ДА ЛИ ЈЕ 17 ПАРАН? (ДА/НЕ)",a:"не"}
];
}

if(level===3){
totalQuestions=10;
questions=[
{q:"НАСТАВИ НИЗ: 2,4,6,__,__",a:"8,10"},
{q:"НАСТАВИ НИЗ: 11,13,15,__,__",a:"17,19"},
{q:"НАСТАВИ НИЗ: 19,17,15,__,__",a:"13,11"},
{q:"НАПИШИ СВЕ БРОЈЕВЕ ДРУГЕ ДЕСЕТИЦЕ",a:"11,12,13,14,15,16,17,18,19,20"},
{q:"НАПИШИ СВЕ ПАРНЕ БРОЈЕВЕ ДРУГЕ ДЕСЕТИЦЕ",a:"12,14,16,18,20"},
{q:"НАПИШИ СВЕ НЕПАРНЕ БРОЈЕВЕ ДРУГЕ ДЕСЕТИЦЕ",a:"11,13,15,17,19"},
{q:"НАСТАВИ НИЗ: 10,12,14,__,__",a:"16,18"},
{q:"НАСТАВИ НИЗ: 1,3,5,__,__",a:"7,9"},
{q:"НАСТАВИ НИЗ: 20,18,16,__,__",a:"14,12"},
{q:"НАСТАВИ НИЗ: 5,10,15,__,__",a:"20,25"}
];
}

if(level===4){
totalQuestions=10;
questions=[
{q:"АНА ЈЕ ИМАЛА 18 ЈАБУКА. ПОЈЕЛА ЈЕ 6. НАПИШИ ПОСТУПАК.",a:12,type:"oduz"},
{q:"МИЛИЦА ЈЕ ИМАЛА 15 БОМБОНА. ДАЛА ЈЕ 7. НАПИШИ ПОСТУПАК.",a:8,type:"oduz"},
{q:"ПЕТАР ЈЕ ИМАО 20 ЛОПТИ. ИЗГУБИО ЈЕ 9. НАПИШИ ПОСТУПАК.",a:11,type:"oduz"},
{q:"ЈОВАН ЈЕ ИМАО 17 КЊИГА. ПОКЛОНИО ЈЕ 5. НАПИШИ ПОСТУПАК.",a:12,type:"oduz"},
{q:"САРА ЈЕ ИМАЛА 14 ЦВЕТОВА. УБРАЛА ЈЕ 4. НАПИШИ ПОСТУПАК.",a:10,type:"oduz"},
{q:"ИЗРАЧУНАЈ 18 - 7",a:"11"},
{q:"ИЗРАЧУНАЈ 20 - 8",a:"12"},
{q:"ИЗРАЧУНАЈ 16 - 9",a:"7"},
{q:"ИЗРАЧУНАЈ 19 - 5",a:"14"},
{q:"ИЗРАЧУНАЈ 17 - 6",a:"11"}
];
}

if(level===5){
totalQuestions=30;
questions = [].concat(
buildLevelQuestions(1),
buildLevelQuestions(2),
buildLevelQuestions(3),
buildLevelQuestions(4)
);
questions = questions.slice(0,30);
}

}

function buildLevelQuestions(level){
let temp=[];
buildQuestions(level);
temp=[...questions];
return temp;
}

function showQuestion(){
document.getElementById("question").innerText=
"ПИТАЊЕ "+(index+1)+" ОД "+totalQuestions+": "+questions[index].q;
document.getElementById("answer").value="";
document.getElementById("feedback").innerText="";
}

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

function checkAnswer(){

let user=document.getElementById("answer").value;
if(user.trim()===""){
alert("УНЕСИ ОДГОВОР 👑");
return;
}

let q=questions[index];

if(smartCheck(user,q)){
score++;
document.getElementById("feedback").innerText="ТАЧНО 💖";
hearts();
}else{
wrong++;
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

if(score>=8 && totalQuestions===10){
unlockNextLevel();
}
}

function unlockNextLevel(){
let next=currentLevel+1;
let el=document.getElementById("level"+next);
if(el){
el.classList.remove("locked");
el.onclick=function(){startLevel(next);}
}
}
