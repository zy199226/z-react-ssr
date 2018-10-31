import url from 'url';
import path from 'path';
import resFile from '../util/resFile';

const resFavicon = (req, res) => {
    const { pathname } = url.parse(req.url);
    const filepath = path.join(__dirname, '..', pathname);
    resFile(req, res, filepath);
};

export default resFavicon;
