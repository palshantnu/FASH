Feature: customformeditstoredetails

    Scenario: User navigates to customformeditstoredetails
        Given I am a User loading customformeditstoredetails
        When I navigate to the customformeditstoredetails
        Then customformeditstoredetails will load with out errors
        And I can click on back button edit store with out errors
        And I can get navigation payload with out errors
        And I can click on store detail with out errors
        And I can click on edit image with out errors
        And I am find the testId btn_camera
        And I am find the testId btn_gallery
        And I am find the testId btn_cancelMedia
        And I am trying to next with empty store name
        And I can enter a store name with out errors
        And I am trying to next with empty store name arabic
        And I can enter a store name arabic with out errors
        And I am trying to next with empty store description
        And I can enter a store description with out errors
        And I am trying to next with empty store description arabic
        And I can enter a store description arabic with out errors
        And I am Update store detail and image api with out errors
        And I can click on address detail with out errors
        And I can get all country code api with out errors
        And I am trying to next with empty address
        And I can enter a address with out errors
        And I am trying to next with empty area
        And I can enter a area with out errors
        And I am trying to next with empty area arabic
        And I can enter a area arabic with out errors
        And I am trying to next with empty block
        And I can enter a block with out errors
        And I am trying to next with empty block arabic
        And I can enter a block arabic with out errors
        And I can enter a mall name with out errors
        And I can enter a mall name arabic with out errors
        And I can enter a floor with out errors
        And I can enter a floor arabic with out errors
        And I can enter a unit with out errors
        And I am trying to next with empty city
        And I can enter a city with out errors
        And I am trying to next with empty city arabic
        And I can enter a city arabic with out errors
        And I am trying to next with empty zip code
        And I can enter a zip code with out errors
        And I am trying to next with empty payment mode
        And I can select payment mode with out errors
        And I am trying to next with empty driver reach instruction
        And I can enter a driver reach instruction with out errors
        And I am trying to next with empty driver reach instruction for arabic
        And I can enter a driver reach instruction for arabic with out errors
        And I am trying to add phone number with empty phone number
        And I can enter a phone number with out errors
        And I should find the testId btnRedirectGps
        And I am get api call for check store name with out errors
        And I am get api call for check store name with errors
        And I am Update store detail api with out errors
        And I am Update store detail api with contact errors
        And I am Update store detail api with zipcode errors
        And I can leave the screen with out errors