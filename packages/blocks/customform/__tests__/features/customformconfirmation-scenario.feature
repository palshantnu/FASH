Feature: customformconfirmation

    Scenario: User navigates to customformconfirmation
        Given I am a User loading customformconfirmation
        When I navigate to the customformconfirmation
        Then customformconfirmation will load with out errors
        And I can click logout button with out errors
        And I can click create store button with with out errors
        And I can leave the screen with out errors