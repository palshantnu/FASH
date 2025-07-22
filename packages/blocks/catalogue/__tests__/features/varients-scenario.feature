Feature: varients

    Scenario: User navigates to varients
        Given I am a User loading varients
        When I navigate to the varients
        Then varients will load with out errors
        And set token from session response
        And As a user i can select the size
        And As a user i can select the color
        And I can create the variants
        And If user click the next button without empty value it should give the error
        And user can enter all the values
        And user enter same sku value it should give the error
        And user enter sku value if it alredy exist then it give the error
        And user can go to next screen with enter the valid values
        And I can click back Icon with out errors
        And I can leave the screen with out errors