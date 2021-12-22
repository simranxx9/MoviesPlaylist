//Export environment variables, configuration for project

require('dotenv').config();
const envVars = process.env;

module.exports = {
  port: envVars.PORT,
  MongoURI : envVars.DATABASE_URI,
  env: envVars.NODE_ENV,
  jwtSecret : envVars.JWT_SECRET,
  key_id : envVars.key_id,
  key_secret : envVars.key_secret
};
