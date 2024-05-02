// Global variabler för att kolla om kan eller delete eller edit en bubbla
var canDeleteContentBubble = false;
var canEditContentBubble = false;

function changeAnimation(a, id, color) {
    document.getElementById(id).style.color = color;
    document.getElementById(id).style.animationName = a;
    document.getElementById(id).style.animationDuration = '0.45s';
}

let messageUiCreated = false;
function openMessageUI() {
    if (messageUiCreated === false) {

        // Skapar variablar för dom olika elementen
        var messageUIbackground = document.createElement("div");
        var messageUIcontent = document.createElement("div");
        var secondWrapperDiv = document.createElement("div");
        var summaryArea = document.createElement("textarea");
        var headlineSummary = document.createElement("h5");
        var buttonForCreation = document.getElementById("button_one");
        var buttonForClosing = document.getElementById("button_two");
        var modeInfo = document.getElementById("mode_text");

        //Lägger till classer för css
        summaryArea.classList.add("write-box");
        secondWrapperDiv.classList.add("textarea-box");
        messageUIcontent.classList.add("message-bubble");
        messageUIbackground.classList.add("op");

        //Lägger till värden
        summaryArea.cols = "40"; // Rader
        summaryArea.rows = "10"; // Columner
        summaryArea.maxLength = "150"; // Max number of characthers
        headlineSummary.textContent = "Summary: ";

        // Ändrar attributer
        buttonForCreation.innerHTML = '<i class="fa-solid fa-note-sticky"></i>Post message';
        buttonForCreation.removeAttribute("onclick");
        buttonForCreation.setAttribute("onclick", "postMessage()");
        buttonForClosing.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Back to calander';
        buttonForClosing.removeAttribute('onclick');
        buttonForClosing.setAttribute('onclick', 'removeMessageUI()');
        summaryArea.setAttribute("id", "sumArea");
        messageUIbackground.setAttribute("id", "backgroundMessageUi");
        messageUIcontent.setAttribute("id", "contentMessageUi");
        secondWrapperDiv.setAttribute("id", "twoWrapperDiv");
        modeInfo.textContent = "Bubble creation mode";

        //lägger till  allting
        messageUIcontent.appendChild(secondWrapperDiv);
        secondWrapperDiv.appendChild(headlineSummary);
        secondWrapperDiv.appendChild(summaryArea);
        messageUIbackground.appendChild(messageUIcontent);
        document.body.appendChild(messageUIbackground);
        messageUiCreated = true; // UI för att lägga till en bubbla är uppe eller inte.
 
    } else {
        console.log("Projection error")
    }
}


function postMessage() {
    if (messageUiCreated === true) { // Om UI för att lägga till en bubbla
        const columnWrapper = document.getElementById("wrapperOne");
        const summaryText = document.createElement("p");
        summaryText.setAttribute("id","showText");
        summaryText.textContent = document.getElementById("sumArea").value; // lägger till värdet i bubblan.
        const contentBubble = createContentBubble(summaryText.textContent); // Två andra funktioner. TEMP: Glöm inte lägga till addLineBreak om andra inte 
        columnWrapper.appendChild(contentBubble); // lägger till bubblan i först kolumnen
        
        // Tar bort UI:n för lägga till
        removeMessageUI();
    } else {
        console.log("Posting error");
    }
}

