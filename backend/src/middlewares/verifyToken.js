const jwt = require("jsonwebtoken");
const env = require("../envconfig");

const verifyToken = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken) {
    return res
      .status(401)
      .json({ message: "액세스 토큰이 제공되지 않았습니다." });
  }

  try {
    const decoded = jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError" && refreshToken) {
      try {
        const decoded = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET);
        const newAccessToken = jwt.sign(
          {
            userId: decoded.userId,
            userName: decoded.userName,
            email: decoded.email,
          },
          env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
          }
        );
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
        req.user = jwt.decode(newAccessToken);
        next();
      } catch (error) {
        return res
          .status(401)
          .json({ message: "리프레시 토큰이 유효하지 않습니다." });
      }
    } else {
      return res.status(401).json({ message: "토큰이 유효하지 않습니다." });
    }
  }
};

module.exports = verifyToken;
