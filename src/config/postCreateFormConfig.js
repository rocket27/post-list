import { PHONE_REG_EXP } from './constants';

export const POST_CREATE_FORM_CONFIG = {
    title: {
        name: 'title',
        label: 'Заголовок',
        validation: {
            required: {
                message: 'Заполните поле',
            },
            maxlength: {
                value: 140,
                message: (value) => `Не более ${value} символов`,
            },
        },
    },
    description: {
        name: 'description',
        label: 'Текст объявления',
        validation: {
            required: {
                message: 'Заполните поле',
            },
            maxlength: {
                value: 300,
                message: (value) => `Не более ${value} символов`,
            },
        },
    },
    phone: {
        name: 'phoneNumber',
        label: 'Телефон',
        validation: {
            required: {
                message: 'Заполните поле',
            },
            matches: {
                value: PHONE_REG_EXP,
                message: 'Укажите номер в формате +7... без пробелов',
            },
        },
    },

};
