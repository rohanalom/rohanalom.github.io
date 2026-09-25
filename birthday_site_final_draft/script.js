const pages=[...document.querySelectorAll(".page")];
const prevBtn=document.getElementById("prevBtn");
const bgMusic=document.getElementById("bgMusic");
let current=0;
let musicStarted=false;

function goTo(n){
 if(n<0||n>=pages.length)return;
 pages.forEach((p,i)=>{p.classList.toggle("active",i===n);p.classList.toggle("previous",i<n)});
 current=n;
 pages[n].scrollTop=0;
 document.getElementById("progressBar").style.width=(n/(pages.length-1)*100)+"%";
 prevBtn.classList.toggle("hide",n===0);
 prevBtn.style.color=pages[n].classList.contains("cream")?"#2a2021":"#f9f2ed";
 prevBtn.style.borderColor=pages[n].classList.contains("cream")?"#29202133":"#ffffff40";
 prevBtn.style.background=pages[n].classList.contains("cream")?"#00000010":"#ffffff14";
}
prevBtn.addEventListener("click",()=>goTo(current-1));

document.querySelector(".next-opening").addEventListener("click",()=>goTo(1));

document.getElementById("unlockButton").addEventListener("click",()=>{
 const a=document.getElementById("answer1").value.trim().toLowerCase();
 const b=document.getElementById("answer2").value.trim().toLowerCase();
 if(a==="baba"&&(b==="pita"||b==="peeta")){
  goTo(2);
  if(!musicStarted){musicStarted=true;bgMusic.currentTime=0;bgMusic.play().catch(()=>{});}
 }else document.getElementById("error").textContent="Hmm… you know this one. Try again ♡";
});

document.querySelectorAll(".next").forEach(b=>{
 if(!["balloonNext","giftNext"].includes(b.id))b.addEventListener("click",()=>goTo(current+1));
});

/* ---- photo gallery: edit PHOTO_COUNT and the captions array below ---- */
const PHOTO_COUNT=25;
const captions=["The day where it all started ❤️","My cutiepie ❤️","The eyes chico👀","Ooh fiery eyes 😚",
"The eyes never lie ❤️","Aah Khamrenga trip",
"Good view right?❤️",
" Hehe 😚",
"The first proper day out after 16th Feb❤️",
"😍😍",
"We looking good right?😍",
"Us ❤️",
"Cutiepie 😍",
"😚",
"🌸",
"Sarthebari here we come 😎",
"I love this one ❤️ ",
"Sea food and sushis 😋",
"Aiyoo cutie",
" Pighal gaya ❤️",
" Aise na mujhe tum dekho 🥺❤️",
"Haaye ❤️",
"Us after good food 😋",
"What was the joke?😁",
" Happy Birthday Beautiful ❤️"]; // optional: captions[0]="our first trip", etc. Falls back to "your caption here".
const stage=document.getElementById("polaroidStage");
const cards=[];
for(let i=0;i<PHOTO_COUNT;i++){
 const photoNumber=i+1;
 const filename=`photo${photoNumber}.jpg`;
 const art=document.createElement("article");
 art.className="polaroid";
 art.innerHTML=`<div class="photo-slot" data-slot="${photoNumber}"><img src="assets/photos/${filename}" alt="Photo ${photoNumber}" loading="lazy" data-jpeg="assets/photos/photo${photoNumber}.jpeg" data-upper-jpg="assets/photos/photo${photoNumber}.JPG" data-upper-jpeg="assets/photos/photo${photoNumber}.JPEG"></div><p>${captions[i]||"your caption here"}</p>`;
 const img=art.querySelector("img");
 img.addEventListener("error",function(){
   const next=this.dataset.jpeg || this.dataset.upperJpg || this.dataset.upperJpeg;
   if(next){
     if(next===this.dataset.jpeg) this.dataset.jpeg="";
     else if(next===this.dataset.upperJpg) this.dataset.upperJpg="";
     else this.dataset.upperJpeg="";
     this.src=next;
   }else{
     this.remove();
     this.parentElement.textContent=`YOUR PHOTO ${String(photoNumber).padStart(2,"0")}`;
   }
 });
 stage.appendChild(art);
 cards.push(art);
}
/* Photos are loaded automatically from assets/photos/photo1.jpg through photo25.jpg. */

