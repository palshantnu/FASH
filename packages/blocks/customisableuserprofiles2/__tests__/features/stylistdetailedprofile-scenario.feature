Feature: StylistProfile

    Scenario: User navigates to StylistProfile
        Given I am a User loading StylistProfile
        When I navigate to the StylistProfile
        Then StylistProfile will load with out errors
        Then I can press various buttons