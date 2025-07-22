Feature: PrivacyPolicy

  Scenario: User navigates to styling details
    Given I am a User loading styling details

    When I click on stylist request details button with pending data
    Then I will navigate to request details page with pending data

    When I click on accept button
    Then Tab will be change

    When The status api call
    Then Data will render on the screen

    When I click on reject button
    Then Tab will be change

    When The status api call
    Then Data will not render on the screen

    When I click on stylist request details button
    Then I will navigate to request details page

    When I click on stylist request details button with rejected data
    Then I will navigate to request details page with rejected data

    When I click on stylist request details button with pending data
    Then I will not navigate to request details page with pending data

    