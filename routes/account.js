const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.get('/', accountController.getAllAccounts);
router.post('/', accountController.insertAccount);
router.post('/auth', accountController.authAccount);
router.delete('/:id', accountController.deleteAccount);

module.exports = router;