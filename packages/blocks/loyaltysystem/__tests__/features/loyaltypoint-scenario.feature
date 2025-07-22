Feature: loyaltypoint

  Scenario: User navigates to loyaltypoint
    Given I am a User loading loyaltypoint
    When I navigate to loyaltypoint
    Then loyaltypoint will load
    And I can click back buyer loyalty point with out errors
    And I can show all loyaty transaction method api work with out errors
    And I can show all loyaty transaction for points method api work with out errors
    And I can show all buyer loyalty point flatlist by render with out errors
    And I can click open filter earning with out errors
    And I can click filter all btn earning with out errors
    And I can click close filter earning with out errors
    And I can click confirm filter earning with out errors
    And I can click buyer use loyalty point with out errors

    Scenario: User navigates to loyaltypoint for credit
    Given I am a User loading loyaltypoint for credit
    When I navigate to loyaltypoint for credit
    Then loyaltypoint will load for credit
    And I can click back buyer loyalty point with out errors for credit
    And I can show all loyaty transaction method api work with out errors for credit
    And I can show all loyaty transaction for points method api work with out errors for credit
    And I can show all buyer loyalty point flatlist by render with out errors for credit
    And I can click open filter earning with out errors for credit
    And I can click filter sold btn earning with out errors for credit
    And I can click close filter earning with out errors for credit
    And I can click confirm filter earning with out errors for credit
    And I can show all buyer loyalty points in FlatList without errors for credit
    And I can click buyer use loyalty point with out errors for credit

      Scenario: User navigates to loyaltypoint for debit
    Given I am a User loading loyaltypoint for debit
    When I navigate to loyaltypoint for debit
    Then loyaltypoint will load for debit
    And I can click back buyer loyalty point with out errors for debit
    And I can show all loyaty transaction method api work with out errors for debit
    And I can show all loyaty transaction for points method api work with out errors for debit
    And I can show all buyer loyalty point flatlist by render with out errors for debit
    And I can click open filter earning with out errors for debit
    And I can click filter sold btn earning with out errors for debit
    And I can click close filter earning with out errors for debit
    And I can click confirm filter earning with out errors for debit
    And I can show all buyer loyalty points in FlatList without errors for debit
    And I can click buyer use loyalty point with out errors for debit

  Scenario: User navigates to LoyaltyPoint to show on screen
    Given I am a User loading LoyaltyPoint to show on screen
    When I navigate to LoyaltyPoint to show on screen
    Then I can click close filter earning with out errors to show on screen