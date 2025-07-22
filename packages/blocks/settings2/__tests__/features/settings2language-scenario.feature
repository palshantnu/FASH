Feature: Settings2Language

    Scenario: User navigates to Settings2Language
        Given I am a User loading Settings2Language
        When I navigate to the Settings2Language
        Then Settings2Language will load with out errors
        And I can click back button with out errors
        And I can change app language
        And I can change currency
        And I can update language and currency api with out errors
        And I can update language and currency api with errors
        And I can leave the screen with out errors
        And I can call get language api arabic language with out errors
        And I can change currency dollar and update

    Scenario: User navigates to Settings2Language for currency update
        Given I am a User loading Settings2Language for currency update
        When I navigate to the Settings2Language for currency update
        Then I can click back button with out errors for currency update

    Scenario: User navigates to Settings2Language for currency update with out token
        Given I am a User loading Settings2Language for currency update with out token

    Scenario: User navigates to Settings2Language for currency update with out token with ar lang
        Given I am a User loading Settings2Language for currency update with out token