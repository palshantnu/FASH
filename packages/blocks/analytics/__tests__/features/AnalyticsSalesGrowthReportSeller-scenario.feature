Feature: AnalyticsSalesGrowthReportSeller

    Scenario: User navigates to AnalyticsSalesGrowthReportSeller
        Given I am a User loading AnalyticsSalesGrowthReportSeller
        When I navigate to the AnalyticsSalesGrowthReportSeller
        Then AnalyticsSalesGrowthReportSeller will load with out errors
        And I can click on back button with out errors
        And I can call seller revenue api with out errors
        And I am trying to filter with out errors
        And I can check bar chart click with out errors
        And I can click on download button with out errors
        And I can click on sales store button with out errors
        And I can click on select store button with out errors
        And I can click on sales product button with out errors
        And I can click on select product button with out errors
        And I can call download report api with out errors
        And I can trying to weekly filter with out errors