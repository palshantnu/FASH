Feature: Analytics

    Scenario: User navigates to Analytics
        Given I am a User loading Analytics
        When I navigate to the Analytics
        Then Analytics will load with out errors
        Then I navigate to graph screen
        And I can leave the screen with out errors
