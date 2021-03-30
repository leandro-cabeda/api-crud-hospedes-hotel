const Sequelize=require("sequelize");

const Connect=new Sequelize(
  "hospedagem",
  "postgres",
  "",{
  host:"localhost",
  dialect:"postgres",
  timezone: "-03:00",
  define: { timestamps: false }
});

module.exports={
  Connect,
  Sequelize
};