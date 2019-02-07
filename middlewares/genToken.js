import jwt from 'jsonwebtoken';

class GenToken {
  static newToken(payload) {
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 });
    return token;
  }
}

export default GenToken;
