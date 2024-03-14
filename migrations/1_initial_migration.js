const Migrations = artifacts.require("Migrations");
const Lilkeepies = artifacts.require("Lilkeepies");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Lilkeepies);
};
