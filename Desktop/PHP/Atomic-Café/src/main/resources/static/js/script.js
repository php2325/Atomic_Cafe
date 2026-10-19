document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const orderForm = document.getElementById('orderForm');

    if (loginForm) {
        initLoginForm();
    }

    if (registerForm) {
        initRegisterForm();
    }

    if (orderForm) {
        initOrderForm();
    }
});

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function showError(input, errorElement, message) {
    if (!input || !errorElement) return;
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function clearError(input, errorElement) {
    if (!input || !errorElement) return;
    input.classList.remove('error');
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

function togglePasswordVisibility(button, input) {
    if (!button || !input) return;

    button.addEventListener('click', function (event) {
        event.preventDefault();
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);

        const icon = button.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        }
    });
}

function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const formError = document.getElementById('formError');

    if (togglePasswordBtn) {
        togglePasswordVisibility(togglePasswordBtn, passwordInput);
    }

    emailInput.addEventListener('blur', function () {
        const emailError = document.getElementById('emailError');
        if (this.value.trim() === '') {
            showError(this, emailError, 'Email é obrigatório');
        } else if (!validateEmail(this.value.trim())) {
            showError(this, emailError, 'Email inválido');
        } else {
            clearError(this, emailError);
        }
    });

    emailInput.addEventListener('focus', function () {
        clearError(this, document.getElementById('emailError'));
    });

    passwordInput.addEventListener('blur', function () {
        const passwordError = document.getElementById('passwordError');
        if (this.value === '') {
            showError(this, passwordError, 'Senha é obrigatória');
        } else if (this.value.length < 6) {
            showError(this, passwordError, 'Senha deve ter pelo menos 6 caracteres');
        } else {
            clearError(this, passwordError);
        }
    });

    passwordInput.addEventListener('focus', function () {
        clearError(this, document.getElementById('passwordError'));
    });

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        formError.style.display = 'none';
        formError.textContent = '';

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        let isValid = true;

        if (email === '') {
            showError(emailInput, document.getElementById('emailError'), 'Email é obrigatório');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError(emailInput, document.getElementById('emailError'), 'Email inválido');
            isValid = false;
        } else {
            clearError(emailInput, document.getElementById('emailError'));
        }

        if (password === '') {
            showError(passwordInput, document.getElementById('passwordError'), 'Senha é obrigatória');
            isValid = false;
        } else if (password.length < 6) {
            showError(passwordInput, document.getElementById('passwordError'), 'Senha deve ter pelo menos 6 caracteres');
            isValid = false;
        } else {
            clearError(passwordInput, document.getElementById('passwordError'));
        }

        if (!isValid) return;

        const submitBtn = loginForm.querySelector('.btn-login');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Entrando...</span>';

        setTimeout(function () {
            if (rememberCheckbox.checked) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }

            const successAlert = document.createElement('div');
            successAlert.className = 'alert alert-success';
            successAlert.innerHTML = '<i class="fas fa-check-circle"></i><span>Login realizado com sucesso!</span>';
            loginForm.insertBefore(successAlert, loginForm.firstChild);

            setTimeout(function () {
                window.location.href = 'index.html';
            }, 1200);
        }, 1000);
    });

    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        emailInput.value = rememberedEmail;
        rememberCheckbox.checked = true;
    }

    const googleBtn = document.querySelector('.social-google');
    const facebookBtn = document.querySelector('.social-facebook');

    if (googleBtn) {
        googleBtn.addEventListener('click', function (event) {
            event.preventDefault();
            alert('Login com Google será implementado em breve!');
        });
    }

    if (facebookBtn) {
        facebookBtn.addEventListener('click', function (event) {
            event.preventDefault();
            alert('Login com Facebook será implementado em breve!');
        });
    }
}

function initRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');
    const formError = document.getElementById('formError');

    if (togglePasswordBtn) {
        togglePasswordVisibility(togglePasswordBtn, passwordInput);
    }

    if (toggleConfirmPasswordBtn) {
        togglePasswordVisibility(toggleConfirmPasswordBtn, confirmPasswordInput);
    }

    nameInput.addEventListener('blur', function () {
        const error = document.getElementById('nameError');
        if (this.value.trim() === '') {
            showError(this, error, 'Nome é obrigatório');
        } else {
            clearError(this, error);
        }
    });

    emailInput.addEventListener('blur', function () {
        const error = document.getElementById('emailError');
        if (this.value.trim() === '') {
            showError(this, error, 'Email é obrigatório');
        } else if (!validateEmail(this.value.trim())) {
            showError(this, error, 'Email inválido');
        } else {
            clearError(this, error);
        }
    });

    passwordInput.addEventListener('blur', function () {
        const error = document.getElementById('passwordError');
        if (this.value === '') {
            showError(this, error, 'Senha é obrigatória');
        } else if (this.value.length < 6) {
            showError(this, error, 'Senha deve ter pelo menos 6 caracteres');
        } else {
            clearError(this, error);
        }
    });

    confirmPasswordInput.addEventListener('blur', function () {
        const error = document.getElementById('confirmPasswordError');
        if (this.value === '') {
            showError(this, error, 'Confirmação da senha é obrigatória');
        } else if (this.value !== passwordInput.value) {
            showError(this, error, 'As senhas não coincidem');
        } else {
            clearError(this, error);
        }
    });

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();
        formError.style.display = 'none';
        formError.textContent = '';

        let isValid = true;

        if (nameInput.value.trim() === '') {
            showError(nameInput, document.getElementById('nameError'), 'Nome é obrigatório');
            isValid = false;
        } else {
            clearError(nameInput, document.getElementById('nameError'));
        }

        if (emailInput.value.trim() === '') {
            showError(emailInput, document.getElementById('emailError'), 'Email é obrigatório');
            isValid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, document.getElementById('emailError'), 'Email inválido');
            isValid = false;
        } else {
            clearError(emailInput, document.getElementById('emailError'));
        }

        if (passwordInput.value === '') {
            showError(passwordInput, document.getElementById('passwordError'), 'Senha é obrigatória');
            isValid = false;
        } else if (passwordInput.value.length < 6) {
            showError(passwordInput, document.getElementById('passwordError'), 'Senha deve ter pelo menos 6 caracteres');
            isValid = false;
        } else {
            clearError(passwordInput, document.getElementById('passwordError'));
        }

        if (confirmPasswordInput.value === '') {
            showError(confirmPasswordInput, document.getElementById('confirmPasswordError'), 'Confirmação da senha é obrigatória');
            isValid = false;
        } else if (confirmPasswordInput.value !== passwordInput.value) {
            showError(confirmPasswordInput, document.getElementById('confirmPasswordError'), 'As senhas não coincidem');
            isValid = false;
        } else {
            clearError(confirmPasswordInput, document.getElementById('confirmPasswordError'));
        }

        if (!isValid) return;

        const submitBtn = registerForm.querySelector('.btn-login');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Criando...</span>';

        setTimeout(function () {
            const successAlert = document.createElement('div');
            successAlert.className = 'alert alert-success';
            successAlert.innerHTML = '<i class="fas fa-check-circle"></i><span>Conta criada com sucesso!</span>';
            registerForm.insertBefore(successAlert, registerForm.firstChild);

            setTimeout(function () {
                window.location.href = 'Login.html';
            }, 1200);
        }, 1000);
    });
}

function initOrderForm() {
    const orderItemsContainer = document.getElementById('orderItems');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const orderForm = document.getElementById('orderForm');
    const addButtons = document.querySelectorAll('.add-item');

    let order = [];

    function formatMoney(value) {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    function updateTotals() {
        const subtotal = order.reduce((sum, item) => sum + item.price, 0);
        const delivery = order.length > 0 ? 5 : 0;
        const total = subtotal + delivery;

        subtotalElement.textContent = formatMoney(subtotal);
        totalElement.textContent = formatMoney(total);
    }

    function renderOrder() {
        if (order.length === 0) {
            orderItemsContainer.innerHTML = '<p class="empty-order">Nenhum item escolhido ainda.</p>';
            updateTotals();
            return;
        }

        orderItemsContainer.innerHTML = order.map((item, index) => `
            <div class="order-item">
                <div class="order-item-info">
                    <span class="order-item-name">${item.name}</span>
                    <span class="order-item-price">${formatMoney(item.price)}</span>
                </div>
                <button type="button" class="remove-item" data-index="${index}" aria-label="Remover item">×</button>
            </div>
        `).join('');

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function () {
                const index = Number(this.dataset.index);
                order.splice(index, 1);
                renderOrder();
            });
        });

        updateTotals();
    }

    addButtons.forEach(button => {
        button.addEventListener('click', function () {
            const item = this.closest('.menu-item');
            const name = item.dataset.name;
            const price = Number(item.dataset.price);

            order.push({ name, price });
            renderOrder();
        });
    });

    orderForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const customerName = document.getElementById('customerName').value.trim();
        const customerPhone = document.getElementById('customerPhone').value.trim();
        const customerAddress = document.getElementById('customerAddress').value.trim();

        if (order.length === 0) {
            alert('Selecione pelo menos um item para fazer o pedido.');
            return;
        }

        if (!customerName || !customerPhone || !customerAddress) {
            alert('Preencha nome, telefone e endereço para concluir o pedido.');
            return;
        }

        const pedido = {
            cliente: customerName,
            telefone: customerPhone,
            endereco: customerAddress,
            itens: order,
            total: order.reduce((sum, item) => sum + item.price, 0) + 5
        };

        const pedidosSalvos = JSON.parse(localStorage.getItem('atomicCafePedidos') || '[]');
        pedidosSalvos.push(pedido);
        localStorage.setItem('atomicCafePedidos', JSON.stringify(pedidosSalvos));

        alert('Pedido registrado com sucesso!');
        orderForm.reset();
        order = [];
        renderOrder();
    });

    renderOrder();
}

