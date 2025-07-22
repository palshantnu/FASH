Feature: OrderDetailsSeller

    Scenario: User navigates to OrderDetailsSeller
        Given I am a User loading OrderDetailsSeller
        When I navigate to the OrderDetailsSeller
        Then Set token from session response
        When set recived new order item from navigation
        Then load the new order List
         Then I can able to click reject button to navigate reject screen
        Then I can able to click accept button to navigate accept screen
        When set recived in process item from navigation
        Then load the in process List
        When I click the Ready to ship button
        Then I can able to change the status of order
        When set recived processed item from navigation
        Then load the processed List
        Then set recived shipped item from navigation
        Then set recived delivered item from navigation
        Then set recived ReturnRequest item from navigation
        Then set recived ReadyReturnInProcess item from navigation
        Then set recived RefundInProcess item from navigation
        Then set recived Refunded item from navigation
        Then Set token from session response in order mangement
        Then set recived rejected item from navigation


       
      
       