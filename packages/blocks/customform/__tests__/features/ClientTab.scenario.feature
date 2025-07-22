Feature: Clients

  Scenario: User navigates to clients tab
    Given I am a User loading clients tab

    When show over All data list on report screen
    Then Showing over all data list in user

    When I click on stylist request details button
    Then I will navigate to request details page

    When I click on stylist request details button with pending data
    Then I will navigate to request details page with pending data

    When I click on stylist request details button with rejected data
    Then I will navigate to request details page with rejected data

    When I click on stylist request details button with blank data
    Then I will navigate to request details page with blank data
