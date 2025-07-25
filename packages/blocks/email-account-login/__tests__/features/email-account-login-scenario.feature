Feature: Email Address Account Log In

    Scenario: User navigates to Email Log In
        Given I am a User attempting to Log In with a Email
        When I navigate to the Log In Screen
        Then I can select the Log In button with out errors
        And I can select the Forgot Password button with out errors
        And I can enter a email address with out errors
        And I can enter a password with out errors
        And I can select the Password eye button with out errors
        And I can select the Password eye button false condition with out errors
        And I can select the Signup button with out errors
        And I can select the phone button with out errors
        And I can select the google login button with out errors
        And I can select the google login button api calling with errors
        And I can select the google login button api calling with out errors
        And I can select the google login button api calling and redirection with out errors
        And I can select the apple login button with out errors
        And I can click the facebook login button with out errors
        And I can back button with out errors
        And I can leave the screen with out errors

    Scenario: Empty Email Address
        Given I am a User attempting to Log In with a Email Address
        When I Log In with an empty Email Address
        Then Log In Should Fail

    Scenario: Email Address and Empty Password
        Given I am a User attempting to Log In with a Email Address
        When I Log In with a Email Address and empty Password
        Then Log In Should Fail

    Scenario: Password and Empty Email Address  
        Given I am a User attempting to Log In with a Email Address
        When I Log In with a Password and empty Email Address
        Then Log In Should Fail
    
    Scenario: Email Address and Password
        Given I am a Registed User attempting to Log In with a Email Address
        When I Log In with Email Address and Password
        Then I can see login errors
        And Log In Should Succeed
        And RestAPI will return token

    Scenario: Remember Me - Email Address Account Log In 
        Given I am a Registed User who has already Logged In and selected Remember Me
        When I navigate to Email Address Account Log In
        Then The Country Code, Email Address and Password will be restored

    Scenario: I am a stylist trying to sign In
        Given I have filled up correct credentials
        When I click on sign In
        Then I go to expected screen