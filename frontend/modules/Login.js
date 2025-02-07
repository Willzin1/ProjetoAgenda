import validator from 'validator';

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    /**
     * 
     * Método para inicializar os eventos.
     * 
     * @returns {void}
     * 
     */
    init() {
        if(!this.form) return;

        this.form.addEventListener('submit', event => {
            this.handleSubmit(event);
        })
    }

    /**
     * 
     * Método que irá lidar com o submit.
     * Previne o envio padrão.
     * Se a validação não tiver nenhum sucesso,
     * ele submete o formulário.
     * 
     * @returns {void}
     *  
     */
    handleSubmit(event) {
        event.preventDefault();
            
        if(!this.validate(event)) this.form.submit();
    }

    /**
     * 
     * Método que valida as informações dos input do formulário.
     * Verifica se o e-mail é válido e se a senha atende os critérios de tamanho.
     * 
     * @param {Event} event 
     * @returns - retorna true se a validação tiver algum erro.
     * 
     */
    validate(event) {
        const el = event.target;
        const emailInput = el.querySelector('input[name="email"]');
        const senhaInput = el.querySelector('input[name="password"]');
        let error = false;
        this.cleanUp();

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
     * Método que irá criar mensagens de erro,
     * essas mensagens serão inseridas após o campo.
     * A mensagem recebe uma classe 'text-danger'.
     * 
     * @param {string} errorText - Texto da mensagem de erro.
     * @param {HTMLElement} fieldInput - O campo onde a mensagem será inserida pós.
     * @returns {void}
     * 
     */
    createError(inputField, errorText) {
        const div = document.createElement('div');
        div.innerHTML = errorText;
        div.classList.add('text-danger');
        inputField.insertAdjacentElement('afterend', div);
    }

    /**
     * Método que remove todas as mensagens de erro com
     * a classe 'text-danger' antes de validar novamente.
     * 
     * @returns {void} 
     * 
     */
    cleanUp() {
        for (let errorText of this.form.querySelectorAll('.text-danger')) {
            errorText.remove();
        }
    }
}