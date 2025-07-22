Feature: SelectedStoreProducts

    Scenario: User navigates to SelectedStoreProducts
        Given I am a User loading SelectedStoreProducts
        When I navigate to the SelectedStoreProducts
        Then SelectedStoreProducts will load with out errors
        Then Set token from session response
        Then load the product details
        Then Fail to load the product details
        Then I can show all stores list
        Then I can select the all store checkbox
        Then I can able to search the store
        Then I can able to create the catalogue via confirm button
        When I can call delete products api
        Then I can click popup close button
        When I can call delete products api with errors
        Then I can leave the screen with out errors