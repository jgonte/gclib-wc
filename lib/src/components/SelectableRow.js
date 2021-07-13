import { h } from 'gclib-vdom';
import Component from '../core/component/Component';
import ChildMixin from '../core/mixins/ChildMixin';
import HoverableMixin from './mixins/hoverable/HoverableMixin';
import SelectableMixin from './mixins/selectable/SelectableMixin';
export class SelectableRow extends SelectableMixin(HoverableMixin(ChildMixin(Component))) {
    constructor(props, children) {
        super(props, children);
    }
    render() {
        const { size, selected, hoverable } = this.props;
        return (h("div", { hoverable: hoverable, size: size, selected: selected }, this.children));
    }
}
