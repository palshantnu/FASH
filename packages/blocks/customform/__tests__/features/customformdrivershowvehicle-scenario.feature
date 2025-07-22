Feature: customformdrivershowvehicle

    Scenario: User navigates to customformdrivershowvehicle
        Given I am a User loading customformdrivershowvehicle
        When I navigate to the customformdrivershowvehicle
        Then customformdrivershowvehicle will load with out errors
        And I can click on back button vehicles with out errors
        And I can load vehicle api with out errors
        And I can render vehicle flatlist with out errors
        And I can click on add vehicle button with out errors