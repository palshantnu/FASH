Feature: tappaymentsintegration

    Scenario: User navigates to tappaymentsintegration
        Given I am a User loading tappaymentsintegration
        When I navigate to the tappaymentsintegration and check with validation data
        When Charge api will called
        Then tappaymentsintegration will load with out errors and charge api will called
        When Coming back to screen with success response
        Then Alert with payment response will show
        When Webhook api will provide response
        Then Webhook api will provide response