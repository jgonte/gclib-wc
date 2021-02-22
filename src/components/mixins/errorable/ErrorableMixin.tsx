import { Fragment, h } from "gclib-vdom";

/**
 * Render when there has been an error
 */
export const renderError = Symbol('renderError');

const ErrorableMixin = Base =>

    class Errorable extends Base {

        static properties = {

            renderError: {
                type: Function
            }
        };

        static state = {

            error: {
                value: undefined
            }
        };

        render() {

            const {
                error
            } = this.state;

            return error !== undefined ?
                this[renderError as any]() :
                super.render();
        }

        [renderError]() {

            const {
                error
            } = this.state;

            if (this.props.renderError !== undefined) {

                return (
                    <Fragment>
                        {this.props.renderError(error)}
                        {super.render()}
                    </Fragment>
                );
            }
            else { // Show the user the error

                return (
                    <Fragment>
                        <gcl-overlay>
                            <gcl-alert
                                type="error"
                                message={this.getErrorMessage(error)}
                            />
                        </gcl-overlay>
                        {super.render()}
                    </Fragment>
                );
            }
        }

        getErrorMessage(error: any) {

            if (error instanceof Error) {

                return error.message;
            }
            else {

                return JSON.stringify(error);
            }
        }

    };

export default ErrorableMixin;
