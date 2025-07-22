Feature: ResetPasswordOTP

    Scenario: User navigates to ResetPasswordOTP
        Given I am a User loading ResetPasswordOTP
        When I navigate to the Registration Screen
        Then check mask email
        Then I can press a navigate to back
        Then RestAPI will return an error
        Then check all function
