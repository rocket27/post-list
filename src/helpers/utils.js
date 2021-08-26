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
 * Вызвать callback функцию по нажатию клавиши Enter
 * @param event
 * @param callback
 */
export function onPressEnter(event, callback) {
    const enterCharCode = 13;
    if (event.charCode == enterCharCode) callback();
}
