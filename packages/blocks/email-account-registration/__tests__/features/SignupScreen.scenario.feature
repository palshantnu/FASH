Feature: SignupScreen

    Scenario: User navigates to SignupScreen
        Given I am a User loading SignupScreen
        When I navigate to the Registration Screen
        Then I can press a navigate to back
        Then I can check fullname
        Then I can press all onpress buttons
        Then updates state correctly when onChangeText is called
        Then I can press to hide password
        Then I can enter a confimation password with out errors
        Then I can enter a phone number
        Then I can select country code
        Then I can select role
        Then Post API will return an error
        Then Registration Should Succeed
        Then handles empty name input correctly
        Then I click on term and condition checkbox button
        Then I click on term and condition button
        Then I click on privicy and statement button
        Then validation name Should Fail
        Then check createAccountSucessCallBack

    Scenario: User SignupScreen again
        Given I am a SignupScreen agin
        When I Registration Screen again
        Then I can check new pass is ok
        Then I filed validation error for comPassword
        Then I filed validation error password and compass
        Then I filed validation for phone number
        Then I filed validation for role id
        Then I filed validation error for checkbox
      
