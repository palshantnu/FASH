Feature: storeProfileDetails

    Scenario: User navigates to storeprofiledetails
        Given I am a User loading storeprofiledetails
        When I navigate to the storeprofiledetails Screen
        Then I can check loader
        Then I can check imh is null
        Then I can press a navigate to back screen
        Then renders operating hours when is_open is true