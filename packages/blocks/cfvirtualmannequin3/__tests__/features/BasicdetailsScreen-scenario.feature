Feature: BasicdetailsScreen

  Scenario: User basic details
    Given I am a User loading BasicdetailsScreen
    When I navigate to the BasicdetailsScreen
    Then BasicdetailsScreen will load without errors
    And I can handle next page navigation
    And Handle text input data