/// <reference types="cypress" />

describe('Accomplishments', () => {

    const accomplishmentTitle = 'I pet a pet'
    const accomplishmentContent = 'I pet a pet twice'
    const accomplishmentUnacceptableContent = 'I pet a giraffe twice'
    const unacceptableResponseMessage = 'Your mock content is not appropriate'
    const successMessage = 'This Accomplishment was Successfully Submitted'

    const fillFormAndSubmit = (title, accomplishment) => {
        cy.getByCyId('accomplishment-title-input')
            .type(title)
        cy.getByCyId('accomplishment-input')
            .type(accomplishment)
        cy.get('input[type="checkbox"]').check()
        cy.contains('Submit Accomplishment')
            .should('be.visible')
            .click()
    }

    const interceptPostAccomplishments = () => {
        cy.intercept({ method: 'POST', url: '**/api/accomplishments' },
            (req) => {
                if(req.body.title.includes('giraffe') || req.body.accomplishment.includes('giraffe')) {
                    return req.reply({
                        statusCode: 406,
                        body: {
                            msg: 'Your mock content is not appropriate'
                        }
                    })
                } else {
                    return req.reply({
                        statusCode: 201
                    })
                }
            })
    }

    it('should display unacceptable message when unacceptable content is posted to the server --- mock', () => {
        // GET request
        cy.visit('/accomplishments')

        // intercept POST request
        interceptPostAccomplishments()

        // fill out form and submit POST request -- unacceptable content
        fillFormAndSubmit(accomplishmentTitle, accomplishmentUnacceptableContent)

        // assert that the unacceptable message is displayed
        cy.contains(unacceptableResponseMessage).should('be.visible')
    })

    it('should display success message when valid content is posted to the server --- mock', () => {
        // GET request
        cy.visit('/accomplishments')

        // intercept POST request
        interceptPostAccomplishments()

        // fill out form and submit POST request -- acceptable content
        fillFormAndSubmit(accomplishmentTitle, accomplishmentContent)

        // assert that the success message is displayed
        cy.contains(successMessage).should('be.visible')
    })

})
