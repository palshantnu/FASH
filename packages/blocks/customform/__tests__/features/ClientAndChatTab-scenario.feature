Feature: Clients

  Scenario: User navigates to clients tab
    Given I am a User loading clients tab

    When I click on back button
    Then I will navigate to landing page

    When I click on tab button
    Then swiper will be true

    When I click on the tab button with key first
    Then the scene should be null

    When I click on the tab button with key second
    Then the scene should be null

    When I click on the tab button without any key
    Then the scene should be null
