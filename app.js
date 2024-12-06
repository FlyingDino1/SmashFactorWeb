
import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize("postgresql://smashfactor_db_user:99ruaynfK9PZhQrGYrvUgpypZnH0nlVQ@dpg-ct8en423esus73952hn0-a.singapore-postgres.render.com/smashfactor_db", {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

const player = sequelize.define("player", {
  name: {
    type:DataTypes.STRING,
    allowNull: false,
  },
  smashfactor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  games_played: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
