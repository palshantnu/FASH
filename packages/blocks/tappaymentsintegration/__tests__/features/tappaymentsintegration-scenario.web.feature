Feature: tappaymentsintegration

    Scenario: User navigates to tappaymentsintegration
        Given I am a User loading tappaymentsintegration
        When I navigate to the tappaymentsintegration
        Then I can input amount
        Then I can input currency
        Then I can input transaction
        Then I can input order
        Then I can pay with tap
        Then I can check the transaction status
        Then I can see successful transaction
        Then I can close alert