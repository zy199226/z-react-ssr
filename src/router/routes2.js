import loadable from 'loadable-components';

const A = loadable(() => import('../pages/a/a'));
const B = loadable(() => import('../pages/b/b'));
const C = loadable(() => import('../pages/c/c'));

const routes = [
    {
        path: '/aaa',
        component: A,
    }, {
        path: '/bbb',
        component: B,
    }, {
        path: '/ccc',
        component: C
    }
];

export default routes;
