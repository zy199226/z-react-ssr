import { observable, action, runInAction } from 'mobx';
import { test1 } from '../controller/test1';

class B {
    @observable obj = {};

    @action req = async () => {
        let res;
        try {
            res = await test1();
            runInAction(() => {
                this.obj = res;
            });
        } catch (e) {
            console.log(e);
        }
        return res;
    }
}

const b = new B();

export default b;
