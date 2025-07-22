Feature: NavigationMenu

    Scenario: User navigates to NavigationMenu
        Given I am a User loading NavigationMenu
        When I navigate to the NavigationMenu
        Then NavigationMenu will load with out errors
        And I can click and view the analytics
        And I can click and view the sales report
        And I can click and view the revenue
        And I can click and view the activity
        When I click the logout button 
        Then I can see the confirm modal for logout
        Then I can confirm and logout from the app 
        Then I can click close icon to close the app
        And I can leave the screen with out errors