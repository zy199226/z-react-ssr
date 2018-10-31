import { matchPath } from 'react-router-dom';
import { serverRoutes } from '../../src/router';

const resState = (req, stores) => new Promise((resolve) => {
    const promises = [];

    serverRoutes.forEach((v) => {
        const match = matchPath(req.url, v);
        if (match && v.component.Component.asyncData) {
            promises.push(v.component.Component.asyncData(stores));
        }
    });

    Promise.all(promises).then(res => resolve(res.length));
});

export default resState;
