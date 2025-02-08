import validator from 'validator';

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    /**
     * Método para inicializar os eventos.
     */
    init() {
        if(!this.form) return;

        this.form.addEventListener('submit', event => {
            this.handleSubmit(event);
        })
    }

    /**
     * 
     * @returns 
     * 
     * Método que irá lidar com o submit.
     */
    handleSubmit(event) {
        event.preventDefault();
            
        if(!this.validate(event)) this.form.submit();
    }

    /**
     * 
     * @param {*} event 
     * @returns 
     * 
     * Método que valida as informações dos input.
     */
    validate(event) {
        const el = event.target;
        const nameInput = el.querySelector('input[name="name"]');
        const emailInput = el.querySelector('input[name="email"]');
        const senhaInput = el.querySelector('input[name="password"]');
        let error = false;
        this.cleanUp();

        for(let field of el.querySelectorAll('.form-control')){
            let label = field.previousElementSibling.innerHTML;

            if(!field.value) {
                this.createError(field, `Campo ${label.slice(3, label.length)} não pode estar vazio.`);
            }else{
                
            }
        }

        if(!validator.isEmail(emailInput.value)) {
            this.createError(emailInput, 'E-mail inválido.');
            error = true;
        }

        if(senhaInput.value.length < 8 || senhaInput.value.length > 50) {
            this.createError(senhaInput, 'Senha precisa conter entre 8 e 50 caracteres');
            error = true;
        }

        return error;
    }

    /**
     * 
     * @param {*} inputField  
     * @param {*} errorText
     * 
     * Método que criará mensagens de erros e salvá-los em uma DIV,
     * que irá ser acrescentada ao final do input.
     */
    createError(inputField, errorText) {
        const div = document.createElement('div');
        div.innerHTML = errorText;
        div.classList.add('text-danger');
        inputField.insertAdjacentElement('afterend', div);
    }

    /**
     * Método para evitar que a mensagem de erro se repita.
     */
    cleanUp() {
        for (let errorText of this.form.querySelectorAll('.text-danger')) {
            errorText.remove();
        }
    }
}