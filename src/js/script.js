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

let startPrice = 45;
let discount = 10;
let price;
let priceNew;
let total;
let totalForYear;
let totalDiscount;

let oldVal = 0;

let upResults = {};
let newNumber;
let saveNumber;
let numbersArray = [];
const setArrayValue = (value) => {
  numbersArray.push(value);
}
const removeArrayValue = () => {
  numbersArray.shift();
}

const rewriteArrayValue = (value) => {
  numbersArray[0] = value;
}

$(function () {
  const discoverTotal = $(".discover-total");
  const range = $("#slider-range-min");
  range.slider({
    range: "min",
    value: 100,
    min: 0,
    max: 1000,
    step: 100,
    slide: function (event, ui) {
      let newVal = ui.value;
      let increase;
      if (newVal === 0) {
        discoverTotal.text('0');
      }
      else if (newVal === 100) {
        increase = 18;
        price = (startPrice / 100 * increase) + startPrice;
        priceNew = price;
        totalForYear = priceNew * 12;
        totalForYear = startPrice * 12;
        totalDiscount = (totalForYear / 100 * discount);
        total = totalForYear - totalDiscount;
        discoverTotal.text(total);
      }

      else if (newVal === 200) {
        increase = 18;
        price = (startPrice / 100 * increase) + startPrice;
        priceNew = price;
        totalForYear = priceNew * 12;
        totalDiscount = totalForYear / 100 * discount;
        total = totalForYear - totalDiscount;
        discoverTotal.text(Math.floor(total));
        newNumber = priceNew;
        // setArrayValue(priceNew);
        console.log(newNumber);
      }
      else if (newVal === 300) {
        increase = 18;
        if (newVal >= oldVal) {
          console.log("right 300");
        console.log(newNumber);
          price = (priceNew / 100 * increase) + priceNew;
          priceNew = price;
          totalForYear = priceNew * 12;
          totalDiscount = (totalForYear / 100 * discount);
          total = totalForYear - totalDiscount;
          discoverTotal.text(Math.floor(total));
          // rewriteArrayValue(priceNew);
          newNumber = priceNew;
        }
        else if (newVal <= oldVal) {
          console.log("left 300", newNumber);
          // saveNumber = numbersArray[0];
          // console.log(saveNumber);
          price = (saveNumber / 100 * increase) + saveNumber;
          priceNew = price;
          totalForYear = priceNew * 12;
          totalDiscount = (totalForYear / 100 * discount);
          total = totalForYear - totalDiscount;
          discoverTotal.text(Math.floor(total));
        }
        oldVal = newVal;
      }
      else if (newVal === 400) {
        increase = 14;
        if (newVal >= oldVal) {
          console.log("right 400",    );
          price = (priceNew / 100 * increase) + priceNew;
          priceNew = price;
          totalForYear = priceNew * 12;
          totalDiscount = (totalForYear / 100 * discount);
          total = totalForYear - totalDiscount;
          discoverTotal.text(Math.floor(total));
          newNumber = priceNew;
        }
        else if (newVal <= oldVal) {
          console.log("left 400", newNumber);
          saveNumber = newNumber;
          price = (saveNumber / 100 * increase) + saveNumber;
          priceNew = price;
          totalForYear = priceNew * 12;
          totalDiscount = (totalForYear / 100 * discount);
          total = totalForYear - totalDiscount;
          discoverTotal.text(Math.floor(total));
        }
        oldVal = newVal;
      }
      else if (newVal === 500) {
        increase = 14;

        console.log(newNumber)

        if (newVal >= oldVal) {
          console.log("right 500");
          // console.log(newNumber)
          price = (priceNew / 100 * increase) + priceNew;
          priceNew = price;
          totalForYear = priceNew * 12;
          totalDiscount = (totalForYear / 100 * discount);
          total = totalForYear - totalDiscount;
          discoverTotal.text(Math.floor(total));
          // newNumber = newNumber;
        }
        else if (newVal <= oldVal) {
          console.log("left 500");
        }
        oldVal = newVal;
      }
      else if (newVal === 600) {
        increase = 10;


        if (newVal >= oldVal) {
          console.log("right 600");
          price = (priceNew / 100 * increase) + priceNew;
          priceNew = price;
          totalForYear = priceNew * 12;
          totalDiscount = (totalForYear / 100 * discount);
          total = totalForYear - totalDiscount;
          discoverTotal.text(Math.floor(total));
          // newNumber = newNumber;
        }
        else if (newVal <= oldVal) {
          console.log("left 600");

        }
        oldVal = newVal;
      }
      else if (newVal === 700) {
        increase = 10;

        if (newVal >= oldVal) {
          console.log("right 700");
          price = (priceNew / 100 * increase) + priceNew;
          priceNew = price;
          totalForYear = priceNew * 12;
          totalDiscount = (totalForYear / 100 * discount);
          total = totalForYear - totalDiscount;
          discoverTotal.text(Math.floor(total));
          // newNumber = newNumber;
        }
        else if (newVal <= oldVal) {
          console.log("left 700");
        }
        oldVal = newVal;;
      }
      else if (newVal === 800) {
        increase = 10;

        if (newVal >= oldVal) {
          console.log("right 800");
          price = (priceNew / 100 * increase) + priceNew;
          priceNew = price;
          totalForYear = priceNew * 12;
          totalDiscount = (totalForYear / 100 * discount);
          total = totalForYear - totalDiscount;
          discoverTotal.text(Math.floor(total));
          // newNumber = newNumber;
        }
        else if (newVal <= oldVal) {
          console.log("left 800");
        }
        oldVal = newVal;
      }
      else if (newVal === 900) {
        increase = 10;

        if (newVal >= oldVal) {
          console.log("right 900");
          price = (priceNew / 100 * increase) + priceNew;
          priceNew = price;
          totalForYear = priceNew * 12;
          totalDiscount = (totalForYear / 100 * discount);
          total = totalForYear - totalDiscount;
          discoverTotal.text(Math.floor(total));
          // newNumber = newNumber;
        }
        else if (newVal <= oldVal) {
          upResults.downPrice = priceNew;
          console.log("left 900");
        }
        oldVal = newVal;
      }
      else if (newVal === 1000) {
        increase = 10;

        if (newVal >= oldVal) {
          console.log("right 1000");
          price = (priceNew / 100 * increase) + priceNew;
          priceNew = price;
          totalForYear = priceNew * 12;
          totalDiscount = (totalForYear / 100 * discount);
          total = totalForYear - totalDiscount;
          discoverTotal.text(Math.floor(total));
          // newNumber = newNumber;
        }
        else if (newVal <= oldVal) {
          console.log("left 1000");
        }
        oldVal = newVal;
      }

      $("#amount").val(ui.value);

      // discoverTotal.text(ui.value);
    }
  });

  $("#amount").val($("#slider-range-min").slider("value"));
  // $("#amount")
  $("#amount").blur(function () {
    this.value = roundNumber(this.value);
    range.slider({
      value: roundNumber(this.value)
    });
    console.log(roundNumber(this.value));
    // calculate(roundNumber(this.value));
  });

  $("#amount").on("keyup", function (e) {
    if (e.key === "Enter") {
      this.value = roundNumber(this.value);
      console.log(roundNumber(this.value));
      // calculate(roundNumber(this.value));
    }
  });

  const calculatePlus = (val) => {
    // console.log(val);
    // let increase;
    // if (val === 0) {
    //   discoverTotal.text('0');
    // }
    // else if (val === 100) {
    //   totalForYear = startPrice * 12;
    //   totalDiscount = (totalForYear / 100 * discount);
    //   total = totalForYear - totalDiscount;
    //   discoverTotal.text(total);
    // } else if (val === 200) {
    //   increase = 18;
    //   price = (startPrice / 100 * increase) + startPrice;
    //   // let n = n - (n * (p/100));
    //   priceNew = price;
    //   // console.log(priceNew);
    //   totalForYear = priceNew * 12;

    //   totalDiscount = totalForYear / 100 * discount;
    //   total = totalForYear - totalDiscount;
    //   discoverTotal.text(Math.floor(total));
    // }
    // else if (val === 300) {

    //   increase = 18;
    //   price = (priceNew / 100 * increase) + priceNew;
    //   priceNew = price;
    //   totalForYear = priceNew * 12;
    //   console.log(totalForYear);
    //   totalDiscount = (totalForYear / 100 * discount);
    //   total = totalForYear - totalDiscount;
    //   discoverTotal.text(Math.floor(total));
    // }
    // else if (val === 400) {
    //   increase = 14;
    //   price = (priceNew / 100 * increase) + priceNew;
    //   priceNew = price;
    //   totalForYear = priceNew * 12;
    //   console.log(totalForYear);
    //   totalDiscount = (totalForYear / 100 * discount);
    //   total = totalForYear - totalDiscount;
    //   discoverTotal.text(Math.floor(total));
    // }
    // else if (val === 500) {
    //   increase = 14;
    //   price = (priceNew / 100 * increase) + priceNew;
    //   priceNew = price;
    //   totalForYear = priceNew * 12;
    //   totalDiscount = (totalForYear / 100 * discount);
    //   total = totalForYear - totalDiscount;
    //   discoverTotal.text(Math.floor(total));
    // }
    // else if (val === 600) {
    //   increase = 10;
    //   price = (priceNew / 100 * increase) + priceNew;
    //   priceNew = price;
    //   totalForYear = priceNew * 12;
    //   totalDiscount = (totalForYear / 100 * discount);
    //   total = totalForYear - totalDiscount;
    //   discoverTotal.text(Math.floor(total));
    // }
    // else if (val === 700) {
    //   increase = 10;
    //   price = (priceNew / 100 * increase) + priceNew;
    //   priceNew = price;
    //   totalForYear = priceNew * 12;
    //   totalDiscount = (totalForYear / 100 * discount);
    //   total = totalForYear - totalDiscount;
    //   discoverTotal.text(Math.floor(total));
    // }
    // else if (val === 800) {
    //   increase = 10;
    //   price = (priceNew / 100 * increase) + priceNew;
    //   priceNew = price;
    //   totalForYear = priceNew * 12;
    //   totalDiscount = (totalForYear / 100 * discount);
    //   total = totalForYear - totalDiscount;
    //   discoverTotal.text(Math.floor(total));
    // }
    // else if (val === 900) {
    //   increase = 10;
    //   price = (priceNew / 100 * increase) + priceNew;
    //   priceNew = price;
    //   totalForYear = priceNew * 12;
    //   totalDiscount = (totalForYear / 100 * discount);
    //   total = totalForYear - totalDiscount;
    //   discoverTotal.text(Math.floor(total));
    // }
    // else if (val === 1000) {
    //   increase = 10;
    //   price = (priceNew / 100 * increase) + priceNew;
    //   priceNew = price;
    //   totalForYear = priceNew * 12;
    //   totalDiscount = (totalForYear / 100 * discount);
    //   total = totalForYear - totalDiscount;
    //   discoverTotal.text(Math.floor(total));
    // }
  }
  const calculateMinus = (val) => {
    console.log(val);
    let increase;
    if (val === 0) {
      discoverTotal.text('0');
    }
    else if (val === 100) {
      totalForYear = startPrice * 12;
      totalDiscount = (totalForYear / 100 * discount);
      total = totalForYear - totalDiscount;
      discoverTotal.text(total);
    }
    else if (val === 200) {
      increase = 18;

      price = (startPrice / 100 * increase) + startPrice;
      // let n = n - (n * (p/100));
      priceNew = price;
      // console.log(priceNew);
      totalForYear = priceNew * 12;
      totalDiscount = totalForYear / 100 * discount;
      total = totalForYear - totalDiscount;
      discoverTotal.text(Math.floor(total));
    }
    else if (val === 300) {
      increase = 18;
      console.log(priceNew, total);
      let fullPrice = total + total / 100 * 10;
      console.log(fullPrice);
      // price = (priceNew / 100) * (100 - increase);
      // priceNew = price;
      // // console.log(priceNew, price);
      // totalForYear = priceNew * 12;
      // totalDiscount = (totalForYear / 100 * discount);
      // total = totalForYear - totalDiscount;
      // discoverTotal.text(Math.floor(total));
    }
    else if (val === 400) {
      increase = 14;
      price = (priceNew / 100) * (100 - increase);
      priceNew = price;
      // console.log(priceNew, price);
      totalForYear = priceNew * 12;
      totalDiscount = (totalForYear / 100 * discount);
      total = totalForYear - totalDiscount;
      discoverTotal.text(Math.floor(total));
    }
    else if (val === 500) {
      // increase = 14;
      // price = (priceNew / 100) * (100 - increase);
      // priceNew = price;
      // // console.log(priceNew, price);
      // totalForYear = priceNew * 12;
      // totalDiscount = (totalForYear / 100 * discount);
      // total = totalForYear - totalDiscount;
      // discoverTotal.text(Math.floor(total));
    }
    else if (val === 600) {
      // increase = 10;
      // price = (priceNew / 100) * (100 - increase);
      // priceNew = price;
      // // console.log(priceNew, price);
      // totalForYear = priceNew * 12;
      // totalDiscount = (totalForYear / 100 * discount);
      // total = totalForYear - totalDiscount;
      // discoverTotal.text(Math.floor(total));
    }
    else if (val === 700) {
      // increase = 10;
      // price = (priceNew / 100) * (100 - increase);
      // priceNew = price;
      // // console.log(priceNew, price);
      // totalForYear = priceNew * 12;
      // totalDiscount = (totalForYear / 100 * discount);
      // total = totalForYear - totalDiscount;
      // discoverTotal.text(Math.floor(total));
    }
    else if (val === 800) {
      // increase = 10;
      // price = (priceNew / 100) * (100 - increase);
      // priceNew = price;
      // console.log(priceNew, price);
      // totalForYear = priceNew * 12;
      // totalDiscount = (totalForYear / 100 * discount);
      // total = totalForYear - totalDiscount;
      // discoverTotal.text(Math.floor(total));
    }
    else if (val === 900) {
      // increase = 10;
      // price = (priceNew / 100) * (100 - increase);
      // priceNew = price;
      // // console.log(priceNew, price);
      // totalForYear = priceNew * 12;
      // totalDiscount = (totalForYear / 100 * discount);
      // total = totalForYear - totalDiscount;
      // discoverTotal.text(Math.floor(total));
    }
    else if (val === 1000) {
      // increase = 10;
      // price = (priceNew / 100) * (100 - increase);
      // priceNew = price;
      // // console.log(priceNew, price);
      // totalForYear = priceNew * 12;
      // totalDiscount = (totalForYear / 100 * discount);
      // total = totalForYear - totalDiscount;
      // discoverTotal.text(Math.floor(total));
    }
  }
});



// function minusPercent(n,p) {
//   return n - (n * (p/100));
// }

// console.log(minusPercent(200,32)); // 70



var basePrice = 45;
var disCount = 0.1;
const month = 12;
var config = {
  100: 0,
  200: 0.18,
  300: 0.18,
  400: 0.14
}

/* 
1) порахувати ціну із знижкою
2) порахувати ціну із конфігу
3) порахувати ціну за рік
*/

function getNewPrice(val) {
  let newPrice = 0;

  if (val === 100) {
    newPrice = basePrice;
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
    }, basePrice)
  }
  console.log('newPrice', newPrice);
  return newPrice;
}

// getNewPrice(300);

function getCurrentPriceFromSKU(SKUvalue) {
  // let result;
  let total = 0;
  let pricePerMonth = getNewPrice(SKUvalue);// +
  let pricePerYear = pricePerMonth * month; // +
  let discountPerYear = pricePerYear * disCount; // +
  total = pricePerYear - discountPerYear;
  console.log("total: ", total);
}

getCurrentPriceFromSKU(400)
