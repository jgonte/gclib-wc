import { Fragment, h } from "gclib-vdom";
import { renderDerived } from "../Internals";
export const renderError = Symbol('renderError');
/**
 * Mixin that handles errors
 * @param Base
 */
const ErrorableMixin = Base => { var _a; return _a = class Errorable extends Base {
        [renderError]() {
            return (h(Fragment, null,
                h("gcl-overlay", null,
                    h("gcl-alert", { type: "error", message: this.getErrorMessage(), closable: true, close: () => {
                            this.setError(undefined);
                        } })),
                this[renderDerived]()));
        }
        getErrorMessage() {
            const { error } = this.state;
            if (error instanceof Error) {
                return error.message;
            }
            else { // Try to find the message of error returned by the server
                if (error.payload !== undefined) {
                    const payload = JSON.parse(error.payload);
                    if (payload.errors !== undefined) {
                        return Object.values(payload.errors).join('\n');
                    }
                    else if (payload.title !== undefined) {
                        return payload.title;
                    }
                }
                else {
                    return error.statusText;
                }
            }
        }
    },
    _a.state = {
        error: {
            value: undefined
        }
    },
    _a; };
export default ErrorableMixin;
