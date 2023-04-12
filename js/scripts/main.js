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

	grabCursor: true,
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

//JS do formulário

document.addEventListener('DOMContentLoaded', init);

function init() {
	handleCardPlanClicks();
	handleFormNavigation();
	fillFormWithPlanData(getPlanFromURL());
	populateFormWithSavedData();
	handleFormSubmits();
}

function handleCardPlanClicks() {
	const cards = document.querySelectorAll('.card-plan__btn');

	cards.forEach((card) => {
		card.addEventListener('click', function (event) {
			event.preventDefault();
			const plan = card.getAttribute('data-plan');
			window.location.href = `form.html?plan=${plan}`;
		});
	});
}

function getPlanFromURL() {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get('plan');
}

function fillFormWithPlanData(plan) {
	if (plan === 'fibra-300') {
		setPlanDetails('Fibra 300', 'R$ 99,90', '300');
	} else if (plan === 'fibra-600') {
		setPlanDetails('Fibra 600', 'R$ 109,90', '600');
	} else if (plan === 'combo-300') {
		setPlanDetails('Combo 300', 'R$ 139,90', '300');
	}

	localStorage.setItem('plan', plan);
}

function setPlanDetails(name, price, velocity) {
	document.querySelector('#plan-name').innerText = name;
	document.querySelector('#plan-price').innerText = price;
	document.querySelector('#plan-velocity').innerText = velocity;
}

function handleFormNavigation() {
	const nextButtons = document.querySelectorAll('.next-button');
	const previousButtons = document.querySelectorAll('.previous-button');

	nextButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const currentStep = getCurrentStep(button);
			if (validateRequiredInputs(currentStep)) {
				changeStep(currentStep + 1);
			}
		});
	});

	previousButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const currentStep = getCurrentStep(button);
			changeStep(currentStep - 1);
		});
	});
}

function validateRequiredInputs(stepNumber) {
	const stepForm = document.querySelector(`#form-${stepNumber}`);
	const requiredInputs = stepForm.querySelectorAll('[data-required="true"]');
	let allInputsValid = true;

	requiredInputs.forEach((input) => {
		if (input.value.trim() === '') {
			input.classList.add('input-error');
			allInputsValid = false;
		} else {
			input.classList.remove('input-error');
		}

		// Adiciona um evento 'input' para remover a classe 'input-error' quando o usuário começa a digitar
		input.addEventListener('input', () => {
			if (input.classList.contains('input-error')) {
				input.classList.remove('input-error');
			}
		});
	});

	return allInputsValid;
}
function getCurrentStep(button) {
	return parseInt(button.closest('.step-form').id.split('-')[1]);
}

function changeStep(stepNumber) {
	const steps = document.querySelectorAll('.step');
	const forms = document.querySelectorAll('.step-form');

	steps.forEach((step) => {
		step.classList.toggle('active', parseInt(step.dataset.step) === stepNumber);
	});

	forms.forEach((form) => {
		form.classList.toggle(
			'active',
			parseInt(form.id.split('-')[1]) === stepNumber
		);
	});
}

function populateFormWithSavedData() {
	const formKeys = [
		'name',
		'email',
		'phone',
		'phone2',
		'cpf',
		'rg',
		'birth',
		'street',
		'number',
		'complement',
		'neighborhood',
		'city',
		'state',
		'zipcode',
		'reference',
		'payment-method',
		'due-date',
	];

	formKeys.forEach((key) => {
		const value = localStorage.getItem(key);
		if (value) {
			document.getElementById(key).value = value;
		}
	});
}

function handleFormSubmits() {
	const forms = document.querySelectorAll('.step-form');

	forms.forEach((form) => {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			saveFormDataToLocalStorage();

			if (form.querySelector('.submit-button')) {
				handleSubmit(form);
			}
		});
	});
}

function saveFormDataToLocalStorage() {
	const forms = document.querySelectorAll('.step-form');

	forms.forEach((form) => {
		const formData = new FormData(form);
		formData.forEach((value, key) => {
			localStorage.setItem(key, value);
		});
	});
}

function handleSubmit(form) {
	const forms = document.querySelectorAll('.step-form');
	const formData = new FormData();

	forms.forEach((form) => {
		const stepFormData = new FormData(form);
		stepFormData.forEach((value, key) => {
			formData.append(key, value);
		});
	});

	// Adiciona o plano aos dados
	const plan = localStorage.getItem('plan');
	if (plan) {
		formData.append('plan', plan);
	}

	const data = Object.fromEntries(formData.entries());

	console.log('JSON gerado:', JSON.stringify(data));

	fetch('https://your-api-endpoint.com', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then((response) => {
			if (response.ok) {
				alert('Dados enviados com sucesso!');
				showSuccessModal();
				localStorage.clear(); // Clear localStorage after successful submission
			} else {
				alert('Ocorreu um erro ao enviar os dados.');
			}
		})
		.catch((error) => {
			alert('Erro ao enviar os dados: ' + error.message);
		});
}

function showSuccessModal() {
	const modal = document.getElementById('success-modal');
	modal.style.display = 'block';

	const closeModal = document.querySelector('.close-modal');
	closeModal.addEventListener('click', () => {
		modal.style.display = 'none';
	});

	window.addEventListener('click', (event) => {
		if (event.target === modal) {
			modal.style.display = 'none';
		}
	});
}

function toggleSelectArrow(event) {
	const select = event.target;
	if (event.type === 'focus') {
		select.classList.add('up-arrow');
	} else if (event.type === 'blur') {
		select.classList.remove('up-arrow');
	}
}

const selectElements = document.querySelectorAll('select');
selectElements.forEach((select) => {
	select.addEventListener('focus', toggleSelectArrow);
	select.addEventListener('blur', toggleSelectArrow);
});
