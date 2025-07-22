Feature: ChatCart

    Scenario: Buyer opens up ChatCart
        Given Buyer is on ChatCart screen
        When The page loads completely
        Then Buyer can see the page without errors