Feature: tappaymentspaymentdetail

  Scenario: User navigates to tappaymentspaymentdetail
    Given I am a User loading tappaymentspaymentdetail
    When I navigate to tappaymentspaymentdetail
    Then tappaymentspaymentdetail will load
    And I can click back transaction page with out errors
    And I can click download receipt pdf with out errors