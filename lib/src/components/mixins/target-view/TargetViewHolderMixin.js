const TargetViewHolderMixin = Base => { var _a; return _a = class TargetViewHolder extends Base {
        /**
         * Called when the node and siblings have been connected
         */
        nodeDidConnect() {
            var _a;
            (_a = super.nodeDidConnect) === null || _a === void 0 ? void 0 : _a.call(this);
            const { targetViewId } = this.props;
            this.targetView = document.getElementById(targetViewId);
            if (this.targetView === null) {
                throw Error(`Could not find target view with id: ${targetViewId}`);
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
        targetViewId: {
            attribute: 'target-view-id',
            type: String,
            required: true
        }
    },
    _a; };
export default TargetViewHolderMixin;
