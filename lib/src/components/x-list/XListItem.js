import { h } from 'gclib-vdom';
import Component from '../../core/component/Component';
import ChildMixin from '../../core/mixins/ChildMixin';
import SelectableMixin from '../mixins/selectable/SelectableMixin';
export default class XListItem extends SelectableMixin(ChildMixin(Component)) {
    constructor(props, children) {
        super(props, children);
    }
    nodeDidConnect(node) {
        var _a;
        (_a = super.nodeDidConnect) === null || _a === void 0 ? void 0 : _a.call(this, node);
        console.log('XListItem did connect');
        node.addEventListener('click', this.handleClick);
    }
    nodeWillDisconnect(node) {
        var _a;
        (_a = super.nodeWillDisconnect) === null || _a === void 0 ? void 0 : _a.call(this, node);
        console.log('XListItem will disconnect');
        node.removeEventListener('click', this.handleClick);
    }
    handleClick() {
        alert('clicked');
    }
    render() {
        const { size, selected } = this.props;
        return (h("li", { class: "hoverable", size: size, selected: selected }, this.children));
    }
}
