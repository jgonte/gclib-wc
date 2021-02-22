import { Fragment, h } from "gclib-vdom";
/**
 * Render when there has been an error
 */
export const renderError = Symbol('renderError');
const ErrorableMixin = Base => { var _a; return _a = class Errorable extends Base {
        render() {
            const { error } = this.state;
            return error !== undefined ?
                this[renderError]() :
                super.render();
        }
        [renderError]() {
            const { error } = this.state;
            if (this.props.renderError !== undefined) {
                return (h(Fragment, null,
                    this.props.renderError(error),
                    super.render()));
            }
            else { // Show the user the error
                return (h(Fragment, null,
                    h("gcl-overlay", null,
                        h("gcl-alert", { type: "error", message: this.getErrorMessage(error) })),
                    super.render()));
            }
        }
        getErrorMessage(error) {
            if (error instanceof Error) {
                return error.message;
            }
            else {
                return JSON.stringify(error);
            }
        }
    },
    _a.properties = {
        renderError: {
            type: Function
        }
    },
    _a.state = {
        error: {
            value: undefined
        }
    },
    _a; };
export default ErrorableMixin;
