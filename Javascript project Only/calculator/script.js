let input = document.querySelector('.input-box');
let buttons= document.querySelectorAll('button')
let string = '';
let arr = Array.from(buttons);

// buttons.forEach(button=>{
//  button.addEventListener('click',(e)=>{
//   if(e.target.innerHTML == '='){
//    string = eval(string)
 
//     input.value= string;
//   } 
//   else if (e.target.innerHTML == 'Ac'){
//   string='';
//   input.value= string;
//   }
//   else if(e.target.innerHTML == 'Del'){
//     string = input.value.substring(0,input.value.length -1)
//       input.value = string;
 
//   }
// else {
//  string += e.target.innerHTML;
//  input.value = string;
// }
// if (input.value == 'undefined'){
//   string = '';
//   input.value = string;
// }

// } )
// })

buttons.forEach(button=>{
  button.addEventListener('click',(e)=>{
    if(e.target.innerHTML == '='){
      string=eval(string);
      input.value = string;

    }else if(button.innerText == 'Ac'){
      string='';
      input.value = string;
    }else if (button.innerText == 'Del'){
      string=input.value.substring(0,input.value.length -1);
      input.value = string;
    }
    else {
      string+=button.innerText;
      input.value=string;
    }
    if(input.value == 'undefined'){
      string='';
      input.value=string;
    }
  })
})