import axios from '../options/axiosCore';
import { TEST1 } from '../options/api';

/**
 * 测试1
 * 测试用请求接口，请求的是本地服务的接口，可直接删除
 */
export const test1 = params => axios({
    method: 'get',
    url: TEST1.CONTENT,
    params
}).then(res => res.data);

/**
 * 测试2
 * 测试用请求接口，请求的是本地服务的接口，可直接删除
 */
export const test2 = params => axios({
    method: 'get',
    url: TEST1.CONTENT,
    params
}).then(res => res.data);
