import { h, NodeChanges } from 'gclib-vdom';
import CustomElement from '../../../src/core/customElement/CustomElement';

export class ParentLifecycle extends CustomElement {

    connectedCallback() {

        super.connectedCallback?.();

        console.log('Called parent connectedCallback');
    }

    elementWillConnect() {

        super.elementWillConnect?.();

        console.log('Called parent elementWillConnect');
    }
    
    elementDidConnect(node: HTMLElement) {

        super.elementDidConnect?.(node);

        console.log('Called parent elementDidConnect');
    }

    elementDidUpdate(node: HTMLElement, nodeChanges: NodeChanges) {

        super.elementDidUpdate?.(node);

        console.log('Called parent elementDidUpdate');
    }

    elementWillDisconnect(node: HTMLElement) {

        super.elementWillDisconnect?.(node);

        console.log('Called parent elementWillDisconnect');
    }

    disconnectedCallback() {

        super.disconnectedCallback?.();

        console.log('Called parent disconnectedCallback');
    }

    render() {

        console.log('Called parent render');

        return (
            <div>
                <slot/>
            </div>
        );
    }
}

customElements.define(`gcl-test-parent-lifecycle`, ParentLifecycle as any);