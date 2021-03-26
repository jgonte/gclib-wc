import { h } from "gclib-vdom";
import { CollectionLoader, SingleItemLoader } from "gclib-utils";

const LoadableMixin = Base =>

    class Loadable extends Base {

        loadsCollection = true; // Internal configuration

        static properties = {

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
                type: Boolean,
                value: true
            }
        };

        static state = {

            loading: {
                value: false
            }
        };

        constructor(props?, children?) {

            super(props, children);

            this.onLoadData = this.onLoadData.bind(this);

            this.onLoadError = this.onLoadError.bind(this);
        }

        renderLoading() {

            const {
                loading
            } = this.state;

            if (loading === false) {

                return null;
            }

            return (
                <gcl-overlay>
                    <gcl-alert
                        closable="false"
                        type="info"
                        message="...Loading"
                    />
                </gcl-overlay>
            );
        }

        load() {

            const {
                loadUrl
            } = this.props;

            this.setError(undefined);

            this.setLoading(true);

            this._loader.load({
                url: loadUrl
            });
        }

        initLoader() {

            const {
                loadUrl,
                autoLoad
            } = this.props;

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

    };

export default LoadableMixin;
