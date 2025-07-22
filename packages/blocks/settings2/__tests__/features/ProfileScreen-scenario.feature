Feature: PofileScreen

    Scenario: User navigates to pofileScreen
        Given I am a User loading pofileScreen
        When I navigate to the pofileScreen and get token
        Then pofileScreen will load with out errors
        Then I can press back button
        Then I can render components
        Then I can check all filed enter success fully for update profile
        Then I can press button of update profile
        Then updateProfileSucessCallBack should call navigate on success
        Then updateProfileFailureCallBack should handle errors and call Alert
        Then I can check password filled are filed
        Then I can press button of change password
        Then I can check reset New PasswordSucessCallBack
        Then I can check reset New Password FailureCallBack
        Then I can check hide show btn

      Scenario: User put invalid filed
        Given I am a User loading pofileScreen again
        When I can put invaid filed
        Then pofileScreen will load with out errors
        Then I can check full name is empty
        Then I can check email validation
        Then I can check phoneNumber is empty
        Then I can check oldPassword is empty
        Then I can check new is empty
        Then I can check old and new pass is same
        Then I can check new pass is ok
        Then I can check comform pass
        Then I can check new and conform is same
        Then remaing all dues
        Then remaing getUserInfoSucessCallBack
        Then success resetNewPasswordApiCallID
        Then check failure response
        Then check password success response