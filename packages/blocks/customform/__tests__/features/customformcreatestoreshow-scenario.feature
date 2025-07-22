Feature: customformstoreshhow

    Scenario: User navigates to customformstoreshhow
        Given I am a User loading customformstoreshhow
        When I navigate to the customformstoreshhow
        Then customformstoreshhow will load with out errors
        And I can click on back button store with out errors
        And I should render show store api with out errors
        And I should render store data in flatlist zero index with out errors
        And I should render store data in flatlist first index pending status with out errors
        And I should render store data in flatlist first index approved status with out errors
        And I can enter a store search with out errors
        And I can click on continue button with out errors
        And I can leave the screen with out errors