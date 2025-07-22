Feature: tappaymentsWebview

    Scenario: User navigates to tappaymentsWebview
        Given I am a User loading tappaymentsWebview
        When I navigate to the tappaymentsWebview will load webURL to load
        Then Webview will set
        When Payment will done on webview
        Then Webview will close with success data return

    Scenario: User loads a charge URL
        Given user has opened a charge URL
        When charge is captured
        Then user goes to success screen
        When charge is not captured
        Then user goes back with alert