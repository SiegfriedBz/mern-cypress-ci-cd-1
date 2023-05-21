/// <reference types="cypress" />

describe('Rewards', () => {

    describe('Mock requests - FE tests', () => {
        it('should render the rewards page --- mock', () => {

            cy.intercept({method: 'GET', url: 'http://localhost:4000/api/rewards'},
                { fixture: 'rewards.json' })

            cy.visit('/rewards')

            // assert that the rewards page contains the mocked rewards
            cy.get('ul')
                .should('contain', '100000 points for drinking 8 cups of water for 7 straight days')
                .and('contain', '850000 points for fasting for 5 days straight')
                .and('contain', '250000 points for exercising for 3 straight days')
        })
    })

    describe('API call - BE tests', () => {
        it('should send a response status OK and body containing a rewards property --- API', () => {

            cy.request('GET', 'http://localhost:4000/api/rewards')
                .should((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('rewards')
                })
        })

    })
})
