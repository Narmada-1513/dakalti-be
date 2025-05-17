const getEnvValue = (baseName: string, envType: string): string => {
  const fullVarName = `${baseName.toUpperCase()}_${envType.toUpperCase()}`;
  const value = process.env[fullVarName];
  if (!value) {
    throw new Error(`Environment variable ${fullVarName} is not set`);
  }
  return value;
};

const getEnv = () => {
  const appEnv = process.env.APP_ENV;

  return {
    appEnv,
    mongoDbUrl: getEnvValue("mongodb_url", appEnv),
    port: getEnvValue("port", appEnv),
    jwtSecret: getEnvValue("jwt_secret", appEnv),
    jwtExpiry: getEnvValue("jwt_expiry", appEnv),
  };
};

export { getEnv };
