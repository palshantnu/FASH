Feature: BuyerProductSourcingView

    Scenario: Buyer opens up BuyerProductSourcingView
        Given Buyer is on BuyerProductSourcingView screen
        When The page loads completely
        Then Buyer can see the page without errors
        Then Buyer can press the Back Button
        Then Buyer can see and press the Reject Button
        Then Buyer can press No button
        Then Buyer can press Yes button
        Then Buyer can see and press the Accept Button
        Then Buyer can press No button
        Then Buyer can press Yes button
        Then Buyer can see and press the Chat Button
        Then Buyer can refresh the ScrollView on pull
        Then Buyer can see acceptChatText button

    Scenario: Buyer opens up BuyerProductSourcingView without any bids
        Given Buyer is on BuyerProductSourcingView screen
        When The page loads completely
        Then Buyer can see the page without errors