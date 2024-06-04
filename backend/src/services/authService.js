const { User } = require("../db/models/index");
const { AppError } = require("../middlewares/errorHandler");
const hashPassword = require("../utils/hashPassword");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} = require("../envconfig");

//[ 유저 회원가입 ]
/** (유저 입력 formdata) */
const signUp = async (formData) => {
  const { userId, password, userName, email } = formData;

  try {
    const foundUserId = await User.findOne({ userId });

    if (foundUserId)
      return { statusCode: 400, message: "이미 존재하는 아이디입니다." };

    const foundUserEmail = await User.findOne({ email });

    if (foundUserEmail)
      return { statusCode: 400, message: "이미 존재하는 이메일입니다." };

    const foundUserName = await User.findOne({ userName });

    if (foundUserName)
      return { statusCode: 400, message: "이미 존재하는 닉네임입니다." };

    const hashedPassword = await hashPassword(password);

    const addUser = await User.create({
      userId,
      email,
      userName,
      password: hashedPassword,
    });

    await addUser.save();

    return { statusCode: 201, message: "회원가입에 성공하였습니다." };
  } catch (error) {
    console.error(error);
    return new AppError(500, "Internal Server Error");
  }
};

//[유저 로그인]
/** (아이디, 패스워드)*/
const logIn = async (userId, password) => {
  try {
    const foundUser = await User.findOne({ userId });

    if (!foundUser) {
      return new AppError(404, "존재하지 않는 아이디입니다.");
    }

    const isMatched = await bcrypt.compare(password, foundUser.password);

    if (!isMatched) {
      return new AppError(400, "비밀번호가 일치하지 않습니다.");
    }

    const payload = {
      userId: foundUser.userId,
      userName: foundUser.userName,
      email: foundUser.email,
    };

    //[accessToken 생성]
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });

    //[refreshToken 생성]
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });
    return {
      statusCode: 200,
      message: "로그인 성공",
      accessToken,
      refreshToken,
      data: {
        _id: foundUser._id,
        userId: foundUser.userId,
        email: foundUser.email,
        userName: foundUser.userName,
        role: foundUser.role,
        profile: foundUser.profile,
        online: true,
      },
    };
  } catch (error) {
    console.error(error);
    return new AppError(500, "Internal Server Error");
  }
};

// // [ 유저 로그아웃 ]
// const logOut = async (req, res) => {
//   try {
//     res.clearCookie('refreshToken');
//     res.clearCookie('accessToken');

//     return { statusCode: 200, message: '로그아웃 완료' };
//   } catch (error) {
//     console.error(error);
//     return new AppError(500, 'Internal Server Error');
//   }
// };

// //[ 회원가입 아이디 중복 체크 ]
// const validateUniqueUserId = async (userId) => {
//   try {
//     const foundUser = await User.findOne({ userId });

//     if (foundUser) return new AppError(400, '이미 존재하는 아이디입니다.');

//     return { statusCode: 200, message: '사용할 수 있는 아이디입니다!' };
//   } catch (error) {
//     console.error(error);
//     return new AppError(500, 'Internal Server Error');
//   }
// };

// //[비밀번호 체크]
// const validatePassword = async (userId, password) => {
//   try {
//     const foundUser = await User.findOne({ userId });

//     if (!foundUser) {
//       return new AppError(404, '존재하지 않는 아이디입니다.');
//     }

//     const isMatched = await bcrypt.compare(password, foundUser.password);

//     if (!isMatched) {
//       return new AppError(400, '비밀번호가 일치하지 않습니다.');
//     }

//     return { statusCode: 200, message: '비밀번호가 확인되었습니다.' };
//   } catch (error) {
//     console.error(error);
//     return new AppError(500, 'Internal Server Error');
//   }
// };

module.exports = {
  logIn,
  signUp,
  // logOut,
  // validateUniqueUserId,
  // validatePassword,
};
