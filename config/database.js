require('dotenv').config();

const databaseSlug = process.env.DB_SLUG;

module.exports = {
  url: databaseSlug
};
