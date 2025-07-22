Feature: loyaltysystem

    Scenario: User navigates to loyaltysystem
        Given I am a User loading loyaltysystem
        When I navigate to the loyaltysystem
        Then loyaltysystem will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors