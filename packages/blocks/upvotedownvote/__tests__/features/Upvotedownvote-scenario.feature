Feature: Upvotedownvote

    Scenario: User navigates to Upvotedownvote
        Given I am a User loading Upvotedownvote
        When I navigate to the Upvotedownvote
        Then Upvotedownvote will load with out errors
        And I can press the like button without errors 
        And I can press the dislike button without errors
        And Update state correctly on handleLike 
        And Update state correctly on handlDisLike
        And I can leave the screen with out errors