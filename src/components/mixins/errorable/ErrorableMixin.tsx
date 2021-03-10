import { Fragment, h } from "gclib-vdom";
import { renderDerived } from "../Internals";

export const renderError = Symbol('renderError');

/**
 * Mixin that handles errors
 * @param Base 
 */
const ErrorableMixin = Base =>

    class Errorable extends Base {

        static state = {

            error: {
                value: undefined
            }
        };

        [renderError]() {

            return (
                <Fragment>
                    <gcl-overlay>
                        <gcl-alert
                            type="error"
                            message={this.getErrorMessage()}
                            closable={true}
                            close={() => { 
                                this.setError(undefined);
                            }}
                        />
                    </gcl-overlay>
                    {this[renderDerived as any]()}
                </Fragment>
            );
        }

        getErrorMessage() {

            const {
                error
            } = this.state;

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

    };

export default ErrorableMixin;
