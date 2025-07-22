Feature: ResetPassword

    Scenario: User navigates to ResetPassword
        Given I am a User loading ResetPassword
        When I navigate to the Registration Screen
        Then I can press a navigate to back
        Then user gets error response

