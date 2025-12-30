# Shared Wallet Using Solidity

A simple shared wallet smart contract built with Solidity and Hardhat.

## Features

- Owner-controlled wallet with allowance system
- Secure withdrawals with reentrancy protection
- Event logging for all transactions
- Comprehensive test suite

## Setup

```bash
npm install
npx hardhat compile
```

## Testing

```bash
npm test
```

## Deployment

```bash
# Local deployment
npm run node
npm run deploy:localhost

# Hardhat network
npm run deploy
```

## Usage

The wallet allows an owner to:
- Receive ETH deposits
- Set allowances for other addresses
- Withdraw funds directly
- Allow others to withdraw within their allowance
