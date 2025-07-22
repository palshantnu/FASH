Feature: PhotoLibraryEditPortfolioDetails

    Scenario: User navigates to PhotoLibraryEditPortfolioDetails
        Given I am a User loading PhotoLibraryEditPortfolioDetails
        When I navigate to the PhotoLibraryEditPortfolioDetails
        When User navigate to the PhotoLibraryEditPortfolioDetails
        Then User can update detail view
        Then Api call for deleting data of portfolio
        When Api call for updating data of portfolio