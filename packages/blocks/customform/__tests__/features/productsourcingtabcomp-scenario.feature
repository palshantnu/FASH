Feature: MyBidsTabComp
  Scenario: User opens up MyBidsTabComp
    Given User is on MyBidsTabComp screen
    When The page loads completely
    Then User can see the page without errors
    Then Buyer can see the My Bids Button
    Then Buyer can press the My Bids Button
    Then Buyer can see the See All Button
    Then Buyer can press the See All Button
    Then Buyer can refresh the FlatList on pull
    Then Buyer can see the view Button
    Then Buyer can click the view Button

  Scenario: User opens up MyBidsTabComp for test
    Given User is on MyBidsTabComp screen for test
    When The page loads completely for test
    Then User can see the page without errors for test

  Scenario: User opens up MyBidsTabComp for currency change
    Given User is on MyBidsTabComp screen for currency change
    When The page loads completely for currency change
    Then User can see the page without errors for currency change