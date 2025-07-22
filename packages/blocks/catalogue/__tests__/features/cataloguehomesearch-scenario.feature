Feature: CatalogueHomeSearch

    Scenario: User navigates to catalogue
        Given I am a User loading catalogue
        When I navigate to the catalogue
        Then catalogue will load with out errors
        And I can click back Icon with out errors
        And I can show token and navigation payload data with out errors
        And I can call api catalogue with out errors
        And I can show all catalogue with list view and with out errors
        And I can call api catalogue with errors
        And I can enter a catalogue name with out errors
        And I can leave the screen with out errors

    Scenario: User applied some filters
        Given I am a user who applied filters
        When I visit catalogue screen
        Then I see filtered results