import { h } from 'gclib-vdom';
import { config } from '../../config';
import { renderField } from '../Field';
import { SingleValueField } from '../SingleValueField';
function formatSize(size) {
    if (size < 1024) {
        return size + 'bytes';
    }
    else if (size >= 1024 && size < 1048576) {
        return (size / 1024).toFixed(1) + 'KB';
    }
    else if (size >= 1048576) {
        return (size / 1048576).toFixed(1) + 'MB';
    }
}
//@ts-ignore
export class FileField extends SingleValueField {
    constructor() {
        super();
        this.openFileDialog = this.openFileDialog.bind(this);
    }
    [renderField]() {
        const { name, 
        //value,
        accept, capture, multiple, size, 
        //required,
        disabled, } = this.props;
        return (h("div", null,
            h("gcl-button", { variant: "primary", click: this.openFileDialog },
                h("gcl-icon", { name: "upload" }),
                h("gcl-text", null, "Click here to upload files")),
            this.renderFileList(),
            h("input", { type: "file", name: name, id: name, accept: accept, capture: capture, multiple: multiple, size: size, 
                //class={this.getCSSClass()}
                //required={required}
                style: { opacity: 0 }, onChange: this.onChange, 
                // onFocus={onFocus}
                onBlur: this.onBlur, 
                // title={error}
                // ref={i => this.inputref = i}
                disabled: disabled })));
    }
    openFileDialog() {
        const { name } = this.props;
        this.document.getElementById(name).click();
    }
    // nodeDidUpdate(node, nodeChanges) {
    //     super.nodeDidUpdate?.(node, nodeChanges);
    //     const {
    //         name,
    //         value
    //     } = this.props;
    //     if (node.id === name) { // It is our input field
    //         if (node.files.length === 0) {
    //             console.log('Input does have not any files');
    //             if (value !== undefined) {
    //                 if (Array.isArray(value)) {
    //                     // value.forEach(item => input.files.);
    //                 }
    //                 else {
    //                     const file = new File([...value.content], value.fileName, {
    //                         type: value.contentType
    //                     });
    //                     node.files.push(file);
    //                 }
    //             }
    //         }
    //     }
    // }
    // onValueSet() {
    //     const {
    //         name,
    //         value
    //     } = this.props;
    //     const input: HTMLInputElement = document.getElementById(name) as HTMLInputElement;
    //     if (input?.files?.length === 0) {
    //         console.log('Input does have not any files');
    //         if (value !== undefined) {
    //             if (Array.isArray(value)) {
    //                 // value.forEach(item => input.files.);
    //             }
    //         }
    //     }
    // }
    renderFileList() {
        const { preview, value, size } = this.props;
        if (preview === false) {
            return null;
        }
        if (value === undefined) {
            return null;
        }
        const data = Array.isArray(value) ? value : [value]; // Ensure it is an array
        return (h("gcl-list", { 
            // id="listWithData"
            size: size, 
            // selection='["c"]'
            // selectable
            // selectionChanged={this.showSelection}
            data: data, renderData: record => {
                const { name, size, content } = record;
                // The content can be either read from the server or selected from a File object
                const src = content.indexOf('blob:') === -1 ?
                    `data:image/jpeg;base64,${content}` :
                    content;
                return (h("gcl-list-item", { value: name },
                    h("gcl-text", { "intl-key": "name" }, "Name:"),
                    h("gcl-text", null, name),
                    h("gcl-text", { "intl-key": "size" }, "Size:"),
                    h("gcl-text", null, formatSize(size)),
                    h("img", { style: "width: 48px; height: 48px;", src: src })));
            } }));
    }
}
// static component = {
//     styleUrls: [
//         `${config.assetsFolder}/FileField/FileField.css`
//     ]
// };
FileField.properties = {
    accept: {
        type: String
    },
    capture: {
        type: Boolean,
        value: true
    },
    multiple: {
        type: Boolean
    },
    /** Whether to preview the files (that can be previewed) */
    preview: {
        type: Boolean
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-file-field`, FileField);
