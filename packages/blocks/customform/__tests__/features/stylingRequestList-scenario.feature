Feature: stylingRequestList

  Scenario: User navigates to styling request list
    Given I am a User loading styling request list

    When I click on back button
    Then I will navigate to landing page

    When I click on stylist request details button
    Then I will navigate to request details page

    When I click on stylist request details button with pending data
    Then I will navigate to request details page with pending data

    When I click on stylist request details button with rejected data
    Then I will navigate to request details page with rejected data

    When I click on stylist request details button with blank data
    Then I will navigate to request details page with blank data