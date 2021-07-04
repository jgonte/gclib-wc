import { h } from "gclib-vdom";
const LoadableMixin = Base => { var _a; return _a = class Loadable extends Base {
        constructor(props, children) {
            super(props, children);
            this.onLoadData = this.onLoadData.bind(this);
            this.onLoadError = this.onLoadError.bind(this);
        }
        renderLoading() {
            const { loading } = this.state;
            if (loading === false) {
                return null;
            }
            return (h("gcl-overlay", null,
                h("gcl-alert", { closable: "false", type: "info", message: "...Loading" })));
        }
        // abstract initLoader();
        // abstract load();
        onLoadData(data) {
            this.setLoading(false);
            this.setData(data.payload);
        }
        onLoadError(error) {
            this.setLoading(false);
            this.setError(error);
        }
    },
    _a.properties = {
        /**
         * The URL to retrieve the data from
         */
        loadUrl: {
            attribute: 'load-url',
            type: String,
            //required: true Loading the form or other component might be optional
        },
        /**
         * Whether to load the data for the component when the component is connected
         */
        autoLoad: {
            attribute: 'auto-load',
            type: Boolean,
            value: true
        }
    },
    _a.state = {
        loading: {
            value: false
        }
    },
    _a; };
export default LoadableMixin;
