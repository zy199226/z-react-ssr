import loadable from 'loadable-components';

const App = loadable(() => import('../pages/app'));

const routes = [
    {
        path: '/',
        component: App,
        // exact: true,
    }
];

export default routes;
