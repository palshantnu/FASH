Feature: search-city

  Scenario: User navigates to search city page
    Given The page loaded successfully
    When User types on searchbox
    Then User can see the query
    When User clicks on next
    Then User can go to next screen
    When User clicks on support
    Then User gets a warning
    When User clicks on go back
    Then user goes back
