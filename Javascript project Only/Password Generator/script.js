let range = document.querySelector('.range');
let rangevalue=document.querySelector('.rangevalue');
let lowercase=document.querySelector('.lowercase');
let uppercase=document.querySelector('.uppercase');
let number=document.querySelector('.number');
let symbols=document.querySelector('.symbols');
let genbtn=document.querySelector('.genbtn');
let passBox = document.querySelector('.pass-box')
let copy = document.querySelector('#copy')
/*
rangevalue.textContent =range.value;
range.addEventListener('input',()=>{
 rangevalue.textContent =range.value;

})

genbtn.addEventListener('click',()=>{
passBox.value=generatePass();
copy.innerHTML=`<i class="fa-regular fa-clone" ></i>`
})

let upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
let lowerChars =upperChars.toLowerCase();
let allNumbers ='0123456789'
let allSymbols ='`~@#$%^&*,?-+<>'
function generatePass(){
 let genpass='';

 let allchar='';
 allchar+=lowercase.checked ? lowerChars : '';
 allchar+=uppercase.checked ? uppercase : '';

 allchar+= number.checked ? allNumbers : '';

 allchar+=symbols.checked ? allSymbols: '';
 let i = 1;
 while(i<=range.value){

  genpass+=allchar.charAt(Math.floor(Math.random()*allchar.length)+1)
  i++;
 }

 return genpass
}

copy.addEventListener('click',()=>{
 if(passBox.value != '' ){

  navigator.clipboard.writeText(passBox.value);
  copy.innerHTML=`<i class="fa-solid fa-check" title="copied"></i> `;
// setTimeout(()=>{
//  copy.innerHTML= 'content copy'
// },2000)

 } //|| passBox.value.length >=1

})*/

rangevalue.textContent=range.value;
range.addEventListener('input',()=>{
  rangevalue.textContent=range.value
})
genbtn.addEventListener('click',()=>{
  passBox.value=generatePass()
})

let upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
let lowerchase=upperChars.toLowerCase();
let latters='0123456789'
let allSymbols ='`~@#$%^&*,?-+<>'

function generatePass(){
  let genpass=''
  let password='';
  password+=lowercase.checked ? lowerchase : '';
  password+=uppercase.checked ? upperChars : '';
  password+=number.checked ? latters:'';
  password+=symbols.checked ? allSymbols : '';
 

  let i = 1 
  while(i<=range.value){
    genpass+=password.charAt(Math.floor(Math.random()*password.length)+1);
    i++
  }

  return genpass;
}
