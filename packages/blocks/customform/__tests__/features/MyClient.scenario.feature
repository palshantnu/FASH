Feature: Clients

  Scenario: User navigates to clients tab
    Given I am a User loading clients tab
    
    When Show over All data list on report screen
    Then Showing over all data list in user
    Then clicking on the user section

    When I click on the clientListApiCallID button
    Then The client API call ID is displayed