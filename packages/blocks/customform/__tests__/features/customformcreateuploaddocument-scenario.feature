Feature: customformcreateuploaddocument

    Scenario: User navigates to customformcreateuploaddocument
        Given I am a User loading customformcreateuploaddocument
        When I navigate to the customformcreateuploaddocument
        Then customformcreateuploaddocument will load with out errors
        And I can click on back button store with out errors
        And I can click on upload id proof with out errors
        And I can click on open image with out errors
        And I can click on open document with out errors
        And I can click on upload license with out errors
        And I can click on cancel model with out errors
        And I can send api data with out errors
        And I Update profile Should Pass and update data
        And I can leave the screen with out errors