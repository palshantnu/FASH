Feature: Analytics Filter

    Scenario: User navigates to Analytics Filter
        Given I am a User loading Analytics
        When I navigate to the Analytics
        Then Analytics will load with out errors
        And I can leave the screen with out errors