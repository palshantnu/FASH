Feature: NotificationsBuyer

    Scenario: User navigates to NotificationsBuyer
        Given I am a User loading NotificationsBuyer
        When I navigate to the NotificationsBuyer
        Then NotificationsBuyer will load with out errors
        And I can click on back button notification with out errors
        And I can click on setting button with out errors
        And I can click on all tab button with out errors
        And I can click on deal tab button with out errors
        And I can click on your order button with out errors
        And I can render notification flatlist with out errors
        And I can render notification flatlist unread notification with out errors