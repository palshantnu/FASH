Feature: tappaymentdriverearning

  Scenario: User navigates to tappaymentdriverearning
    Given I am a User loading tappaymentdriverearning
    When I navigate to tappaymentdriverearning
    Then tappaymentdriverearning will load
    And I can click refresh button with out errors
    And I can show earning method flatlist by render with out errors
    And I can click on calendar open with out errors
    And I can click on calendar on change with out errors
    And I can click on calendar close with out errors
    And I should render earning data in flatlist and click weekly with out errors
    And I can click on weekly calendar on change with out errors
    And I should render earning data in flatlist and click monthly with out errors
    And I can click on monthly calendar on change with out errors
    And I can show earning api work with out errors
    And I can click see detail redirect with out errors
    And I can click payment method redirect with out errors
    And I can click help and support redirect with out errors
    And I can show earning activity work with errors
    And I should render earning data in flatlist and click undefined with out errors