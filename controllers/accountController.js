const { ObjectId } = require('mongodb');
const accountService = require('../services/accountService');

// Get all accounts
const getAllAccounts = (req, res) => {
  accountService.getAll(res);
};

// Insert account
const insertAccount = (req, res) => {
  accountService.insert(req.body, res);
};

// Delete account
const deleteAccount = (req, res) => {
  const { id } = req.params;
  accountService.remove(ObjectId(id), res);
};

// Authenticate account
const authAccount = (req, res) => {
  accountService.auth(req.body, res);
};

module.exports = {
  getAllAccounts,
  insertAccount,
  deleteAccount,
  authAccount,
};