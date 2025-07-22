Feature: Mobile Phone Account Log In

    Scenario: User navigates to Mobile Log In
        Given I am a User attempting to Log In with a Mobile Phone
        When I navigate to the Log In Screen
        Then I can select Log In with Soical Media Account
        And I can select Log In with Email Account
        And I can select the Log In button with out errors
        And I can update country code
        And I can enter a phone number with out errors
        And I can select the google login button with out errors
        And I can select the google login button api calling with errors
        And I can select the google login button api calling with out errors
        And I can select the google login button api calling and redirection with out errors
        And I can select the google login button api calling and redirection with out errors checkout
        And I can select the apple login button with out errors
        And I can leave the screen with out errors

    Scenario: Empty Mobile Phone Number
        Given I am a User attempting to Log In with a Mobile Phone
        When I Log In with an empty Mobile Phone Number
        Then Log In Should Fail
    
    Scenario: Mobile Phone Number
        Given I am a Registed User attempting to Log In with a Mobile Phone
        When I Log In with Mobile Phone Number, and have a Country Code
        Then Log In Should Succeed
        And RestAPI will return token