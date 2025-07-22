Feature: CsvFileUpload

    Scenario: User navigates to CsvFileUpload
        Given I am a User loading CsvFileUpload
        When I navigate to the CsvFileUpload
        Then CsvFileUpload will load with out errors
        Then I can click back button to goback
        Then I can pick file
        Then Set token from session response
        Then I pick or reupload CSV file
        Then I call upload CSV Api successfully
        And I can leave the screen with out errors