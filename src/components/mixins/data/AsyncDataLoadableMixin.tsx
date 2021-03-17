import { CollectionLoader, SingleItemLoader } from "gclib-utils";
import { Fragment, h } from "gclib-vdom";
import ErrorableMixin from "../errorable/ErrorableMixin";
import DataLoadableMixin from "./DataLoadableMixin";

const AsyncDataLoadableMixin = Base =>

    //@ts-ignore
    class AsyncDataLoadable extends
        ErrorableMixin(
            DataLoadableMixin(
                Base
            )
        ) {

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
            },

            /**
             * To render a custom loading if wanted
             */
            renderLoading: {
                type: Function
            }
        };

        static state = {

            loading: {
                value: false
            }
        };

        constructor() {

            super();

            this.onLoadData = this.onLoadData.bind(this);

            this.onLoadError = this.onLoadError.bind(this);
        }

        render() {

            const {
                loading
            } = this.state;

            if (loading === true) {

                const {
                    renderLoading
                } = this.props;

                if (renderLoading !== undefined) {

                    return renderLoading();
                }
                else {

                    return (
                        <Fragment>
                            <gcl-overlay>
                                <gcl-alert
                                    closable="false"
                                    type="info"
                                    message="...Loading"
                                />
                            </gcl-overlay>
                            { super.render()}
                        </Fragment>
                    );

                }
            }
            else {

                return super.render();
            }
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

        connectedCallback() {

            super.connectedCallback?.();

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

export default AsyncDataLoadableMixin;
