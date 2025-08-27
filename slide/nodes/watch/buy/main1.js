window.addEventListener("load", event => {

    function productHeading() {
        ////////////////
        // Variables
        ////////////////

        const product = {
            // you can ignore this value now, we hardcoded prices below
            value: 12999,
            images: [{
                    img: 'img/1.png'
                },
                {
                    img: 'img/2.png'
                },
                {
                    img: 'img/3.png'
                },
                {
                    img: 'img/4.png'
                },
                {
                    img: 'img/5.png'
                },
                {
                    img: 'img/6.png'
                }
            ]
        }

        const btnAdd = document.querySelector('.btn.add'),
            btnContainer = document.querySelector('.btnContainer'),
            wrapper = document.querySelector('.wrapper'),
            itemNumber = document.querySelector('.itemNumber'),
            shoppingQuantity = document.querySelector('.shoppingQuantity'),
            inputQuantity = document.querySelector('.inputQuantity'),
            plus = document.querySelector('.plus'),
            minus = document.querySelector('.minus'),
            arrowDrop = document.querySelector('.arrowDrop'),
            dropdown = document.querySelector('.dropdown'),
            nav = document.querySelector('nav'),
            error = document.querySelector('.error'),
            shoppingIcon = document.querySelector('.shoppingIcon'),
            shoppingMenu = document.querySelector('.shoppingMenu'),
            emptyCart = document.querySelector('.emptyCart');

        let priceFinal = document.querySelector('.priceFinal'),
            priceOriginal = document.querySelector('.priceOriginal'),
            discount = null,
            sizeNumber = document.querySelector('.sizeNumber'),
            dropItem = document.querySelectorAll('.dropItem'),
            maxQuantity = 5,
            newMaxQuantity = maxQuantity;

        ////////////////
        // Events
        ////////////////

        btnAdd.addEventListener('click', addItem);
        plus.addEventListener("click", plusQuantity);
        minus.addEventListener("click", minusQuantity);
        arrowDrop.addEventListener("click", openDrop);
        shoppingIcon.addEventListener("click", openShoppingCart);

        emptyCart.addEventListener("click", cleanCart);

        dropItem.forEach(function (el) {
            el.addEventListener("click", getSize);
        })

        window.addEventListener("resize", resize);


        ////////////////
        // Functions
        //////////////// 

        // Fixed Nav 
        window.onscroll = function () {
            if (window.pageYOffset >= 60) {
                nav.classList.add("fixed");
            } else {
                nav.classList.remove("fixed");
            }
        };

        // Change button position on mobile
        function resize() {
            if (window.innerHeight > wrapper.offsetHeight) {
                btnContainer.classList.remove('fixedBtn');
            } else {
                btnContainer.classList.add('fixedBtn');
            }
            parallax();
        }

        // Parallax
        function parallax() {
            if (window.innerWidth > 800) {
                var scene = document.querySelectorAll('.scene');
                scene.forEach(pic => {
                    var parallax = new Parallax(pic);
                })
            }
        }

        // ✅ Hardcoded Prices (ignore discount logic)
        function getDisccount() {
            priceOriginal.innerText = "12,999₹";  // old price
            priceFinal.innerText = "4,999₹";      // new price
        }

        // Calculate the the Prices with discounts (disabled now)
        function getPrice() {
            priceFinal.innerText = "4,999₹";
            priceOriginal.innerText = "12,999₹";

            setTimeout(() => {
                priceFinal.classList.remove('anime');
            }, 400);
        }

        // Update the prices with the quantity counter
        function plusQuantity() {
            if (inputQuantity.value < maxQuantity) {
                inputQuantity.value == inputQuantity.value++;
                priceFinal.classList.add('anime');
            }
            getPrice();
        }

        function minusQuantity() {
            if (inputQuantity.value > 1) {
                inputQuantity.value == inputQuantity.value--;
                priceFinal.classList.add('anime');
            }
            getPrice();
        }

        // Add items to shopping cart
        function addItem() {
            let cenas = parseInt(itemNumber.innerText) + parseInt(inputQuantity.value);

            if (cenas <= newMaxQuantity) {
                itemNumber.style.display = "flex";
                itemNumber.innerText = cenas;
                shoppingQuantity.innerText = "x" + cenas;
                itemNumber.classList.add("addItem");
                error.style.display = "none";
            } else {
                error.style.display = "flex";
            }

            setTimeout(() => {
                itemNumber.classList.remove("addItem");
            }, 700);
        }

        // Open Drop
        function openDrop() {
            if (dropdown.classList.contains('open')) {
                dropdown.classList.remove('open');
            } else {
                dropdown.classList.add('open');
            }
        }

        // get Drop Size Number Value 
        function getSize(e) {
            sizeNumber.innerText = e.currentTarget.innerText;
            openDrop();
        }

        // Open Shopping cart
        function openShoppingCart() {
            if (itemNumber.innerText != "0") {
                if (shoppingMenu.classList.contains('openShopping')) {
                    shoppingMenu.classList.remove('openShopping');
                } else {
                    shoppingMenu.classList.add('openShopping');
                }
            }
        }

        // Clean Shopping Cart
        function cleanCart() {
            shoppingMenu.classList.remove('openShopping');
            itemNumber.style.display = "none";
            itemNumber.classList.remove('addItem');
            itemNumber.innerText = "0";
        }

        // Populate the images for Swiper
        product.images.forEach(function (el) {
            let template = `
                <div class="swiper-slide">
                    <div class="scene" data-hover-only="false"> 
                        <img src="${el.img}" data-depth="0.5">
                        <img src="${el.img}" data-depth="1" class="shadow">
                    </div>
                </div>`;

            let template2 = `
                <div class="swiper-slide">
                    <img src="${el.img}">
                </div>`;

            document.querySelector('.galleryMain .swiper-wrapper').insertAdjacentHTML('beforeend', template);
            document.querySelector('.galleryThumbs .swiper-wrapper').insertAdjacentHTML('beforeend', template2);
        });

        // Make the slider function
        var galleryThumbs = new Swiper('.galleryThumbs', {
            spaceBetween: 0,
            slidesPerView: 'auto',
            loop: false,
            allowTouchMove: false,
            allowSlidePrev: false,
            allowSlideNext: false,
        });

        var galleryMain = new Swiper('.galleryMain', {
            spaceBetween: 300,
            speed: 500,
            loop: true,
            loopedSlides: 5,
            effect: "coverflow",
            coverflowEffect: {
                rotate: 50,
                slideShadows: false,
                depth: 200,
                stretch: 50,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            thumbs: {
                swiper: galleryThumbs,
            },
        });

        // Call functions 
        getDisccount();
        parallax();
        resize();
    }

    productHeading();
});

// Redirect when Finish Shopping is clicked
document.querySelector(".shoppingBtn .btn").addEventListener("click", function() {
    window.location.href = "success.html";
});
