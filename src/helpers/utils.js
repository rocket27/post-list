import { parsePhoneNumberFromString } from 'libphonenumber-js';

/**
 * Сохранить данные в LocalStorage
 * @param name
 * @param value
 */
export function setLocalStorageItem(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
}

/**
 * Получить данные из LocalStorage
 * @param name
 */
export function getLocalStorageItem(name) {
    const retrievedObject = localStorage.getItem(name);
    return JSON.parse(retrievedObject);
}

/**
 * Преобразовать телефонный номер в международный формат
 * @param value
 */
export function parsePhoneNumber(value) {
    const phoneNumber = parsePhoneNumberFromString(value);
    if (!phoneNumber) return value;
    return phoneNumber.formatInternational();
}

/**
 * Вызвать callback функцию по нажатию клавиши Enter
 * @param event
 * @param callback
 */
export function onPressEnter(event, callback) {
    const enterCharCode = 13;
    if (event.charCode === enterCharCode) callback();
}

/**
 * Так как нет возможности превратить в JSON строку объект File,
 * мы создаем его копию в новом объекте, который будем использовать
 * в качестве нового объекта для изображения
 * @param fileObject
 */
export function getValidFileObjectToJSONStringify(fileObject) {
    const imageObject = {};
    for (const key in fileObject) {
        const value = fileObject[key];
        const notFunction = typeof value !== "function";
        notFunction && (imageObject[key] = value);
    }
    return imageObject;
};
