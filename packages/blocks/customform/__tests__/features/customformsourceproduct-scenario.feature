Feature: CustomformSourceProduct
  Scenario: Buyer opens up CustomformSourceProduct
    Given Buyer is on CustomformSourceProduct screen
    When The page loads completely
    Then Buyer can see the page without errors
    Given I can see the submit button
    When I click on submit button with empty fields
    Then I can see the Product Name error message
    Given Form for SoucreProduct is loaded with out errors
    Then I can see Product Name and edit it
    Then I can see Product Description and edit it
    Then I can see Product Colour and edit it
    Then I can see Product Sizes and edit it
    Then I can see Min Price and edit it
    Then I can see Max Price and edit it
    Then I can see Product Quantity and edit it
    Then I can select gender
    Then I can click on upload icon and see the upload modal
    Then I can find camera button
    Then I can find gallery button
    Then I can see the cancel button
    Then I can click on upload icon again and see the upload modal
    Then I can find gallery button and selecte image
    When I click on submit button with filed fields

  Scenario: Buyer opens up CustomformSourceProduct for test
    Given Buyer is on CustomformSourceProduct screen for test
    When The page loads completely for test
    Then Buyer can see the page without errors for test
    Given I can see the submit button for test

  Scenario: Buyer opens up CustomformSourceProduct for test currency
    Given Buyer is on CustomformSourceProduct screen for test currency
    When The page loads completely for test currency
    Then Buyer can see the page without errors for test currency
    Given I can see the submit button for test currency

  Scenario: Buyer opens up CustomformSourceProduct for check
    Given Buyer is on CustomformSourceProduct screen for check
    When The page loads completely for check
    Then Buyer can see the page without errors for check

  Scenario: Buyer opens up CustomformSourceProduct for check product colour
    Given Buyer is on CustomformSourceProduct screen for check product colour
    When The page loads completely for check product colour
    Then Buyer can see the page without errors for check product colour

  Scenario: Buyer opens up CustomformSourceProduct for product size with comma and without comma
    Given Buyer is on CustomformSourceProduct screen for product size with comma and without comma
    When The page loads completely for product size with comma and without comma
    Then Buyer can see the page without errors for product size with comma and without comma