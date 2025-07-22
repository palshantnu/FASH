Feature: Tryonit

  Scenario: User basic details Tryonit
    Given I am a User loading Tryonit
    When I navigate to the Tryonit
    Then Tryonit will load without errors
    And I can handle next page navigation
    And Handle text input data