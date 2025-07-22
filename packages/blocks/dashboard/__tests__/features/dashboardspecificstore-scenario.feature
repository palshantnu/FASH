Feature: Dashboardspecificstore

    Scenario: User navigates to dashboardspecificstore
        Given I am a User loading dashboardspecificstore
        When I navigate to the dashboardspecificstore
        Then Dashboardspecificstore will load with out errors
        And set recived store information from navigation
        And I can able to change opne close status
        And I can able to fetch the new order
        And I can able to show the new order
        And I can able to click the accept order
        And I can able to click the reject order
        When I can able to click the view all button
        Then I can leave the screen with out errors