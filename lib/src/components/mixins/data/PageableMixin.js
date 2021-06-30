const PageableMixin = Base => { var _a; return _a = class Pageable extends Base {
        paginate(pageIndex, pageSize) {
            this.setPageIndex(pageIndex);
            this.setPageSize(pageSize);
            this.load();
        }
    },
    _a.state = {
        pageIndex: {
            value: 1
        },
        pageSize: {
            value: 10
        }
    },
    _a; };
export default PageableMixin;
