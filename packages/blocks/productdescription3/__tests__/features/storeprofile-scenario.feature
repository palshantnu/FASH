Feature: storeProfile

    Scenario: User navigates to storeprofile
        Given I am a User loading storeprofile
        When I navigate to the storeprofile Screen
        Then I can load token with out errors
        And I can get navigation payload with out errors
        And I can press a navigate to back screen
        And I can press a navigate to store description screen
        And I can load store api with out errors
        And I can call store catalogue api with out errors
        And I can render catalogue flatlist with out errors
        And I am trying to catalogue search with out errors

    Scenario: User navigates to storeprofile with out token
        Given I am a User loading storeprofile with out token
        When I navigate to the storeprofile Screen with out token
        Then I can load token empty with out errors
        And I can call store catalogue api with out errors
        And I can render catalogue flatlist with out errors
        And I am trying to catalogue search with out errors
        And I can call store catalogue api with errors
        And I can get navigation payload undefined