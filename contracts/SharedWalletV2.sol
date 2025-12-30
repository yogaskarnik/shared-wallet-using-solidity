//SPDX-License-Identifier: MIT
pragma solidity 0.8.1;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Allowance is Ownable {
    mapping(address => uint) public allowance;

    event AllowanceChanged(address indexed _for, uint _oldAmount, uint _newAmount);

    function addAllowance(address _who, uint _amount) public onlyOwner {
        emit AllowanceChanged(_who, allowance[_who], _amount);
        allowance[_who] = _amount;
    }

    modifier isAllowed(uint _amount) {
        require(owner() == msg.sender || allowance[msg.sender] >= _amount, "Not allowed");
        _;
    }

    function reduceAllowance(address _who, uint _amount) internal {
        emit AllowanceChanged(_who, allowance[_who], allowance[_who] - _amount);
        allowance[_who] -= _amount;
    }
}

contract SharedWallet is Allowance, ReentrancyGuard {
    event MoneySent(address indexed _beneficiary, uint _amount);
    event MoneyReceived(address indexed _from, uint _amount);

    function withdrawMoney(address payable _to, uint _amount) public isAllowed(_amount) nonReentrant {
        require(_amount <= address(this).balance, "Insufficient balance");
        if(owner() != msg.sender) {
            reduceAllowance(msg.sender, _amount);
        }
        emit MoneySent(_to, _amount);
        _to.transfer(_amount);
    }

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    function renounceOwnership() public override onlyOwner {
        revert("Cannot renounce ownership");
    }

    receive() external payable {
        emit MoneyReceived(msg.sender, msg.value);
    }
}
