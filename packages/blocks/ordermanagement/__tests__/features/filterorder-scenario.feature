Feature: FilterOrder

  Scenario: User navigates to filter order screen
    Given I am a User loading filter order

    When I clear filter button
    Then Data will be cleared

    When I click to sort by filter order
    Then sort filter loaded successfully

    When I click to oldest filter
    Then oldest loaded successfully

    When I click to order status filter
    Then order status loaded successfully

    When the order status is allOrders selected
    Then the "All orders" checkbox should be checked

    When I click to order date filter
    Then order date loaded successfully

    When I click to  last 3 month filter
    Then last 3 month loaded successfully

    When I click to press apply btn
    Then data load succesfully

    When I click to 30 days filter
    Then 30 days data loaded successfully

    When I click to press apply btn
    Then data load succesfully

    When I click to current year filter
    Then data loaded successfully

    When I click to sort by filter order
    Then sort filter loaded successfully

    When I click to mostRecent filter
    Then most recent loaded successfully

    When I click to press apply btn
    Then data load succesfully
