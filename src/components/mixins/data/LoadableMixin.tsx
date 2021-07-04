import { h } from "gclib-vdom";

const LoadableMixin = Base =>

    class Loadable extends Base {

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
                attribute: 'auto-load',
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

    };

export default LoadableMixin;
