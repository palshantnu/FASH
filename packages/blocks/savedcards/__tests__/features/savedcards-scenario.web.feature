Feature: savedcards

    Scenario: User navigates to savedcards
        Given I am a User loading savedcards
        When I navigate to the savedcards
        Then savedcards will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors