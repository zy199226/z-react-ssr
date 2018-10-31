import { observable, action } from 'mobx';

class A {
    @observable num;

    constructor() {
        this.num = 0;
    }

    @action plus = () => {
        this.num += 1;
    }

    @action minus = () => {
        this.num -= 1;
    }
}

const a = new A();

export default a;
