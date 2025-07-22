Feature: notificationsettingsstylist

    Scenario: User navigates to notificationsettingsstylist
        Given I am a User loading notificationsettingsstylist
        When I navigate to the notificationsettingsstylist
        Then notificationsettingsstylist will load with out errors
        And I reach end it should go for lazy loading in notification status
        And I can click back notification page with out errors
        And I can change order new push with out errors
        And I can change order confirmations push with out errors
        And I can change delivery confirmations push with out errors
        And I can change reviews and feedback push with out errors
        And I can change refund or payment push with out errors
        And I can change marketing emails push with out errors
        And I can change product stock updates push with out errors
        And I can change order invoices email with out errors
        And I can change order confirmations email with out errors
        And I can change delivery confirmations email with out errors
        And I can change reviews and feedback email with out errors
        And I can change refund or payment email with out errors
        And I can change marketing emails email with out errors
        And I can change product stock updates email with out errors
        And I am change status according to condition calling api without errors
        And I am change status according to condition calling api with errors