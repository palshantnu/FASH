Feature: dashboardselectstore

    Scenario: User navigates to dashboardselectstore
        Given I am a User loading dashboardselectstore
        When I navigate to the dashboardselectstore
        Then dashboardselectstore will load with out errors
        And I am click back button with out errors 
        And I am get store api calling with out errors
        And I am render flatlist all store with out errors
        And I am open close stores with out errors
        And I am search store text with out errors
        And I am update store status api calling with out errors