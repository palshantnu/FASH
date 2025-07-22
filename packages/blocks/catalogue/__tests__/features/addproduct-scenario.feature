Feature: addproduct

    Scenario: User navigates to addproduct
        Given I am a User loading addproduct
        When I navigate to the addproduct
        Then addproduct will load with out errors
        And Set token from session response
        And As a user i can enter the product name
        And I can select gender
        And I can select category
        And I can select subcategory
        And I can select subSubcategory
        And As a user i can enter the brand name
        And As a user i can select listed button
        And As a user i can select unlisted button
        And As a user i can enter the material name
        And As a user i can enter the fit
        And As a user i can enter the product care
        And As a user i can enter the product description
        And As a user i enter the all the details and checking unique name
        And As a user enter the next button without entering the value it throws an error
        And I can click back Icon with out errors
        And I can leave the screen with out errors
        When i add data in input product name
        Then i can see the added input

    Scenario: User navigates to hide scroll indicator
        Given I am a User loading to hide scroll indicator
        When I navigate to hide scroll indicator
        Then i can see the to hide scroll indicatort