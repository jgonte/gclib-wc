import { ElementNode } from 'gclib-vdom';
import createVirtualNode from './createVirtualNode';

function getGlobalFunction(value: string) : Function {

    const functionName = value.replace('()', '').trim();

    return (window as any)[functionName];
}

const defaultPropertyValueConverter = {

    toProperty: (value: string, type: Function) => {

        switch (type) {

            case Boolean:

                return value !== null && value !== 'false';

            case Number:

                return value === null ? null : Number(value);

            case Array:
                {
                    // All the properties that are not declared as Function accept a function as alternative by design
                    // The probing is as follows: 
                    // Test whether it is really an array
                    try {

                        return JSON.parse(value);
                    }
                    catch (error) {// Value is a string but not a JSON one, assume a function
                        
                        return getGlobalFunction(value);
                    }
                }

            case ElementNode: {

                return createVirtualNode(value);
            }

            case Function: { // Extract the string and return the global function

                return getGlobalFunction(value);
            }

            case Object: // It can also be a string

                try {

                    value = JSON.parse(value);
                }
                catch (error) {

                    return value;
                }
        }

        return value;
    },

    toAttribute: (value: any, type: Function) => {

        switch (type) {

            case Boolean:

                return value ? 'true' : 'false';

            case Object:
            case Array:

                return value == null ? value : JSON.stringify(value);
        }

        return value;
    }
}

export default defaultPropertyValueConverter;