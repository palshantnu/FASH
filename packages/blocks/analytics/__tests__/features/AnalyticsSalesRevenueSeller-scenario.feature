Feature: AnalyticsSalesRevenueSeller

    Scenario: User navigates to AnalyticsSalesRevenueSeller
        Given I am a User loading AnalyticsSalesRevenueSeller
        When I navigate to the AnalyticsSalesRevenueSeller
        Then AnalyticsSalesRevenueSeller will load with out errors
        And I can click on back button with out errors
        And I can call seller revenue api with out errors
        And I am trying to filter with out errors
        And I can check bar chart click with out errors
        And I can click on download button with out errors
        And I can click on sales store button with out errors
        And I can click on select store button with out errors
        And I can click on sales product button with out errors
        And I can click on select product button with out errors
        And I can call seller revenue download api with out errors
        And I can check with store id with out errors