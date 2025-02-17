const hamburger = document.querySelector('.hamburger');
const mobMenu = document.querySelector('.mobile-menu');
const mobMenuContainer = document.querySelector('.mobile-menu__inner');
const header = document.querySelector('.header');
const mobMenuClose = document.querySelector('.mobile-menu__close');

let vh = window.innerHeight * 0.01;




const hideMenu = () => {
	const setDefMenuCondition = function(){
		mobMenu.classList.remove('active');
		mobMenu.classList.remove('hide');

		mobMenuContainer.removeEventListener('transitionend', setDefMenuCondition);
	}

	mobMenuContainer.addEventListener('transitionend', setDefMenuCondition);
	mobMenu.classList.add('hide');
    document.body.classList.remove('no-scroll');
}


document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  hideMenu();
});


hamburger.addEventListener('click', function(){

	if ( mobMenu.classList.contains('active') || mobMenu.classList.add('active')) return null;
	mobMenu.classList.add('active')
    document.body.classList.add('no-scroll');
	
})


mobMenuClose.addEventListener('click', hideMenu)








const accordions = document.querySelectorAll('.itc-accordion.content-accordion');
if ( accordions.length ){

    accordions.forEach( acc => {
        new ItcAccordion(acc, {
            alwaysOpen: false
        });
    } )
    
}


const accordionMenus = document.querySelectorAll('.itc-accordion.accordion-menu');
if ( accordionMenus.length ){

    accordionMenus.forEach( acc => {
        new ItcAccordion(acc, {
            alwaysOpen: false
        });
    } )
    
}



/*

data-to-jump="#test"  - куда переносимся
data-media-jump="768" - media breakpoint
data-mode="desktop-first" - если не указано то по умолчанию mobile-first

*/
document.addEventListener('DOMContentLoaded', function(){
    let jumpBlocks = document.querySelectorAll('[data-to-jump][data-media-jump]');

    if ( jumpBlocks.length ){
        jumpBlocks.forEach( jb => {
            
            const targetBlockLink = jb.getAttribute('data-to-jump');
            const targetBlockNode = document.querySelector(targetBlockLink);
            const targetMedia = Number(jb.getAttribute('data-media-jump'));
            

            const initialParent = jb.parentNode;
            
            let vw = document.documentElement.clientWidth;
            
            if ( targetBlockNode &&  targetMedia )  {

                const mode = jb.getAttribute('data-mode');

                if ( mode === 'desktop-first' ){
                    if ( vw <= targetMedia ) targetBlockNode.append(jb);
                } else{
                    if ( vw >= targetMedia ) targetBlockNode.append(jb);
                }
                
                

                window.addEventListener('resize', function(){
                    
                    let currentParent = jb.parentNode;
                    let vw = document.documentElement.clientWidth;

                    if ( mode === 'desktop-first' ){
                        if ( vw <= targetMedia  && currentParent !=  targetBlockNode ){
                            targetBlockNode.append(jb)
                        } else if ( vw > targetMedia && currentParent != initialParent) {
                            initialParent.append(jb);
                        }

                    } else{
                        if ( vw >= targetMedia  && currentParent !=  targetBlockNode ){
                            targetBlockNode.append(jb)
                        } else if ( vw < targetMedia && currentParent != initialParent) {
                            initialParent.append(jb);
                        }
                    }
                })
            }


            

        } )  
    }

})


const aboutSlider = new Swiper(".swiper.about-slider", {
    speed: 1000,
    autoplay: {
        delay: 6000,
    },
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    pagination: {
        el: '.pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.about-nav.about-next',
        prevEl: '.about-nav.about-prev',
    },
    
})

const targetsSlider = new Swiper(".swiper.targets-slider", {
    speed: 1000,
    autoplay: {
        delay: 6000,
    },
    slidesPerView: 1,
    spaceBetween: 20,
    
    pagination: {
        el: '.pagination',
        clickable: true,
    },
    
    breakpoints: {
        600: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 20
        }
    }
})

