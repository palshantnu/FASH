Feature: AcceptOrder

    Scenario: User navigates to AcceptOrder
        Given I am a User loading AcceptOrder
        When I navigate to the AcceptOrder
        Then AcceptOrder will load with out errors
        And I can able to increase and decreasing the timmings
        And I can able to accept the Order
        When I can able to click close button to navigate previous screen
        Then I can leave the screen with out errors
       