Feature: DetailedProductSourcingOrder
  Scenario: Stylist opens up DetailedProductSourcingOrder
    Given Stylist is on DetailedProductSourcingOrder screen
    When The page loads completely
    Then stylist can see the page without errors

  Scenario: Stylist opens up DetailedProductSourcingOrder for test
    Given Stylist is on DetailedProductSourcingOrder screen for test
    When The page loads completely for test
    Then stylist can see the page without errors for test