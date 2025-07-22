Feature: tappaymentsbuyerhistory

  Scenario: User navigates to tappaymentsbuyerhistory
    Given I am a User loading tappaymentsbuyerhistory
    When I navigate to tappaymentsbuyerhistory
    Then tappaymentsbuyerhistory will load
    And I can click back payment history page with out errors
    And I can show all payment history api work with out errors
    And I can show all payment history flatlist by render with out errors
    And I can enter text payment for search with out errors
    And I can show all payment api work with errors
    And I can delete payment api work with errors