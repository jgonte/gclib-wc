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

        static properties = {

            /**
             * The URL to retrieve the data from
             */
            loadUrl: {
                attribute: 'load-url',
                type: String,
                required: true
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
        };

        static state = {

            loading: {
                value: false
            }
        };

        constructor() {

            super();

            this.onData = this.onData.bind(this);

            this.onError = this.onError.bind(this);
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

            const {
                loadUrl,
                autoLoad,
                isCollection
            } = this.props;

            if (loadUrl !== undefined) {

                this._loader = isCollection === true ?
                    new CollectionLoader({
                        onData: this.onData,
                        onError: this.onError
                    }) :
                    new SingleItemLoader({
                        onData: this.onData,
                        onError: this.onError
                    });

                if (autoLoad === true) {

                    this.load();
                }
            }
            else {

                super.connectedCallback();
            }
        }

        onData(data) {

            this.setLoading(false);

            this.setData(data.payload);
        }

        onError(error) {

            this.setLoading(false);

            this.setError(error);
        }

    };

export default AsyncDataLoadableMixin;
