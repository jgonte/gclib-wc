import { VirtualNode } from 'gclib-vdom';
import createVirtualNode from './createVirtualNode';
const defaultPropertyValueConverter = {
    toProperty: (value, type) => {
        switch (type) {
            case Boolean:
                return value !== null && value !== 'false';
            case Number:
                return value === null ? null : Number(value);
            case Object: // It can also be a string
                try {
                    value = JSON.parse(value);
                }
                catch (error) {
                    return value;
                }
            case Array:
                return JSON.parse(value);
            case VirtualNode: {
                try {
                    value = JSON.parse(value);
                }
                catch (error) {
                    // Value is a string but not a JSON one, do nothing
                }
                return createVirtualNode(value);
            }
            case Function: { // Extract the string and return the global function
                const functionName = value.replace('()', '').trim();
                return window[functionName];
            }
        }
        return value;
    },
    toAttribute: (value, type) => {
        switch (type) {
            case Boolean:
                return value ? 'true' : 'false';
            case Object:
            case Array:
                return value == null ? value : JSON.stringify(value);
        }
        return value;
    }
};
export default defaultPropertyValueConverter;
