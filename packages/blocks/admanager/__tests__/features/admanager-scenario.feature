Feature: admanager

    Scenario: User navigates to admanager
        Given I am a User loading admanager
        When I navigate to the admanager
        Then admanager will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors