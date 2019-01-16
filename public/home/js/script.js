(function () {
    const button = document.getElementById('open-menu-list');

    button.addEventListener('click', function() {
        button.classList.toggle('open');
    });

}());


(function () {
    const accordion = document.getElementsByClassName('accordion');
    const arrayAccordion = [...accordion];
    const panel = document.getElementsByClassName('panel');
    const arrayPanel = [...panel];

    let activeIndex = 0;

    const  toggleAccordion = index => {

        if (arrayPanel[index].style.maxHeight) {
            arrayAccordion[index].classList.remove('accordion-active');
            arrayPanel[index].style.maxHeight = null;
        } else {
            arrayPanel[activeIndex].style.maxHeight = null;
            arrayAccordion[activeIndex].classList.remove('accordion-active');

            arrayAccordion[index].classList.add('accordion-active');
            arrayPanel[index].style.maxHeight = arrayPanel[index].scrollHeight + 'px';
        }

        activeIndex = index;
    };

    arrayAccordion.forEach((el, index) => {
        el.addEventListener('click', () => {
            toggleAccordion(index);
        })
    })

}());


(function() {
    const slideShow = (index, arraySlides, arrayDots) => {
        arraySlides.forEach(el => el.className = 'fade hidden-slide');
        arraySlides[index].className = 'fade visibility-slide';
        if (arrayDots.length) {
            arrayDots.forEach(el => el.classList.remove('active'));
            arrayDots[index].classList.add('active');
        }
    };

    const slideShowAuto = (ms, arraySlides, arrayDots) => {
        let slideIndex = 0;

        arrayDots.forEach((el, index) => el.addEventListener('click', () => {
            slideIndex = index;
            slideShow(slideIndex, arraySlides, arrayDots);
        }));

        setInterval(() => {
            slideIndex++;
            if (slideIndex >= arraySlides.length) { slideIndex = 0}
            slideShow(slideIndex, arraySlides, arrayDots)
        }, ms)
    };

    const initSlider = (id, toggle, ms) => {
        const slider = document.getElementById(id);
        const slides = slider.getElementsByClassName('fade');
        const dots = slider.getElementsByClassName('dot');
        const buttonsSlide = slider.getElementsByClassName('buttons-slider');
        const arraySlides = [...slides];
        const arrayDots = [...dots];
        const arrayBottons = [...buttonsSlide];
        let slideIndex = 0;

        slideShow(slideIndex, arraySlides, arrayDots);

        if (!toggle) {arrayBottons.forEach(el => el.classList.add('hidden-button-slide'))}

        if (ms) {
            slideShowAuto(ms, arraySlides, arrayDots);
        } else {
            arrayDots.forEach((el, index) => el.addEventListener('click', () => {
                slideShow(index, arraySlides, arrayDots);
                slideIndex = index;
            }));
        }

        arrayBottons[0].addEventListener('click', () => {
            slideIndex--;
            if (slideIndex < 0) { slideIndex = arraySlides.length-1}
            slideShow(slideIndex, arraySlides, arrayDots)
        });

        arrayBottons[1].addEventListener('click', () => {
            slideIndex++;
            if (slideIndex >= arraySlides.length) { slideIndex = 0}
            slideShow(slideIndex, arraySlides, arrayDots)
        });

    };


    initSlider('big-slider', false, 3000);

}());
