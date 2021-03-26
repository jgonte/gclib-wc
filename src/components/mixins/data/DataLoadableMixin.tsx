import ErrorableMixin from "../errorable/ErrorableMixin";
import DataMixin from "./DataMixin";
import LoadableMixin from "./LoadableMixin";

/**
 * Packs the common used mixins in a loading data scenario
 * @param Base 
 * @returns 
 */
const DataLoadableMixin = Base =>

    class DataLoadable extends
        LoadableMixin(
            ErrorableMixin(
                DataMixin(
                    Base
                )
            )
        ) {
    }

export default DataLoadableMixin;