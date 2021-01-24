import MetadataInitializerMixin from "../../../src/core/mixins/MetadataInitializerMixin";

class ElementWithMetadata1 extends MetadataInitializerMixin(HTMLElement) {

}

customElements.define("element-with-metadata-1", ElementWithMetadata1 as any);

describe("MetadataInitializerMixin", () => {

    it("defines observedAttributes for all custom property setters", () => {

        expect(ElementWithMetadata1.observedAttributes).toEqual(["custom-property", "disabled"]);
    });
});

