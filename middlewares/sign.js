import jwt from 'jsonwebtoken'

const createTokens = (currentUser) => {
  const accessToken = jwt.sign(
    {email: currentUser.email, password: currentUser.password},
    "ciaociao",
    {expiresIn: 900}
  );

  return accessToken;
};

export default createTokens;