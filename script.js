let currentLevel=1;
let questions=[];
let index=0;
let score=0;
let totalQuestions=10;

/* ================= NORMALIZACIJA ================= */

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

/* ================= SRCA ================= */

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

/* ================= OTKLJUČAVANJE ================= */

function unlockNext(){
let unlocked=JSON.parse(localStorage.getItem("princess"))||[1];
let next=currentLevel+1;
if(next<=5 && !unlocked.includes(next)){
unlocked.push(next);
localStorage.setItem("princess",JSON.stringify(unlocked));
}
applyUnlock();
}

function applyUnlock(){
let unlocked=JSON.parse(localStorage.getItem("princess"))||[1];
for(let i=1;i<=5;i++){
let el=document.getElementById("level"+i);
if(unlocked.includes(i)){
el.classList.remove("locked");
el.onclick=function(){ startLevel(i); };
}
}
}

window.onload=applyUnlock;

/* ================= START ================= */

function startLevel(level){
let name=document.getElementById("studentName").value;
if(!name){ alert("УНЕСИ ИМЕ 👑"); return; }

currentLevel=level;
index=0;
score=0;

document.getElementById("map").classList.add("hidden");
document.getElementById("gameArea").classList.remove("hidden");

buildQuestions(level);
showQuestion();
}

/* ================= PITANJA ================= */

function shuffle(arr){ return arr.sort(()=>Math.random()-0.5); }

function buildQuestions(level){

let pool=[];

/* ---- NIVO 1 ---- */
if(level===1){
totalQuestions=10;
pool=[
{q:"НАПИШИ ЦИФРАМА: СЕДАМНАЕСТ",a:"17"},
{q:"НАПИШИ РЕЧИМА БРОЈ 18",a:"осамнаест"},
{q:"КОЛИКО ЈЕДИНИЦА ИМА БРОЈ 14?",a:"4"},
{q:"ПРЕТХОДНИК БРОЈА 13",a:"12"},
{q:"СЛЕДБЕНИК БРОЈА 18",a:"19"},
{q:"НАЈМАЊИ ПАРНИ БРОЈ ДО 10",a:"2"},
{q:"УПИШИ ЗНАК: 16 __ 19",a:"<",type:"sign"},
{q:"УПИШИ ЗНАК: 15 __ 15",a:"=",type:"sign"},
{q:"БРОЈ ИЗМЕЂУ 12 И 14",a:"13"},
{q:"КОЛИКО ДЕСЕТИЦА ИМА БРОЈ 20?",a:"2"},
{q:"НАПИШИ ЦИФРАМА: ПЕТНАЕСТ",a:"15"}
];
}

/* ---- NIVO 2 ---- */
if(level===2){
totalQuestions=10;
pool=[
{q:"НАПИШИ СВЕ ПАРНЕ БРОЈЕВЕ ДО 20",a:"2,4,6,8,10,12,14,16,18,20",type:"subset"},
{q:"ДА ЛИ ЈЕ 16 ПАРАН? (ДА/НЕ)",a:"да"},
{q:"НЕПАРАН БРОЈ ИЗМЕЂУ 10 И 14",a:"11"},
{q:"ПАРНИ ПРЕТХОДНИК БРОЈА 19",a:"18"},
{q:"НЕПАРНИ СЛЕДБЕНИК БРОЈА 18",a:"19"},
{q:"ДА ЛИ ЈЕ 13 ПАРАН? (ДА/НЕ)",a:"не"},
{q:"УПИШИ ЗНАК: 14 __ 18",a:"<",type:"sign"},
{q:"НАПИШИ СВЕ НЕПАРНЕ БРОЈЕВЕ ДО 20",a:"1,3,5,7,9,11,13,15,17,19",type:"subset"},
{q:"ПАРАН БРОЈ ИЗМЕЂУ 14 И 18",a:"16"},
{q:"НАЈМАЊИ НЕПАРНИ БРОЈ ДРУГЕ ДЕСЕТИЦЕ",a:"11"}
];
}

/* ---- NIVO 3 ---- */
if(level===3){
totalQuestions=10;
pool=[
{q:"НАСТАВИ НИЗ: 2,4,6,__,__",a:"8,10"},
{q:"НАСТАВИ НИЗ: 3,6,9,__,__",a:"12,15"},
{q:"НАСТАВИ НИЗ: 19,17,15,__,__",a:"13,11"},
{q:"НАСТАВИ НИЗ: 10,12,14,__,__",a:"16,18"},
{q:"НАСТАВИ НИЗ: 5,10,15,__,__",a:"20,25"},
{q:"НАПИШИ СВЕ ПАРНЕ БРОЈЕВЕ ДРУГЕ ДЕСЕТИЦЕ",a:"12,14,16,18,20",type:"subset"},
{q:"НАСТАВИ НИЗ: 1,3,5,__,__",a:"7,9"},
{q:"НАСТАВИ НИЗ: 20,18,16,__,__",a:"14,12"},
{q:"УПИШИ ЗНАК: 12 __ 11",a:">",type:"sign"},
{q:"НАСТАВИ НИЗ: 4,8,12,__,__",a:"16,20"}
];
}

/* ---- NIVO 4 ---- */
if(level===4){
totalQuestions=10;
pool=[
{q:"АНА ЈЕ ИМАЛА 18 ЈАБУКА. ПОЈЕЛА ЈЕ 6. НАПИШИ ПОСТУПАК.",a:12,type:"oduz"},
{q:"МИЛИЦА ЈЕ ИМАЛА 15 БОМБОНА. ДАЛА ЈЕ 7. НАПИШИ ПОСТУПАК.",a:8,type:"oduz"},
{q:"ПЕТАР ЈЕ ИМАО 20 ЛОПТИ. ИЗГУБИО ЈЕ 9. НАПИШИ ПОСТУПАК.",a:11,type:"oduz"},
{q:"ИЗРАЧУНАЈ 18 - 7",a:"11"},
{q:"ИЗРАЧУНАЈ 20 - 8",a:"12"},
{q:"ИЗРАЧУНАЈ 16 - 9",a:"7"},
{q:"УПИШИ ЗНАК: 13 __ 17",a:"<",type:"sign"},
{q:"ИЗРАЧУНАЈ 19 - 5",a:"14"},
{q:"ИЗРАЧУНАЈ 17 - 6",a:"11"},
{q:"САРА ЈЕ ИМАЛА 14 ЦВЕТОВА. УБРАЛА ЈЕ 4. НАПИШИ ПОСТУПАК.",a:10,type:"oduz"}
];
}

/* ---- NIVO 5 ---- */
if(level===5){
totalQuestions=30;
let all=[];
for(let i=1;i<=4;i++){
buildQuestions(i);
all=all.concat(questions);
}
pool=all;
}

questions=shuffle(pool).slice(0,totalQuestions);
}

