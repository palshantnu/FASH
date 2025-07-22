Feature: ResetNewPassword

    Scenario: User navigates to ResetNewPassword
        Given I am a User loading ResetNewPassword
        When I navigate to the Registration Screen
        Then I can press a navigate to back screen
        Then I can render password input filed
        Then I can render conform pass input filed
        Then I can render Reset Password
        Then I can check success API response
        Then I can check error API response
        Then I can check API response faild

