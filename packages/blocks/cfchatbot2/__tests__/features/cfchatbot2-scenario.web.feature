Feature: cfchatbot2

    Scenario: User navigates to cfchatbot2 and inputs text
        Given I am a User loading cfchatbot2
        When I navigate to the cfchatbot2
        Then cfchatbot2 will load with out errors
        Then I can enter text with out errors
        Then I can select the button with out errors
        Then I can leave the screen with out errors

    Scenario: User navigates to cfchatbot2 and inputs a password
        Given I am a User loading cfchatbot2
        When I navigate to the cfchatbot2
        When I want to enter a password
        Then cfchatbot2 will load with out errors
        Then the text input field will be a password field
        Then I can enter text with out errors
        Then I can toggle to show the password
        Then I can select the button with out errors
        Then I can leave the screen with out errors