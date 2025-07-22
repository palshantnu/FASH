Feature: Pricing

    Scenario: Buyer opens up Pricing
        Given Buyer is on Pricing screen
        When The page loads completely
        Then Buyer can see the page without errors
        Then Buyer can Press various buttons