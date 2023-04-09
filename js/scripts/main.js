var slide_hero = new Swiper('.slide-principal', {
	effect: 'fade',
	autoplay: {
		delay: 5000,
		disableOnInteraction: false,
	},
});

var slide_plans = new Swiper('.slide-plans', {
	// Default parameters
	slidesPerView: 3,
	spaceBetween: 10,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	// Responsive breakpoints
	breakpoints: {
		// when window width is >= 320px
		320: {
			slidesPerView: 1,
			spaceBetween: 10,
		},
		// when window width is >= 480px
		480: {
			slidesPerView: 1,
			spaceBetween: 10,
		},
		// when window width is >= 640px
		640: {
			slidesPerView: 3,
			spaceBetween: 10,
		},
	},
});

//Selecionando todos os botões que abrem o modal
const openModalBtns = document.querySelectorAll('#open-modal');

// Selecionando o botão de fechar o modal
const closeModalBtn = document.querySelector('#close-modal');

// Selecionando o modal
const modal = document.getElementById('modal');

// Abrindo o modal ao clicar no botão
openModalBtns.forEach(function (btn) {
	btn.addEventListener('click', function () {
		modal.style.display = 'flex';
	});
});

// Fechando o modal ao clicar no botão de fechar
closeModalBtn.addEventListener('click', function () {
	modal.style.display = 'none';
});

// Fechando o modal ao clicar fora do conteúdo do modal
window.addEventListener('click', function (event) {
	if (event.target == modal) {
		modal.style.display = 'none';
	}
});
