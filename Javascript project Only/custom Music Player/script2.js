const wrapper =document.querySelector('.wrapper'),
musicImg =wrapper.querySelector('.img-area img'),
musicName =wrapper.querySelector('.song-details .name'),
musicArtist =wrapper.querySelector('.song-details .artist'),
mainAudio =wrapper.querySelector('#main-audio'),
playPauseBtn = wrapper.querySelector('.play-pause')
prevBtn =wrapper.querySelector('#prev');
nextBtn = wrapper.querySelector('#next'),
progressBar = wrapper.querySelector('.progress-bar'),
progressArea = wrapper.querySelector('.progress-area'),

musicList= wrapper.querySelector('.music-list'),
showMoreBtn = wrapper.querySelector('#more-music'),
hideMusicBtn = musicList.querySelector('#close')




let musicIndex =Math.ceil(Math.random()*allMusic.length);



window.addEventListener('load',()=>{
loadMusic(musicIndex)


})
function loadMusic(musicIndex){
   musicName.innerText =allMusic[musicIndex - 1].name;
   musicArtist.innerText = allMusic[musicIndex - 1].artist;
   musicImg.src=`images/${allMusic[musicIndex - 1].img}.jpg`;
   mainAudio.src=`songs/${allMusic[musicIndex - 1].src}.mp3`
}

function playMusic(){
   wrapper.classList.add('paused');
   playPauseBtn.querySelector('i').innerText='pause';
   mainAudio.play()
}
function pauseMusic(){
   wrapper.classList.remove('paused');
   playPauseBtn.querySelector('i').innerText = 'play_arrow';
   mainAudio.pause()
}

playPauseBtn.addEventListener('click',()=>{
   let isMusicPlay = wrapper.classList.contains('paused');
   isMusicPlay ? pauseMusic() : playMusic()
   playingSong()
});



function prevMusic(){
   musicIndex--;
   if(musicIndex < 1 ){
      musicIndex=allMusic.length;
   }else {
      musicIndex = musicIndex;
   }
   loadMusic(musicIndex)
   playMusic()
   playingSong()
}


prevBtn.addEventListener('click',()=>{
   prevMusic()
})
nextBtn.addEventListener('click',()=>{
   musicIndex++;
   musicIndex > allMusic.length ? musicIndex =1 : musicIndex = musicIndex;
   loadMusic(musicIndex);
   playMusic()
   playingSong()
})
let repeatBtn = wrapper.querySelector('#repeat-plist');
repeatBtn.addEventListener('click',(e)=>{
   switch(e.target.innerHTML){
      case 'repeat':
         repeatBtn.innerText ='repeat_one';
         repeatBtn.setAttribute('tile','Song Looped')
         break;
         case 'repeat_one':
            repeatBtn.innerText='shuffle';
            repeatBtn.setAttribute('title','playback shuffled');
            break;
            default:
               repeatBtn.innerText='repeat'
               repeatBtn.setAttribute('title','Playlist looped')
   }
})

mainAudio.addEventListener('ended',()=>{
  switch(repeatBtn.innerText){
   case 'repeat':
   nextMusic();
   break;
   case 'repeat_one':
      mainAudio.currentTime = 0;
      loadMusic(musicIndex);
      playMusic();
      break;
      case 'shuffle':
         let randomIndex = Math.ceil(Math.random()*allMusic.length);
         musicIndex = randomIndex;
         loadMusic(musicIndex);
         playMusic()
         playingSong()
  }
})

mainAudio.addEventListener('timeupdate',(e)=>{
   let currentTime = e.target.currentTime;
   let duration = e.target.duration;
   let progressWidth = (currentTime / duration)*100;
   progressBar.style.width = `${progressWidth}%`;

   let currentMin = Math.floor(currentTime / 60);
   let currentSecond = Math.floor(currentTime % 60);
   let currenthour = Math.floor(currentMin / 60)
   currentSecond < 10 ? currentSecond = `0${currentSecond}` : currentSecond = currentSecond;

   musicCurrentTime.innerText = ` ${currenthour}${currentMin} : ${currentSecond}`


})
let musicCurrentTime = wrapper.querySelector('.current-time');
let musicCurrentDuration = wrapper.querySelector('.max-duration')
mainAudio.addEventListener('loadeddata',()=>{
   let mainAudioDuration= mainAudio.duration;
   let totalMin = Math.floor(mainAudioDuration /60) 
   let totalSecond = Math.floor(mainAudioDuration % 60);
   totalSecond < 10 ? totalSecond = `0${totalSecond}` : totalSecond = totalSecond;
   musicCurrentDuration.innerText = `${ totalMin} : ${  totalSecond }` 
})
progressArea.addEventListener('click',(e)=>{
   let progressWidth = progressArea.clientWidth;
   
   let clickedOffsetX = e.offsetX;
   let songDuration = mainAudio.duration;
    mainAudio.currentTime = (clickedOffsetX / progressWidth) *songDuration
  playMusic()
  playingSong()

})

showMoreBtn.addEventListener('click',()=>{
   musicList.classList.toggle('show')
})
hideMusicBtn.addEventListener('click',()=>{
   showMoreBtn.click()
})


let ultag = wrapper.querySelector('ul');
for(let i = 0; i<allMusic.length; i++){


   let liTag =  `<li li-index="${i + 1}">
  <div class="row">
    <span>${allMusic[i].name}</span>
    <p>${allMusic[i].artist}</p>
  </div>
  <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
  <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
</li>`;

ultag.insertAdjacentHTML('beforeend',liTag);
let liAudioDurationTag = ultag.querySelector(`#${allMusic[i].src}`);
let liAudioTag = ultag.querySelector(`.${allMusic[i].src}`);

liAudioTag.addEventListener('loadeddata',()=>{
   let mainAudioDuration= liAudioTag.duration;
   let totalMin = Math.floor(mainAudioDuration /60) 
   let totalSecond = Math.floor(mainAudioDuration % 60);
   totalSecond < 10 ? totalSecond = `0${totalSecond}` : totalSecond = totalSecond;
  liAudioDurationTag.innerText = `${ totalMin} : ${  totalSecond }`
  
  liAudioDurationTag.setAttribute('t-duration',`${totalMin} : ${totalSecond}`)
})
}

function playingSong(){
let allLiTag = ultag.querySelectorAll('li');
for(let j=0; j<allLiTag.length; j++){
   let audioTag = allLiTag[j].querySelector('.audio-duration');
   if(allLiTag[j].classList.contains('playing')){
      allLiTag[j].classList.remove('playing');
      let adDuration = audioTag.getAttribute('t-duration');
      audioTag.innerText = adDuration;
    
   }
   if(allLiTag[j].getAttribute('li-index')== musicIndex){
      allLiTag[j].classList.add('playing');
      audioTag.innerText = 'Playing'
      if(playPauseBtn.innerText == 'play_arrow'){
        audioTag.innerText = 'Pause'
      }
   }
   allLiTag[j].setAttribute('onclick','clicked(this)')
}
}
function clicked(e){
   let getLiIndex = e.getAttribute('li-index');
   musicIndex=getLiIndex;
   loadMusic(musicIndex)
   playMusic()
   playingSong()
}