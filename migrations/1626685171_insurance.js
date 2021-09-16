const Insurance = artifacts.require("Insurance")
const Coverage = artifacts.require("Coverage")

module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(Coverage)
  deployer.deploy(Insurance)
};
