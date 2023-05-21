/// <reference types="cypress" />

describe('Rewards', () => {

    it('should render the rewards page --- mock', () => {
        // register intercept on GET API request
        cy.intercept({ method: 'GET', url: '**/api/rewards' },
            { fixture: 'rewards.json' })
        // visit the rewards page
        cy.visit('/rewards')
        // assert that the rewards page contains the mocked rewards
        cy.get('ul')
            .should('contain', '100000 points for drinking 8 cups of water for 7 straight days')
            .and('contain', '850000 points for fasting for 5 days straight')
            .and('contain','250000 points for exercising for 3 straight days')
    })
})
