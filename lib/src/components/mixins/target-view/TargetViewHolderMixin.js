const TargetViewHolderMixin = Base => { var _a; return _a = class TargetViewHolder extends Base {
        /**
         * Called when the node and siblings have been connected
         */
        nodeDidConnect() {
            var _a;
            (_a = super.nodeDidConnect) === null || _a === void 0 ? void 0 : _a.call(this);
            const { targetView } = this.props;
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
            var _a;
            (_a = super.disconnectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
            this.targetView = null;
        }
    },
    _a.properties = {
        /**
         * The id of the target view to act upon
         */
        targetView: {
            attribute: 'target-view',
            type: Object,
            required: true
        }
    },
    _a; };
export default TargetViewHolderMixin;
