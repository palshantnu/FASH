Feature: Clients

  Scenario: User navigates to clients tab
    Given I am a User loading clients tab

    When Show over All data list on report screen
    Then Showing over all data list in user
    Then User goes back
    Then session storage and navigation are triggered

      Scenario: User clicks on go to wishlist button
    Given I am a User loading clients tab

    When button rendered and clicked
    Then Showing over all data list in user

   Scenario: Stylist navigates to clients tab
   Given I am a User loading clients tab
   When Stylist enters this screen for client
  Then Showing over all data list in stylist
  Then time showing text is rendered

