const config = {
  MONGODB_URL: process.env.MONGO_URL
  || process.env.MONGODB_URI
  || process.env.MONGODB_URL
  || 'mongodb://localhost:27017/junctiondb',
  PORT: process.env.PORT || 8080,
  DATABASE_URL: process.env.DATABASE_URL
  || 'postgres://postgres:password@localhost:5432/junctiondb',
  SECRET_KEY: '308Lcik3jGRru*xcTMgAaXw)aSWYKm5!',
};

export default config;
