import VirtualDomMixin from '../mixins/VirtualDomMixin';
import { ComponentNode } from 'gclib-vdom';
import ComponentMetadataInitializerMixin from './mixins/ComponentMetadataInitializerMixin';
export default class Component extends VirtualDomMixin(ComponentMetadataInitializerMixin(ComponentNode)) {
    constructor(props, children) {
        super(props, children);
    }
    get document() {
        const { parent } = this.props;
        return parent.shadowRoot !== null ?
            parent.shadowRoot :
            parent;
    }
}
