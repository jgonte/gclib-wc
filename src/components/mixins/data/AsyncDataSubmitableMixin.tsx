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
                type: String,
                required: true
            },

            renderSubmiting: {
                type: Function
            }
        };

        static state = {

            submiting: {
                value: false
            }
        };

        render() {

            const {
                submiting
            } = this.state;

            if (submiting === true) {

                const {
                    renderSubmiting
                } = this.props;

                if (renderSubmiting !== undefined) {

                    return renderSubmiting();
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

            this.setSubmitting(true);


        }
    };

export default AsyncDataSubmitableMixin;
