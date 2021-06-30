import { CollectionLoader } from "gclib-utils";
import LoadableMixin from "./LoadableMixin";
import PageableMixin from "./PageableMixin";

/**
 * Implements a mixin that loads a collection of records 
 */
const CollectionLoadableMixin = Base =>

    class CollectionLoadable extends
        PageableMixin(
            LoadableMixin(Base)
        ) {

        load() {

            const {
                loadUrl
            } = this.props;

            const {
                pageIndex,
                pageSize
            } = this.state;

            this.setError(undefined);

            this.setLoading(true);

            this._loader.load({
                url: loadUrl,
                top: pageSize,
                skip: pageSize * (pageIndex - 1),
            });
        }

        initLoader() {

            const {
                loadUrl,
                autoLoad
            } = this.props;

            if (loadUrl !== undefined) {

                this._loader = new CollectionLoader({
                    onData: this.onLoadData,
                    onError: this.onLoadError
                });

                if (autoLoad === true) {

                    this.load();
                }
            }
        }
    }

export default CollectionLoadableMixin;