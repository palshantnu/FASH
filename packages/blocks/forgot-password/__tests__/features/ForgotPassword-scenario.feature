Feature: ForgotPassword

    Scenario: User navigates to ForgotPassword
        Given I am a User loading ForgotPassword
        When I navigate to the Registration Screen
        Then I can press a navigate to back

