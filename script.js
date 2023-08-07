let cards = document.querySelectorAll(".card")
const containers = document.querySelectorAll(".card-section")
const cardContainerWrapper = document.getElementById("main-cont")
const editorCanvas = document.getElementById("editor-canvas")
const textEditor = document.getElementById("text-editor")

let cardslist = [...cards]
let containersList = [...containers]
let mainCardContainer = document.getElementById("main-card-cont")
let currentCard = null
let currentCardContainer = null

editorCanvas.addEventListener('click', (event) => {
    if(event.target.id === "editor-canvas"){
        editorCanvas.style.display = "none"
        currentCard.children[0].innerHTML = textEditor.children[0].innerHTML
        currentCard.children[1].innerHTML = textEditor.children[1].innerHTML
        textEditor.children[0].innerHTML = ""
        textEditor.children[1].innerHTML = ""
    }
})

function draggableCards(card){
    card.addEventListener('dragstart', ()=>{
        card.classList.add("dragging")
    })

    card.addEventListener('dragend', ()=>{
        card.classList.remove("dragging")
    })
}

function dragAcceptableContainers(container){
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
}


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

function clickableCards(card){
    card.addEventListener("click", (event)=>{
        console.log(event.target, card.children)
        currentCard = card
        openEditor(card, card.children[0].innerHTML, card.children[1].innerHTML)
    })
}

cards.forEach(card => {
    draggableCards(card)
    clickableCards(card)
})

containers.forEach(container => {
    dragAcceptableContainers(container)
})


editorCanvas.style.display = "none"


function openEditor(cardcontainer, title = "", text= ""){
    //currentCardContainer = cardcontainer.target.parentElement
    //currentCardContainer = cardcontainer.parentElement
    editorCanvas.style.removeProperty("display")
    textEditor.children[0].innerHTML = title
    textEditor.children[1].innerHTML = text
    //editorCanvas.style.display = "none"
}


function CreateCard(parentEle , title= "", text= ""){
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
    
    draggableCards(ele)
    clickableCards(ele)
    cardslist.push(ele)

    return ele
}


function createCardContainer(parent, cardName){
    let ele = document.createElement("div")
    ele.setAttribute("class", "card-section")
    
    let eleHeader = document.createElement("div")
    eleHeader.setAttribute("class", "card-group-name")
    eleHeader.setAttribute("contenteditable", "true")
    eleHeader.innerHTML = cardName

    ele.appendChild(eleHeader)

    let addEle = document.createElement("div")
    addEle.setAttribute("class", "add-card")
    addEle.innerHTML = "+"
    //addEle.setAttribute("onclick", "openEditor()")
    addEle.addEventListener("click", (event)=>{
        currentCard = CreateCard(ele)
        openEditor(event)
    })
    
    ele.appendChild(addEle)
    
    parent.appendChild(ele)
    
    dragAcceptableContainers(ele)
    containersList.push(ele)
    return ele
}



let newCard = CreateCard(mainCardContainer, "card1", "card1 text")
let newContainer = createCardContainer(cardContainerWrapper, "This is the new created container")