Feature: cfvirtualmannequin3

    Scenario: User navigates to cfvirtualmannequin3 and inputs text
        Given I am a User loading cfvirtualmannequin3
        When I navigate to the cfvirtualmannequin3
        Then cfvirtualmannequin3 will load with out errors
        Then I can enter text with out errors
        Then I can select the button with out errors
        Then I can leave the screen with out errors

    Scenario: User navigates to cfvirtualmannequin3 and inputs a password
        Given I am a User loading cfvirtualmannequin3
        When I navigate to the cfvirtualmannequin3
        When I want to enter a password
        Then cfvirtualmannequin3 will load with out errors
        Then the text input field will be a password field
        Then I can enter text with out errors
        Then I can toggle to show the password
        Then I can select the button with out errors
        Then I can leave the screen with out errors