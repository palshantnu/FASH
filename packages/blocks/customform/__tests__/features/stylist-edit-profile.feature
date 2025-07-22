Feature: StylistEditProfile

  Scenario: I am a stylist who just signed up
    Given I am on edit profile step one
    When I click on upload profile image
    Then I can choose the image
    When I click next
    Then I get errors due to missing data
    When I fill all the data and press continue
    Then It goes back to step one
    When User has selected english in the language section
    Then component renders with english
    When User has selected arab in the language section
    Then component renders with arab