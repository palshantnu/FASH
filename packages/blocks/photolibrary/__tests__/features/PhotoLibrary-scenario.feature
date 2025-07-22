Feature: PhotoLibrary

    Scenario: User navigates to PhotoLibrary
        Given I am a User loading PhotoLibrary
        When User navigate to the PhotoLibrary
        When Api call for getting error of portfolio
        When Api call for getting data of portfolio
        Then List view data
        Then User can edit portfolio
        Then User can change checked values
        Then User can upload portfolio
        Then I can enter a description for portfolio image with out errors
        Then User can close modal
        Then User can upload media for single portfolio
        Then User can choose photos from gallery
        Then User can show data for portfolio
        Then User can shift to edit screen
        Then User can delete photos from portfolio screen
        When Api call for deleting data of portfolio
        Then Api call for uploding portfolio data
        Then I can leave the screen with out errors
    Scenario: User navigates to PhotoLibrary2
        Given I am a User loading PhotoLibrary
        When User navigate to the PhotoLibrary   
        Then PhotoLibrary will load without error