import validator from 'validator';

export default class Contato {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

     /**
     * Método para inicializar os eventos.
     * 
     * @returns {void}
     */
    init() {
        if (!this.form) return;
    
        this.form.addEventListener('submit', event => {
            this.handleSubmit(event);
        })
    }

    /**
     * 
     * Método para lidar com o evento de submit.
     * Previne o envio padrão e chama a validação 
     * dos campos e do email antes de submeter. 
     * 
     * @param {Event} event 
     * @returns {void}
     * 
     */
    handleSubmit(event) {
        
        event.preventDefault();

        if (!this.isFieldValid() && !this.isEmailValid(event)) {
            this.form.submit();
        };
    }

    /**
     * 
     * Método que irá percorrer os campos
     * e verificará se estão preenchidos.
     * Caso algum campo esteja vazio, cria
     * uma mensagem de erro. 
     * 
     * @returns {boolean} - retorna true se algum campo estiver vazio.
     * 
     */
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

    /**
     * 
     * Método que irá verificar se o email inserido no input é válido.
     * Caso não seja válido, cria uma mensagem de erro.
     * 
     * @param {Event} event 
     * @returns {boolean} - retorna true caso o email seja inválido.
     * 
     */
    isEmailValid(event) {
        const el = event.target;
        const emailInput = el.querySelector('input[name="email"]');
        let valid = false;

        if(!validator.isEmail(emailInput.value)) {
            this.createError(emailInput, 'E-mail aaaa inválido.');
            valid = true;
        }

        return valid;
    }

    /**
     * 
     * Método que irá criar mensagens de erro,
     * essas mensagens serão inseridas após o campo.
     * A mensagem recebe uma classe 'text-danger'.
     * 
     * @param {string} errorText - Texto da mensagem de erro.
     * @param {HTMLElement} fieldInput - O campo onde a mensagem será inserida pós.
     * @returns {void}
     * 
     */
    createError(fieldInput, errorText) {
        const div = document.createElement('div');
        div.innerHTML = errorText;
        div.classList.add('text-danger');
        fieldInput.insertAdjacentElement('afterend', div);
    }

    /**
     * Método que remove todas as mensagens de erro com
     * a classe 'text-danger' antes de validar novamente.
     * 
     * @returns {void} 
     * 
     */
    cleanUp() {
        for (let errorText of this.form.querySelectorAll('.text-danger')){
            errorText.remove();
        }
    }
}