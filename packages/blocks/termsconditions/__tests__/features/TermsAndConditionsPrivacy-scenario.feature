Feature: TermsAndConditionsPrivacy

  Scenario: User navigates to TermsAndConditionsPrivacy
    Given I am a User loading TermsAndConditionsPrivacy
    When I navigate to TermsAndConditionsPrivacy
    Then TermsAndConditionsPrivacy will load
    And I can click back notification page with out errors
    And I can load policy data with out errors
    And I can load product policy with out errors
    And I can load policy data with errors