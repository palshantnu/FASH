Feature: ChatList

  Scenario: User navigates to ChatList
    Given I am a User loading ChatList
    When I navigate to the ChatList
    Then User can get error for chat list data
    Then User can get chat list data
    Then Setting data in a flatlist
    Then Search input for chat

  Scenario: User navigates to ChatList to search data
    Given I am a User loading ChatList to search data
    When I navigate to the ChatList to search data
    Then Search input for chat to search data
