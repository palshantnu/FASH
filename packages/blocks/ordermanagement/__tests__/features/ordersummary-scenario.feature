Feature: OrderSummary

    Scenario: User navigates to OrderSummary
        Given I am a User loading OrderSummary
        When I navigate to the OrderSummary
        Then Set token from session response
        When I can select the neworder tab
        Then I can load the new orders 
        And I can able to accpet or reject the order
        When I can select the inprocess tab
        Then I can load the inprocess orders 
        And I can able to change the order status
        When I can select the readyforcollection tab
        Then I can load the readyforcollection orders
        Then I can select the outofdelivery tab
        Then I can select the deliverd tab
        Then I can select the returnandrefund tab
        Then I can enlarge the accordian in returnandrefund
        Then I can select the reject tab

       Scenario: User navigates to OrderSummary new cases
        Given I am a User loading OrderSummary new cases
        When I navigate to the OrderSummary new cases
        Then Set token from session response new cases
       