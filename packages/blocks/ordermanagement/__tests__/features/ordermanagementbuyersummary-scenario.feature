Feature: ordermanagementbuyersummary

    Scenario: User navigates to ordermanagementbuyersummary
        Given I am a User loading ordermanagementbuyersummary
        When I navigate to the ordermanagementbuyersummary
        Then ordermanagementbuyersummary will load with out errors
        And I can back button with out errors
        And I can navigation payload with out errors
        And I can show all order api work with out errors
        And I can show all order flatlist by render with out errors
        And I can show return order flatlist by render with out errors
        And I can show all order stylist flatlist by render with out errors