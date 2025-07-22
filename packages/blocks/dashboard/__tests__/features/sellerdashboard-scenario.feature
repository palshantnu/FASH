Feature: SellerDashboard

    Scenario: User navigates to SellerDashboard
        Given I am a User loading SellerDashboard
        When I navigate to the SellerDashboard
        Then I can load token with out errors
        And I can able to click analytics
        And I can able to fetch the new order
        And I can able to show the new order
        And I can able to click the accept order
        And I can able to click the reject order
        And I can able to click the view all button
        Then I can leave the screen with out errors
       