const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try{
    if(!req.headers.authorization) return res.status(401).send('Unauthorized')
    if(req.headers.authorization.split(' ')[0] !== 'Bearer') return res.status(401).send('Unauthorized')

    const auth = req.headers.authorization.split(' ')[1]

    const payload = jwt.verify(auth, process.env.JWT_SECRET)

    req.user = { userId: payload.userId, username: payload.username, permission: payload.permission };
    next();

  } catch (err) {
    console.error(err);
    return res.status(401).send('Unauthorized')
  }
}