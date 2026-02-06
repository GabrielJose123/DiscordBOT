const Crud = require('./utils/crudFunctions');

const sshRoutes = new Crud({entity: 'Crendentials'});

sshRoutes
    .get('/');
    .getById('/:id');
    .delete('/:id');
    .post('/');

module.exports = sshRoutes.router;