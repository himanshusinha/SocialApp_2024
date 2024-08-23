const UserModel = require('../../models/user'); // Ensure this path is correct
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  const {email, userName, password} = req.body;
  try {
    const checkUser = await UserModel.findOne({
      $or: [{email: email}, {userName: userName}],
    });

    if (!checkUser) {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      const result = await UserModel.create({
        ...req.body,
        password: passwordHash,
      });

      const token = jwt.sign(
        {user_id: result._id, email},
        process.env.TOKEN_KEY,
      );

      result.token = token;

      res.send({
        data: result,
        message: 'User created successfully!',
        status: true,
      });
    } else {
      res.status(403).json({status: false, message: 'User already exists'});
    }
  } catch (error) {
    console.log('Error raised:', error);
    res.status(403).json({status: false, error: error.message});
  }
};

const loginUser = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await UserModel.findOne({email});

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {user_id: user._id, email},
        process.env.TOKEN_KEY,
        {expiresIn: '1h'},
      );

      res.send({
        data: {
          userName: user.userName,
          token,
        },
        status: true,
        message: 'Login successful',
      });
    } else {
      res
        .status(401)
        .json({status: false, message: 'Invalid email or password'});
    }
  } catch (error) {
    console.log('Error raised:', error);
    res.status(500).json({status: false, error: error.message});
  }
};

module.exports = {createUser, loginUser};
