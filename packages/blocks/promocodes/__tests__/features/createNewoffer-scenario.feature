Feature: createNewOffer

    Scenario: User navigates to createNewOffer
        Given I am a User loading createNewOffer
        When I navigate to the createNewOffer
        Then I can leave the screen with onLeftPress out errors
        And createNewOffer will load with out errors
        And I can leave the screen with out errors
        

    Scenario: User navigates to createNewOffer for promocode
        Given I am a User loading createNewOffer for promocode
        When I navigate to the createNewOffer for promocode
        Then I can leave the screen with out errors for new test for promocode
        
    Scenario: User navigates to createNewOffer for minvalue
        Given I am a User loading createNewOffer for minvalue
        When I navigate to the createNewOffer for minvalue
        Then I can leave the screen with out errors for new test for minvalue
        
    Scenario: User navigates to createNewOffer for start date
        Given I am a User loading createNewOffer for start date
        When I navigate to the createNewOffer for start date
        Then I can leave the screen with out errors for new test for start date

    Scenario: User navigates to createNewOffer for end date
        Given I am a User loading createNewOffer for end date
        When I navigate to the createNewOffer for end date
        Then I can leave the screen with out errors for new test for end date

    Scenario: User navigates to createNewOffer for end date validation
        Given I am a User loading createNewOffer for end date validation
        When I navigate to the createNewOffer for end date validation
        Then I can leave the screen with out errors for new test for end date validation

    Scenario: User navigates to createNewOffer for t and c
        Given I am a User loading createNewOffer for t and c
        When I navigate to the createNewOffer for t and c
        Then I can leave the screen with out errors for new test for t and c
        
        