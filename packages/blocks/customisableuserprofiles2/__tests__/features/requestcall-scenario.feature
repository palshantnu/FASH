Feature: RequestCall

    Scenario: Buyer opens up RequestCall
        Given Buyer is on RequestCall screen
        When The page loads completely
        Then Buyer can see the page without errors
        Then Buyer can press submit button
        Then Buyer can add values to reason, hours and minutes
        Then Buyer can press submit button
        Then Buyer can modify values to reason, hours and minutes
        Then Buyer can press submit button
        Then Buyer can modify values to reason, hours and minutes
        Then Buyer can press submit button