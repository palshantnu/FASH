Feature: AccountActivation

    Scenario: User navigates to AccountActivation
        Given I am a User loading AccountActivation
        When I navigate to the AccountActivation
        Then Set token from session response
        Then I can fetch the country list
        Then I can fill the form in first page
        Then I can fill the form in second page
        Then I can Upload the Images
        Then I can Upload the details to api