Feature: driver-personal-details

  Scenario: User navigates to the screen
    Given the screen loaded properly
    When user changes DOB
    Then DOB should get updated
    When user changes address
    Then address should get updated
    When user changes area
    Then area should get updated
    When user changes block
    Then block should get updated
    When user chanegs house number
    Then house number should get updated
    When user changes zipcode
    Then zip code should get updated
    When user clicks on next
    Then user should go to next screen
    When user clicks on support
    Then user should get alert
    When user clicks on go back
    Then user should go back
