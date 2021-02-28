import { Fetcher } from "gclib-utils";
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
            const { submitUrl } = this.props;
            this.setError(undefined);
            this.setSubmitting(true);
            this._fetcher.fetch({
                url: submitUrl
            });
        }
        connectedCallback() {
            var _a;
            (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
            const { submitUrl } = this.props;
            if (submitUrl !== undefined) {
                this._fetcher = new Fetcher({
                    onData: this.onData,
                    onError: this.onError
                });
            }
        }
        onData(data) {
            this.setSubmitting(false);
            this.setData(data.payload);
        }
        onError(error) {
            this.setSubmitting(false);
            this.setError(error);
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
