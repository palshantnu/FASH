Feature: tappaymentsaddbank

    Scenario: User navigates to tappaymentsaddbank
        Given I am a User loading tappaymentsaddbank
        When I navigate to the tappaymentsaddbank
        Then tappaymentsaddbank will load with out errors
        And I can click back icon with out errors
        And I am trying to add bank with empty account holder name
        And I can enter a account holder name with out errors
        And I am trying to add bank with empty iban number
        And I can enter a iban number with out errors
        And I am trying to add bank with empty account number
        And I can enter a account number with out errors
        And I can add bank Should Pass and update data
        And I can add bank profile Should Pass and update data with errors
        And I can add bank Should Pass and update data with response error