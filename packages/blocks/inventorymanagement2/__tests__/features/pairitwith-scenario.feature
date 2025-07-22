Feature: PairItWith

    Scenario: User navigates to PairItWith
        Given I am a User loading PairItWith
        When I navigate to the PairItWith
        Then PairItWith will load with out errors
        Then Set token from session response
        Then load the variant details
        Then I can show all variant list
        Then I can able to search the variant
        Then I can able to click variant to navigate next screen
        Then I can leave the screen with out errors
       