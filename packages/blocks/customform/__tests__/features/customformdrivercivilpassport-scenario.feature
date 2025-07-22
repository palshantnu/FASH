Feature: customformdrivercivilpassport

    Scenario: User navigates to customformdrivercivilpassport
        Given I am a User loading customformdrivercivilpassport
        When I navigate to the customformdrivercivilpassport
        Then customformdrivercivilpassport will load with out errors
        And I can click on back button store with out errors
        And I can click on open camera button store with out errors
        And I am find the testId btn_camera
        And I am find the testId btn_gallery
        And I am find the testId btn_cancelMedia
        And I can click on retake photo button store with out errors
        And I can click on open camera civil id back button with out errors
        And I am find the testId btn_camera civil id back
        And I am find the testId btn_gallery civil id back
        And I can click on retake civil id back photo button store with out errors
        And I can click on open camera passport front button with out errors
        And I am find the testId btn_camera passport front
        And I am find the testId btn_gallery passport front
        And I can click on retake passport front photo button store with out errors
        And I can click on open camera passport back button with out errors
        And I am find the testId btn_camera passport back
        And I am find the testId btn_gallery passport back
        And I can click on retake passport back photo button store with out errors
        And I can click on upload photo button store with out errors
        And I can upload profile photo api with out errors
        And I can will upload api with errors