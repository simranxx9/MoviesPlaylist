const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Movies = require('../models/movies');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');
const config = require('../config/config');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const mail = require('../utils/mailHandler');
const otpGenerator = require('otp-generator');
const OTP = require("../models/otpConfig");


const {
  loginValidation
} = require("../middlewares/validation/validation");


exports.signup = catchAsync(async (req, res, next) => {

  console.log(req.body);

  const password = req.body.password
  console.log(`password : ${password}`);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  req.body.password = hashedPassword;

  const user = new User(req.body);
  await user.save();
  const newUser = JSON.parse(JSON.stringify(user));
  delete newUser.password;

  const expiresIn = 60 * 60 * 60;
  const accessToken = jwt.sign({ id: newUser._id }, config.jwtSecret, {
    expiresIn: expiresIn
  });

  const emailConfig = {
    recipientMails: newUser.email,
    subject: "Account Created",
    htmlEmail: `<h1> Welcome User </h>`
  }
  await mail.sendMail(emailConfig)


  res.status(200).send({ "user": newUser, "access_token": accessToken, "expires_in": expiresIn });
});


exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get token, check if it's there
  let token;
  if ('authorization' in req.headers) {
    token = req.headers['authorization'].split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }
  // 2) Verify token
  const decoded = await promisify(jwt.verify)(token, config.jwtSecret);

  // 3) Check if user still exists
  const foundUser = await User.findById(decoded.id);
  if (!foundUser) {
    return next(
      new AppError('The user associated with this token no longer exists.', 401)
    );
  }


  // GRANT ACCESS TO PROTECTED ROUTE
  changedUser = foundUser.toObject();
  delete changedUser.password
  res.locals.user = changedUser;
  next();
});


exports.restrictTo = (...roles) => {
  return (req, res, next) => {

    if (!roles.includes(res.locals.user.role)) {
      return next(
        new AppError(`You do not have permission to peform this action.${res.locals.user.role}`, 403)
      );
    }

    next();
  };
};

exports.signin = catchAsync(async (req, res, next) => {

  const { email, password } = req.body;

  const { error } = loginValidation(req.body);

  if (error) {
    return next(new AppError(error.details[0].message, 500));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError('User not found!', 404));
  }

  //Check if Password is correct
  const validPassword = await bcrypt.compare(
    password,
    user.password
  );

  if (!validPassword) {
    return next(new AppError('Password not valid!', 401));
  }

  const expiresIn = 24 * 60 * 60;
  const accessToken = jwt.sign({ id: user._id }, config.jwtSecret, {
    expiresIn: expiresIn
  });

  res.status(200).send({ "message": "Successfully Signed In", "access_token": accessToken, "expires_in": expiresIn, user });
});


// Update Profile
exports.updateProfile = catchAsync(async (req, res, next) => {
  // JWT Authenticated;

  console.log(res.locals.user);

  const email = res.locals.user.email
  const user = await User.findOne({ email })

  const validPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  console.log(validPassword);
  
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPassword;
  if (validPassword) {
    const user = await User.updateOne({ email }, req.body);
    res.status(200).send({ message: "Successfully Updated The Profile" })
  }
  else {
    return next(new AppError('Password not valid!', 401));
  }

});


// UserDetail
exports.detail = catchAsync(async (req, res, next) => {
  // JWT Authenticated;

  console.log(res.locals.user);

  const email = res.locals.user.email

  const user = await User.findOne({ email });

  res.status(200).send(user)
});


exports.verify = catchAsync(async (req, res, next) => {
  // 1) Get token, check if it's there
  let { token } = req.body;

  // 2) Verify token
  const decoded = await promisify(jwt.verify)(token, config.jwtSecret);

  // 3) Check if user still exists
  const foundUser = await User.findById(decoded.id);
  if (!foundUser) {
    return next(
      new AppError('The user associated with this token no longer exists.', 401)
    );
  }
  else {
    return res.status(200).send({});
  }
})

exports.createPlaylist = catchAsync(async (req, res, next) => {



  try {
    const email = res.locals.user.email;
    console.log(email);
    console.log(req.body.password);

    const user = await User.findOne({ email })

    req.body.user = email

    if (email) {
      console.log(req.body)
      const movie = new Movies(req.body);
      await movie.save();
      const newMovie = JSON.parse(JSON.stringify(movie));
      res.status(200).send({ message: newMovie })
      console.log(newMovie);
    }
    else {
      return next(new AppError('Password not valid!', 401));
    }
  } catch (err) {
    console.log(err);
  }
})


exports.getMyPlaylist = catchAsync(async (req, res, next) => {

  try {
    const email = res.locals.user.email
    const user = await User.findOne({ email })


    if (email) {

      const playlist = await Movies.find({ user: email });

      console.log(playlist)
      res.status(200).send({ data: JSON.parse(JSON.stringify(playlist)) })
    }
    else {
      return next(new AppError('Password not valid!', 401));
    }
  }
  catch (err) {
    console.log(err);
  }
})

exports.addIntoPlaylist = catchAsync(async (req, res, next) => {
  try {
    const email = res.locals.user.email
    const user = await User.findOne({ email })
    console.log(email)

    if (email) {
      const playlistId = req.body.playlistId;
      const movieId = req.body.movieId;
      const playlist = await Movies.findOne({ _id: playlistId });
      for (let i = 0; i < playlist.movies.length; i++) {
        if (playlist.movies[i] == movieId) {
          return res.status(404).send({ msg: "movie already exist" });
        }
      }
      let p = playlist.movies
      p.push(movieId);
      
      const filter = { _id: playlistId }
      const update = { movies: p };

      let doc = await Movies.findOneAndUpdate(filter, update,{
        new: true
      });
      res.status(200).send({ data: JSON.parse(JSON.stringify(doc)) })
    }
    else {
      return next(new AppError('Password not valid!', 401));
    }
  }
  catch (err) {
    console.log(err);
  }
})



exports.allPublicPlayList = catchAsync(async (req, res, next) => {
  try {
    
    const doc = await Movies.find({isPublic: true});
    res.status(200).send({ data: JSON.parse(JSON.stringify(doc)) })
  
  }
  catch (err) {
    console.log(err);
  }
})