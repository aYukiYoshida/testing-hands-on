# Playwright Hands-on

This repository manages codes for hands-on of [Playwright](https://playwright.dev).

## Requirements

- [mise](https://mise.jdx.dev/)

- [allure-playwright](https://www.npmjs.com/package/allure-playwright)

## Subjects

- [Playwright](https://playwright.dev)
- [Cypress](https://www.cypress.io/)
- [Mocha](https://mochajs.org/)

## Setup

1. Derive source code

   ```shell
   git clone git@github.com:aYukiYoshida/testing_handson.git # via SSH
   ```

1. Install dependencies

   ```shell
   mise install
   mise run setup
   ```

## Usage

- Run testing with Playwright

  ```shell
  mise run test:playwright
  ```

- Run testing with Cypress

  ```shell
  mise run test:cypress
  ```

- Run testing with Mocha

  ```shell
  mise run test:mocha
  ```
