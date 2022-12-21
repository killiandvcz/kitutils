import {writable, get} from 'svelte/store';
import {getFormErrors} from "./zod/index.js";
import {hashmap} from "../stores/index.js";

export class Form {
    constructor({name, form, schema, data}) {
        this.name = name;
        this.form = form || {};
        this.schema = schema || null;
        this.dataValue = data || {};
    };

    values = writable({});
    errors = writable({});
    okays = writable({});
    data = hashmap(this.dataValue);

    init = () => {
        Object.entries(this.form).forEach(([key, value]) => {
            this.values.update(v => {
                v[key] = value;
                return v;
            });
            this.errors.update(v => {
                v[key] = [];
                return v;
            });
            this.okays.update(v => {
                v[key] = false;
                return v;
            });
        });
    }

    getKeys = () => {
        return Object.keys(this.form);
    }

    check = () => {
        const schema = this.schema.safeParse(get(this.values));

        if (schema.success) {
            Object.entries(get(this.okays)).forEach(([key, value]) => {
                this.okays.update(v => {
                    v[key] = true;
                    return v;
                });
            })
        } else {
            const errors = getFormErrors(schema.error.issues);
            this.getKeys().forEach(key => {
                if (errors[key]) {
                    this.okays.update(v => {
                        v[key] = false;
                        return v;
                    });
                } else {
                    this.okays.update(v => {
                        v[key] = true;
                        return v;
                    });
                }
            })
        }
    }

    hardCheck = () => {
        const schema = this.schema.safeParse(get(this.values));
        if (!schema.success) {
            this.errors.set(getFormErrors(schema.error.issues));
            return false;
        };
        return true;
    }

    getValues = () => {
        return get(this.values);
    }

}