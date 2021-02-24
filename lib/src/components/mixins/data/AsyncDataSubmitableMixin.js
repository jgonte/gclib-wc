import { Fragment, h } from "gclib-vdom";
import ErrorableMixin from "../errorable/ErrorableMixin";
const AsyncDataSubmitableMixin = Base => { var _a; return _a = 
//@ts-ignore
class AsyncDataSubmitable extends ErrorableMixin(Base) {
        constructor() {
            super();
            this.submit = this.submit.bind(this);
        }
        render() {
            const { submitting } = this.state;
            if (submitting === true) {
                const { renderSubmitting } = this.props;
                if (renderSubmitting !== undefined) {
                    return renderSubmitting();
                }
                else {
                    return (h(Fragment, null,
                        h("gcl-overlay", null,
                            h("gcl-alert", { closable: "false", type: "info", message: "...Submitting" })),
                        super.render()));
                }
            }
            else {
                super.render();
            }
        }
        submit() {
            this.setSubmitting(true);
        }
    },
    _a.properties = {
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
    },
    _a.state = {
        submitting: {
            value: false
        }
    },
    _a; };
export default AsyncDataSubmitableMixin;