function removeMessageUI() {
    if (messageUiCreated === true) { // Kollar om ui har skapats med variablen.
        const buttonForCreation = document.getElementById("button_one"); // Variable för att ändra första knappen.
        const modeInfo = document.getElementById("mode_text"); // Tar och skapar en variable för att referera till vilket mode vi är på.
        if (buttonForCreation) { // om buttonForCreation är True som den är om den inte är tomm.
            buttonForCreation.innerHTML = '<i class="fa-solid fa-note-sticky"></i> Create new bubble'; //Byter HTMl innehållet för button_one.
            buttonForCreation.removeAttribute("onclick");
            buttonForCreation.setAttribute("onclick", "openMessageUI()"); // Lägger till functionen som ska göras när knappen trycks.
            modeInfo.textContent = "Standard Mode"; // Byter mode texten.
        } else {
            console.log("Button element not found. 1");
        }
        
        // Samma princip här fast med en annan onclick funktion och annan html.
        const buttonForClosing = document.getElementById("button_two");
        if (buttonForClosing) {
            buttonForClosing.innerHTML = '<i class="fa-solid fa-trash"></i> Delete bubble';
            buttonForClosing.removeAttribute("onclick");
            buttonForClosing.setAttribute("onclick", "toggleDeleteMode()");
            modeInfo.textContent = "Standard Mode";
        } else {
            console.log("Button element not found. 2");
        }

        messageUiCreated = false; // byter till back till falskt så att man kan skapa UI:n igen.

        // Tar bort alla UI:ns element.
        const summaryArea = document.getElementById("sumArea");
        summaryArea.remove();
        const backgronudUI = document.getElementById("backgroundMessageUi");
        backgronudUI.remove();
    } else {
        console.log("Deleting error");
    }
}

// Ändrar element och byter canDeleteContentBubble till motsata boolean värde.
function toggleDeleteMode() { 
    canDeleteContentBubble = !canDeleteContentBubble; // Byter till motsatsen från det nyvarande värdet t.ex. true till false eller false till true.
    console.log("toggleDeleteMode works");

    const buttonForClosing = document.getElementById("button_two");
    const info_text = document.getElementById("mode_text");
    if (canDeleteContentBubble) {
        buttonForClosing.innerHTML = '<i class="fa-solid fa-trash"></i> Delete bubble (Mode active)';
        info_text.textContent = "Delete bubble mode";
    } else {
        info_text.textContent = "Standard Mode";
        buttonForClosing.innerHTML = '<i class="fa-solid fa-trash"></i> Delete bubble';
    }
}

// Samma princip här fast med edit kanppen.
function toggleEditMode() {
    canEditContentBubble = !canEditContentBubble;
    console.log("toggleEditMode works");
    const buttonForClosing = document.getElementById("button_four");
    const info_text = document.getElementById("mode_text");
    if (canEditContentBubble) {
        info_text.textContent = "Edit bubble Mode";
        buttonForClosing.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Edit bubble (Mode active)';
    } else {
        info_text.textContent = "Standard Mode";
        buttonForClosing.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Edit bubble';
    }
}



function createContentBubble(text) { // tar text som parameter i detta fall är det 
    const bubble = document.createElement("div");
    const textElement = document.createElement("p");

    textElement.textContent = text;
    bubble.classList.add("content-bubble");
    textElement.classList.add("content-text");

    //Lägg till unik id till textElement
    const textId = 'text_' + Date.now();
    textElement.setAttribute('data-text-id', textId);

    // Add a unique identifier to each content bubble
    const bubbleId = 'bubble_' + Date.now(); // Using a timestamp as a simple identifier
    bubble.setAttribute('data-bubble-id', bubbleId);

    // Gör så att man kan dra bubblan
    bubble.setAttribute('draggable', 'true');
    
    // Lägger till en event listener dragstart som börjar körs när bubblan börjar dras.
    bubble.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData('text/plain', bubbleId); // 
    });

    //Lägg till en click event listener som kör om canEditContentBubble är sant.
    bubble.addEventListener("click", function(){
        if (canEditContentBubble) {
            editContentBubble(textId);
        } else {
            console.log("Cannot edit content bubble. Edit mode not active.");
        }
    })


    //Lägg till en click event listener som kör om canDeleteContentBubble är sant.
    bubble.addEventListener("click", function () {
        if (canDeleteContentBubble) {
            deleteContentBubble(bubbleId);
        } else {
            console.log("Cannot delete content bubble. Delete mode not active.");
        }
    });

    bubble.appendChild(textElement);

    return bubble;
}

function deleteContentBubble(bubbleId) { // Tar bubblansID
    const bubble = document.querySelector(`[data-bubble-id="${bubbleId}"]`); // Tar och letar efter element med data-bubble-id och ser om de har samma värde som bubbleId(datum)
    
    if (bubble && bubble.parentNode) { // om bubblan och denns parent node (column-wrapper) är sanna
        bubble.parentNode.removeChild(bubble);// Tar bubblans parent node (column-wrapper) och tar bort dens child node som har rätt bubbleId
    } else {
        console.log("Bubble or parent node not found.");
    }
}

