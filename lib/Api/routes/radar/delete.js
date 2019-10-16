import RouteSet from '../../RouteSet.js';

export default class extends RouteSet {
    constructor() {
        super();

        /**
         * delete a radar
         */
        this.router.post('/:radar/delete', (req, res) => {
            const id = req.params.radar;
            STORAGE.radar
                .delete(id)
                .then(deletedData => {
                    LOG('RADAR DELETED.', deletedData.label);
                    this.success(req, res, deletedData, 'Deleted');
                })
                .catch(error => {
                    this.error(req, res, error, 'Delete Failed');
                });
        });

        return this.router;
    }
};