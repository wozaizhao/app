const hasStorage = () => {
    if (typeof localStorage == 'undefined' || typeof sessionStorage == 'undefined') return false;
    else return true;
};

export const setLocal = (args) => {
    const { key, value, type = 'persistent', raw } = args;

    if (!hasStorage()) return;

    let v;
    if (raw) {
        v = value;
    } else {
        v = JSON.stringify(value);
    }

    if (type == 'session') {
        sessionStorage.setItem(key, v);
    } else {
        localStorage.setItem(key, v);
    }
};

export const getLocal = (args) => {
    if (!hasStorage()) return;

    const { key, raw } = args;

    let v = sessionStorage.getItem(key) ?? undefined;

    if (!v) {
        v = localStorage.getItem(key) ?? undefined;
    }

    if (raw) return v;

    return v ? JSON.parse(v) : undefined;
};

export const removeLocal = (args) => {
    if (!hasStorage()) return;

    const { key } = args;

    sessionStorage.removeItem(key);
    localStorage.removeItem(key);

    return;
};
