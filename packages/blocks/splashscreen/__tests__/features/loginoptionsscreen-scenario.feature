Feature: LoginOptionsScreen

    Scenario: User navigates to LoginOptionsScreen
        Given I am a User loading LoginOptionsScreen
        When I navigate to the LoginOptionsScreen
        Then LoginOptionsScreen will load with out errors
        And I can change login mode
        And I can change app language
        And I can change app language arabic
        And I can change currency
        When I chose buyer mode
        Then I do not see login screen
        When I click on other modes
        And I can change currency dollar
        Then I can leave the screen with out errors