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
  });
};
toggleMenu();

// const fixedHeader = () => {
//   const header = document.querySelector(".header");
//   const startPoint = 1;
//   if (window.scrollY >= startPoint) {
//     header.classList.add("fixed");
//   } else {
//     header.classList.remove("fixed");
//   }
// };

const accordion = document.querySelector(".accordion");
// console.log(accordion);
if (accordion) {
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
          });
          parent.classList.add("active");
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      }
    });
  };
  toggleAccordion();
  document.querySelector("#openDefault").click();
}
const faqAccordion = document.querySelector(".faq-accordion");

if (faqAccordion) {
  const faqAccordionItems = document.querySelectorAll(".faq-accordion__item");
  const faqAccordionContent = document.querySelectorAll(
    ".faq-accordion__panel"
  );

  const toggleFaqAccordion = () => {
    faqAccordion.addEventListener("click", (e) => {
      const faqParent = e.target.parentNode;
      let faqPanel = faqParent.querySelector(".faq-accordion__panel");
      if (faqParent.classList.contains("faq-accordion__item")) {
        if (faqParent.classList.contains("active")) {
          faqParent.classList.remove("active");
          faqPanel.style.maxHeight = null;
        } else {
          faqAccordionItems.forEach((item) => {
            item.classList.remove("active");
          });
          faqAccordionContent.forEach((item) => {
            item.style.maxHeight = null;
          });
          faqParent.classList.add("active");
          faqPanel.style.maxHeight = faqPanel.scrollHeight + "px";
        }
      }
    });
  };

  toggleFaqAccordion();
  document.querySelector("#openFaq").click();
}

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
};

window.addEventListener("scroll", showAnimation);
showAnimation();
svg4everybody();

const removeLogoSizes = () => {
  const logoImg = document.querySelector(".logo img");
  logoImg.removeAttribute("width");
  logoImg.removeAttribute("height");
};

removeLogoSizes();

// initSlideMobile();

// getCurrentPriceFromSKU(700)

