Feature: ChatView

  Scenario: User navigates to ChatView
    Given I am a User loading ChatView
    When I navigate to the ChatView
    Then User can open modal successfully
    Then User can give feedback
    Then User can select from dropDown menu
    Then User can report person successfully
    Then Report person error message
    Then Reasons to report person
