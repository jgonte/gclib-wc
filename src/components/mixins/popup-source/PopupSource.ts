//import { config } from "../../config";

const PopupSourceMixin = Base =>

    class PopupSource extends Base {

        /**
         * Marker to flag if the element produces popups
         */
        isPopupSource: boolean = true;

        // static component = {
    
        //     styleUrls: [
        //         `${config.assetsFolder}/mixins/direction/PopupSource.css`
        //     ]
        // };

        // static properties = {

        //     /**
        //      * The direction of the element
        //      */
        //     flipRtl: {
        //         attribute: 'flip-rtl',
        //         type: Boolean,
        //         value: true,
        //         mutable: true,
        //         reflect: true,
        //         passToChildren: true
        //     }
        // };

        // getDir() {
            
        //     return this.dir || document.dir;
        // }
    };

export default PopupSourceMixin;