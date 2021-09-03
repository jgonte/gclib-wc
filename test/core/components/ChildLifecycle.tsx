import { h, NodeChanges } from 'gclib-vdom';
import CustomElement from '../../../src/core/customElement/CustomElement';

export class ChildLifecycle extends CustomElement {

    connectedCallback() {

        super.connectedCallback?.();

        console.log('Called child connectedCallback');
    }

    elementWillConnect() {

        super.elementWillConnect?.();

        console.log('Called child elementWillConnect');
    }
    
    elementDidConnect(node: HTMLElement) {

        super.elementDidConnect?.(node);

        console.log('Called child elementDidConnect');
    }

    elementDidUpdate(node: HTMLElement, nodeChanges: NodeChanges) {

        super.elementDidUpdate?.(node);

        console.log('Called child elementDidUpdate');
    }

    elementWillDisconnect(node: HTMLElement) {

        super.elementWillDisconnect?.(node);

        console.log('Called child elementWillDisconnect');
    }

    disconnectedCallback() {

        super.disconnectedCallback?.();

        console.log('Called child disconnectedCallback');
    }

    render() {

        console.log('Called child render');

        return (
            <span>Child</span>
        );
    }
}

customElements.define(`gcl-test-child-lifecycle`, ChildLifecycle as any);