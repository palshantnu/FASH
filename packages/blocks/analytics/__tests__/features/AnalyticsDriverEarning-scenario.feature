Feature: AnalyticsDriverEarning

    Scenario: User navigates to AnalyticsDriverEarning
        Given I am a User loading AnalyticsDriverEarning
        When I navigate to the AnalyticsDriverEarning
        Then AnalyticsDriverEarning will load with out errors
        And I can click on back button with out errors
        And I should render show earning analytics api with out errors
        And I should render earning data in flatlist with out errors
        And I can click on calendar open with out errors
        And I can click on calendar on change with out errors
        And I can click on calendar close with out errors
        And I should render earning data in flatlist and click weekly with out errors
        And I can click on weekly calendar on change with out errors
        And I should render earning data in flatlist and click monthly with out errors
        And I can click on monthly calendar on change with out errors
        And I should render show earning analytics api with errors
        And I can click on see earning activity with out errors