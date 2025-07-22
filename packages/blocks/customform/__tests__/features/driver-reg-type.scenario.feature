Feature: driver-type-Scenario

  Scenario: User navigates to select registraion type
    Given The page loaded properly
    When User selects a type
    Then Selected registration type should change
    When User clicks on next
    Then User navigates to next screen
    When User clicks on back icon
    Then User goes back to previous screen
    When User clicks on support button
    Then User gets alert
