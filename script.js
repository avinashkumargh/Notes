const cards = document.querySelectorAll(".card")
const containers = document.querySelectorAll(".card-section")


cards.forEach(card => {
    card.addEventListener('dragstart', ()=>{
        card.classList.add("dragging")
    })

    card.addEventListener('dragend', ()=>{
        card.classList.remove("dragging")
    })
})

containers.forEach(container => {
    container.addEventListener("dragover", e =>{
        e.preventDefault()
        const afterCard = getDragAfterelement(container, e.clientX, e.clientY)
        const card = document.querySelector(".dragging")
        if (afterCard == null){
            container.appendChild(card)
        }
        else{
            container.insertBefore(card, afterCard)
        }

    })
})


function getDragAfterelement(container, x, y){
    const cardElements = [...container.querySelectorAll('.card:not(.dragging)')]

    return cardElements.reduce((closest, child, index) =>{
        const box = child.getBoundingClientRect()
        const nextBox = cardElements[index + 1] && cardElements[index + 1].getBoundingClientRect()
        const inRow = y - box.bottom <= 0 && y- box.top >=0;
        const offset = x - box.left - box.width /2

        if (inRow) {
            if (offset < 0 && offset > closest.offset){
                return { offset: offset, element : child}
            }
            else{
                if(nextBox && y -nextBox.top <= 0 && closest.offset === Number.NEGATIVE_INFINITY){
                    return {offset : 0, element : cardElements[index + 1]}
                }
                return closest
            }
        }
        else{
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}

const editorCanvas = document.getElementById("editor-canvas")
editorCanvas.style.display = "none"

document.addEventListener("keydown", (e) => {
    if (e.key === "1") {
        console.log(editorCanvas.style.display)
        if (editorCanvas.style.display === ""){
            editorCanvas.style.display = "none"
        }
        else{
            editorCanvas.style.removeProperty("display")
        }
    }
})