function editContentBubble(textId) { // Tar textId

    const bubbleText = document.querySelector(`[data-text-id="${textId}"]`); // Tar och letar efter element med text-bubble-id och ser om de har samma värde som textId(datum)
    if (!bubbleText || !bubbleText.parentNode) { // Om det inte finns någon text i bubblan eller en bubbla.
        console.log("Bubble or parent node not found.");
        return; // Function slutas köra
    }

    const textInBubble = bubbleText.textContent; 

    openMessageUI(); 
    const summaryArea = document.getElementById('sumArea');
    const button = document.getElementById("button_one");
    button.removeAttribute('onclick');
    button.setAttribute('onclick', `postEdit('${textId}')`); 
    summaryArea.textContent = textInBubble.replace(/(\r\n|\n|\r)/gm, ""); // Tar bort rad bryten så att det ser snyggar ut när texten läggs till i summery textarea:n
    messageUiCreated = true;
    toggleEditMode(); // Toggle edit mode stängs av.
}

function postEdit(textId) { // Tar textId:n och och själva textens innehåll.
    var newValue = document.getElementById('sumArea').value; // Texten som skrivits i summery textarea:n

    const bubbleText = document.querySelector(`[data-text-id="${textId}"]`);
    if (bubbleText) {
        bubbleText.textContent = newValue; // Lägger till nya texten i bubblan
    } else {
        console.log('Bubble not found.');
    }
    removeMessageUI(); // Tar bort UI:n
}

function handleDrop(event) { // Tar och placera bubblan i denns ny plats.
    event.preventDefault(); // Gör så att det webläsaren gör som standard när ett drop event sker ska inte genomföras
    
    const bubbleId = event.dataTransfer.getData('text/plain'); // Hämtar datan som sätts tidigare denna datan är bubblanId.
    const bubble = document.querySelector(`[data-bubble-id="${bubbleId}"]`); // Hämtar bubblan med hjälp av id:et.
    const dropTarget = event.currentTarget; // currentTarget är column-wrappern som dropet sker på.

    if (bubble && dropTarget) { // Om det finns en bubbla och en coulmn wrapper som mål
        // Lägger till i coulm-wrapper målet, bubblan.
        dropTarget.classList.remove('column-wrapper-over');
        dropTarget.appendChild(bubble);
    }
}

const dropTargets = document.querySelectorAll('.column-wrapper'); // Tar all column-wrappers och gör dom till en lista.
dropTargets.forEach(dropTarget => {
    dropTarget.addEventListener('dragover', function(event) { // Lägger till en event listener som när bubblan dras över görs inget.
        event.preventDefault(); //Gör inget för de flesta webläsare är gjorda så att man inte kan ta ett element och dra det till en annan.
        dropTarget.classList.add('column-wrapper-over');
    });

    dropTarget.addEventListener('dragleave', function(event) {
        dropTarget.classList.remove('column-wrapper-over');
    })

    dropTarget.addEventListener('drop', handleDrop);// När drop event sket pooå column-wrappern sker handleDrop functionen.
});

function removeColumn() {
    const targetParent = document.getElementById('main-part');
    const listOfColumns = targetParent.querySelectorAll('.column-wrapper');
    const targetColumn = listOfColumns[listOfColumns.length - 1];
    targetParent.removeChild(targetColumn);
}

function addColumn() {
    const targetParent = document.getElementById('main-part');
    const newColumnWrapper = document.createElement('div');
    const newInputTop = document.createElement('input');
    
    newInputTop.placeholder = 'New column';
    newColumnWrapper.classList.add('column-wrapper');
    newInputTop.classList.add('day_name');

    newColumnWrapper.appendChild(newInputTop);
    targetParent.appendChild(newColumnWrapper);
    
    newColumnWrapper.addEventListener('dragover', function(event) {
        event.preventDefault();
        newColumnWrapper.classList.add('column-wrapper-over');
    });

    newColumnWrapper.addEventListener('dragleave', function(event) {
        newColumnWrapper.classList.remove('column-wrapper-over');
    })

    newColumnWrapper.addEventListener('drop', handleDrop);
}
