import { observable, action, runInAction } from 'mobx';
import { test1 } from '../controller/test1';

class B {
    @observable obj = {};

    @action req = async () => {
        let res;
        try {
            /**
             * 测试用请求接口，请求的是本地服务的接口，可直接删除
             */
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
