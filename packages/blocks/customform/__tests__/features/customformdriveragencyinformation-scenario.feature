Feature: customformdriveragencyinformation

    Scenario: User navigates to customformdriveragencyinformation
        Given I am a User loading customformdriveragencyinformation
        When I navigate to the customformdriveragencyinformation
        Then customformdriveragencyinformation will load with out errors
        And I can click back icon with out errors
        And I can get all country code api with out errors
        And I am trying to add agenecy with empty agenecy name
        And I can enter a agency name with out errors
        And I am trying to add phone number with empty phone number
        And I can enter a phone number with out errors
        And I am trying to add agency with empty address
        And I can enter a address with out errors
        And I am trying to add agency with empty area
        And I can enter a area with out errors
        And I am trying to add agency with empty block
        And I can enter a block with out errors
        And I am trying to add agency with empty house number
        And I can enter a house number with out errors
        And I am trying to add agency with empty zipcode
        And I can enter a zipcode with out errors
        And I can Update profile Should Pass and update data
        And I can Update profile Should Pass and update data with errors