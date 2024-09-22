const passwordInput = document.querySelector(".pass-field input");
const eyeIcon = document.querySelector(".pass-field i");
const requirementList = document.querySelectorAll(".requirement-list li");

const requirements = [
 { regex: /.{8,}/, index: 0 }, // Minimum of 8 characters
 { regex: /[0-9]/, index: 1 }, // At least one number
 { regex: /[a-z]/, index: 2 }, // At least one lowercase letter
 { regex: /[^A-Za-z0-9]/, index: 3 }, // At least one special character
 { regex: /[A-Z]/, index: 4 }, // At least one uppercase letter
]



passwordInput.addEventListener('keyup',(e)=>{
 if(passwordInput.value.length > 0){
  eyeIcon.classList.remove('hidden')
 }

 requirements.forEach(item=>{
  let isValid = item.regex.test(e.target.value);
  console.log(item.regex);
 
  let requirementItem =requirementList[item.index];
  console.log(requirementItem);

  if(isValid){
   requirementItem.classList.add('valid');
   requirementItem.firstElementChild.className = "fa-solid fa-check";
  }else {
   requirementItem.classList.remove("valid");
   requirementItem.firstElementChild.className = "fa-solid fa-circle";
  }
 })

})

if(passwordInput.value.length == 0){
 eyeIcon.classList.add('hidden');
}










