const forwardedPrefixSwaggerMiddleware = async (req, res, next) => {
  req.originalUrl = (req.headers['x-forwarded-prefix'] || '') + req.url
  next()
}

module.exports = forwardedPrefixSwaggerMiddleware
