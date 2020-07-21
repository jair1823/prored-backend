import jwt from 'jsonwebtoken'

function verifyToken(req: any, res: any, next: any) {
  const token = req.headers.token;
  if (token) {
    jwt.verify(token, String(process.env.MASTER_PW), (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({ msg: 'Token inválido' });
      } else {
        req.body.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({
      msg: null
    });
  }
}

export default verifyToken;