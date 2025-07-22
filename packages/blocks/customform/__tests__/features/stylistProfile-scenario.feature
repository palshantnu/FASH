Feature: StylistProfile
  Scenario: User opens up StylistViewProductSourcingPage
    Given User is on StylistViewProductSourcingPage screen
    When The page loads completely
    Then User can see the page without errors
    Then User can press the Back Button
    Then user can press the View Button