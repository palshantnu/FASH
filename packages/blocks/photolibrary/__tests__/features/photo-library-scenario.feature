Feature: PhotoLibraryView

    Scenario: Stylist opens up PhotoLibraryView
        Given Stylist is on PhotoLibraryView screen
        When The page loads completely
        Then Stylist can see the page without errors