Feature: verify account

    Scenario: User navigates to verify account screen
        Given I am a User attempting to enter Otp
        When I navigate to the verify account
        Then I can go back with out errors
      
        
    Scenario: User Enters A Invalid Otp
        Given I am a User attempting to enter Otp
        When I navigate to the verify screen
        Then I am entering empty otp
         And I am entering wrong otp
         And I am entering right otp
        
       