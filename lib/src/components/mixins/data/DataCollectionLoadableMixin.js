import ErrorableMixin from "../errorable/ErrorableMixin";
import DataMixin from "./DataMixin";
import CollectionLoadableMixin from "./CollectionLoadableMixin";
/**
 * Packs the common used mixins in a loading a collection of records scenario
 */
const DataCollectionLoadableMixin = Base => class DataCollectionLoadable extends CollectionLoadableMixin(ErrorableMixin(DataMixin(Base))) {
};
export default DataCollectionLoadableMixin;
