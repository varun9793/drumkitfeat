//todo select the drum elements mand add wevent lostenmer
//add animation when button is clicked
//play music



var audio_volume=0.6;


var image_url;

const api_call = () => {
    const URL = "https://api.unsplash.com/photos/random?query=drum";
    fetch(URL, {
        headers: {
            'Authorization': 'Client-ID kKZQb6V88AEmoe9ouyXNuxAfURAKaeK58QQwa1dE8-w'
        }
    })
    .then(res => res.json())
    .then(res => {
        image_url = res.urls.small;
        change_background(image_url);
    })
    .catch(error => console.log(error));
}

api_call();

const change_background = (image_src) => {
    let container_style = document.getElementsByClassName('container')[0].style;
    container_style.background = `url(${image_src})`;
}


const bg_changer =document.getElementById("util_button-background")
bg_changer.addEventListener("click",() =>{
    api_call()
})


const animate=(key)=>{
    const currentkey=document.querySelector(`.${key}`)
    currentkey.classList.add('pressed')
    setTimeout(()=>{
        currentkey.classList.remove('pressed')
    },250)
}

document.addEventListener("keypress",(event)=>{
    const triggerkey = event.key;
    makesound(triggerkey)
    animate(triggerkey)
})

//them1
const theme_1_background= "#091921";
const theme_1_text="#00fff1";

//theme2
const theme_2_background= "#f7c340";
const theme_2_text="#2d2d2d";

const change_theme = (theme) => {
    let root=document.documentElement
    if(theme === "theme_1"){
    root.style.setProperty('--background',theme_1_background)
    root.style.setProperty('--text',theme_1_text)
    }
    else{
        root.style.setProperty('--background',theme_2_background)
        root.style.setProperty('--text',theme_2_text)
    }
}

var current_theme = "theme_1"
const theme_changer=document.getElementById("util_button-theme")
theme_changer.addEventListener("click",(e)=>{
    theme_changer.classList.add("change_theme_pressed")
    setTimeout(()=>{
        theme_changer.classList.remove("change_theme_pressed")
    },200)

    if(current_theme=="theme_1"){
        change_theme("theme_2")
        current_theme="theme_2"
    }
    else{
        change_theme("theme_1")
        current_theme="theme_1"
    }
})



var auto_music_id;
var auto_music_on=false;
const start_auto_music = () => {
    const letter= ["w","a","s","d","j","k","l"]
    auto_music_id=setInterval(()=>{
    const current_key = letter[Math.floor(Math.random()*letter.length)]
    makesound(current_key)
    animate (current_key)
},200)

}


const auto_music_button=document.getElementById("util_button-auto")
auto_music_button.addEventListener("click",() => {
    if(auto_music_on) {
        clearInterval(auto_music_id)
        auto_music_on=false
        auto_music_button.innerText="start auto music"
        auto_music_button.classList.remove("automusicon")
    }
    else{
        start_auto_music()
        auto_music_on=true
        auto_music_button.innerText="stop auto music"
        auto_music_button.classList.add("automusicon")
    }
})

const slider=document.getElementById("volume_slider")
slider.oninput=(event)=>{
    audio_volume = event.target.value/100;
}

const playMusic=(path)=>{
    const audio=new Audio(path);
    audio.volume=audio_volume
    audio.play();
}


const makesound=(key)=>{
    switch(key){
        case "w":
            playMusic("sounds/crash.mp3");
            break;
        case "a":
            playMusic("sounds/kick-bass.mp3");
            break;                                                                     
        case "s":
            playMusic("sounds/snare.mp3");
            break;
        case "d":
            playMusic("sounds/tom-1.mp3");
            break;
        case "j":
            playMusic("sounds/tom-2.mp3");
            break;
        case "k":
            playMusic("sounds/tom-3.mp3");
            break;
        case "l":
            playMusic("sounds/tom-4.mp3");
            break;
    }
}

const handledrumclick=(event)=>{
    var innerHTML=event.target.innerHTML;
    console.log(innerHTML);
    animate(innerHTML)
    makesound(innerHTML)
}


var drums =document.querySelectorAll(".drum")
for(let i=0;i<drums.length;i++){
    drums[i].addEventListener("click",handledrumclick)
}



























