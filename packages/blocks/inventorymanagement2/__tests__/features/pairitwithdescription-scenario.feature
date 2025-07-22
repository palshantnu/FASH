Feature: PairItWithDescription

    Scenario: User navigates to PairItWithDescription
        Given I am a User loading PairItWithDescription
        When I navigate to the PairItWithDescription
        Then PairItWithDescription will load with out errors
        Then Set token from session response
        Then set recived varinat details from navigation
        Then load the paired variant details
        Then I can select the sku via drop down
        Then I can able to paired the variants
        Then I can leave the screen with out errors