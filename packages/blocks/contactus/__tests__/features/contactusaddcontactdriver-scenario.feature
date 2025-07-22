Feature: contactusaddcontactdriver

    Scenario: User navigates to contactusaddcontactdriver
        Given I am a User loading contactusaddcontactdriver
        When I navigate to the contactusaddcontactdriver
        Then contactusaddcontactdriver will load with out errors
        And I can click back icon with out errors
        And I can select state of user and call all state
        And I am trying to add contact with empty name
        And I can enter a name with out errors
        And I am trying to add contact with empty email
        And I can enter a email with out errors
        And I am trying to add contact with empty subject
        And I can enter a subject with out errors
        And I am trying to add contact with empty description
        And I can enter a description with out errors
        And I can click attachment icon with out errors
        And I can click camera icon with out errors
        And I can click gallery icon with out errors
        And I can click cancel button with out errors
        And I am trying to add contact with empty order delivered
        And I can select delivered order with out errors
        And I can Update profile Should Pass and update data
        And I can Update profile Should Pass and update data with errors
        And I can load delivered order data with out errors