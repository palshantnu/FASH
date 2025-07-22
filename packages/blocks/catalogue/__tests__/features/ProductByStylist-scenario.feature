Feature: ProductByStylist

    Scenario: Buyer opens up ProductByStylist
        Given Buyer is on ProductByStylist screen
        When The page loads completely
        Then Buyer can see the page without errors
        Then Buyer can press buttons

    Scenario: Buyer opens up ProductByStylist with arabic lang
        Given Buyer is on ProductByStylist screen
        When The page loads completely
        Then Buyer can see the page without errors
        Then Buyer can press buttons