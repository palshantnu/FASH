Feature: tappaymentsdriverbankdetail

  Scenario: User navigates to tappaymentsdriverbankdetail
    Given I am a User loading tappaymentsdriverbankdetail
    When I navigate to tappaymentsdriverbankdetail
    Then tappaymentsdriverbankdetail will load
    And I can click back payment method page with out errors
    And I can show all payment method api work with out errors
    And I can show all payment method flatlist by render with out errors
    And I can show all payment method api work with errors