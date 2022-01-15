import { cons } from "./app/firebase";
//import { button } from "./app/getbooks" 
console.log('from bindel.js');
console.log('from compiled with live reloding devserver');

const themeSwitch = document.getElementById('darkThemeToggle');
const root = document.querySelector(':root');
let darkTheme = localStorage.getItem("darkTheme")
const enableDarkTheme= ()=>{
    document.body.classList.add("darkTheme");
    localStorage.setItem('darkTheme', 'enabled');
} 
const disableDarkTheme= ()=>{
    document.body.classList.remove("darkTheme");
    localStorage.setItem('darkTheme', null);
} 

if(darkTheme === "enabled"){
    enableDarkTheme();
    themeSwitch.innerHTML = "<ion-icon name='sunny-outline'></ion-icon>"
}else{
    themeSwitch.innerHTML = "<ion-icon name='moon-outline'></ion-icon>"
}

themeSwitch.addEventListener('click', ()=>{
    //console.log('test')
    darkTheme = localStorage.getItem("darkTheme");
    if(darkTheme !=='enabled'){
        enableDarkTheme();
        themeSwitch.innerHTML = "<ion-icon name='sunny-outline'></ion-icon>"
    } else if (darkTheme !== null){
        disableDarkTheme();
        themeSwitch.innerHTML = "<ion-icon name='moon-outline'></ion-icon>"
    }
})
