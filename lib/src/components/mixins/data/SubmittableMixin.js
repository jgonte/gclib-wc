import { Fetcher } from "gclib-utils";
import { h } from "gclib-vdom";
/**
 * Mixin to implement a component that can post data to a server
 * The derived/subclass must also implement ErrorableMixin
 * @param Base
 */
const SubmitableMixin = Base => { var _a; return _a = class Submitable extends Base {
        constructor(props, children) {
            super(props, children);
            this.submit = this.submit.bind(this);
            this.onSubmitData = this.onSubmitData.bind(this);
            this.onSubmitError = this.onSubmitError.bind(this);
        }
        renderSubmitting() {
            const { submitting } = this.state;
            if (submitting === false) {
                return null;
            }
            return (h("gcl-overlay", null,
                h("gcl-alert", { closable: "false", type: "info", message: "...Submitting" })));
        }
        submit() {
            const { submitUrl } = this.props;
            if (submitUrl === undefined) {
                console.error('A submit URL is required to submit the form');
                return;
            }
            const { _fetcher } = this;
            this.setError(undefined);
            this.setSubmitting(true);
            const data = this.getSubmitData(); // Overriden by the derived classes
            _fetcher.fetch({
                url: submitUrl,
                method: this.getMethod(data),
                data
            });
        }
        getMethod(data) {
            const { method, methodSelector } = this.props;
            if (method !== undefined) {
                return method; // The user set an specific method
            }
            if (methodSelector != undefined) {
                return methodSelector(data);
            }
            // Use conventions
            return data.id !== undefined ? 'put' : 'post';
        }
        initSubmitter() {
            const { submitUrl, } = this.props;
            if (submitUrl !== undefined) {
                this._fetcher = new Fetcher({
                    onData: this.onSubmitData,
                    onError: this.onSubmitError
                });
            }
        }
        onSubmitData(data) {
            this.setSubmitting(false);
            this.handleSubmitResponse(data.payload);
        }
        onSubmitError(error) {
            this.setSubmitting(false);
            this.setError(error);
        }
        connectedCallback() {
            var _a;
            (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
            this.initSubmitter();
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
        method: {
            type: String,
            options: ['post', 'put']
        },
        methodSelector: {
            type: Function
        }
    },
    _a.state = {
        submitting: {
            value: false
        }
    },
    _a; };
export default SubmitableMixin;
