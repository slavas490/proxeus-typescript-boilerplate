if (!process.env.NODE_ENV) throw new Error("Error, no environment provided.");

require("dotenv").config({ path: `.env.test` });
