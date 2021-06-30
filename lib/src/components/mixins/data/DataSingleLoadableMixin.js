import ErrorableMixin from "../errorable/ErrorableMixin";
import DataMixin from "./DataMixin";
import SingleLoadableMixin from "./SingleLoadableMixin";
/**
 * Packs the common used mixins in a loading a single record scenario
 */
const DataSingleLoadableMixin = Base => class DataSingleLoadable extends SingleLoadableMixin(ErrorableMixin(DataMixin(Base))) {
};
export default DataSingleLoadableMixin;
