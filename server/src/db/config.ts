const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

export const connectionString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`;
