const defaultPropertyValueConverter = {

    toProperty: (value, type) => {

        switch (type) {
            case Boolean:
                return value !== null && value !== 'false';
            case Number:
                return value === null ? null : Number(value);
            case Object:
            case Array:
                return JSON.parse(value);
        }
    
        return value;
    },
    
    toAttribute: (value, type) => {
    
        switch (type) {
            case Boolean:
                return value ? '' : null;
            case Object:
            case Array:
                return value == null ? value : JSON.stringify(value);
        }
    
        return value;
    }
}

export default defaultPropertyValueConverter;