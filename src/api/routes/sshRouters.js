const CreateRoutes = require('./utils/creatRoutesClass');

const sshRoutes = new CreateRoutes({entity: 'Crendentials'});

sshRoutes
    .get('/')
    .getById('/:id')
    .delete('/:id')
    .post('/')

module.exports = sshRoutes.router;