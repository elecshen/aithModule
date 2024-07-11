import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

dotenv.config();
const env = dotenv.config({ path: "postgres.secret.env", override: true });
dotenvExpand.expand(env);

interface DbConfig {
  host: string | undefined;
  port: number | undefined;
  user: string | undefined;
  password: string | undefined;
  database: string | undefined;
}

interface JWTConfig {
  secret: string | undefined;
  accessExpiresIn: string | undefined;
  refreshExpiresIn: string | undefined;
  confirmExpiresIn: string | undefined;
}

interface MailConfig {
  host: string | undefined;
  port: number | undefined;
  auth: {
    user: string | undefined;
    pass: string | undefined;
  };
}

interface Config {
  db: DbConfig;
  jwt: JWTConfig;
  mail: MailConfig;
}

const config: Config = {
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    confirmExpiresIn: process.env.JWT_CONFIRM_EXPIRES_IN,
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT
      ? parseInt(process.env.MAIL_PORT, 10)
      : undefined,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  },
};

export default config;
