import { CollectionLoader, SingleItemLoader } from "gclib-utils";
import { Fragment, h } from "gclib-vdom";
import ErrorableMixin from "../errorable/ErrorableMixin";
import DataLoadableMixin from "./DataLoadableMixin";
const AsyncDataLoadableMixin = Base => { var _a; return _a = 
//@ts-ignore
class AsyncDataLoadable extends ErrorableMixin(DataLoadableMixin(Base)) {
        constructor() {
            super();
            this.onLoadData = this.onLoadData.bind(this);
            this.onLoadError = this.onLoadError.bind(this);
        }
        render() {
            const { loading } = this.state;
            if (loading === true) {
                const { renderLoading } = this.props;
                if (renderLoading !== undefined) {
                    return renderLoading();
                }
                else {
                    return (h(Fragment, null,
                        h("gcl-overlay", null,
                            h("gcl-alert", { closable: "false", type: "info", message: "...Loading" })),
                        super.render()));
                }
            }
            else {
                return super.render();
            }
        }
        load() {
            const { loadUrl } = this.props;
            this.setError(undefined);
            this.setLoading(true);
            this._loader.load({
                url: loadUrl
            });
        }
        connectedCallback() {
            const { loadUrl, autoLoad, isCollection } = this.props;
            if (loadUrl !== undefined) {
                this._loader = isCollection === true ?
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
            else {
                super.connectedCallback();
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
            type: Boolean,
            value: true
        },
        /**
         * Whether the loader loads a collection of items vs a single one
         */
        isCollection: {
            type: Boolean,
            value: true
        },
        /**
         * To render a custom loading if wanted
         */
        renderLoading: {
            type: Function
        }
    },
    _a.state = {
        loading: {
            value: false
        }
    },
    _a; };
export default AsyncDataLoadableMixin;
