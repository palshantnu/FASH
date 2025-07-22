Feature: StylistList
  Scenario: I am a buyer opening stylist listing page
    Given I can see the list of stylist
    When I scroll
    Then I can see more data loaded
    When I click on favorite
    Then favorite button changes
    When I click on favorite again
    Then stylist is removed from favorite
    When I search a name
    Then I can see results
    When there is no results
    Then I can see empty message