const express = require('express');
const authMiddleware = require('../../middleware/auth');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');



//get user data

router.get('/', authMiddleware, async (req, res) => {

  try {

    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }

});



//Login

router.post(
  '/',
  [
    check('email', 'valid email is required').isEmail(),
    check('password', 'password is requiured').exists(),
  ],
  async (req, res) => {
    //return if errors  in  validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //const[name , email , password ] = req.body;  is not working thats why i get values separately.

    let email = req.body.email;
    let password = req.body.password;

    try {
      //Whether user exists
      let user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }


      // password comparison
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      //getting token for authentication 
      // sign method of jwt takes three arguments (payload , secret  and callback)

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.send({ token });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
