Feature: ProductdescriptionSeller

    Scenario: User navigates to ProductdescriptionSeller
        Given I am a User loading ProductdescriptionSeller
        When I navigate to the ProductdescriptionSeller
        Then ProductdescriptionSeller will load with out errors
        Then Set token from session response
        Then set recived catalogue id from navigation
        Then load the product details
        Then I can view the other color variants
        Then I can view the other size variants
        Then I can click edit button to navigate product details screen
        Then I can leave the screen with out errors
       