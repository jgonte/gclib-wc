import { SingleRecordLoader } from "gclib-utils";
import LoadableMixin from "./LoadableMixin";

/**
 * Implements a mixin that loads a single record
 */
const SingleLoadableMixin = Base =>

    class SingleLoadable extends
        LoadableMixin(Base) {

        async load() {

            const {
                loadUrl
            } = this.props;

            this.setError(undefined);

            this.setLoading(true);

            return await this._loader.load({
                url: loadUrl
            });
        }

        initLoader() {

            const {
                loadUrl,
                autoLoad
            } = this.props;

            if (loadUrl !== undefined) {

                this._loader = new SingleRecordLoader({
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