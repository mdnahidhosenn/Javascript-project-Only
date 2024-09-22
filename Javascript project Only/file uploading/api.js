

const fileBrowseBtn= document.querySelector('.file-browse-button');
 const fileBrowseInput = document.querySelector('.file-browse-input');
 const fileUploadBox = document.querySelector('.file-upload-box')
 const fileList = document.querySelector('.file-list')

const createFileItemHTML = (file,index)=>{
  const {name,size} =file;
  const extension = name.split('.').pop()

  return  `    <li class="file-item" id="file-item-">
        <div class="file-extension">${extension}</div>
        <div class="file-content-wrapper">
        <div class="file-content">
            <div class="file-details">
            <h5 class="file-name">${name}</h5>
            <div class="file-info">
                <small class="file-size">4 MB / ${size}</small>
              
                <small class="file-divider">•</small>
                <small class="file-status">Uploading...</small>
            </div>
            </div>
            <button class="cancel-button">
            <i class="bx bx-x"></i>
            </button>
        </div>
        <div class="file-progress-bar">
            <div class="file-progress"></div>
        </div>
        </div>
    </li> `;
    

 

}
// const handleFileUploading = (file,index) =>{
//   const xhr = new XMLHttpRequest();
//   const formData = new FormData()
//   formData.append('file',file);

//   xhr.upload.addEventListener('progress',(e)=>{
//     console.log(e);
//   })
//   xhr.open('POST','api.php',true);
//   xhr.send(formData)
// }

const handleSelectedFiles = ([...files]) =>{

  if(files.length === 0) return;

    files.forEach((file,index) =>{
     const fileItemHTML= createFileItemHTML(file,index)
     fileList.insertAdjacentHTML('afterbegin',fileItemHTML)
     handleFileUploading(file,index)
    })
  
}
fileUploadBox.addEventListener('drop',(e)=>{
 e.preventDefault()
handleSelectedFiles(e.dataTransfer.files)
 fileUploadBox.classList.remove('active')
 fileUploadBox.querySelector('.file-instruction').innerText = 'Drag files here or';
})
fileUploadBox.addEventListener('dragover',(e)=>{
 e.preventDefault()
  fileUploadBox.classList.add('active')
  fileUploadBox.querySelector('.file-instruction').innerText = 'Drag file here or';
})
fileUploadBox.addEventListener('dragleave',(e)=>{
 e.preventDefault()
  fileUploadBox.classList.remove('active')
  fileUploadBox.querySelector('.file-instruction').innerText = 'Drag file here or';
})

 fileBrowseInput.addEventListener('change',(e) =>handleSelectedFiles(e.target.files))
 fileBrowseBtn.addEventListener('click',()=> fileBrowseInput.click())
