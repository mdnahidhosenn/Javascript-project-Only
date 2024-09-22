//  taiwebs.com

const colorPickerBtn = document.querySelector('#color-picker');
const colorList = document.querySelector('.all-color')
const clearAllbtn = document.querySelector('.clear-all')
const pickedColor  =JSON.parse(localStorage.getItem('picked-colors')) || [];

const copyColor =elem=>{
  navigator.clipboard.writeText(elem.dataset.color);
  elem.innerText ='Copied';
  setTimeout(() => {
    elem.innerText = elem.dataset.color
  }, 1000);
}


function showColor(){
  // if(!pickedColor.length) return;
  
 colorList.innerHTML = pickedColor.map(color =>
  `
<li class="color">
<span class="react" style="background: ${color} ; border: 1px solid ${color == '#ffffff' ? "#ccc" : color }"  ></span>
     <span class="value" data-color="${color}">${color}</span>
    </li>

  `
 ).join('')
 document.querySelector('.picked-colors').classList.remove('hide')

 document.querySelectorAll('.color').forEach(li=>{
  li.addEventListener('click',e=> copyColor(e.currentTarget.lastElementChild))
 })

}
showColor()

const activateEyeDropper = async ()=> {
 try {

  const eyeDropper = new EyeDropper();
  const {sRGBHex} = await eyeDropper.open();
  navigator.clipboard.writeText(sRGBHex);

  if(!pickedColor.includes(sRGBHex)){

    pickedColor.push(sRGBHex)
    localStorage.setItem('picked-colors',JSON.stringify
     (pickedColor))
     showColor( )
  }

 } catch(error){
  console.log(error);
 }
}


const clearAllColors = ()=>{
   pickedColor.length = 0;
   localStorage.setItem('picked-colors',JSON.stringify(pickedColor))
   document.querySelector('.picked-colors').classList.add('hide')
}
clearAllbtn.addEventListener('click', clearAllColors)
colorPickerBtn.addEventListener('click',activateEyeDropper)
