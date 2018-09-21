/**
 * 
 * @param { Set } setA 
 * @param { Set } setB 
 */
 export function union (setA, setB) {
    let unifiedSet = new Set(setA);
    for (let elem of setB) {
        unifiedSet.add(elem);
    }
    return unifiedSet;
}

/**
 * 
 * @param { Set } setA 
 * @param { Set } setB 
 */
export function intersection (setA, setB) {
    let intersected = new Set();
    for (let elem of setB) {
        if (setA.has(elem)){
            intersected.add(elem);
        }
    }
    return intersected;
}

/**
 * 
 * @param { Set } setA 
 * @param { Set } setB 
 */
export function difference (setA, setB) {
    let _difference = new Set(setA);
    for (let elem of setB) {
        _difference.delete(elem);
    }
    return _difference;
}
