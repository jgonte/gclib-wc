import { h } from 'gclib-vdom';
import Component from '../../core/component/Component';
// import SelectionContainerMixin from '../mixins/selection-container/SelectionContainerMixin';
// import SizableMixin from '../mixins/sizable/SizableMixin';
// import DataCollectionLoadableMixin from '../mixins/data/DataCollectionLoadableMixin';
// import DataFieldDefinition from '../mixins/data/DataFieldDefinition';
export default class XListItem extends Component {
    constructor(props, children) {
        super(props, children);
    }
    nodeDidConnect(node) {
        console.log('XListItem did connect');
        node.addEventListener('click', this.handleClick);
    }
    nodeWillDisconnect(node) {
        console.log('XListItem will disconnect');
        node.removeEventListener('click', this.handleClick);
    }
    handleClick() {
        alert('clicked');
    }
    render() {
        const { value } = this.props;
        return (h("li", { class: "hoverable", value: value }, this.children));
    }
}
