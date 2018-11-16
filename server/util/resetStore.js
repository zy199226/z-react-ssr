const resetStores = (stores, source) => {
    if (!source) {
        return stores;
    }
    const obj = JSON.parse(source);
    for (const v in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, v)) {
            Object.assign(stores[v], obj[v]);
        }
    }
    return stores;
};

export default resetStores;
