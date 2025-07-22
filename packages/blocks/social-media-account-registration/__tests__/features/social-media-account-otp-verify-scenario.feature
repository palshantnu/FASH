Feature: social-media-account-otp-verify

    Scenario: User navigates to phone-verification
        Given I am a User attempting to enter Otp
        When I navigate to the phone-verification
        Then I can go back with out errors
        Then I can enter OTP with out errors
        And I can select Varify OTP button with out errors
        
    Scenario: User Enters A Invalid Otp
        Given I am a User attempting to enter Otp
        When I navigate to the phone-verification
        Then I am entering empty otp
        And I am entering wrong otp
       
    Scenario: User Enters otp
        Given I am a User attempting to enter Otp
        When I navigate to the phone-verification
        And I tap on resend otp
        And I am entering right otp

    Scenario: User Enters otp for fogot password
        Given I am a User attempting to enter Otp
        When I navigate to the phone-verification
        And I tap on resend otp
        And I am entering right otp