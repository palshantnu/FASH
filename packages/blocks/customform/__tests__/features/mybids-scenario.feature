Feature: MyBids
  Scenario: Stylist opens up MyBids
    Given Stylist is on MyBids screen
    When The page loads completely
    Then stylist can see the page without errors
    Then stylist can press the back button
    Then stylist can press the view button