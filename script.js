let currentLevel=1;
let questions=[];
let index=0;
let score=0;
let totalQuestions=5;
let autoTimer=null;
let countdownInterval=null;

/* NORMALIZACIJA */

function normalize(text){
text=text.toLowerCase().trim();
const map={"a":"а","b":"б","c":"ц","č":"ч","ć":"ћ","d":"д","đ":"ђ","e":"е","f":"ф","g":"г","h":"х","i":"и","j":"ј","k":"к","l":"л","m":"м","n":"н","o":"о","p":"п","r":"р","s":"с","š":"ш","t":"т","u":"у","v":"в","z":"з","ž":"ж"};
let result="";
for(let char of text){ result+=map[char]||char; }
return result.replace(/\s+/g,"");
}

function normalizeList(text){
return text.replace(/\s/g,"").split(",").filter(n=>n!=="").map(Number).sort((a,b)=>a-b);
}

/* SRCA */

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

/* TIMER */

function startTimer(seconds){

clearInterval(countdownInterval);

let timeLeft=seconds;
let bar=document.getElementById("timerBar");
bar.style.width="100%";

countdownInterval=setInterval(()=>{
timeLeft--;
let percent=(timeLeft/seconds)*100;
bar.style.width=percent+"%";

if(timeLeft<=0){
clearInterval(countdownInterval);
checkAnswer();
}
},1000);
}

/* START */

window.onload=function(){
document.getElementById("level1").onclick=function(){ startGame(); };
};

function startGame(){

let name=document.getElementById("studentName").value;
if(!name){ alert("УНЕСИ ИМЕ 👑"); return; }

document.getElementById("map").classList.add("hidden");
document.getElementById("gameArea").classList.remove("hidden");

questions=[
{q:"НАПИШИ ЦИФРАМА: СЕДАМНАЕСТ",a:"17"},
{q:"УПИШИ ЗНАК: 16 __ 19",a:"<",type:"sign"},
{q:"НАПИШИ СВЕ ПАРНЕ БРОЈЕВЕ ДО 10",a:"2,4,6,8,10",type:"subset"},
{q:"АНА ЈЕ ИМАЛА 18 ЈАБУКА. ПОЈЕЛА ЈЕ 6. НАПИШИ ПОСТУПАК.",a:12,type:"oduz"},
{q:"НАПИШИ РЕЧИМА БРОЈ 18",a:"осамнаест"}
];

index=0;
score=0;
showQuestion();
}

/* PRIKAZ */

function showQuestion(){

let q=questions[index];

document.getElementById("question").innerText=
"ПИТАЊЕ "+(index+1)+" ОД "+totalQuestions+": "+q.q;

document.getElementById("answer").value="";
document.getElementById("timerBar").style.width="100%";
clearInterval(countdownInterval);

if(q.type==="sign"){
showSignKeyboard();
startTimer(2);
}
else if(q.type==="subset" || q.type==="oduz" || isNaN(q.a)){
showNumericKeyboard();
startTimer(20);
}
else{
showNumericKeyboard();
startTimer(2);
}
}

/* TASTATURE */

function showNumericKeyboard(){
let keys=["1","2","3","4","5","6","7","8","9","0","+","-","=","<",">",","];
let container=document.getElementById("keyboardContainer");
container.innerHTML="";
keys.forEach(k=>{
let btn=document.createElement("button");
btn.innerText=k;
btn.className="keyBtn";
btn.onclick=function(){ addChar(k); };
container.appendChild(btn);
});
}

function showSignKeyboard(){
let keys=["<",">","="];
let container=document.getElementById("keyboardContainer");
container.innerHTML="";
keys.forEach(k=>{
let btn=document.createElement("button");
btn.innerText=k;
btn.className="signBtn";
btn.onclick=function(){
document.getElementById("answer").value=k;
checkAnswer();
};
container.appendChild(btn);
});
}

function addChar(c){
let input=document.getElementById("answer");
input.value+=c;

let q=questions[index];

if(smartCheck(input.value,q)){
checkAnswer();
}
}

/* PROVERA */

function smartCheck(user,q){

if(q.type==="subset"){
return JSON.stringify(normalizeList(user))===JSON.stringify(normalizeList(q.a));
}

if(q.type==="oduz"){
let cleaned=user.replace(/\s+/g,"");
let match=cleaned.match(/^(\d+)-(\d+)=(\d+)$/);
if(!match) return false;
return parseInt(match[3])==q.a;
}

if(!isNaN(q.a)){
return Number(user)===Number(q.a);
}

return normalize(user)===normalize(q.a);
}

function checkAnswer(){

let user=document.getElementById("answer").value;
if(!user) return;

let q=questions[index];

clearInterval(countdownInterval);

if(smartCheck(user,q)){
score++;
hearts();
}

index++;

document.getElementById("correct").innerText=score;
document.getElementById("percent").innerText=
Math.round((score/totalQuestions)*100);

if(index<totalQuestions){
setTimeout(showQuestion,800);
}else{
alert("ГОТОВО 👑 ТАЧНО: "+score);
}
}
