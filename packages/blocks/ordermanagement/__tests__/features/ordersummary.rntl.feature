Feature: OrderSummaryRNTL

  Scenario: Seller opens order summary page
    Given I am a seller opened the order summary page
    When page loads
    Then I can see all orders

  Scenario: Seller opens refund tab
    Given I am a seller opened the order summary page
    When I go to the refund tab
    Then I can see all return and refund orders
    When I click on return request accordion
    Then I can see the return request orders
    And I can reject a request
    When I accept a request
    Then I can see the order in return in process tab
    When I receive the return order
    Then I can reject the refund
    When I initiated a refund
    Then I can see refunded order
     When I accept a request self drop
    Then I can see the order self drop in return in process tab
    When I receive the self drop return order
    Then I can reject self drop the refund
    When I initiated self drop a refund
    Then I can see self drop refunded order