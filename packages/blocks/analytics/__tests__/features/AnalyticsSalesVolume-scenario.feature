Feature: AnalyticsSalesVolume

    Scenario: User navigates to AnalyticsSalesVolume
        Given I am a User loading AnalyticsSalesVolume
        When I navigate to the AnalyticsSalesVolume
        Then AnalyticsSalesVolume will load with out errors
        And I can click on back button with out errors
        And I can call seller volume api with out errors
        And I am trying to filter with out errors
        And I can check bar chart click with out errors
        And I can click on download button with out errors
        And I can call download report api with out errors
        And I can click on select store button with out errors
        And I can click on select product button with out errors
        And I can click on select store with id and with out errors
        And I can call seller volume api with errors