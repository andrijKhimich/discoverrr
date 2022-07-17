// const toggleMenu = () => {
//   const burger = document.querySelector(".js-burger");
//   const menu = document.querySelector(".js-header-nav");
//   const body = document.querySelector("body");
//   burger.addEventListener("click", () => {
//     if (!menu.classList.contains("active")) {
//       menu.classList.add("active");
//       burger.classList.add("active");
//       body.classList.add("locked");
//     } else {
//       menu.classList.remove("active");
//       burger.classList.remove("active");
//       body.classList.remove("locked");
//     }
//   });
//   window.addEventListener("resize", () => {
//     if (window.innerWidth > 992) {
//       menu.classList.remove("active");
//       burger.classList.remove("active");
//       body.classList.remove("locked");
//     }
//   })
// }
// toggleMenu();

// const fixedHeader = () => {
//   const header = document.querySelector(".header");
//   const startPoint = 1;
//   if (window.scrollY >= startPoint) {
//     header.classList.add("fixed");
//   } else {
//     header.classList.remove("fixed");
//   }
// }

// window.addEventListener("scroll", fixedHeader);

// run for sprite svg support 

// const accordion = () => {
//   let acc = document.getElementsByClassName("accordion__btn");
//   let i;

//   for (i = 0; i < acc.length; i++) {
//     acc[i].addEventListener("click", function () {
//       // acc.classList.remove("active");
//       // this.classList.add("active");
//       this.parentNode.classList.toggle("active");

//       let panel = this.nextElementSibling;

//       if (panel.style.maxHeight) {
//         panel.style.maxHeight = null;
//       } else {
//         panel.style.maxHeight = panel.scrollHeight + "px";
//       }
//     });
//   }
// }
// accordion();

const accordion = document.querySelector(".accordion");
const accordionItems = document.querySelectorAll(".accordion__item");
const accordionContent = document.querySelectorAll(".accordion__panel");

const toggleAccordion = () => {
  accordion.addEventListener("click", (e) => {
    const parent = e.target.parentNode;
    let panel = parent.querySelector(".accordion__panel");

    if (parent.classList.contains("active")) {
      parent.classList.remove("active");
      panel.style.maxHeight = null;
    } else {
      accordionItems.forEach((item) => {
        item.classList.remove("active");
      });
      accordionContent.forEach((item) => {
        item.style.maxHeight = null;
      })
      parent.classList.add("active");
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  })
}
toggleAccordion();


function openTab(evt, currencyName) {
  let i, tabContent, tabLinks;
  tabContent = document.getElementsByClassName("calculator-tab__content");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
    tabContent[i].classList.remove("active");

  }
  tabLinks = document.getElementsByClassName("calculator-tab__links");
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(" active", "");
  }
  document.getElementById(currencyName).style.display = "block";
  document.getElementById(currencyName).classList.add("active");

  evt.currentTarget.className += " active";
}

const tabBtns = document.querySelectorAll(".calculator-tab__links");
const toggleTab = () => {
  tabBtns.forEach(tabBtn => {
    tabBtn.addEventListener("click", (e) => {
      let target = e.target.getAttribute("data-href");
      openTab(e, target)
    })
  });
};
toggleTab();

document.querySelector("#openDefault").click();

svg4everybody();