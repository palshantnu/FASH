Feature: StylishProfileDashboard

    Scenario: User navigates to StylishProfileDashboard
        Given I am a User loading StylishProfileDashboard
        When I navigate to the StylishProfileDashboard
        Then StylishProfileDashboard will load with out errors
        Then User can set the empty data for stylist images successfully
        Then User can handle the error for stylist images successfully
        Then User can set the data for stylist images successfully
        Then user can load image list with out errors