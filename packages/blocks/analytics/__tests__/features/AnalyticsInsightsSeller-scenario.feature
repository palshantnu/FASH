Feature: AnalyticsInsightsSeller

    Scenario: User navigates to AnalyticsInsightsSeller
        Given I am a User loading AnalyticsInsightsSeller
        When I navigate to the AnalyticsInsightsSeller
        Then AnalyticsInsightsSeller will load with out errors
        And I can click on back button with out errors
        And I should render show analytics insights api with out errors
        And I should render show analytics insights api with errors
        And I can click on sales revenue report for store  with out errors
        And I can click on sales volume report for store  with out errors
        And I can click on sales volume report for product with out errors