const TargetViewHolderMixin = Base =>

    class TargetViewHolder extends Base {

        static properties = {

            /**
             * The id of the target view to act upon
             */
            targetViewId: {
                attribute: 'target-view-id',
                type: String,
                required: true
            }
        };

        targetView: any;

        connectedCallback() {

            super.connectedCallback?.();
    
            const {
                targetViewId
            } = this.props;
    
            this.targetView = document.getElementById(targetViewId);
        }
    
        disconnectedCallback() {
    
            super.disconnectedCallback?.();
    
            this.targetView = null;
        }

    };

export default TargetViewHolderMixin;