Feature: ReturnPolicy

  Scenario: User navigates to ReturnPolicy
    Given I am a User loading ReturnPolicy
    When I navigate to ReturnPolicy
    Then ReturnPolicy will load
    And ReturnPolicy will api call english language
    And goBackID