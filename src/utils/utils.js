import config from '../config';
import { getRouter } from '../api';

/**
 * Remove keys from an object
 */
export const omit = (obj, ...keys) => {
    const ret = {};
    let key;
    for (key in obj) {
        if (!keys.includes(key)) {
            ret[key] = obj[key];
        }
    }
    return ret;
};

/**
 * Get a universal global this object
 */
export const getGlobalThis = () => {
    return window;
};

export const getAppGlobal = (key) => {
    const __this = getGlobalThis();
    return __this.wzz?.[key];
};
export const setAppGlobal = (key, value) => {
    const __this = getGlobalThis();
    if (!__this.wzz) __this.wzz = {};
    __this.wzz[key] = value;
};

// Sort objects in an array by a priority value that defaults to 100
export const sortPriority = (arr) => {
    if (!arr || arr.length === 0) return arr;

    return arr.sort((a, b) => {
        const ap = a.priority || 100;
        const bp = b.priority || 100;

        let result = 0;

        if (ap < bp) {
            result = -1;
        } else if (ap > bp) {
            result = 1;
        }

        return result;
    });
};

/**
 * Throttle a function to run only every period
 */
// export const throttle = (
//   func,
//   period,
// ) => {
//   let inThrottle;

//   return function (this, ...args) {
//     if (!inThrottle) {
//       inThrottle = true
//       func.apply(this, args)
//       setTimeout(() => (inThrottle = false), period)
//     }
//   }
// }

export const readFileContent = (file, resultType) => {
    console.log('readFileContent', file);
    return new Promise((resolve) => {
        if (resultType === 'file') {
            resolve();
            return;
        }
        const reader = new FileReader();

        reader.onload = (event) => {
            resolve(event.target.result);
        };

        if (resultType === 'dataUrl') {
            reader.readAsDataURL(file);
        } else if (resultType === 'text') {
            reader.readAsText(file);
        }
    });
};

export const imgURL = (key) => {
    if (key) {
        if (key.includes('http')) {
            return key;
        }
        return config.imgPrefix + key;
    }
    return key;
};

export const genderText = (gender) => {
    return gender === config.genderMale ? '男' : gender === config.genderFemale ? '女' : '未知';
};

export const delayGoBack = () => {
    setTimeout(() => {
        getRouter().back();
    }, 1000);
};
