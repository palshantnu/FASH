Feature: StylistCreateProfile

  Scenario: I am a stylist who just signed up
    Given I am on create profile step one
    When I click on upload profile image
    Then I can choose the image
    When I click next
    Then I get errors due to missing data
    When I fill all the data and press continue
    Then I go to second step
    When I click go back
    Then It goes back to step one

  Scenario: I am on step two trying to fill data
    Given The page is loaded
    When I click on gps button
    Then It goes to map selection screen
    When I come back after selection
    Then Address gets updated
    When I click on next
    Then I get warning due to missing fields
    When I fill all details
    And Click next
    Then My profile gets updated and redirects to step three

  Scenario: I am on step three trying to create portfolio
    Given I am on step three
    When I click on upload multiple photos
    Then the screen still gets rendered
    Then I can select photos
    And I can update description
    When I click on next
    Then my portfolio gets created
    When I click on delete all
    Then Photos gets removed
    Then screen completely gets rendered
