Feature: StylistViewProductSourcingPage
  Scenario: User opens up StylistViewProductSourcingPage when bid is there and not accepted
    Given User is on StylistViewProductSourcingPage screen
    When The page loads completely
    Then User can see the page without errors
    Then User can press the Back Button
    Then user can press the delete Button
    Then user can press the btnCancelRequestNo
    Then user can press the btnAcceptOrReject
    Then user can press the editButton

  Scenario: User opens up StylistViewProductSourcingPage when bid is not placed
    Given User is on StylistViewProductSourcingPage screen
    When The page loads completely
    Then User can see the page without errors
    Then User can see and press the viewButton

  Scenario: User opens up StylistViewProductSourcingPage when bid is accepted
    Given User is on StylistViewProductSourcingPage screen
    When The page loads completely
    Then User can see the page without errors