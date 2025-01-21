const filters = document.querySelectorAll(".filter");
const taxSwitch = document.querySelector("#flexSwitchCheckReverse");
const rightArrow = document.querySelector(".right-arrow i");
const rightArrContainer = document.querySelector(".right-arrow");
const leftArrContainer = document.querySelector(".left-arrow");
const leftArrow = document.querySelector(".left-arrow i");
const tabsList = document.querySelector(".in-container");

function checkActiveState() {
    const activeFilter = document.querySelector('.filter.active');
    if (!activeFilter) {
        filters[0].classList.add('active');
    }
}

for(let filter of filters) {
    filter.addEventListener("click", (event) => {
        // event.preventDefault();
        // if (filter.classList.contains('active')) {
        //     filter.classList.remove('active');
        // } else {
            filters.forEach(f => f.classList.remove('active'));
            
            filter.classList.add('active');
            // filter.classList.add("color");
            console.log(filter);
        // }
        // checkActiveState();
    })
}

taxSwitch.addEventListener("click", () => {
    let taxInfo = document.querySelectorAll(".tax");
    for(tax of taxInfo) {
        if(tax.style.display !== "inline") {
            tax.style.display = "inline";
        } else {
            tax.style.display = "none";
        }
    }
});

const manageArrows = () => {
    if(tabsList.scrollLeft >= 20) {
        leftArrContainer.classList.add("arrow-active");
    } else {
        leftArrContainer.classList.remove("arrow-active");
    }

    // console.log(tabsList.scrollWidth);
    // console.log(tabsList.clientWidth);
    let maxScroll = tabsList.scrollWidth - tabsList.clientWidth - 20;
    if(tabsList.scrollLeft >= maxScroll) {
        rightArrContainer.classList.remove("arrow-active");
    } else {
        rightArrContainer.classList.add("arrow-active");
    }
};

rightArrow.addEventListener("click", () => {
    tabsList.scrollLeft += 200;
    manageArrows();
});

leftArrow.addEventListener("click", () => {
    tabsList.scrollLeft -= 200;
    manageArrows();
});

tabsList.addEventListener("scroll", manageArrows);

let isDragging = false;
let drag = (e) => {
    if(!isDragging) return;
    tabsList.classList.add("drag");
    tabsList.scrollLeft -= e.movementX;
}

tabsList.addEventListener("mousedown", () => {
    isDragging = true;
})

tabsList.addEventListener("mousemove", drag);

document.addEventListener("mouseup", () => {
    isDragging = false;
    tabsList.classList.remove("drag");
})