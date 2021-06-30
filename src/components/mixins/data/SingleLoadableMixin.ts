import { SingleItemLoader } from "gclib-utils";
import LoadableMixin from "./LoadableMixin";

/**
 * Implements a mixin that loads a single record
 */
const SingleLoadableMixin = Base =>

    class SingleLoadable extends
        LoadableMixin(Base) {

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

                this._loader = new SingleItemLoader({
                    onData: this.onLoadData,
                    onError: this.onLoadError
                });

                if (autoLoad === true) {

                    this.load();
                }
            }
        }
    }

export default SingleLoadableMixin;