Feature: customisableuserprofiles2selleradminrequest

    Scenario: User navigates to customisableuserprofiles2selleradminrequest
        Given I am a User loading customisableuserprofiles2selleradminrequest
        When I navigate to the customisableuserprofiles2selleradminrequest
        Then customisableuserprofiles2selleradminrequest will load with out errors
        And I can click back admin request with out errors
        And I should render show admin request api with out errors
        And I should render admin request data in flatlist and pending status with out errors
        And I should render admin request data in flatlist and approved status with out errors
        And I should render show admin request api with errors
        And I can leave the screen with out errors