const authService = require("../services/authService");
const {
  AppError,
  errorMessageHandler,
} = require("../middlewares/errorHandler");
const env = require("../envconfig");
// const {
//   signUpSchema,
//   logInSchema,
//   validateUniqueUserIdSchema,
//   validatePasswordSchema,
// } = require("../validator/authValidator");

//[ 유저 회원가입 ]
const signUp = async (req, res, next) => {
  const { userId, email, userName, password } = req.body;

  // const { error } = signUpSchema.validate({
  //   userId,
  //   password,
  //   name,
  //   nick_name,
  //   email,
  //   phone_number,
  //   gender,
  // });
  // if (error) {
  //   const message = errorMessageHandler(error);
  //   return next(new AppError(400, message));
  // }

  try {
    const { statusCode, message } = await authService.signUp({
      userId,
      email,
      userName,
      password,
    });

    if (statusCode !== 201) return next(new AppError(statusCode, message));

    res.status(201).json({ message });
  } catch (error) {
    console.error(error);
    return next(new AppError(500, "Internal Server Error"));
  }
};

//[ 유저 로그인 ]
const logIn = async (req, res, next) => {
  const { userId, password } = req.body;

  // const { error } = logInSchema.validate({ userId, password });

  // if (error) {
  //   const message = errorMessageHandler(error);
  //   return next(new AppError(400, message));
  // }

  try {
    const { statusCode, message, accessToken, refreshToken, data } =
      await authService.logIn(userId, password);

    if (statusCode !== 200) return next(new AppError(statusCode, message));

    const cookieOptions = {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      domain: "yourdomain.com",

    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
    });
    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
    });

    res.status(200).json({
      message,
      data,
      statusCode,
    });
  } catch (error) {
    console.error(error);
    return next(new AppError(500, "Internal Server Error"));
  }
};

// // [ 유저 로그아웃 ]
// const logOut = async (req, res, next) => {
//   try {
//     const { statusCode, message } = await authService.logOut(req, res);

// if (statusCode !== 200) return next(new AppError(statusCode, message));

//     res.status(200).json({
//       message,
//     });
//   } catch (error) {
//     console.error(error);
// return next(new AppError(500, "Internal Server Error"));
//   }
// };

// //[ 회원가입 아이디 중복 체크]
// const validateUniqueUserId = async (req, res, next) => {
//   const { userId } = req.body;

//   const { error } = validateUniqueUserIdSchema.validate({ userId });

//   if (error) {
//     const message = errorMessageHandler(error);
//     return next(new AppError(400, message));
//   }

//   try {
//     const { statusCode, message } = await authService.validateUniqueUserId(
//       userId
//     );

//     if (statusCode !== 200) return next(new AppError(statusCode, message));

//     res.status(200).json({
//       message,
//     });
//   } catch (error) {
//     console.error(error);
//     return next(new AppError(500, "Internal Server Error"));
//   }
// };

// // [비밀번호 체크]   유저 아이디는 나중에 토큰으로 받는다.
// const validatePassword = async (req, res, next) => {
//   const { userId, password } = req.body;

//   const { error } = validatePasswordSchema.validate({ userId, password });

//   if (error) {
//     const message = errorMessageHandler(error);
//     return next(new AppError(400, message));
//   }

//   try {
//     const { statusCode, message } = await authService.validatePassword(
//       userId,
//       password
//     );

//     if (statusCode !== 200) return next(new AppError(statusCode, message));

//     res.status(200).json({
//       message,
//     });
//   } catch (error) {
//     console.error(error);
//     return next(new AppError(500, "Internal Server Error"));
//   }
// };

module.exports = {
  logIn,
  signUp,
  // logOut,
  // validateUniqueUserId,
  // validatePassword,
};