let photo=0;
const cardTransforms=["rotate(-3deg)","rotate(6deg) translate(10px,-6px)","rotate(-8deg) translate(-9px,9px)"];
function renderCards(){
 const total=cards.length;
 cards.forEach((c,i)=>{
  const d=(i-photo+total)%total;
  c.style.zIndex=total-d;
  if(d===0){c.style.opacity=1;c.style.transform=cardTransforms[0];}
  else if(d===1){c.style.opacity=.45;c.style.transform=cardTransforms[1];}
  else if(d===2){c.style.opacity=.22;c.style.transform=cardTransforms[2];}
  else{c.style.opacity=0;c.style.transform=cardTransforms[2];}
 });
 document.getElementById("photoCounter").textContent=`${photo+1} / ${total}`;
}
document.getElementById("nextPhoto").onclick=()=>{photo=(photo+1)%cards.length;renderCards()};
document.getElementById("prevPhoto").onclick=()=>{photo=(photo-1+cards.length)%cards.length;renderCards()};
let startX=0;
stage.addEventListener("touchstart",e=>startX=e.touches[0].clientX,{passive:true});
stage.addEventListener("touchend",e=>{
 const dx=e.changedTouches[0].clientX-startX;
 if(Math.abs(dx)>45){dx<0?document.getElementById("nextPhoto").click():document.getElementById("prevPhoto").click()}
},{passive:true});
renderCards();

/* ---- balloons ---- */
const balloons=[...document.querySelectorAll(".balloon")];let popped=0;
function popBits(el){
 const r=el.getBoundingClientRect();const cx=r.left+r.width/2,cy=r.top+r.height/2;
 const c=getComputedStyle(el).backgroundColor;
 for(let i=0;i<10;i++){
  const p=document.createElement("div");p.className="popBit";
  p.style.left=cx+"px";p.style.top=cy+"px";p.style.background=c;
  const ang=Math.random()*Math.PI*2,dist=26+Math.random()*38;
  p.style.setProperty("--dx",(Math.cos(ang)*dist)+"px");
  p.style.setProperty("--dy",(Math.sin(ang)*dist)+"px");
  document.body.appendChild(p);setTimeout(()=>p.remove(),650);
 }
}
balloons.forEach(b=>b.addEventListener("click",()=>{
 if(b.classList.contains("popped"))return;
 b.classList.add("popped");popped++;
 popBits(b);
 const word=b.dataset.word;
 const chip=document.createElement("span");chip.className="word-chip";chip.textContent=word;
 document.getElementById("poppedWords").appendChild(chip);
 document.getElementById("balloonCounter").textContent=`${popped} / ${balloons.length} popped`;
 if(popped===balloons.length){
  document.getElementById("balloonSentence").textContent="You are so loved, Aliya. ❤️";
  document.getElementById("balloonSentence").classList.add("show");
  document.getElementById("balloonNext").disabled=false;
 }
}));
document.getElementById("balloonNext").addEventListener("click",()=>goTo(current+1));

/* ---- gift / bouquet ---- */
document.getElementById("giftButton").addEventListener("click",()=>{
 document.getElementById("giftButton").style.display="none";
 document.getElementById("bouquetReveal").classList.remove("hidden");
 setTimeout(()=>document.getElementById("pitaLine").classList.add("show"),950);
 document.getElementById("giftNext").disabled=false;
});
document.getElementById("giftNext").addEventListener("click",()=>goTo(current+1));

/* ---- play again / exit ---- */
function resetExperience(){
 document.getElementById("answer1").value="";
 document.getElementById("answer2").value="";
 document.getElementById("error").textContent="";
 balloons.forEach(b=>b.classList.remove("popped"));
 popped=0;
 document.getElementById("poppedWords").innerHTML="";
 document.getElementById("balloonCounter").textContent=`0 / ${balloons.length} popped`;
 document.getElementById("balloonSentence").classList.remove("show");
 document.getElementById("balloonSentence").textContent="";
 document.getElementById("balloonNext").disabled=true;
 document.getElementById("giftButton").style.display="";
 document.getElementById("bouquetReveal").classList.add("hidden");
 document.getElementById("pitaLine").classList.remove("show");
 document.getElementById("giftNext").disabled=true;
 photo=0;renderCards();
 bgMusic.pause();bgMusic.currentTime=0;musicStarted=false;
 goTo(0);
}
document.getElementById("playAgain").addEventListener("click",resetExperience);
document.getElementById("exitBtn").addEventListener("click",()=>{
 bgMusic.pause();
 window.close();
 // most browsers block closing a tab that wasn't opened by script —
 // if that happens, this just quietly does nothing further.
});

goTo(0);
