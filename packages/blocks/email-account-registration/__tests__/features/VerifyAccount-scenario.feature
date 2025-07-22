Feature: VerifyAccount

    Scenario: User navigates to VerifyAccount
        Given I am a User loading VerifyAccount
        When I am a User attempting to enter Otp
        Then I can go to back screen
        Then I can enter OTP with out errors
        Then I can verify OTP with out errors
        Then I can verify OTP with email and phone changed out errors
        Then I can select Varify OTP button with out errors
    
    Scenario: User Enters A Invalid Otp
        Given I am a User attempting to enter Otp
        When I navigate to the phone-verification
        Then I am entering empty otp
        Then I am entering wrong otp
        Then I can resend otp
        Then I can select the Resend button with out errors
        Then Post verify API will return an error
        Then Update details verify API will return an error
        Then Update details verify API will not return an error
        Then Update email details verify API will not return an error
        Then Post resend API will return an error
        Then check accountSucessCallBack
        Then check accountFailureCallBack
        Then check resendOTPSucessCallBack
       

