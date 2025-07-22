Feature: refundmanagement

    Scenario: User navigates to refundmanagement
        Given I am a User loading refundmanagement
        When I navigate to the refundmanagement
        Then refundmanagement will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors