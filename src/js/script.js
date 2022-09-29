document.addEventListener("DOMContentLoaded", function () {

  const toggleMenu = () => {
    const burger = document.querySelector(".js-burger");
    const menu = document.querySelector(".js-header-nav");
    const body = document.querySelector("body");
    const headerContent = document.querySelector(".js-header-content");
    const overlay = document.querySelector(".js-overlay");
    burger.addEventListener("click", () => {
      if (!menu.classList.contains("active")) {
        menu.classList.add("active");
        burger.classList.add("active");
        overlay.classList.add("active");
        body.classList.add("locked");
        headerContent.classList.add("active");
      } else {
        menu.classList.remove("active");
        burger.classList.remove("active");
        overlay.classList.remove("active");
        body.classList.remove("locked");
        headerContent.classList.remove("active");
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 992) {
        menu.classList.remove("active");
        burger.classList.remove("active");
        body.classList.remove("locked");
        overlay.classList.remove("active");
      } else if (window.innerWidth > 768) {
        headerContent.classList.remove("active");
        overlay.classList.remove("active");
        burger.classList.remove("active");
      }
    });
  };
  toggleMenu();

  const accordion = document.querySelector(".accordion");
  if (accordion) {
    // $(".accordion__row:first-child .accordion__btn").addClass("active");
    $(".accordion__btn").on("click", function (e) {
      let $this = $(this);
      if (!$this.hasClass("active")) {
        $(".accordion__panel").slideUp(600);
        $(".accordion__btn").removeClass("active");
      }
      $this.toggleClass("active");
      $this.next().slideToggle();
      let id = $(this).attr('data-href');
      $('.business__img').fadeOut(200);
      $('#' + id).fadeIn(600);
    });
  }


  const faqAccordion = document.querySelector(".faq-accordion");

  if (faqAccordion) {
    $(".faq-accordion__item:first-child .faq-accordion__btn").addClass("active");
    $(".faq-accordion__btn").on("click", function (e) {
      let $this = $(this);
      if (!$this.hasClass("active")) {
        $(".faq-accordion__panel").slideUp(600);
        $(".faq-accordion__btn").removeClass("active");
      }
      $this.toggleClass("active");
      $this.next().slideToggle();
    });
  }

  const removeLogoSizes = () => {
    const logoImg = document.querySelector(".logo img");
    logoImg.removeAttribute("width");
    logoImg.removeAttribute("height");
  };

  removeLogoSizes();

  const blogPage = document.getElementById("blogPage");
  const homePage = document.getElementById("homePage");
  if (homePage) {
    let words = document.getElementsByClassName('word');
    let wordArray = [];
    let currentWord = 0;

    words[currentWord].style.opacity = 1;
    for (let i = 0; i < words.length; i++) {
      splitLetters(words[i]);
    }

    function changeWord() {
      let cw = wordArray[currentWord];
      let nw = currentWord == words.length - 1 ? wordArray[0] : wordArray[currentWord + 1];
      for (let i = 0; i < cw.length; i++) {
        animateLetterOut(cw, i);
      }

      for (let i = 0; i < nw.length; i++) {
        nw[i].className = 'letter behind';
        nw[0].parentElement.style.opacity = 1;
        animateLetterIn(nw, i);
      }

      currentWord = (currentWord == wordArray.length - 1) ? 0 : currentWord + 1;
    }

    function animateLetterOut(cw, i) {
      setTimeout(function () {
        cw[i].className = 'letter out';
      }, i * 80);
    }

    function animateLetterIn(nw, i) {
      setTimeout(function () {
        nw[i].className = 'letter in';
      }, 340 + (i * 80));
    }

    function splitLetters(word) {
      let content = word.innerHTML;
      word.innerHTML = '';
      let letters = [];
      for (let i = 0; i < content.length; i++) {
        let letter = document.createElement('span');
        letter.className = 'letter';
        letter.innerHTML = content.charAt(i);
        if (letter.innerHTML == ' ') {
          letter.style.width = 20 + "px";
        }
        word.appendChild(letter);
        letters.push(letter);
      }
      wordArray.push(letters);
    }

    changeWord();
    setInterval(changeWord, 4000);



    const sellersSlides = document.querySelectorAll(".sellers__item");

    const initSellersSlider = () => {
      if (sellersSlides.length >= 5) {
        $('.sellers__row').slick({
          slidesToShow: 4,
          autoplay: true,
          autoplaySpeed: 1,
          cssEase: 'linear',
          speed: 10000,
          arrows: false,
          dots: false,
          infinite: true,
          responsive: [{
              breakpoint: 992,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2
              }
            }
          ]
        })
      }
    };
    if (sellersSlides.length) {
      setTimeout(() => {
        initSellersSlider();
      }, 1000);
    }
    const initTeamsMobile = () => {

      const blogTeamsMobile = new Swiper(".teams__content.swiper", {
        slidesPerView: 1.2,
        spaceBetween: 15,
        grabCursor: true,
        breakpoints: {
          600: {
            slidesPerView: 1.2,
          },
        },
      });
    };
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 768) {
        initTeamsMobile();
      }
    });

    if (window.innerWidth <= 768) {
      initTeamsMobile();
    }


    const showcaseImage = document.querySelectorAll('.showcase__img');
    const fixedSection = document.querySelector('.showcase__wrapper');

    const fixImgToBottom = () => {
      const stopPosition = fixedSection.getBoundingClientRect().bottom;
      showcaseImage.forEach((img) => {
        let imageTop = img.getBoundingClientRect().top;
        let imageLeft = img.getBoundingClientRect().left;
        let imageRight = img.getBoundingClientRect().right;
        let imageBottom = img.getBoundingClientRect().bottom;

        if (imageTop <= 150) {
          img.classList.add("sticky");
          img.style.left = `${imageLeft}px`;
          img.style.right = `${imageRight}px`;
          img.style.top = "150" + "px";
          img.style.bottom = "auto"
        }

        if (Math.round(stopPosition) <= Math.round(imageBottom)) {
          img.classList.remove("sticky");
          img.style.right = "0";
          img.style.left = "auto";
          img.style.bottom = "0";
          img.style.top = "auto";
        }
      });
    };

    const fixImgToTop = () => {
      showcaseImage.forEach((img) => {
        let imageTop = img.getBoundingClientRect().top;
        let imageLeft = img.getBoundingClientRect().left;
        let imageRight = img.getBoundingClientRect().right;
        const startPosition = fixedSection.getBoundingClientRect().top;
        if (imageTop >= 150) {
          img.classList.add("sticky");
          img.style.left = `${imageLeft}px`;
          img.style.right = `${imageRight}px`;
          img.style.top = "150" + "px";
          img.style.bottom = "auto"
        }
        if (imageTop <= startPosition) {
          img.classList.remove("sticky");
          img.style.right = "0";
          img.style.left = "auto";
          img.style.top = "0";
          img.style.bottom = "auto";
        }
      });
    };

    fixImgToBottom();
    fixImgToTop();

    window.addEventListener("resize", () => {
      fixImgToBottom();
      fixImgToTop();
    });
    const showcaseSlides = document.querySelectorAll(".showcase-slider__item");
    if (showcaseSlides) {
      const showcaseBlocks = document.querySelectorAll('.showcase__item');
      let oldValue = 0;

      window.addEventListener("scroll", function () {
        showcaseBlocks.forEach((item) => {
          const trigger = window.innerHeight / 4;
          const itemTop = item.getBoundingClientRect().top;

          if (itemTop < trigger) {
            item.classList.add("show");
          } else {
            item.classList.remove("show");
          }
        });


        let newValue = window.pageYOffset;

        if (oldValue - newValue < 0) {
          fixImgToBottom();
        } else if (oldValue - newValue > 0) {
          fixImgToTop();
        }
        oldValue = newValue;
      });
    }
    $.fn.isInViewport = function () {
      let elementTop = $(this).offset().top;
      let elementBottom = elementTop + $(this).outerHeight();

      let viewportTop = $(window).scrollTop();
      let viewportBottom = viewportTop + $(window).height();

      return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    $(window).on('resize scroll', function () {
      if ($('.odometer').isInViewport()) {
        let val1 = $('#sectionone').attr('data-num');
        let val2 = $('#sectiontwo').attr('data-num');
        let val3 = $('#sectionthree').attr('data-num');

        $('#sectionone').html(val1);
        $('#sectiontwo').html(val2);
        $('#sectionthree').html(val3);
      }
    });

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
    const baseDollarPrice = document.getElementById("baseDollarPrice").textContent.trim();
    const baseAEDPrice = document.getElementById("baseAedPrice").textContent.trim();
    let basePriceUSD = Number(baseDollarPrice);
    let basePriceAED = Number(baseAEDPrice);
    let valuesArray = [];
    let increasesArray = [];

    const skuValues = document.querySelectorAll(".sku-value");
    skuValues.forEach((val) => {
      valuesArray.push(Number(val.textContent.trim()));
    });

    const skuIncreases = document.querySelectorAll(".sku-increase");

    let config2;

    function setValues() {
      skuIncreases.forEach((val) => {
        increasesArray.push(Number(val.textContent.trim()));

        let i = 0;

        config2 = valuesArray.reduce(
          (a, valuesArray) =>
          Object.assign(a, {
            [valuesArray]: Number([increasesArray[i++]])
          }), {}
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
      return newPrice;
    }

    function getCurrentPriceFromSKUUSD(SKUvalue) {
      let total = 0;
      let pricePerMonth = getNewPriceUSD(SKUvalue); // +
      let pricePerYear = pricePerMonth * month; // +
      let discountPerYear = pricePerYear * disCount; // +
      total = Math.ceil(pricePerYear - discountPerYear);
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
      return newPrice;
    }

    function getCurrentPriceFromSKUAED(SKUvalue) {
      let total = 0;
      let pricePerMonth = getNewPriceAED(SKUvalue); // +
      let pricePerYear = pricePerMonth * month; // +
      let discountPerYear = pricePerYear * disCount; // +
      total = Math.ceil(pricePerYear - discountPerYear);
      discoverTotalAed.text("AED" + " " + total);
      let traditionalPriceAed = total * 2;
      let savingsPriceAed = traditionalPriceAed - total;
      traditionalTotalAed.text("AED" + " " + traditionalPriceAed);
      savingsAed.text("AED" + " " + savingsPriceAed);
      return total;
    }
    getCurrentPriceFromSKUAED(100);
  }
  if (blogPage) {
    const header = document.querySelector(".header");

    const changeHeaderBg = () => {
      header.style.backgroundColor = "#080c29";
    }
    changeHeaderBg();

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
    const slides = document.querySelectorAll(".blog-slider__item");

    const initSlider = () => {
      if (slides.length >= 4) {
        setSLiderWidth();
        const blogSwiper = new Swiper(".swiper", {
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
      const blogSwiperMobile = new Swiper(".swiper", {
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
      let string = document.querySelectorAll(".blog-item__text");
      let length = 100;
      string.forEach((char) => {
        let text = char.innerHTML.substring(0, length);
        char.innerHTML = `${text}...`;
      });
    };
    trimText();
    const trimHeading = () => {
      let string = document.querySelectorAll(".blog-slider__item a");
      let length = 40;
      string.forEach((char) => {
        if (char.textContent.length > 40) {
          let text = char.innerHTML.substring(0, length);
          char.innerHTML = `${text}...`;
        }
      });
    };
    trimHeading();
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
            minWidth: 0,
          });
        };
        fixSidebar();
      }
      let currentPage = 1;

      $("#loadMore").on("click", function () {
        currentPage++; // Do currentPage + 1, because we want to load the next page
        let tag = $(this).attr("data-tag");
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
          },
          success: function (res) {
            $("#loadMore").show();
            $(".blog__items").html(res.html);
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
            $(".blog__items").html(res);
          },
        });
      });

      $(".blog__items").on("click", function (event) {
        if ($(event.target).hasClass("article-tag")) {
          event.preventDefault();
          currentPage = 1;
          let tag = $(event.target).text();
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
              $(".blog__items").html(res);
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
            $(".blog__items").html(res);
            top.location.href = "https://discoverrr.com/blog";
          },
        });
      });

      // article navigation
      let list = [],
        idList = [];
      $(".article h2, .article h3, .article h4").each(function (i) {
        $(this).attr("id", i);
        idList.push(i);
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
        $("html, body").animate({
            scrollTop: $($.attr(this, "href")).offset().top - 65,
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

  svg4everybody();
});