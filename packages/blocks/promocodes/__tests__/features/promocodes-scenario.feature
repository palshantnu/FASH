Feature: promocodes

    Scenario: User navigates to promocodes
        Given I am a User loading promocodes
        When I navigate to the promocodes
        Then I can leave the screen with onLeftPress out errors
        And promocodes will load with out errors
        And I can leave the screen with out errors