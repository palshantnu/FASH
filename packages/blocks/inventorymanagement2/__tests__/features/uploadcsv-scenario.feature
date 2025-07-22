Feature: uploadcsv

    Scenario: User navigates to uploadcsv
        Given I am a User loading uploadcsv
        When I navigate to the CSV screen
        Then uploadcsv will load with out errors
        Then Set token from session response
        Then I can click back button to goback
        When I pick or reupload CSV file
        Then It will upload
        When I call upload CSV Api
        Then I can leave the screen with out errors
