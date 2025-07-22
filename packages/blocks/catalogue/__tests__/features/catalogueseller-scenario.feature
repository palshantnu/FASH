Feature: catalogueseller

    Scenario: User navigates to catalogueseller
        Given I am a User loading catalogueseller
        When I navigate to the catalogueseller
        Then catalogueseller will load with out errors
        Then Set token from session response
        And I can close the modal
        And show the catalogue list
        And I can show all catalogue with list view and with out errors
        When I can search the catalogue
        Then I can see the that catalogue
        And I can leave the screen with out errors