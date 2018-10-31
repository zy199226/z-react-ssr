const mergeObservables = (stores, source) => {
    if (!source) {
        return stores;
    }
    for (const v in source) {
        if (Object.prototype.hasOwnProperty.call(source, v)) {
            Object.assign(stores[v], source[v]);
        }
    }
    return stores;
};

export default mergeObservables;
