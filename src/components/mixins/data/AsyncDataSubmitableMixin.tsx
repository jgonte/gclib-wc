import { Fetcher } from "gclib-utils";
import { ErrorResponse } from "gclib-utils/dist/types/data/transfer/Interfaces";
import { Fragment, h } from "gclib-vdom";
import { renderDerived as renderDerived } from "../Internals";

export const renderSubmitting = Symbol('renderSubmitting');

/**
 * Mixin to implement a component that can post data to a server
 * The derived/subclass must also implement ErrorableMixin
 * @param Base
 */
const AsyncDataSubmitableMixin = Base =>

    class AsyncDataSubmitable extends Base {

        static properties = {

            /**
             * The URL to post the data to
             */
            submitUrl: {
                attribute: 'submit-url',
                type: String,
                required: true
            },

            method: {
                type: String,    
                options: ['post', 'put']
            },

            methodSelector: {
                type: Function
            }
        };

        static state = {

            submitting: {
                value: false
            }
        };

        constructor() {

            super();

            this.submit = this.submit.bind(this);

            this.onSubmitData = this.onSubmitData.bind(this);

            this.onSubmitError = this.onSubmitError.bind(this);
        }

        [renderSubmitting]() {

            const {
                submitting
            } = this.state;

            if (submitting === true) {

                return (
                    <Fragment>
                        <gcl-overlay >
                            <gcl-alert
                                closable="false"
                                type="info"
                                message="...Submitting"
                            />
                        </gcl-overlay>
                        { this[renderDerived as any]()}
                    </Fragment>
                );
            }
            else {

                return this[renderDerived as any]();
            }
        }

        submit() {

            const {
                submitUrl
            } = this.props;

            if (submitUrl === undefined) {

                console.error('A submit URL is required to submit the form');

                return;
            }

            const {
                _fetcher
            } = this;

            this.setError(undefined);

            this.setSubmitting(true);

            const data = this.getSubmitData(); // Overriden by the derived classes

            _fetcher.fetch({
                url: submitUrl,
                method: this.getMethod(data),
                data
            });
        }

        getMethod(data: any) {

            const {
                method,
                methodSelector
            } = this.props;

            if (method !== undefined) {

                return method; // The user set an specific method
            }

            if (methodSelector != undefined) {

                return methodSelector(data);
            }

            // Use conventions
            return data.id !== undefined ? 'put' : 'post';
        }

        connectedCallback() {

            super.connectedCallback?.();

            const {
                submitUrl,
            } = this.props;

            if (submitUrl !== undefined) {

                this._fetcher = new Fetcher({
                    onData: this.onSubmitData,
                    onError: this.onSubmitError
                });
            }
        }

        onSubmitData(data: Record<string, any>) {

            this.setSubmitting(false);

            this.handleSubmitResponse(data.payload);
        }

        onSubmitError(error: ErrorResponse) {

            this.setSubmitting(false);

            this.setError(error);
        }

    };

export default AsyncDataSubmitableMixin;
