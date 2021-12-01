const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

router.post(
  '/',
  [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'valid email is required').isEmail(),
    check('password', 'password shuold be minimum 6 characters long').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    //return if errors  in  validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //const[name , email , password ] = req.body;  is not working thats why i get values separately.
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    try {
      //Whether user exists
      let user = await User.findOne({ email: email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'USer already exists' }] });
      }

      // getting avatar by  using gravater package
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      //user instance to post
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //password encryption using bcryptjs
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      //saving user data.
      await user.save();

      //getting token for authentication  so that registered user can log in after registration.
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

//Second parameter in POST is middleware.
