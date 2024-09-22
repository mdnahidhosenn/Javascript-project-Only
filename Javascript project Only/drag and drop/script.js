const items = document.querySelectorAll('.item');
const sortableList = document.querySelector('.sortable-list')

items.forEach(items => {
 items.addEventListener('dragstart',()=> {
  items.classList.add('dragging')
 })
 items.addEventListener('dragend',()=>{
  items.classList.remove('dragging')
 })
})



const  intiSortableLIst = (e)=>{
 e.preventDefault()

 const draggingItem = sortableList.querySelector('.dragging')
 const siblings = [...sortableList.querySelectorAll('.item:not(.dragging)')]


 let nextSibling = siblings.find(sibling=>{


return e.clientY <=sibling.offsetTop + sibling.offsetHeight / 2 ;
})
sortableList.insertBefore(draggingItem , nextSibling)
}
sortableList.addEventListener('dragover',intiSortableLIst)
sortableList.addEventListener('dragenter',e => e.preventDefault())