const docSlider = new Swiper(".swiper.documents-slider", {
    speed: 1000,
    autoplay: {
        delay: 6000,
    },
    slidesPerView: 1,
    spaceBetween: 20,
    
    pagination: {
        el: '.pagination',
        clickable: true,
    },
    
    breakpoints: {
        680: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        
    }
})

Fancybox.bind('[data-fancybox]', {
    compact: false,
    contentClick: "iterateZoom",
    Images: {
      Panzoom: {
        maxScale: 2,
      },
    },
    Toolbar: {
      display: {
        left: [
          "infobar",
        ],
        middle : [],
        right: [
          "iterateZoom",
          "close",
        ],
      }
    }
});  

let phoneInputs = document.querySelectorAll('input[name="phone"]');
if ( phoneInputs.length ){
    phoneInputs.forEach( inp => {
        let mask = IMask(inp, {
            mask: '+{7} 000 000 00-00',
			
            lazy: true,  // make placeholder always visible
            placeholderChar: '_'     // defaults to '_'
        })

		inp.addEventListener('focus', function(){
			mask.updateOptions({
				lazy: false,
			});
		})
		inp.addEventListener('blur', function(){
			mask.updateOptions({
				lazy: true,
			});
		})
    } )
}

const modals = new HystModal({
    linkAttributeName: "data-hystmodal",
    // настройки (не обязательно), см. API
});


const contactForms = document.querySelectorAll('.contact-form');

if ( contactForms.length ){
    contactForms.forEach( cf => {
        cf.addEventListener('submit', function (event) {

            event.preventDefault(); // Предотвращаем стандартное поведение формы
        
        
            const formData = new FormData(this);
        
        
            fetch('sript.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Сеть ответила с ошибкой');
                }
        
                return response.json();
        
            })
        
            .then(data => {
                this.reset();
                modals.close('#feedback-modal')
                modals.open('#thanks-modal');
            })
            .catch((error) => {
                this.reset();
                modals.close('#feedback-modal')
                modals.open('#thanks-modal');
        
            });
        
        });
    } )
}


// Находим необходимые элементы на странице
const searchButton = document.querySelector('.hb-search');
const mobileSearch = document.querySelector('.mobile-search');
const closeButton = document.querySelector('.mobile-search__close');

// Флаги для отслеживания состояния
var isOpen = false; // Окно открыто или закрыто
var isAnimating = false; // Окно анимируется или нет

// Обработчик клика для открытия/закрытия поиска
searchButton.addEventListener('click', () => {
    console.log(isAnimating);
    if (isAnimating) return; // Игнорируем клики, если окно анимируется

    

    if (isOpen) {
        // Если окно уже открыто, закрываем его
        closeMobileSearch();
    } else {
        // Если окно закрыто, открываем его
        openMobileSearch();
    }
});

// Функция для открытия окна поиска
function openMobileSearch() {
    mobileSearch.style.display = 'block'; // Показываем блок
    // Устанавливаем время для анимации
    setTimeout(() => {
        mobileSearch.style.animation = 'slideIn 0.3s forwards'; // Запускаем анимацию появления
        isOpen = true; // Обновляем состояние
        isAnimating = true; // Устанавливаем флаг анимации
    }, 10); // Маленькая задержка, чтобы браузер успел увидеть блок до анимации

    setTimeout(() => {
        isAnimating = false;
    }, 300)
}

// Функция для закрытия окна поиска
function closeMobileSearch() {
    isAnimating = true; // Устанавливаем флаг анимации
    mobileSearch.style.animation = 'slideOut 0.3s forwards'; // Запускаем анимацию скрытия
    setTimeout(() => {
        mobileSearch.style.display = 'none'; // Скрываем блок после анимации
        isOpen = false; // Обновляем состояние
        isAnimating = false; // Сбрасываем флаг анимации
    }, 300); // Время анимации (в миллисекундах)
}

// Обработчик клика для закрытия поиска
closeButton.addEventListener('click', closeMobileSearch);
