Feature: StylistDashboard
  Scenario: Stylist opens up StylistDashboard
    Given Stylist is on dashboard screen
    When The page loads completely
    Then stylist can see the page without errors
    And I can click analytics for stylist with out errors

  Scenario: Stylist opens up StylistDashboard when profile is  under review
    Given Stylist is on dashboard screen
    When The page loads completely
    Then stylist can see the under review message on screen