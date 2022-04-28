const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});


module.exports = {
  db
}


const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlphanumeric: true,
    }
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  },
})
Page.addHook('beforeValidate', (Page, options) => {
  const generateSlug = (title) => {
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  }
  Page.slug = generateSlug(Page.title)
});
const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      unique: true,
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    }
  },
})


module.exports = { db, Page, User };
