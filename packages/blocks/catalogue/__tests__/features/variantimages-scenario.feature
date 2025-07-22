Feature: variantimages

    Scenario: User navigates to variantimages
        Given I am a User loading variantimages
        When I navigate to the variantimages
        Then variantimages will load with out errors
        And Set token from session response
        And I can select the different type of view
        And if I enter next button without image i should get the error
        And I can upload the image
        And I can delete the image
        And I can enter next button to create the catalouge
        And I can recive the error if unable to create the variant
        And I can click back Icon with out errors
        And I can click back button to navigate to previous screen
        And I can leave the screen with out errors