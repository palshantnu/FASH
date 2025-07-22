Feature: AssignStores

    Scenario: User navigates to AssignStores
        Given I am a User loading AssignStores
        When I navigate to the AssignStores
        Then AssignStores will load with out errors
        Then Set token from session response
        Then load the product details
        Then I can show all stores list
        Then I can select the all store checkbox
        Then I can able to search the store
        Then I can able to create the catalogue via confirm button
        Then I can able to fail to create the catalogue via confirm button
        Then I can leave the screen with out errors