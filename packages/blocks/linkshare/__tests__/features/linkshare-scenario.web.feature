Feature: linkshare

    Scenario: User navigates to linkshare
        Given I am a User loading linkshare
        When I navigate to the linkshare
        Then linkshare will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors