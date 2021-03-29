import VirtualDomMixin from '../mixins/VirtualDomMixin';
import FunctionalComponent from './FunctionalComponent';

import ComponentMetadataInitializerMixin from './mixins/ComponentMetadataInitializerMixin';

export default class Component extends
    VirtualDomMixin(
        ComponentMetadataInitializerMixin(
            FunctionalComponent
        )
    ) {

    constructor(props?: Record<string, any>, children?) {

        super(props, children);
    }

    get document() {

        const {
            parent
        } = this.props;

        return parent.shadowRoot !== null ?
            parent.shadowRoot :
            parent;
    }
}