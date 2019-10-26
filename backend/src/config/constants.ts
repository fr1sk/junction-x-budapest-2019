const config = {
  PORT: process.env.PORT || 8080,
  DATABASE_URL: process.env.DATABASE_URL
  || 'postgres://postgres:password@localhost:5432/junctiondb',
};

export default config;
