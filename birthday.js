const birthdayData={name:"Dyla Fitriani"};

document.querySelectorAll("[data-name]").forEach(function(element){element.textContent=birthdayData.name;});

const navToggle=document.getElementById("navToggle");
const siteNav=document.getElementById("siteNav");
navToggle.addEventListener("click",function(){
  const isOpen=siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded",String(isOpen));
  navToggle.setAttribute("aria-label",isOpen?"Tutup menu":"Buka menu");
});

siteNav.querySelectorAll("a").forEach(function(link){
  link.addEventListener("click",function(){
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded","false");
    navToggle.setAttribute("aria-label","Buka menu");
  });
});

const bottleButton=document.getElementById("bottleButton");
const bottleHint=document.getElementById("bottleHint");
const letterPanel=document.getElementById("letterPanel");
const letterParagraphs=[...letterPanel.querySelectorAll("p:not(.eyebrow):not(.letter-signature)")];
const letterSignature=letterPanel.querySelector(".letter-signature");
const typedLetter=document.createElement("div");
typedLetter.className="typed-letter";
typedLetter.setAttribute("aria-live","polite");
letterPanel.insertBefore(typedLetter,letterSignature);
letterParagraphs.forEach(function(paragraph){paragraph.hidden=true;});
letterSignature.hidden=true;
bottleButton.addEventListener("click",function(){
  bottleButton.classList.add("is-hidden");
  bottleButton.setAttribute("aria-expanded","true");
  bottleHint.hidden=true;
  letterPanel.hidden=false;
  letterPanel.setAttribute("tabindex","-1");
  letterPanel.focus();
  const text=letterParagraphs.map(function(paragraph){return paragraph.textContent.trim();}).join("\n\n");
  let index=0;
  const typing=setInterval(function(){
    typedLetter.textContent=text.slice(0,index++);
    if(index>text.length){clearInterval(typing);letterSignature.hidden=false;}
  },32);
});

const particles=document.getElementById("particles");
const particleFragment=document.createDocumentFragment();
for(let i=0;i<42;i++){
  const particle=document.createElement("span");
  particle.className="particle";
  particle.style.left=Math.random()*100+"%";
  particle.style.animationDuration=9+Math.random()*13+"s";
  particle.style.animationDelay=-Math.random()*18+"s";
  particle.style.setProperty("--drift",(Math.random()*160-80)+"px");
  particleFragment.appendChild(particle);
}
particles.appendChild(particleFragment);

const tracks=[
  {title:"I Lay My Love On You",src:"music/i lay my love on you.mp3"},
  {title:"Marvin Gaye — Charlie Puth feat. Meghan Trainor",src:"music/marvin-gaye.mp3"}
];
const musicAudio=document.getElementById("musicAudio");
const musicToggle=document.getElementById("musicToggle");
const musicNext=document.getElementById("musicNext");
const musicStatus=document.getElementById("musicStatus");
const trackName=document.getElementById("trackName");
let trackIndex=0;
let musicLoaded=false;
function markPlaying(){musicStatus.textContent="now playing";musicToggle.textContent="Ⅱ";musicToggle.title=tracks[trackIndex].title;}
function playMusic(){
  if(!musicLoaded)loadTrack(false);
  return musicAudio.play().then(markPlaying).catch(function(){musicToggle.title="Klik halaman atau ikon musik untuk memulai";throw new Error("Browser memblokir autoplay");});
}
function loadTrack(play){
  const track=tracks[trackIndex];
  musicAudio.src=track.src;
  musicLoaded=true;
  trackName.textContent=track.title;
  if(play)void playMusic();
}
musicToggle.addEventListener("click",function(){
  if(musicAudio.paused)void playMusic();
  else{musicAudio.pause();musicStatus.textContent="music off";musicToggle.textContent="♫";}
});
musicNext.addEventListener("click",function(){trackIndex=(trackIndex+1)%tracks.length;loadTrack(!musicAudio.paused);});
musicAudio.addEventListener("ended",function(){trackIndex=(trackIndex+1)%tracks.length;loadTrack(true);});
loadTrack(false);
void playMusic().catch(function(){});
window.addEventListener("pointerdown",function(){if(musicAudio.paused)void playMusic().catch(function(){});},{once:true,passive:true});
window.addEventListener("keydown",function(){if(musicAudio.paused)void playMusic().catch(function(){});},{once:true});

document.getElementById("backToTop").addEventListener("click",function(event){
  event.preventDefault();
  window.scrollTo({top:0,behavior:"smooth"});
});
