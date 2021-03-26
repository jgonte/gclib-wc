import FunctionalComponent from './FunctionalComponent';

import ComponentMetadataInitializerMixin from './mixins/ComponentMetadataInitializerMixin';

export default class Component extends ComponentMetadataInitializerMixin(FunctionalComponent) {

    constructor(props?: Record<string, any>, children?) {

        super(props, children);
    }
}