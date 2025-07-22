Feature: ProductSourceListing
  Scenario: Buyer opens up ProductSourceListing
    Given Buyer is on ProductSourceListing screen
    When The page loads completely
    Then Buyer can see the page without errors
    Then Buyer can see the Delete Button
    Then Buyer can press the delete Button
    Then Buyer should see a confirmation alert
    When Buyer presses 'No' on the alert
    Then Buyer can press the delete Button
    Then Buyer should see a confirmation alert
    When Buyer presses 'Yes' on the alert
    Then delete source product should succeed
    Then Buyer can see the view Button
    Then Buyer can click the view Button
    Then Buyer can see source a product button
    Then Buyer can click the source a product button
    Then Buyer can refresh the FlatList on pull
