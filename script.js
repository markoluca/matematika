let currentLevel=1;
let questions=[];
let index=0;
let score=0;
let totalQuestions=10;
let autoTimer=null;

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

/* ================= AUTO PROVERA ================= */

function triggerAutoCheck(){

let q=questions[index];
let user=document.getElementById("answer").value;

if(autoTimer) clearTimeout(autoTimer);

if(q.type==="sign"){
checkAnswer();
return;
}

if(q.type==="oduz"){
if(user.includes("=")){
checkAnswer();
}
return;
}

if(q.type==="subset"){
if(user.includes(",")){
autoTimer=setTimeout(checkAnswer,800);
}
return;
}

if(!isNaN(q.a)){
autoTimer=setTimeout(checkAnswer,600);
return;
}

autoTimer=setTimeout(checkAnswer,900);
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
btn.onclick=function(){
document.getElementById("answer").value=k;
triggerAutoCheck();
};
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
let input=document.getElementById("answer");
input.value+=c;
triggerAutoCheck();
}

/* ================= PROVERA ================= */

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
setTimeout(showQuestion,700);
}else{
finishLevel();
}
}