/* ================= TASTATURE ================= */

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
btn.onclick=function(){ document.getElementById("answer").value=k; };
container.appendChild(btn);
});
}

function showCyrillicKeyboard(){
let letters=["А","Б","В","Г","Д","Ђ","Е","Ж","З","И","Ј","К","Л","Љ","М","Н","Њ","О","П","Р","С","Т","Ћ","У","Ф","Х","Ц","Ч","Џ","Ш"];
let container=document.getElementById("keyboardContainer");
container.innerHTML="";
letters.forEach(l=>{
let btn=document.createElement("button");
btn.innerText=l;
btn.className="keyBtn";
btn.onclick=function(){ addChar(l); };
container.appendChild(btn);
});
}

function addChar(c){
document.getElementById("answer").value+=c;
}

/* ================= IGRA ================= */

function showQuestion(){

let q=questions[index];

document.getElementById("question").innerText=
"ПИТАЊЕ "+(index+1)+" ОД "+totalQuestions+": "+q.q;

document.getElementById("answer").value="";

if(q.type==="sign"){
showSignKeyboard();
}
else if(q.type==="oduz" || q.type==="subset" || !isNaN(q.a)){
showNumericKeyboard();
}
else{
showCyrillicKeyboard();
}
}

function smartCheck(user,q){

if(q.type==="oduz"){
let cleaned=user.replace(/\s+/g,"").replace("–","-");
let match=cleaned.match(/^(\d+)-(\d+)=(\d+)$/);
if(!match) return false;
return parseInt(match[3])==q.a;
}

if(q.type==="subset"){
return JSON.stringify(normalizeList(user))===JSON.stringify(normalizeList(q.a));
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
finishLevel();
}
}

function finishLevel(){

if(totalQuestions===10 && score>=8){
unlockNext();
}

setTimeout(()=>{
document.getElementById("gameArea").classList.add("hidden");
document.getElementById("map").classList.remove("hidden");
},2000);
}
