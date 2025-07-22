Feature: Measurements

  Scenario: User basic details
    Given I am a User loading Measurements
    When I navigate to the Measurements
    Then Measurements will load without errors
    And I can handle next page navigation
    And Handle text input data