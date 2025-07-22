Feature: savedcards

  Scenario: User navigates to savedcards
    Given I am a User loading savedcards
    When I navigate to the savedcards
    Then savedcards will load with out errors
    When I click on deletecard
    Then I get pop up
    When I accept pop up
    Then Card gets removed
    When I click on add card
    Then I can add card
    And I can leave the screen with out errors
