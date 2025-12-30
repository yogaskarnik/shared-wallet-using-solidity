const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SharedWallet", function () {
  let sharedWallet, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const SharedWallet = await ethers.getContractFactory("SharedWallet");
    sharedWallet = await SharedWallet.deploy();
  });

  it("Should set the right owner", async function () {
    expect(await sharedWallet.owner()).to.equal(owner.address);
  });

  it("Should receive money", async function () {
    await owner.sendTransaction({
      to: sharedWallet.address,
      value: ethers.utils.parseEther("1.0")
    });
    expect(await ethers.provider.getBalance(sharedWallet.address)).to.equal(ethers.utils.parseEther("1.0"));
  });

  it("Should allow owner to withdraw", async function () {
    await owner.sendTransaction({
      to: sharedWallet.address,
      value: ethers.utils.parseEther("1.0")
    });
    await sharedWallet.withdrawMoney(addr1.address, ethers.utils.parseEther("0.5"));
    expect(await ethers.provider.getBalance(sharedWallet.address)).to.equal(ethers.utils.parseEther("0.5"));
  });

  it("Should manage allowances", async function () {
    await sharedWallet.addAllowance(addr1.address, ethers.utils.parseEther("0.5"));
    expect(await sharedWallet.allowance(addr1.address)).to.equal(ethers.utils.parseEther("0.5"));
  });
});
