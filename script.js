const cards = document.querySelectorAll(".card")
const containers = document.querySelectorAll(".card-section")
const cardContainerWrapper = document.getElementById("main-cont")
let mainCardContainer = document.getElementById("main-card-cont")


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





function CreateCard(parentEle , title, text){
    let ele = document.createElement("div")
    ele.setAttribute("class", "card")
    ele.setAttribute("draggable", "true")

    let eleTitle = document.createElement("div")
    eleTitle.setAttribute("class", "card-title-entry")
    eleTitle.setAttribute("data-placeholder", "Title")
    eleTitle.innerHTML = title

    let eleText = document.createElement("div")
    eleText.setAttribute("class", "card-text-entry")
    eleText.setAttribute("data-placeholder", "Empty Note")
    eleText.innerHTML = text
    
    let eleTools = document.createElement("div")
    eleTools.setAttribute("class", "card-tools")

    ele.appendChild(eleTitle)
    ele.appendChild(eleText)
    ele.appendChild(eleTools)

    parentEle.appendChild(ele)
}


function createCardContainer(parent, cardName){
    let ele = document.createElement("div")
    ele.setAttribute("class", "card-section")

    let eleHeader = document.createElement("div")
    eleHeader.setAttribute("class", "card-group-name")
    eleHeader.setAttribute("contenteditable", "true")
    eleHeader.innerHTML = cardName

    ele.appendChild(eleHeader)

    parent.appendChild(ele)
}



const all_cards = document.getElementsByClassName("card")
console.log(all_cards)

function openeditor(e){
    console.log(e, "Ele working")
}

let tampa = 0
Array.prototype.forEach.call(all_cards, function(card) {
    console.log(card)
    tampa = card
    //card.onclick = openeditor
    card.setAttribute("onclick", "openeditor(tampa);")
});


CreateCard(mainCardContainer, "card1", "card1 text")
createCardContainer(cardContainerWrapper, "This is the new created container")