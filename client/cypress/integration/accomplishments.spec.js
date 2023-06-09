/// <reference types="cypress" />

describe('Accomplishments', () => {

    const accomplishmentTitle = 'I pet a pet'
    const accomplishmentContent = 'I pet a pet twice'
    const accomplishmentUnacceptableContent = 'I pet a giraffe twice'

    describe('FE tests', () => {

        const successMessage = 'This Accomplishment was Successfully Submitted'

        const fillForm = (title='My Accomplishment Title', accomplishment='My Accomplishment Description') => {
            cy.getByCyId('accomplishment-title-input')
                .type(title)
            cy.getByCyId('accomplishment-input')
                .type(accomplishment)
            cy.get('input[type="checkbox"]')
                .check()
        }

        const submitForm = () => {
            cy.contains('Submit Accomplishment')
                .should('be.visible')
                .click()
        }

        describe('FE tests -- Unit & Integration tests', () => {

            beforeEach(() => {
                cy.visit('/accomplishments')
            })

            it('should display an error message if 1 field is empty', () => {
                cy.getByCyId('accomplishment-title-input')
                    .type('My Accomplishment Title')
                cy.getByCyId('accomplishment-input')
                    .type('My Accomplishment Description')
                submitForm()
                cy.contains('Complete the items above to continue')
                    .should('be.visible')
            })

            it('should display loading spinner after form is submitted', () => {
                fillForm()
                submitForm()
                cy.contains(successMessage).should('be.visible')
            })

            it('should go back to empty accomplishments dashboard when go back button is clicked', () => {
                fillForm()
                submitForm()
                cy.contains('Go Back').click()
                cy.getByCyId('accomplishment-title-input')
                    .should('be.visible')
                    .and('be.empty')
                cy.getByCyId('accomplishment-input')
                    .should('be.visible')
                    .and('be.empty')
                cy.get('input[type="checkbox"]')
                    .should('be.visible')
                    .and('not.be.checked')
            })
        })

        describe('FE tests -- MOCK HTTP POST requests', () => {

            const unacceptableResponseMessage = 'Your mock content is not appropriate'

            const interceptPostAccomplishments = () => {
                const options = {
                    method: 'POST',
                    url: 'http://localhost:4000/api/accomplishments'
                }

                cy.intercept(options,
                    (req) => {
                        if(req.body.title.includes('giraffe') || req.body.accomplishment.includes('giraffe')) {
                            return req.reply({
                                statusCode: 406,
                                body: {
                                    message: 'Your mock content is not appropriate'
                                }
                            })
                        } else {
                            return req.reply({
                                statusCode: 201
                            })
                        }
                    })
            }

            beforeEach(() => {
                // GET request
                cy.visit('/accomplishments')
            })

            it('mocked POST request with unacceptable body should display mocked unacceptable message', () => {
                // intercept POST request
                interceptPostAccomplishments()

                // fill out form and submit POST request -- unacceptable body
                fillForm(accomplishmentTitle, accomplishmentUnacceptableContent)
                submitForm()

                // assert that the unacceptable message is displayed
                cy.contains(unacceptableResponseMessage).should('be.visible')
            })

            it('mocked POST request with valid body should display success message', () => {
                // intercept POST request
                interceptPostAccomplishments()

                // fill out form and submit POST request -- valid body
                fillForm(accomplishmentTitle, accomplishmentContent)
                submitForm()

                // assert that the success message is displayed
                cy.contains(successMessage).should('be.visible')
            })
        })
    })

    describe('BE tests --- HTTP POST requests', () => {
        const options = (accomplishment) => {
            return {
                method: 'POST',
                url: 'http://localhost:4000/api/accomplishments',
                body: {
                    title: accomplishmentTitle,
                    accomplishment: accomplishment
                }
            }
        }

        it('POST request api/accomplishments with valid request body should send a response status 201', () => {
            cy.request(options(accomplishmentContent))
                .should((response) => {
                    expect(response.status).to.eq(201)
                })
        })

        it('POST request api/accomplishments with unacceptable request body should send a response status 406', () => {
            cy.request({...options(accomplishmentUnacceptableContent), failOnStatusCode: false })
                .should((response) => {
                    expect(response.status).to.eq(406)
                    expect(response.body).to.have.property('message')
                })
        })
    })
})
