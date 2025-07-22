Feature: customformbuyerfavstylist

    Scenario: User navigates to customformbuyerfavstylist
        Given I am a User loading customformbuyerfavstylist
        When I navigate to the customformbuyerfavstylist
        Then customformbuyerfavstylist will load with out errors
        And I can click on back button fav stylist with out errors
        And I can load vehicle api with out errors
        And I can render vehicle flatlist with out errors
        And I can enter text stylist for empty search with out errors
        And I can enter text stylist for search with out errors
        And I can call fav stylist api with errors