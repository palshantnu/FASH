Feature: AddressManagement

    Scenario: User navigates to AddAddress
        Given I am a User loading AddAddress
        When I navigate to the AddAddress
        Then AddAddress will load with out errors
        And I can press navigate to go back
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can select the edit button with with out errors
        And Add address API Should Fail
        And add address should succeed
        And edit address should succeed
        And edit address API Should Fail
        And Call RestAPIs without errors
        And I can toggle default address
        And I can leave the screen with out errors

    Scenario: User adding empty address
        Given I am a User loading AddAddress
        When I navigate to the AddAddress
        Then I failed validation error name
        And I failed validation error area
        And I failed validation error block
        And I failed validation error address
        And I failed validation error housenumber
        And I failed validation error city
        And I failed validation error zipcode
        And I failed validation error contactnumber

    Scenario: User navigates to Addresses
        Given I am a User loading Addresses
        When I navigate to the Addresses
        Then Addresses will load with out errors
        And I can show all address with list view and with out errors
        And I can show all address with list view with address type and with out errors
        And I can show all address with list view with null address type
        And get address should succeed
        And get address should fail
        And delete address should succeed
        And delete address should fail
        And get empty address should succeed
        And Call RestAPIs without errors
        And I can leave the screen with out errors

    Scenario: User navigates to Assign Addresses
        Given I am a user loading select address
        When The page loads
        Then I can see Addresses
        When I click on Add New Addresses
        Then I go to add address
        When I click on checkbox
        Then It assigns the address to order
        When I click on checkout
        Then I can go to checkout

     Scenario: User navigates to Assign Addresses From Chat
        Given I am a user loading select address
        When The page loads
        Then I can see Addresses
        When I click on Add New Addresses
        Then I go to add address
        When I click on checkbox
        Then It assigns the address to order
        When I click on checkout
        Then I can go to checkout