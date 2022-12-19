const nav = document.querySelector("nav");
const navCta = document.querySelector(".indexContents").querySelectorAll("li");
const navBtn = nav.querySelector(".openCloseIcon");
const main = document.querySelector("main");
const contents = document.querySelector("#contents");
const trailContainer = document.querySelector("#trail-contents");
const closeButton = document.querySelector("#cta-closeTrail");
const cards = document.querySelectorAll(".keymoment");

const selectPersona = document.querySelector("#persona-select");
let selectPersonValue = selectPersona.value;
const selectType = document.querySelector("#type-select");
let selectTypeValue = selectType.value;
let keyId = selectPersonValue;
let flowId = selectTypeValue + selectPersonValue;
displayFlow();

const toolTip = document.querySelector("#toolTip");
const cardsWithTooltip = document.querySelectorAll(".enabledTip");
const tipsContainer = document.querySelector("#containerCxElements");
let widthTip = 339;
let pageX = pageY = 0;

let menuOpen = false;
let arrayPositions = [];

// SWITCH SCROLL

function scrollEnabler (toDisable, toEnable) {
    toDisable.style.overflow = "hidden";
    toEnable.style.overflow = "scroll";
}

// ADD ANIMATION AFTER PAGE LOAED

window.addEventListener('load', (event) => {
    document.querySelector("body").classList.remove("preload");
    recordPositions();
    activateNav();
});

// FIND MOUSE

function updateDisplay(event) {
    pageX = event.pageX;
    pageY = event.pageY;
    toolTip.style.transform = "translate("+pageX+"px, "+pageY+"px)";
}

document.addEventListener("mousemove", updateDisplay, false);

// CX ELEMENTS
let userHasScrolled = false;

for (let i = 0; i < cardsWithTooltip.length; i++) {
    const myCard = cardsWithTooltip[i];
    const cardReference = myCard.getElementsByClassName("reference")[0];
    const cardLabel = myCard.getElementsByTagName("span")[0];
    const cardPill = myCard.getElementsByClassName("pill")[0];

    let cxId = myCard.dataset.cxId;
    let cxScale = myCard.dataset.cxRelevance;
    let cxTag = myCard.dataset.cxTag;

    //cardLabel.innerHTML = cxId;
    cardPill.innerHTML = cxTag;
    let currentCx = tipsContainer.getElementsByClassName("CxElement")[(cxId-1)].children[0].children[1].children[cxScale];
    let cxTagContainer = tipsContainer.getElementsByClassName("CxElement")[(cxId-1)].getElementsByClassName("CxTag")[0];
    
    cardPill.addEventListener("mouseenter", function( event ) {
        currentCx.classList.add("selectedScale");
        cxTagContainer.innerHTML = cxTag;
        tipsContainer.style.transform = "translateX("+ (0 - ((cxId - 1) * widthTip)) +"px)";
        toolTip.classList.add("revealToolTip");
        toolTip.style.opacity = "1";
    }, false);

    cardPill.addEventListener("mouseleave", function( event ) {
        toolTip.classList.remove("revealToolTip");
        toolTip.style.opacity = "0";
        setTimeout(() => {
            currentCx.classList.remove("selectedScale");
            cxTagContainer.innerHTML = "";
        }, 100);
    }, false);
}

contents.onscroll = (e) => {  
    toolTip.classList.remove("revealToolTip");
    toolTip.style.opacity = "0";
}

// KEY MOMENT CLICK

for (let i = 0; i < cards.length; i++) {
    const myCard = cards[i]; 
    
    myCard.addEventListener('click', event => {
        let id = myCard.dataset.indexNumber;
        let page = "moment-"+id+".html"; 
        main.classList.add("showTrail");
        trailContainer.innerHTML = "";

        setTimeout(function() {
            $('#trail-contents').load(page);
            trailContainer.style.opacity = "1";
            scrollEnabler(contents, trailContainer);
        }, 700);       
    });
}

// TRAIL

closeButton.addEventListener("click", closeDetails);

function closeDetails (){
    main.classList.remove("showTrail");
    
    setTimeout(function() {
        scrollEnabler(trailContainer, contents);
    }, 400);   

    setTimeout(function() {
        trailContainer.style.opacity = "0";
    }, 1000);    
}

selectPersona.addEventListener('change', (event) => {
    selectPersonValue = event.target.value;
    displayFlow();
});

selectType.addEventListener('change', (event) => {
    selectTypeValue = event.target.value;
    displayFlow();
});

// FILTERS STEP FLOWS

function displayFlow (){
    //let currentKey = document.querySelector("#key-"+keyId);
    let currentFlow = document.querySelector("#flow-"+flowId);
    //currentKey.classList.add("hideFlow");
    currentFlow.classList.add("hideFlow");

    
    //keyId = selectPersonValue;
    flowId = selectTypeValue + selectPersonValue;

    //let newKey = document.querySelector("#key-"+keyId);
    let newFlow = document.querySelector("#flow-"+flowId);
    //newKey.classList.remove("hideFlow");
    newFlow.classList.remove("hideFlow");

    if(selectTypeValue == 1){
        selectType.className = '';
        selectType.classList.add("selectedFirsttimers");
    }

    if(selectTypeValue == 2){
        selectType.className = '';
        selectType.classList.add("selectedRepeaters");
    }

    if(selectTypeValue == 3){
        selectType.className = '';
        selectType.classList.add("selectedOthers");
    }
}

// NAVIGATION

navBtn.addEventListener('click', event => {
    if(menuOpen == false) {
        menuOpen = true;
        nav.classList.add("openNav");
        setTimeout(() => {
            nav.classList.add("revealIndex");
        }, 200);
    } else {
        menuOpen = false;
        nav.classList.remove("revealIndex");
        setTimeout(() => {
            nav.classList.remove("openNav");
        }, 200);
    }
});

// INDEX

function recordPositions () {
    for (let i = 0; i < navCta.length; i++) {
        let posX = $("#s"+(i+1)).offset().left;
        arrayPositions.push(posX - 200); //200 is the width of the sidebar
    }
}

function activateNav () {
    for (let i = 0; i < navCta.length; i++) {
        const myButton = navCta[i];
        myButton.addEventListener('click', event => {
            console.log(myButton, i+1, arrayPositions[i]);
            $('#contents').animate({
                scrollLeft: arrayPositions[i]
            }, 1000);
        });
    }
}

