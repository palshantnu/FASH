Feature: StylishProfileDetails

    Scenario: User navigates to StylishProfileDetails
        Given I am a User loading StylishProfileDetails
        When I navigate to the StylishProfileDetails
        Then StylishProfileDetails will load with out errors
        Then User can get the data for stylist details portfolio successfully
        Then User can navigate to stylish profile successfully
        Then User can add to favorite successfully
        Then User can add data to favorite successfully
        Then User can remove from favorite successfully
        Then User can remove data from favorite successfully