console.log("Welcome to javascript");

async function getSongs(){
    let a = await fetch("http://127.0.0.1:5500/spotifyClone/songs/");
    let response=await a.text();
    let div = document.createElement("div")
    div.innerHTML=response;
    let as=div.getElementsByTagName("a")
    let songs=[]
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1].replaceAll("-"," ").replaceAll("%20"," "))
        }
    }
    return songs

}

async function main(){
    let songs=await getSongs()
    console.log(songs);
    let songUL=document.querySelector(".songslist").getElementsByTagName("ul")
    for( const song of songs){
        let li=document.createElement("li")
        li.innerHTML=song;
        songUL[0].appendChild(li)
    }

    const audio=new Audio(songs[0]);
    audio.play();
    audio.addEventListener("ontimeupdate",()=>{
        let duration = audio.duration;
        console.log(audio.duration,audio.currentSrc,audio.currentTime);
    })
}
main();

const cardImgs= document.querySelectorAll(".card-img");
const playbuttons=document.querySelectorAll(".play-button");
const musicplayer=document.querySelector(".music-player");
const albumIcon=document.querySelector(".album-icon");
for (let playbutton of playbuttons){
    playbutton.addEventListener("click",()=>{
            console.log("play button is clicked");
        for (let cardImg of cardImgs){
                console.log("card is clicked");
                musicplayer.classList.add("active");
                const playingImg=cardImg.getAttribute("src")
                console.log(playingImg);
                albumIcon.setAttribute("src",playingImg);
        }
    })
}
//progress bar
const progressBar=document.querySelector(".progress-bar");
const song=document.querySelector(".song");
const totalTime=document.querySelector(".total-time");
const currentTime=document.querySelector(".current-time");


song.onloadedmetadata=()=>{
    progressBar.max=song.duration;
    progressBar.value=song.currentTime;
    let currentTimee=song.duration.toString();
    let min=Math.floor(currentTimee/60);
    let sec=Math.floor(currentTimee%60);
    const t1=song.duration.toString().split(".")[0];
    console.log(t1);
    totalTime.innerHTML=`0${min}:${sec}0`;
    
    
}
const ctrlIcon=document.querySelector(".ctrlIcon");
function playPause(){
    console.log("click");
    const src=ctrlIcon.getAttribute("src");
    console.log(src);
    if(src.includes("play")){
        ctrlIcon.setAttribute("src","pause.svg");
        song.play();
    
    }else{
        ctrlIcon.setAttribute("src","play.svg");
        song.pause();
    }
}

if(song.play()){
    setInterval(()=>{
    progressBar.value=song.currentTime;
    let currentTimee=song.currentTime.toString();
    let min=Math.floor(currentTimee/60);
    let sec=Math.floor(currentTimee%60);
    currentTime.innerHTML=`0${min}:${sec}`;
    },500)
}
progressBar.onchange=()=>{
    song.play();
    song.currentTime=progressBar.value;
    ctrlIcon.setAttribute("src","pause.svg");
    
}
// ctrlIcon.addEventListener("click",()=>{
//     console.log("click");
//     const src=ctrlIcon.getAttribute("src");
//     if(src.includes("play")){
//         ctrlIcon.setAttribute("src","pause.svg");
//         song.play();
    
//     }
// })