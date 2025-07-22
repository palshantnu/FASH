Feature: DownloadTemplates

    Scenario: User navigates to DownloadTemplates
        Given I am a User loading DownloadTemplates
        When I navigate to the DownloadTemplates
        Then DownloadTemplates will load with out errors
        Then Set token from session response
        Then I can load the DownloadTemplates
        Then I can show all DownloadTemplates list
        Then I can leave the screen with out errors