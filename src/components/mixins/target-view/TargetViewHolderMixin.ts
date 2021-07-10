const TargetViewHolderMixin = Base =>

    class TargetViewHolder extends Base {

        static properties = {

            /**
             * The id of the target view to act upon
             */
            targetView: {
                attribute: 'target-view',
                type: Object,
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
                targetView
            } = this.props;

            if (typeof targetView === 'string') {

                this.targetView = document.getElementById(targetView);
            }
            else if (typeof targetView === 'function') {

                this.targetView = targetView();
            }
            else {

                this.targetView = targetView;
            }

            if (this.targetView === null) {

                throw Error(`Could not find target view with : ${targetView.toString()}`);
            }
        }
    
        nodeWillDisconnect() {
    
            super.disconnectedCallback?.();
    
            this.targetView = null;
        }

    };

export default TargetViewHolderMixin;