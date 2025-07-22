Feature: reviews

    Scenario: User navigates to reviews
        Given I am a User loading reviews
        When I navigate to the reviews
        Then reviews will load with out errors
        And I can leave the screen with out errors

    Scenario: User navigates to addreviews
        Given I am a User loading addreviews
        When I navigate to the addreviews
        Then addreviews will load with out errors
        And I can leave the screen with out errors