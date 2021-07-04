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

        /**
         * Called when the node and siblings have been connected
         */
        nodeDidConnect() {

            super.nodeDidConnect?.();
    
            const {
                targetViewId
            } = this.props;
    
            this.targetView = document.getElementById(targetViewId);

            if (this.targetView === null) {

                throw Error(`Could not find target view with id: ${targetViewId}`);
            }
        }
    
        nodeWillDisconnect() {
    
            super.disconnectedCallback?.();
    
            this.targetView = null;
        }

    };

export default TargetViewHolderMixin;