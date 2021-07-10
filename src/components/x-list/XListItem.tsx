import { h } from 'gclib-vdom';
import Component from '../../core/component/Component';
import ChildMixin from '../../core/mixins/ChildMixin';
import SelectableMixin from '../mixins/selectable/SelectableMixin';

export default class XListItem extends
    SelectableMixin(
        ChildMixin(Component)
    ) {

    constructor(props, children) {

        super(props, children);
    }

    // nodeDidConnect(node: Node) {

    //     super.nodeDidConnect?.(node);

    //     console.log('XListItem did connect');

    //     node.addEventListener('click', this.handleClick);
    // }

    // nodeWillDisconnect(node: Node) {

    //     super.nodeWillDisconnect?.(node);

    //     console.log('XListItem will disconnect');

    //     node.removeEventListener('click', this.handleClick);
    // }

    // handleClick() {

    //     alert('clicked');
    // }

    render() {

        const {
            size,
            selected
        } = this.props;

        return (
            <li class="hoverable" size={size} selected={selected}>
                {this.children}
            </li>
        );
    }
}
