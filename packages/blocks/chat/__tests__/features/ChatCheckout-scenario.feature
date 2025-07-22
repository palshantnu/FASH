Feature: ChatCheckout

    Scenario: Buyer opens up ChatCheckout
        Given Buyer is on ChatCheckout screen
        When The page loads completely
        Then Buyer can see the page without errors