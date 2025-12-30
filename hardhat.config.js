require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.1",
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  },
  gasReporter: {
    enabled: true,
    currency: "USD"
  }
};
