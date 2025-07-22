Feature: customformmap

    Scenario: User navigates to customformmap
        Given I am a User loading customformmap
        When I navigate to the customformmap
        Then customformmap will load with out errors
        And I can load google map with out errors
        And I can load google map marker with out errors
        And I can text search google with out errors
        And I can text map header back with out errors
        And I can confirm location the button with with out errors
        And I can leave the screen with out errors