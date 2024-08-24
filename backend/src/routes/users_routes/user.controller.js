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
        {expiresIn: '1h'}, // Add expiration time
      );

      result.token = token;

      res.status(201).json({
        data: result,
        message: 'User created successfully!',
        status: true,
      });
    } else {
      res.status(403).json({status: false, message: 'User already exists'});
    }
  } catch (error) {
    console.error('Error raised:', error);
    res.status(500).json({status: false, error: error.message});
  }
};

const loginUser = async (req, res) => {
  const {email, password, fcmToken} = req.body;

  console.log('req.bodyreq.body', req.body);

  try {
    const result = await UserModel.findOne({email: email});
    if (!!result) {
      let isPasswordValid = await bcrypt.compare(password, result.password);
      if (!!isPasswordValid) {
        const token = jwt.sign(
          {user_id: result?._id, email},
          process.env.TOKEN_KEY,
        );

        if (!!fcmToken) {
          result.fcmToken = fcmToken;
          result.save();
        }
        const deepCopy = JSON.parse(JSON.stringify(result));
        deepCopy.token = token;
        delete deepCopy.password;

        res.send({
          data: deepCopy,
          status: true,
        });
      } else {
        res
          .status(403)
          .json({status: false, error: 'Password/email not correct'});
      }
    } else {
      res
        .status(403)
        .json({status: false, error: 'Password/email not correct'});
    }
  } catch (error) {
    res.status(403).json({status: false, error: error});
  }
};

const otpVerify = async (req, res) => {
  const {email, otp} = req.body;

  // Implement your OTP validation logic here
  if (otp === '1234') {
    // Placeholder check, replace with actual OTP validation
    try {
      const result = await UserModel.findOneAndUpdate(
        {email: email},
        {$set: {validOTP: true}},
        {new: true},
      ).select('-password');

      if (result) {
        res.status(200).json({
          data: result,
          status: true,
        });
      } else {
        res.status(404).json({status: false, message: 'User not found'});
      }
    } catch (error) {
      console.error('Error raised:', error);
      res.status(500).json({status: false, error: error.message});
    }
  } else {
    res.status(400).json({status: false, message: 'Invalid OTP'});
  }
};

const fetchAllUsers = async (req, res) => {
  try {
    const data = await UserModel.find({});
    res.status(200).json({
      data: data,
      status: true,
    });
  } catch (error) {
    console.error('Error raised:', error);
    res.status(500).json({status: false, error: error.message});
  }
};

module.exports = {createUser, loginUser, otpVerify, fetchAllUsers};
