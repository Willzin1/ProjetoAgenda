import validator from 'validator';

export default class Contato {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        if (!this.form) return;
    
        this.form.addEventListener('submit', event => {
            this.handleSubmit(event);
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        if (!this.isFieldValid() && !this.isEmailValid(event)) {
            this.form.submit();
        };
    }

    isFieldValid() {
        this.cleanUp();
        let valid = false;

        for (let field of this.form.querySelectorAll('.form-control')){
            let label = field.previousElementSibling.innerHTML;

            if(!field.value) {
                this.createError(field, `Campo ${label} não pode estar vazio.`);
                valid = true;
            }
        }
    }

    isEmailValid(event) {
        const el = event.target;
        const emailInput = el.querySelector('input[name="email"]');
        let valid = false;

        if(!validator.isEmail(emailInput.value)) {
            this.createError(emailInput, 'E-mail inválido.');
            valid = true;
        }

        return valid;
    }

    createError(fieldInput, errorText) {
        const div = document.createElement('div');
        div.innerHTML = errorText;
        div.classList.add('text-danger');
        fieldInput.insertAdjacentElement('afterend', div);
    }

    cleanUp() {
        for (let errorText of this.form.querySelectorAll('.text-danger')){
            errorText.remove();
        }
    }
}