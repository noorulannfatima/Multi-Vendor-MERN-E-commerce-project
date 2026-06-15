const express= require('express');
const router = express.Router()
const checkToken = require('../middleware/checkToken')
const {
    signup, sellerSignup, signin, signout, isAuth
} = require('../controllers/authController')

router.post('/user/register', signup);
router.post('/user/login', signin);
router.get('/user/is-auth', checkToken, isAuth);
router.post('/user/logout', signout)

// Seller (vendor) auth — registration creates an admin-role account.
// Sellers log in through the same /user/login endpoint.
router.post('/seller/register', sellerSignup);

module.exports = router;