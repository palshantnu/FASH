Feature: AnalyticsSelectStore

    Scenario: User navigates to AnalyticsSelectStore
        Given I am a User loading AnalyticsSelectStore
        When I navigate to the AnalyticsSelectStore
        Then AnalyticsSelectStore will load with out errors
        And I am click back button with out errors 
        And I am get store api calling with out errors
        And I am render flatlist all store with out errors
        And I am search store text with out errors
        And I am click close button with out errors
        And I am click confirm button with out errors
        And I am render flatlist all store and click second data with out errors