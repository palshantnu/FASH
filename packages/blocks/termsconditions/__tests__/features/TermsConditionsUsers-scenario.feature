Feature: TermsConditionsUsers

  Scenario: User navigates to TermsConditions
    Given I am a User loading TermsConditions
    When I navigate to TermsConditions
    Then TermsConditions will load
    And I can click back button with out errors
    And I can call api with response errors
    And I can call api with errors