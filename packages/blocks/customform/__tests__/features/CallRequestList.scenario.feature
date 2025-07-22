Feature: CallRequestList

  Scenario: User navigates to CallRequestList screen
    Given I am a User loading CallRequestList screen

    When I click on back button
    Then I will navigate to landing page

    When I click on the onMakeCall button
    Then The API call request will be made

    When I click on the updateCallStatus button
    Then The API call request will be made

    When I click on the reject button
    Then The API call request will be made

    When I click on the complete button
    Then The API call request will be made