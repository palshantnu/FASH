Feature: RejectOrder

    Scenario: User navigates to RejectOrder
        Given I am a User loading RejectOrder
        When I navigate to the RejectOrder
        Then RejectOrder will load with out errors
        Then Set token from session response
        Then I can select reject reason in drop down 
        And I can able to reject the Order
        When I can able to click close button to navigate previous screen
        Then I can leave the screen with out errors
       