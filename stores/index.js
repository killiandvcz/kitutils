import {get, writable} from "svelte/store";
import {get as GET} from "svelte/store";

export const hashmap = (init = {}) => {
    const store = writable(init);
    const { subscribe, update } = store;

    const get = (path = "") => {
        if (!path) {
            return GET(store);
        }

        let parts = path.split('.')
        let current = GET(store)

        for (let i = 0; i < parts.length; i++) {
            let part = parts[i]
            if (i === parts.length - 1) {
                return current[part]
            } else {
                if (!current[part]) {
                    return undefined
                }
                current = current[part]
            }
        }
    }

    const set = (path = "", value) => {
        let parts = path.split('.')
        let current = GET(store);

        for (let i = 0; i < parts.length; i++) {
            let part = parts[i]
            if (i === parts.length - 1) {
                current[part] = value
            } else {
                if (!current[part]) {
                    if (isNaN(parts[i + 1])) {
                        current[part] = {}
                    } else {
                        current[part] = []
                    }
                }
                current = current[part]
            }
        }

        store.set(GET(store));
    }

    const reset = () => {
        store.set(init);
    }

    const hardReset = () => {
        store.set({});
    }

    return {
        subscribe,
        get,
        set,
        reset,
        update
    }
}