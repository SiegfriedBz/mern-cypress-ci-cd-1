/// <reference types="cypress" />

describe('Habits dashboard', () => {

    describe('FE tests -- Unit & Integration tests', () => {

        beforeEach(() => {
            cy.visit('/habits')
        })

        const createHabit = (habitInput) => {
            cy.get("#habit-add-btn").click()

            cy.get("input[placeholder='Habit']").type(habitInput)
            cy.contains(/Save changes/i).click()
        }

        describe('Habits List', () => {
            it('should display modal when add button is clicked', () => {
                cy.contains('button', /add/i).click()
                cy.contains("Add a new habit").should('be.visible')
            })

            it('should display habit card when new habit is added', () => {
                const habitInput= "Go to the gym"
                createHabit(habitInput)

                cy.contains(habitInput)
                    .should('be.visible')
                    .should("have.class", "HabitCard__habit-container")
            })

            it('should modal habit toggle icon when clicked', () => {
                createHabit("Go to the gym")

                const img01 = '/static/media/close.fa7e5ead.svg'
                const img02 = '/static/media/check.9e8832df.svg'
                cy.get(`[src='${img01}']`)
                    .should('be.visible')
                    .click()
                cy.get(`[src='${img02}']`)
                    .should('be.visible')
                    .click()
                cy.get(`[src='${img01}']`)
                    .should('be.visible')
            })

            it('should close modal when modal close btn is clicked', () => {
                cy.get("#habit-add-btn").click()
                cy.get("input[placeholder='Habit']").should('be.visible')
                cy.contains('button', /close/i).click()
                cy.contains('Habit Checklist').should('be.visible')
            })
        })
    })
})
