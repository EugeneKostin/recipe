

export class FormValidator {

    constructor(value) {
        this.value = value;
    }

    requiredValidateError() {
        return this.value ? null : 'Пожалуйста, введите название блюда'
    }

    regexValidateError() {
        const regex = /^[A-Za-zА-Яа-я0-9\s]*$/;
        return regex.test(this.value) ? null : 'Пожалуйста, введите корректное название блюда (только буквы и цифры)'
    }
}