Feature: customformaddvehicle

    Scenario: User navigates to customformaddvehicle
        Given I am a User loading customformaddvehicle
        When I navigate to the customformaddvehicle
        Then customformaddvehicle will load with out errors
        And I can click on back button store with out errors
        And I am trying to submit with empty license data
        And I can enter a license data with out errors
        And I can click on open camera button store with out errors
        And I am find the testId btn_camera
        And I am find the testId btn_gallery
        And I can click on open camera button insurance with out errors
        And I am find the testId btn_camera insurance
        And I am find the testId btn_gallery insurance
        And I am find the testId btn_cancelMedia
        And I can click on upload photo button store with out errors
        And I can click on retake photo button store with out errors
        And I can click on retake insurance photo button store with out errors
        And I can upload profile photo api with out errors
        And I can will load agency authorization letter with out errors
        And I can will upload api with errors