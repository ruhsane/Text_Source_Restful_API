module.exports = function(app) {
    const TextSource = require('../controllers/TextSourceConroller');

    //textSource routes
    app.route('/text_sources')
        .get(TextSource.list_all_sources)
        .post(TextSource.create_a_source);

    app.route('/text_sources/:sourceId')
        .get(TextSource.read_a_source)
        .put(TextSource.update_a_source)
        .delete(TextSource.delete_a_source);
};
