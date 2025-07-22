Feature: MyRequests

  Scenario: User navigates to MyRequests
    Given I am a User loading MyRequests
  When I click on request page
  Then I will navigate to request page

  When I click on reqirment page
  Then I will navigate to reqirment page
  
  When I click on delete button
  Then Data will be delete 
  And Call api with empty data with out errors