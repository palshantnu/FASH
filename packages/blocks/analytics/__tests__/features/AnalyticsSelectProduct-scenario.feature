Feature: AnalyticsSelectProduct

    Scenario: User navigates to AnalyticsSelectProduct
        Given I am a User loading AnalyticsSelectProduct
        When I navigate to the AnalyticsSelectProduct
        Then AnalyticsSelectProduct will load with out errors
        And I am click back button with out errors 
        And I am get product api calling with out errors
        And I am render flatlist all product with out errors
        And I am search product text with out errors
        And I am click close button with out errors
        And I am click confirm button with out errors
        And I am render flatlist all product and click second data with out errors