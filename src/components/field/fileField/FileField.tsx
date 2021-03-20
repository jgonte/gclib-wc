import { h, VirtualNode } from 'gclib-vdom';
import { config } from '../../config';
import { renderField } from '../Field';
import { SingleValueField } from '../SingleValueField';

//@ts-ignore
export class FileField extends SingleValueField {

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

    // constructor() {

    //     super();

    //     this.onValueSet = this.onValueSet.bind(this);
    // }

    [renderField](): VirtualNode {

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
                    style={{ minWidth: '220px' }}
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
            <gcl-list
                // id="listWithData"
                size={size}
                // selection='["c"]'
                // selectable
                // selectionChanged={this.showSelection}
                data={data}
                renderData={record => {
                    const {
                        fileName,
                        content
                    } = record;

                    return (
                        <gcl-list-item value={fileName}>
                            <gcl-text>{fileName}</gcl-text>
                            <img style="width: 48px; height: 48px;" src={`data:image/jpeg;base64,${content}`} />                     
                        </gcl-list-item>
                    );
                }}>

            </gcl-list>
        );
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-file-field`, FileField);