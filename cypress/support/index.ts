/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Chainable<Subject = any> {
    getByTestId: (selector: string) => Chainable<JQuery<HTMLElement>>;
  }
}
