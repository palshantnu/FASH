Feature: Chat

  Scenario: User navigates to Chat
    Given I am a User loading Chat
    When I navigate to the Chat
    Then Chat will load with out errors
    Then User can type the message successfully
    Then User can send message successfully
    Then User can send message with attachments successfully
    Then User can open modal successfully
    Then User can block person
    Then User can block person error message
    Then User can make payment
    Then User can create chat

  Scenario: User navigates to Chat wishlist
    Given I am a User loading Chat wishlist
    When I navigate to the Chat wishlist
    Then Chat will load with out errors wishlist