Feature: loyaltyredeem

  Scenario: User navigates to loyaltyredeem
    Given I am a User loading loyaltyredeem
    When I navigate to loyaltyredeem
    Then loyaltyredeem will load
    And I can click back loyalty redeem with out errors
    And I can show all loyaty points method api work with out errors
    And I can show all loyalty point redeem flatlist by render with out errors
    And I can click on confirm redeem with out errors
    And I can click close redeem with out errors

  Scenario: User navigates to loyaltyredeem to show loyalty points
    Given I am a User loading loyaltyredeem to show loyalty points
    When I navigate to loyaltyredeem to show loyalty points
    And I can click close redeem with out errors to show loyalty points