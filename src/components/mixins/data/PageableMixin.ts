const PageableMixin = Base =>

    class Pageable extends Base {

        static state = {

            pageIndex: {
                value: 1
            },

            pageSize: {
                value: 10
            }
        };

        paginate(pageIndex: number, pageSize: number) {

            this.setPageIndex(pageIndex);

            this.setPageSize(pageSize);
    
            this.load();
        }
    };

export default PageableMixin;