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
for(let i=0;i<15;i++){
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
{q:"КОЛИКО ЈЕДИНИЦА ИМА БРОЈ 20?",a:"0"},
{q:"НАЈВЕЋИ НЕПАРНИ БРОЈ ДРУГЕ ДЕСЕТИЦЕ",a:"19"}
];
}

if(level===2){
totalQuestions=10;
questions=[
{q:"НАПИШИ СВЕ ПАРНЕ БРОЈЕВЕ ОД 12 ДО 20",a:"12,14,16,18,20",type:"subset"},
{q:"НАПИШИ СВЕ НЕПАРНЕ БРОЈЕВЕ ДО 20",a:"1,3,5,7,9,11,13,15,17,19",type:"subset"}
];
}

if(level===3){
totalQuestions=10;
questions=[
{q:"НАСТАВИ НИЗ: 2,4,6,__,__",a:"8,10"},
{q:"НАСТАВИ НИЗ: 19,17,15,__,__",a:"13,11"}
];
}

if(level===4){
totalQuestions=10;
questions=[
{q:"АНА ЈЕ ИМАЛА 18 ЈАБУКА. ПОЈЕЛА ЈЕ 6. НАПИШИ ЦЕО ПОСТУПАК.",a:12,type:"oduz"},
{q:"МИЛИЦА ЈЕ ИМАЛА 15 БОМБОНА. ДАЛА ЈЕ 7. НАПИШИ ЦЕО ПОСТУПАК.",a:8,type:"oduz"}
];
}

if(level===5){
totalQuestions=30;
questions=[
{q:"НАПИШИ СВЕ ПАРНЕ БРОЈЕВЕ ОД 12 ДО 20",a:"12,14,16,18,20",type:"subset"},
{q:"АНА ЈЕ ИМАЛА 18 ЈАБУКА. ПОЈЕЛА ЈЕ 6. НАПИШИ ЦЕО ПОСТУПАК.",a:12,type:"oduz"},
{q:"НАЈВЕЋИ НЕПАРНИ БРОЈ ДРУГЕ ДЕСЕТИЦЕ",a:"19"}
];
}

while(questions.length<totalQuestions){
questions = questions.concat(questions);
}

questions = questions.slice(0,totalQuestions);
questions.sort(()=>Math.random()-0.5);

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

updateStats();

index++;

if(index<totalQuestions){
setTimeout(showQuestion,800);
}else{
finishLevel();
}
}

function updateStats(){
document.getElementById("correctCount").innerText=score;
document.getElementById("wrongCount").innerText=wrong;
let percent=Math.round((score/(score+wrong))*100);
document.getElementById("percent").innerText=percent;
}

function finishLevel(){

let percent=Math.round((score/totalQuestions)*100);
let grade=1;

if(percent>=90) grade=5;
else if(percent>=75) grade=4;
else if(percent>=60) grade=3;
else if(percent>=40) grade=2;

let medal="";
if(grade===5) medal="👑 ЗЛАТНА КРУНА!";
if(grade===4) medal="🥇 ЗЛАТНА МЕДАЉА!";
if(grade===3) medal="🥈 СРЕБРНА МЕДАЉА!";
if(grade===2) medal="🥉 БРОНЗАНА МЕДАЉА!";

document.getElementById("result").innerHTML=
"🌸 РЕЗУЛТАТ 🌸<br>"+
"ПРОЦЕНАТ: "+percent+"%<br>"+
"ОЦЕНА: "+grade+"<br>"+
"<div class='medal'>"+medal+"</div>";

saveProgress(percent);

}

function saveProgress(percent){

let name=document.getElementById("studentName").value;

let data=JSON.parse(localStorage.getItem("princessResults"))||{};
data[name]={level:currentLevel,score:percent};
localStorage.setItem("princessResults",JSON.stringify(data));

if(percent>=60){
unlockNextLevel();
}
}

function unlockNextLevel(){
let nextLevel=currentLevel+1;
let el=document.getElementById("level"+nextLevel);
if(el){
el.classList.remove("locked");
el.onclick=function(){startLevel(nextLevel);}
}
}
