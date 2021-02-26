import { Fetcher } from "gclib-utils";
import { ErrorResponse } from "gclib-utils/dist/types/data/transfer/Interfaces";
import { Fragment, h } from "gclib-vdom";
import ErrorableMixin from "../errorable/ErrorableMixin";

const AsyncDataSubmitableMixin = Base =>

    //@ts-ignore
    class AsyncDataSubmitable extends
        ErrorableMixin(
            Base
        ) {

        static properties = {

            /**
             * The URL to post the data to
             */
            submitUrl: {
                attribute: 'submit-url',
                type: String,
                required: true
            },

            renderSubmitting: {
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
        }


        render() {

            const {
                submitting
            } = this.state;

            if (submitting === true) {

                const {
                    renderSubmitting
                } = this.props;

                if (renderSubmitting !== undefined) {

                    return renderSubmitting();
                }
                else {

                    return (
                        <Fragment>
                            <gcl-overlay >
                                <gcl-alert
                                    closable="false"
                                    type="info"
                                    message="...Submitting"
                                />
                            </gcl-overlay>
                            { super.render()}
                        </Fragment>
                    );
                }
            }
            else {

                super.render();
            }
        }

        submit() {

            const {
                submitUrl
            } = this.props;

            this.setError(undefined);

            this.setSubmitting(true);

            this._fetcher.fetch({
                url: submitUrl
            });
        }

        connectedCallback() {

            const {
                submitUrl
            } = this.props;

            if (submitUrl !== undefined) {

                this._fetcher = new Fetcher({
                    onData: this.onData,
                    onError: this.onError
                });

            }
            else {

                super.connectedCallback();
            }
        }

        onData(data: Record<string, any>) {

            this.setSubmitting(false);

            this.setData(data.payload);
        }

        onError(error: ErrorResponse) {

            this.setSubmitting(false);

            this.setError(error);
        }

    };

export default AsyncDataSubmitableMixin;
