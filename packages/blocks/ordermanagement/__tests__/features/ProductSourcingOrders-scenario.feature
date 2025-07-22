Feature: ProductSourcingOrders
  Scenario: Stylist opens up ProductSourcingOrders
    Given Stylist is on ProductSourcingOrders screen
    When The page loads completely
    Then stylist can see the page without errors