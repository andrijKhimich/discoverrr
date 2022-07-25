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
    } else if (window.innerWidth > 768) {
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
    if (parent.classList.contains("accordion__item")) {
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
    if (faqParent.classList.contains('faq-accordion__item')) {
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

const removeLogoSizes = () => {
  const logoImg = document.querySelector('.logo img');
  logoImg.removeAttribute('width');
  logoImg.removeAttribute('height');
}

removeLogoSizes();

const roundNumber = (val) => {
  return Math.ceil(val / 100) * 100
}
const discoverTotalUsd = $("#discoverTotalUsd");
const traditionalTotalUsd = $("#traditionalTotalUsd");
const savingsUsd = $('#savingsUsd');

const discoverTotalAed = $("#discoverTotalAed");
const traditionalTotalAed = $("#traditionalTotalAed");
const savingsAed = $('#savingsAed')

const input = $('.range-slider__value');
let slide;

$(function () {
  const range = $("#slider-range-min");
  range.slider({
    range: "min",
    value: 100,
    min: 0,
    max: 5000,
    step: 100,
    slide: function (event, ui) {
      let newVal = ui.value;
      this.value = roundNumber(newVal);
      $("#amount").val(this.value);
      if (this.value === 0) {
        discoverTotalUsd.text('$0');
        discoverTotalAed.text('AED 0');
      }

      slide = $(".ui-slider-range").css('width');
      console.log(slide);
      input.css('left', slide);
      getCurrentPriceFromSKUUSD(this.value);
      getCurrentPriceFromSKUAED(this.value);
    },
    change: function () {
      slide = $(".ui-slider-range").css('width');
      console.log(slide);
      input.css('left', slide);
    }
  });

  $("#amount").val($("#slider-range-min").slider("value"));
  // $("#amount")
  $("#amount").blur(function () {
    this.value = roundNumber(this.value);
    if (this.value === 0) {
      discoverTotalUsd.text('$0');
      discoverTotalAed.text('AED 0');
    }
    range.slider({
      value: this.value,
    });
    slide = $(".ui-slider-range").css('width');
    console.log(slide);
    input.css('left', slide);
    getCurrentPriceFromSKUUSD(this.value);
    getCurrentPriceFromSKUAED(this.value);
  });

  $("#amount").on("keyup", function (e) {
    if (e.key === "Enter") {

      this.value = roundNumber(this.value);
      if (this.value === 0) {
        discoverTotalUsd.text('$0');
        discoverTotalAed.text('EAD 0');
      }
      // console.log(this.value);

      range.slider({
        value: this.value,
      });
      slide = $(".ui-slider-range").css('width');
      console.log(slide);
      input.css('left', slide);
      getCurrentPriceFromSKUUSD(this.value);
      getCurrentPriceFromSKUAED(this.value);
    }
  });
});

var basePriceUSD = 45;
var basePriceAED = 165;

var disCount = 0.1;
const month = 12;
var config = {
  100: 0,
  200: 0.18,
  300: 0.18,
  400: 0.14,
  500: 0.14,
  600: 0.10,
  700: 0.10,
  800: 0.10,
  900: 0.10,
  1000: 0.10,
  1100: 0.07,
  1200: 0.07,
  1300: 0.05,
  1400: 0.05,
  1500: 0.05,
  1600: 0.03,
  1700: 0.03,
  1800: 0.03,
  1900: 0.03,
  2000: 0.03,
  2100: 0.02,
  2200: 0.02,
  2300: 0.02,
  2400: 0.02,
  2500: 0.02,
  2600: 0.01,
  2700: 0.01,
  2800: 0.01,
  2900: 0.01,
  3000: 0.01,
  3100: 0.01,
  3200: 0.01,
  3300: 0.01,
  3400: 0.01,
  3500: 0.01,
  3600: 0.005,
  3700: 0.005,
  3800: 0.005,
  3900: 0.005,
  4000: 0.005,
  4100: 0.005,
  4200: 0.005,
  4300: 0.005,
  4400: 0.005,
  4500: 0.005,
  4600: 0.005,
  4700: 0.005,
  4800: 0.005,
  4900: 0.005,
  5000: 0.005
};

function getNewPriceUSD(val) {
  let newPrice = 0;
  if (val === 0) {
    discoverTotalUsd.text('$0');
    traditionalTotalUsd.text('$0');
    savingsUsd.text('$0');
  }
  else if (val === 100) {
    newPrice = basePriceUSD;
  } else {
    const prices = Object.entries(config);
    newPrice = prices.reduce((oldPrice, item) => {
      // let [skuVal, skuPercent] = item;
      let skuVal = Number(item[0]);
      let skuPercent = item[1];

      if (skuVal > val) {
        return oldPrice;
      } else {
        let diff = oldPrice * skuPercent;
        const newPrice = oldPrice + diff;
        return newPrice
      }
    }, basePriceUSD)
  }
  // console.log('newPrice', newPrice);
  return newPrice;
}


function getCurrentPriceFromSKUUSD(SKUvalue) {
  let total = 0;
  let pricePerMonth = getNewPriceUSD(SKUvalue);// +
  let pricePerYear = pricePerMonth * month; // +
  let discountPerYear = pricePerYear * disCount; // +
  total = Math.ceil(pricePerYear - discountPerYear);
  // console.log("total: ", total);
  discoverTotalUsd.text('$' + total);
  let traditionalPriceUsd = total * 2;
  let savingsPriceUsd = traditionalPriceUsd - total;
  traditionalTotalUsd.text('$' + traditionalPriceUsd);
  savingsUsd.text('$' + savingsPriceUsd);
  return total;
}
getCurrentPriceFromSKUUSD(100);

function getNewPriceAED(val) {
  let newPrice = 0;
  if (val === 0) {
    discoverTotalUsd.text('AED 0');
    traditionalTotalUsd.text('AED 0');
    savingsUsd.text('AED 0');
  } else if (val === 100) {
    newPrice = basePriceAED;
  } else {
    const prices = Object.entries(config);
    newPrice = prices.reduce((oldPrice, item) => {
      let skuVal = Number(item[0]);
      let skuPercent = item[1];
      if (skuVal > val) {
        return oldPrice;
      } else {
        let diff = oldPrice * skuPercent;
        const newPrice = oldPrice + diff;
        return newPrice
      }
    }, basePriceAED)
  }
  // console.log('newPrice', newPrice);
  return newPrice;
}

function getCurrentPriceFromSKUAED(SKUvalue) {
  let total = 0;
  let pricePerMonth = getNewPriceAED(SKUvalue);// +
  let pricePerYear = pricePerMonth * month; // +
  let discountPerYear = pricePerYear * disCount; // +
  total = Math.ceil(pricePerYear - discountPerYear);
  // console.log("total: ", total);
  discoverTotalAed.text('AED'+ " " + total);
  let traditionalPriceAed = total * 2;
  let savingsPriceAed = traditionalPriceAed - total;
  traditionalTotalAed.text('AED' + " " + traditionalPriceAed);
  savingsAed.text('AED'+ " " + savingsPriceAed);
  return total;
}
getCurrentPriceFromSKUAED(100);
// getCurrentPriceFromSKU(700)


