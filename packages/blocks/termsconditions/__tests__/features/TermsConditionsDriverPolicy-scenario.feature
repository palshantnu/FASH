Feature: TermsConditionsDriverPolicy

  Scenario: User navigates to TermsConditionsDriverPolicy
    Given I am a User loading TermsConditionsDriverPolicy
    When I navigate to TermsConditionsDriverPolicy
    Then TermsConditionsDriverPolicy will load
    And I can click back notification page with out errors
    And I can load policy data with out errors
    And I can load product policy with out errors
    And I can load policy data with errors