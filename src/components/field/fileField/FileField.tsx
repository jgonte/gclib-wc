import { h, ElementNode } from 'gclib-vdom';
import { config } from '../../config';
import { renderField } from '../Field';
import { Field } from '../Field';

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
export class FileField extends Field {

    // static component = {

    //     styleUrls: [
    //         `${config.assetsFolder}/FileField/FileField.css`
    //     ]
    // };

    static properties = {

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

    constructor() {

        super();

        this.openFileDialog = this.openFileDialog.bind(this);
    }

    [renderField](): ElementNode {

        const {
            name,
            //value,
            accept,
            capture,
            multiple,
            size,
            //required,
            disabled,
            //preview
        } = this.props;

        return (
            <div>

                <gcl-button variant="primary" click={this.openFileDialog}>
                    <gcl-icon name="upload"></gcl-icon>
                    <gcl-text>Click here to upload files</gcl-text>
                </gcl-button>

                {this.renderFileList()}

                <input
                    type="file"
                    name={name}
                    id={name}
                    accept={accept}
                    capture={capture}
                    multiple={multiple}
                    size={size}
                    //class={this.getCSSClass()}
                    //required={required}
                    style={{ opacity: 0 }} // Note: opacity is used to hide the file input instead of visibility: hidden or display: none, because assistive technology interprets the latter two styles to mean the file input isn't interactive.
                    onChange={this.onChange}
                    // onFocus={onFocus}
                    onBlur={this.onBlur}
                    // title={error}
                    // ref={i => this.inputref = i}
                    disabled={disabled}
                />
            </div>
        );
    }

    openFileDialog() {

        const {
            name
        } = this.props;

        this.document.getElementById(name).click();
    }

    // elementDidUpdate(node, nodeChanges) {

    //     super.elementDidUpdate?.(node, nodeChanges);

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

        const {
            preview,
            value,
            size
        } = this.props;

        if (preview === false) {

            return null;
        }

        if (value === undefined) {

            return null;
        }

        const data = Array.isArray(value) ? value : [value]; // Ensure it is an array

        return (
            <gcl-data-grid
                size={size}
                data={data}
                render-record={record => {

                    const {
                        name,
                        size,
                        content
                    } = record;

                    // The content can be either read from the server or selected from a File object
                    const src = content.indexOf('blob:') === -1 ?
                        `data:image/jpeg;base64,${content}` :
                        content;

                    return (
                        <gcl-row value={name}>
                            <gcl-text intl-key="name">Name:</gcl-text>
                            <gcl-text>{name}</gcl-text>
                            <gcl-text intl-key="size">Size:</gcl-text>
                            <gcl-text>{formatSize(size)}</gcl-text>
                            <img style="width: 48px; height: 48px;" src={src} />
                        </gcl-row>
                    );
                }}
                // record-id="value" 
                pageable="false"
            // selection='["c"]' 
            // selection-changed="showSelection()"
            >
            </gcl-data-grid>
        );

    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-file-field`, FileField);