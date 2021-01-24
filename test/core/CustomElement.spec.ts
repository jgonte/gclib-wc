describe("CustomElement tests", () => {

    it('should define a custom element', () => {

        let calledFromObservedAttributes = false;

        // Define the component
        class MyComponent extends HTMLElement {

            static get observedAttributes() {

                calledFromObservedAttributes = true;

                return [];
            }

            attributeChangedCallback() {}
        }

        customElements.define('my-component', MyComponent);

        // Attach it to the DOM
        const root = document.createElement('div');

        root.innerHTML='<my-component></my-component>';

        document.body.appendChild(root);

        // Check that the methods were called
        expect(calledFromObservedAttributes).toEqual(true);        
    });
});