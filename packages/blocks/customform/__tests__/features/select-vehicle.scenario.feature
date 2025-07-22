Feature: select-vehicle-scenario

  Scenario: User navigates to select vehicle screen
    Given The page loaded properly
    When User selects a vehicle type
    Then Selected vehicle should update
    When User clicks on next
    Then User navigates to next screen
    When User clicks on back icon
    Then User goes back to previous screen
    When User clicks on support button
    Then User gets alert
