const express = require('express');
const router = express.Router();
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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.send(req.body);
  }
);

module.exports = router;
