const Crud = require('./utils/crudFunctions');

const sshRoutes = new Crud({entity: 'Crendentials'});

sshRoutes.get('/');
sshRoutes.getById('/:id');
sshRoutes.delete('/:id');
sshRoutes.post('/');

module.exports = sshRoutes.router;