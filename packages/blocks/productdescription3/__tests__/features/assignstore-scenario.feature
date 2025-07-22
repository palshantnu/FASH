Feature: AssignStore

    Scenario: User navigates to AssignStore
        Given I am a User loading AssignStore
        When I navigate to the AssignStore
        Then AssignStore will load with out errors
        Then Set token from session response
        Then set recived catalogue id from navigation
        Then load the product details
        Then I can show all stores list
        Then I can select the all store checkbox
        Then I can able to search the store
        Then I can able to create the catalogue via confirm button
        Then I can leave the screen with out errors
       