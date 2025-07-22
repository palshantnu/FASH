Feature: createOffer

    Scenario: User navigates to createOffer
        Given I am a User loading createOffer
        When I navigate to the createOffer
        Then I can leave the screen with out errors
        And createOffer will load with out errors