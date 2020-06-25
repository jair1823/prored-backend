import jwt from 'jsonwebtoken'

function verifyToken(req: any, res: any, next: any) {
  const token = req.headers.token;
  if (token) {
    jwt.verify(token, String(process.env.MASTER_PW), (err: any, decoded: any) => {
      if (err) {
        return res.json({ mensaje: 'Token inválido' });
      } else {
        console.log("Válido")
        req.body.decoded = decoded;
        next();
      }
    });
  } else {
    res.send({
      msg: null
    });
  }
}

export default verifyToken;