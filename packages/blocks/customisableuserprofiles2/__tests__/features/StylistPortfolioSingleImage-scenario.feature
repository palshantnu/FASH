Feature: StylistPortfolioSingleImage

    Scenario: Buyer opens up StylistPortfolioSingleImage
        Given Buyer is on StylistPortfolioSingleImage screen
        When The page loads completely
        Then Buyer can see the page without errors
        Then Buyer can press back button