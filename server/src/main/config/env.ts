export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongodb:27017/let-challenge',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'UAjBaR6tjJmvz4ed'
}
