export const initializeFormValues = (initialFields) => {
    const initialValues = {
        values: {

        },
        errors: {

        },
        okays: {

        },
        keys: []
    }

    Object.entries(initialFields).forEach(([key, value]) => {
        initialValues.values[key] = value;
        initialValues.errors[key] = [];
        initialValues.okays[key] = false;
        initialValues.keys.push(key);
    })

    return initialValues;

}