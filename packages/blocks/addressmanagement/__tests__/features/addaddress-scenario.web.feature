Feature: AddressManagement

    Scenario: User navigates to addaddress
        Given I am a User loading addaddress
        When I navigate to the addaddress
        Then addaddress will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors