Feature: AddressEditDriver

    Scenario: User navigates to AddressEditDriver
        Given I am a User loading AddressEditDriver
        When I navigate to the AddressEditDriver
        Then AddressEditDriver will load with out errors
        And I can click back icon with out errors
        And I can get edit address api with out errors
        And I am trying to update address with empty address
        And I can enter a address with out errors
        And I am trying to update address with empty area
        And I can enter a area with out errors
        And I am trying to update address with empty block
        And I can enter a block with out errors
        And I am trying to update address with empty house number
        And I can enter house number order with out errors
        And I can enter a zipcode with out errors
        And I can Update address Should Pass and update data
        And I can Update address Should Pass and update data with errors