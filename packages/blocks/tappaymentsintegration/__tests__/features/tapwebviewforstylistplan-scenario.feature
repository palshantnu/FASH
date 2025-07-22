Feature: TapWebViewForStylistPlan

    Scenario: Buyer opens up the TapWebViewForStylistPlan screen
        Given Buyer is on the TapWebViewForStylistPlan screen
        When The page loads completely
        Then Buyer can see the page without errors
        When charge is captured
        Then user goes to success screen
        When charge is not captured
        Then user goes back with alert