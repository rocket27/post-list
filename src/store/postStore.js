import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

class PostStore {
    postList = [{
        city: 'Москва',
        description: 'Состояние отличное, машина как новая. Продаю в связи с покупкой нового авто. Фотографии еще не успел сделать, но обязательно добавлю позже!',
        id: uuidv4(),
        phoneNumber: '+79241234567',
        title: 'Продам автомобиль Toyota Corolla, последней модели',
    }];

    constructor() {
        makeAutoObservable(this);
    }

    getPostList = () => {
        return this.postList;
    }

    setPostList = (postList) => {
        this.postList = postList;
    }
}

const postStore = new PostStore();

export default postStore;
export { PostStore };