document.addEventListener("DOMContentLoaded", function () {
  const blogPage = document.getElementById("blogPage");
  const homePage = document.getElementById("homePage");
  if (homePage) {
    $(function () {
      const input = $(".range-slider__value");
      let slide;
      $(".ui-slider-handle").draggable();
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
            discoverTotalUsd.text("$0");
            discoverTotalAed.text("AED 0");
          }
          slide = $(".ui-slider-range").css("width");
          input.css("left", slide);
          getCurrentPriceFromSKUUSD(this.value);
          getCurrentPriceFromSKUAED(this.value);
        },
        change: function () {
          slide = $(".ui-slider-range").css("width");
          // console.log(slide);
          input.css("left", slide);
        },
      });

      $("#amount").val($("#slider-range-min").slider("value"));
      $("#amount").blur(function () {
        this.value = roundNumber(this.value);
        if (this.value === 0) {
          discoverTotalUsd.text("$0");
          discoverTotalAed.text("AED 0");
        }
        range.slider({
          value: this.value,
        });
        slide = $(".ui-slider-range").css("width");
        // console.log(slide);
        input.css("left", slide);
        getCurrentPriceFromSKUUSD(this.value);
        getCurrentPriceFromSKUAED(this.value);
      });

      $("#amount").on("keyup", function (e) {
        if (e.key === "Enter") {
          this.value = roundNumber(this.value);
          if (this.value === 0) {
            discoverTotalUsd.text("$0");
            discoverTotalAed.text("AED 0");
          }
          range.slider({
            value: this.value,
          });
          slide = $(".ui-slider-range").css("width");
          input.css("left", slide);
          getCurrentPriceFromSKUUSD(this.value);
          getCurrentPriceFromSKUAED(this.value);
        }
      });
    });
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
      tabBtns.forEach((tabBtn) => {
        tabBtn.addEventListener("click", (e) => {
          let target = e.target.getAttribute("data-href");
          openTab(e, target);
        });
      });
    };
    toggleTab();
    const roundNumber = (val) => {
      return Math.ceil(val / 100) * 100;
    };
    const discoverTotalUsd = $("#discoverTotalUsd");
    const traditionalTotalUsd = $("#traditionalTotalUsd");
    const savingsUsd = $("#savingsUsd");

    const discoverTotalAed = $("#discoverTotalAed");
    const traditionalTotalAed = $("#traditionalTotalAed");
    const savingsAed = $("#savingsAed");
    const baseDollarPrice = document
      .getElementById("baseDollarPrice")
      .textContent.trim();
    const baseAEDPrice = document
      .getElementById("baseAedPrice")
      .textContent.trim();

    let basePriceUSD = Number(baseDollarPrice);
    let basePriceAED = Number(baseAEDPrice);

    let valuesArray = [];
    let increasesArray = [];

    const skuValues = document.querySelectorAll(".sku-value");
    skuValues.forEach((val) => {
      valuesArray.push(Number(val.textContent.trim()));
    });

    const skuIncreases = document.querySelectorAll(".sku-increase");

    let con;
    let config2;

    function setValues() {
      skuIncreases.forEach((val) => {
        increasesArray.push(Number(val.textContent.trim()));

        let i = 0;

        config2 = valuesArray.reduce(
          (a, valuesArray) =>
            Object.assign(a, { [valuesArray]: Number([increasesArray[i++]]) }),
          {}
        );
      });
      return config2;
    }

    let config = setValues();

    let disCount = 0.1;
    const month = 12;

    function getNewPriceUSD(val) {
      let newPrice = 0;
      if (val === 0) {
        discoverTotalUsd.text("$0");
        traditionalTotalUsd.text("$0");
        savingsUsd.text("$0");
      } else if (val === 100) {
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
            return newPrice;
          }
        }, basePriceUSD);
      }
      // console.log('newPrice', newPrice);
      return newPrice;
    }

    function getCurrentPriceFromSKUUSD(SKUvalue) {
      let total = 0;
      let pricePerMonth = getNewPriceUSD(SKUvalue); // +
      let pricePerYear = pricePerMonth * month; // +
      let discountPerYear = pricePerYear * disCount; // +
      total = Math.ceil(pricePerYear - discountPerYear);
      // console.log("total: ", total);
      discoverTotalUsd.text("$" + total);
      let traditionalPriceUsd = total * 2;
      let savingsPriceUsd = traditionalPriceUsd - total;
      traditionalTotalUsd.text("$" + traditionalPriceUsd);
      savingsUsd.text("$" + savingsPriceUsd);
      return total;
    }
    getCurrentPriceFromSKUUSD(100);

    function getNewPriceAED(val) {
      let newPrice = 0;
      if (val === 0) {
        discoverTotalAed.text("AED 0");
        traditionalTotalAed.text("AED 0");
        savingsAed.text("AED 0");
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
            return newPrice;
          }
        }, basePriceAED);
      }
      // console.log('newPrice', newPrice);
      return newPrice;
    }

    function getCurrentPriceFromSKUAED(SKUvalue) {
      let total = 0;
      let pricePerMonth = getNewPriceAED(SKUvalue); // +
      let pricePerYear = pricePerMonth * month; // +
      let discountPerYear = pricePerYear * disCount; // +
      total = Math.ceil(pricePerYear - discountPerYear);
      // console.log("total: ", total);
      discoverTotalAed.text("AED" + " " + total);
      let traditionalPriceAed = total * 2;
      let savingsPriceAed = traditionalPriceAed - total;
      traditionalTotalAed.text("AED" + " " + traditionalPriceAed);
      savingsAed.text("AED" + " " + savingsPriceAed);
      return total;
    }
    getCurrentPriceFromSKUAED(100);
  }
  // console.log(blogPage);
  if (blogPage) {
    const setSLiderWidth = () => {
      const article = document.querySelector(".article");
      let blogSlider = document.querySelector(".blog-slider");
      blogSlider.style.setProperty(
        "width",
        "calc(100% - " + article.offsetLeft + "px)"
      );
      window.addEventListener("resize", () => {
        blogSlider.style.setProperty(
          "width",
          "calc(100% - " + article.offsetLeft + "px)"
        );
      });
    };
    // const slider = document.querySelector(".swiper");
    const slides = document.querySelectorAll(".blog-slider__item");
    // console.log(slides.length);

    const initSlider = () => {
      if (slides.length >= 4) {
        setSLiderWidth();
        const swiper = new Swiper(".swiper", {
          slidesPerView: 1,
          spaceBetween: 30,
          grabCursor: true,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          breakpoints: {
            600: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
            1124: {
              slidesPerView: 3.5,
            },
          },
        });
      }
    };
    if (slides.length) {
      setSLiderWidth();
      initSlider();
    }
    const initSlideMobile = () => {
      const swiper = new Swiper(".swiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        grabCursor: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          600: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 2,
          },
        },
      });
    };
    window.addEventListener("resize", () => {
      if (window.innerWidth < 1024 && slides.length <= 3) {
        initSlideMobile();
      }
    });

    if (window.innerWidth < 1024 && slides.length <= 3) {
      initSlideMobile();
    }
    const trimText = () => {
      var string = document.querySelectorAll(".blog-item__text");
      var length = 100;
      string.forEach((char) => {
        let text = char.innerHTML.substring(0, length);
        char.innerHTML = `${text}...`;
      });
    };

    const trimHeading = () => {
      var string = document.querySelectorAll(".blog-slider__item a");
      var length = 40;
      string.forEach((char) => {
        // console.log(char.textContent.length);
        if (char.textContent.length > 40) {
          let text = char.innerHTML.substring(0, length);
          char.innerHTML = `${text}...`;
        }
      });
    };
    trimHeading();
    trimText();
    $(function () {
      const sidebar = document.getElementById("sidebar");
      if (sidebar) {
        const fixSidebar = () => {
          $("#sidebar").stickySidebar({
            topSpacing: 20,
            bottomSpacing: 150,
            containerSelector: ".blog__wrapper",
            innerWrapperSelector: ".sidebar__inner",
            resizeSensor: true,
            // stickyClass: "is-affixed",
            minWidth: 0,
          });
        };
        fixSidebar();
      }
      let currentPage = 1;

      $("#loadMore").on("click", function () {
        currentPage++; // Do currentPage + 1, because we want to load the next page
        let tag = $(this).attr("data-tag");
        console.log(tag);
        $.ajax({
          type: "POST",
          url: "/wp-admin/admin-ajax.php",
          dataType: "json",
          data: {
            action: "weichie_load_more",
            paged: currentPage,
            tag: tag,
          },
          success: function (res) {
            if (currentPage >= res.max) {
              $("#loadMore").hide();
            }
            $(".blog__items").append(res.html);
            trimText();
            // fixSidebar();
          },
        });
      });

      $("#showAll").on("click", function (e) {
        currentPage = 1; // Do currentPage + 1, because we want to load the next page
        $("#loadMore").attr("data-tag", "");
        e.preventDefault();
        $.ajax({
          type: "POST",
          url: "/wp-admin/admin-ajax.php",
          dataType: "json",
          data: {
            action: "show_all_posts",
            // paged: currentPage,
          },
          success: function (res) {
            $("#loadMore").show();
            $(".blog__items").html(res.html);
            trimText();
            // fixSidebar();
          },
        });
      });

      $(".blog-tag").on("click", function (e) {
        $(".blog-tag").not(this).removeClass("active");
        $(this).addClass("active");
      });

      $(".js-ajax-posts").on("click", function (event) {
        event.preventDefault();
        currentPage = 1;
        let tag = $(this).text();
        $("#loadMore").attr("data-tag", tag);

        $.ajax({
          type: "POST",
          url: "/wp-admin/admin-ajax.php",
          dataType: "html",
          data: {
            action: "custom_tag_filter",
            tag: tag,
            paged: currentPage,
          },
          success: function (res) {
            $("#loadMore").show();
            console.log(res);
            $(".blog__items").html(res);
            trimText();
            // fixSidebar();
          },
        });
      });

      $(".blog__items").on("click", function (event) {
        if ($(event.target).hasClass("article-tag")) {
          event.preventDefault();
          currentPage = 1;
          let tag = $(event.target).text();
          // console.log(event.target);
          $("#loadMore").attr("data-tag", tag);

          $.ajax({
            type: "POST",
            url: "/wp-admin/admin-ajax.php",
            dataType: "html",
            data: {
              action: "custom_tag_filter",
              tag: tag,
              paged: currentPage,
            },
            success: function (res) {
              $("#loadMore").show();
              console.log(res);
              $(".blog__items").html(res);
              trimText();
            },
          });
        }
      });

      $(".js-posts").on("click", function (event) {
        event.preventDefault();
        currentPage = 1;
        let tag = $(this).text();
        $("#loadMore").attr("data-tag", tag);

        $.ajax({
          type: "POST",
          url: "/wp-admin/admin-ajax.php",
          dataType: "html",
          data: {
            action: "custom_tag_filter",
            tag: tag,
            paged: currentPage,
          },
          success: function (res) {
            $("#loadMore").show();
            console.log(res);
            $(".blog__items").html(res);
            trimText();
            top.location.href = "https://discoverrr.com/blog";
            // fixSidebar();
          },
        });
      });

      // article navigation
      var list = [],
        idList = [];
      $(".article h3,.article h4,.article h5,.article h6").each(function (i) {
        $(this).attr("id", i);
        idList.push(i);
        // console.log(idList);
        list.push('<li><a href="#' + i + '">' + $(this).text() + "</a></li>");
      });

      $(".article-nav").prepend(list);

      $(window).scroll(function () {
        for (let i = 0; i < idList.length; i++) {
          if (
            $(window).scrollTop() > $("#" + idList[i]).offset().top - 200 ||
            $(this).scrollTop() + $(this).height() == $(document).height()
          ) {
            $(".article-nav")
              .find("li")
              .eq(i)
              .addClass("active")
              .siblings("li")
              .removeClass("active");
          }
        }
      });

      $(".article-nav li a").on("click", function () {
        $("html, body").animate(
          {
            scrollTop: $($.attr(this, "href")).offset().top - 65,
          },
          600
        );
        return false;
      });

      $(".scroll-btn").on("click", function () {
        $("html, body").animate(
          {
            scrollTop: $($.attr(this, "href")).offset().top,
          },
          600
        );
        return false;
      });
    });

    const hubspotWidget = document.getElementById(
      "hubspot-messages-iframe-container"
    );
    if (hubspotWidget) {
      hubspotWidget.style.visibility = "hidden";
      document.querySelector(".js-header-nav").style.visibility = "hidden";
      document.querySelector(".js-burger").style.visibility = "hidden";
      document.querySelector(".js-burger").style.display = "none";
    }
  }
});
