import { CollectionLoader } from "gclib-utils";
import FilterableMixin from "./FilterableMixin";
import LoadableMixin from "./LoadableMixin";
import PageableMixin from "./PageableMixin";
import SortableMixin from "./SortableMixin";

/**
 * Implements a mixin that loads a collection of records 
 */
const CollectionLoadableMixin = Base =>

    class CollectionLoadable extends
        PageableMixin(
            SortableMixin(
                FilterableMixin(
                    LoadableMixin(Base)
                )
            )
        ) {

        async load() {

            const {
                loadUrl
            } = this.props;

            if (loadUrl === undefined) {

                console.warn(`Missing load URL`);

                return;
            }

            const {
                pageIndex,
                pageSize,
                filter,
                sorters
            } = this.state;

            this.setError(undefined);

            this.setLoading(true);

            if (this._loader === undefined) {

                this.initLoader();
            }
            else {

                return await this._loader.load({
                    url: loadUrl,
                    top: pageSize,
                    skip: pageSize * (pageIndex - 1),
                    filter,
                    orderBy: sorters
                });
            }
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