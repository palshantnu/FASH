Feature: LandingPageDriver

    Scenario: User navigates to LandingPageDriver
        Given I am a User loading LandingPageDriver
        When I navigate to the LandingPageDriver
        Then LandingPageDriver will load with out errors
        And I can change status online offile with out errors
        And I can load google map with out errors
        And I can load google map marker with out errors

    Scenario: User navigates to LandingPageDriver navigation issue
        Given I am a User loading LandingPageDriver navigation issue
        When I navigate to the LandingPageDriver navigation issue
        And I can load google map marker with out errors navigation issue