Feature: BidYourQuote

    Scenario: Stylist opens up BidYourQuote to add bid
        Given Stylist is on BidYourQuote screen
        When The page loads completely
        Then Stylist can see the page without errors
        Then Stylist can press the back button
        Then Stylist can press the submit button
        Then Stylist can add input to Description-input
        Then Stylist can add input to Quote-price-input
        Then Stylist can click on upload icon and see the upload modal
        Then I can find camera button
        Then I can find gallery button
        Then I can see the cancel button
        Then I can click on upload icon again and see the upload modal
        Then I can find gallery button and selecte image
        Then I can click on submit button with filed fields

    Scenario: Stylist opens up BidYourQuote to edit bid
        Given Stylist is on BidYourQuote screen
        When The page loads completely
        Then Stylist can see the page without errors
        Then Stylist can see the submit button
        Then Stylist can press the submit button

   Scenario: Stylist opens up BidYourQuote
        Given Stylist is on BidYourQuote screen for test
        When The page loads completely for test
        Then I can click on upload icon again and see the upload modal for test

    Scenario: Stylist opens up BidYourQuote to add bid for add data
        Given Stylist is on BidYourQuote screen for add data
        When The page loads completely for add data
        Then I can click on submit button with filed fields for add data