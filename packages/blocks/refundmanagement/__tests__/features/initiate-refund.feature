Feature: InitiateRefund

  Scenario: I am an seller trying to refund
    Given I have opened initiate refund page
    And I can initiate a refund
    When I click on go back
    Then I go back to previous screen
