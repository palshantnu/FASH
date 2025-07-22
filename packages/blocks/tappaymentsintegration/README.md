# LITE CERTIFIED BLOCK
## Building Blocks React Native Mobile - tappaymentsintegration

Building Blocks - React Native Master App - tappaymentsintegration

## Getting Started

cd packages/blocks/tappaymentsintegration/
yarn install

- Steps for logging in:
  - Click on the "email-account-login" default Block.
  - Use the login credentials mentioned below:
    - Shopper:
    `email`: `sudarshan@yopmail.com`
    `password`: `Password`
    - Merchant:
    `email`: `parikshit@yopmail.com`
    `password`: `Password`
  - Request user account with `customer` user type from Backend Developer if the credentials above does not work

- Steps for placing charging with TapPay:
  - Fill out the form including the transaction and order IDs
  - Click the submit button
  - Wait for the charge to succeed

### Prerequisites

- The feature of this block is to integrate tap  payment for payment specifically supported to middle east countries to pay using credit card.
- There are two different flows: merchant and shopper. Request two different accounts from the Backend dev. A user with "merchant" `user_type` and a user with "customer" `user_type`
- Go through login to switch between users.

### Git Structure

- tappayments integration branch is based on the `master` branch

### Installing

- Run `yarn` in `src` folder and `src/packages/mobile` folder
- For Mobile Android Run `yarn android` and for iOS Run `yarn ios`
- For Website `yarn workspace web start` in `src` folder

## Running the tests

- Run `yarn` to install specific libraries used in **tappaymentsintegration** block
- Then run `yarn test` to run the test with the block

## CI/CD Details

- CI/CD runs fine with all the pipelines
- All the Pipelines pass through all the processes

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).
