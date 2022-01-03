import { recurse } from 'cypress-recurse';
import { getTo } from './utils';
var _ = require('lodash');

// Generate random number for recurse function
const randomNumber = _.random(0, 10);

describe("Explore the recurse function", () => {
    it('gets 7', { retries: 10 }, () => {
        recurse(
            () => cy.wrap(7),
            (n) => n === 7,
        ).should('equal', 7)
    });

    it('using recurse function to works', () => {
        recurse(getTo(4), (x) => {
            expect(x).to.equal(4)
        }).should('equal', 4)
    });

    it('works when throwing the error', () => {
        recurse(getTo(4), (x) => {
            if (x !== 4) {
                throw new Error(`${x} is not 4`)
            }
        }).should('equal', 4)
    });

    it('works with multiple assertions', () => {
        recurse(
          () => cy.wrap('hello world'),
          (x) => {
            expect(x).to.be.a('string')
            expect(x).to.equal('Test');
            cy.log('Testing');
          },
        )
      })


});