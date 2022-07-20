const toggleMenu = () => {
  const burger = document.querySelector(".js-burger");
  const menu = document.querySelector(".js-header-nav");
  const body = document.querySelector("body");
  const headerContent = document.querySelector(".js-header-content");

  burger.addEventListener("click", () => {
    if (!menu.classList.contains("active")) {
      menu.classList.add("active");
      burger.classList.add("active");
      body.classList.add("locked");
      headerContent.classList.add("active");
    } else {
      menu.classList.remove("active");
      burger.classList.remove("active");
      body.classList.remove("locked");
      headerContent.classList.remove("active");
    }
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 992) {
      menu.classList.remove("active");
      burger.classList.remove("active");
      body.classList.remove("locked");
    } else if(window.innerWidth > 768) {
      headerContent.classList.remove("active");
      // menu.classList.add("active");
    } else {

    }
  })
}
toggleMenu();

const fixedHeader = () => {
  const header = document.querySelector(".header");
  const startPoint = 1;
  if (window.scrollY >= startPoint) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }
}

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

document.querySelector("#openDefault").click();

const faqAccordion = document.querySelector(".faq-accordion");
const faqAccordionItems = document.querySelectorAll(".faq-accordion__item");
const faqAccordionContent = document.querySelectorAll(".faq-accordion__panel");

const toggleFaqAccordion = () => {
  faqAccordion.addEventListener("click", (e) => {
    const faqParent = e.target.parentNode;
    let faqPanel = faqParent.querySelector(".faq-accordion__panel");

    if (faqParent.classList.contains("active")) {
      faqParent.classList.remove("active");
      faqPanel.style.maxHeight = null;
    } else {
      faqAccordionItems.forEach((item) => {
        item.classList.remove("active");
      });
      faqAccordionContent.forEach((item) => {
        item.style.maxHeight = null;
      })
      faqParent.classList.add("active");
      faqPanel.style.maxHeight = faqPanel.scrollHeight + "px";
    }
  })
}

toggleFaqAccordion();
document.querySelector("#openFaq").click();


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

const animItems = document.querySelectorAll(".js-show");
const showAnimation = () => {
  const trigger = (window.innerHeight / 5) * 4;
  animItems.forEach((item) => {
    const itemTop = item.getBoundingClientRect().top;
    if (itemTop < trigger) {
      item.classList.add("show");
    } else {
      item.classList.remove("show");
    }
  });
}
window.addEventListener("scroll", showAnimation);
showAnimation();
svg4everybody();


const svgs = document.querySelectorAll('.svg-hero path');
console.log(svgs);

// tasks is your array
svgs.forEach((element, i) => {
  // setInterval(
  //   function () {
  //     element.style.opacity = 0;
  //     //the work you want to perform   
  //   }
  //   , i * 10);
  element.style.animationDelay = i + 1;

});