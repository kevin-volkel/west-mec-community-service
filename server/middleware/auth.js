const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  try{
    if(!req.headers.authorization) return res.status(401).send('Unauthorized')
    if(req.headers.authorization.split(' ')[0] !== 'Bearer') return res.status(401).send('Unauthorized')

    const auth = req.headers.authorization.split(' ')[1]
    
    const payload = jwt.verify(auth, process.env.JWT_SECRET)
    const {userId, username, permission} = payload;

    req.user = { userId, username, permission}
    next();
  } catch (err) {
    console.error(err)
    return res.status(401).send('Unauthorized')
  }
}

module.exports = { authMiddleware }