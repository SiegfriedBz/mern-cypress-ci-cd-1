/// <reference types="cypress" />

describe('Rewards', () => {

    describe('FE tests -- MOCK HTTP GET requests', () => {
        it('mocked GET request should render the fixture rewards', () => {

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

    describe('BE tests --- HTTP GET requests', () => {
        it('GET request api/rewards should send a response status OK and body containing a rewards property', () => {

            cy.request('GET', 'http://localhost:4000/api/rewards')
                .should((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('rewards')
                })
        })

    })
})
