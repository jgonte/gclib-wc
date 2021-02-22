import { Fragment, h } from "gclib-vdom";
import ErrorableMixin from "../errorable/ErrorableMixin";
const AsyncDataSubmitableMixin = Base => { var _a; return _a = 
//@ts-ignore
class AsyncDataSubmitable extends ErrorableMixin(Base) {
        render() {
            const { submiting } = this.state;
            if (submiting === true) {
                const { renderSubmiting } = this.props;
                if (renderSubmiting !== undefined) {
                    return renderSubmiting();
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
            type: String,
            required: true
        },
        renderSubmiting: {
            type: Function
        }
    },
    _a.state = {
        submiting: {
            value: false
        }
    },
    _a; };
export default AsyncDataSubmitableMixin;
