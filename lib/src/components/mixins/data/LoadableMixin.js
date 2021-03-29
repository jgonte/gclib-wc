import { h } from "gclib-vdom";
import { CollectionLoader, SingleItemLoader } from "gclib-utils";
const LoadableMixin = Base => { var _a; return _a = class Loadable extends Base {
        constructor(props, children) {
            super(props, children);
            this.loadsCollection = true; // Internal configuration
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
        load() {
            const { loadUrl } = this.props;
            this.setError(undefined);
            this.setLoading(true);
            this._loader.load({
                url: loadUrl
            });
        }
        initLoader() {
            const { loadUrl, autoLoad } = this.props;
            if (loadUrl !== undefined) {
                this._loader = this.loadsCollection === true ?
                    new CollectionLoader({
                        onData: this.onLoadData,
                        onError: this.onLoadError
                    }) :
                    new SingleItemLoader({
                        onData: this.onLoadData,
                        onError: this.onLoadError
                    });
                if (autoLoad === true) {
                    this.load();
                }
            }
        }
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
