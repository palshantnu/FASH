Feature: SendNewOrder

  Scenario: User navigates to SendNewOrder
    Given I am a User loading SendNewOrder
    When I navigate to the SendNewOrder
    Then User can make functional button
    Then User can select from drop down
    Then User can change product name
    Then User can render the input component successfully
    Then User can send new order request successfully
    Then User can send new order request unsuccessfully
