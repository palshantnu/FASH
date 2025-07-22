Feature: Yet To Be Developed Screen

  Scenario: User navigates to Yet To be developed screen
    Given I am a User attempting to open a screen not developed yet
    When The screen loads
    Then I should get no errors
    And I should be able to go to sign in screen again
