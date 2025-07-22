Feature: dashboardasbuyer

    Scenario: User navigates to dashboardasbuyer
        Given I am a User loading dashboardasbuyer
        When I navigate to the dashboardasbuyer
        Then dashboardasbuyer will load with out errors
        Then user clicks on categoryImage and store Image
        Then user clicks heart button
        Then user clicks on the processing,delivered button
        Then user goes back
        Then  component mounts api hits and user is able to see products
        Then user clicks on the product
        Then component mounts api hits and wish list is created
        Then user scrolls inorder to get more product lists
        Then component mounts and wishlist details are fetched
        Then added to wishlist
        When wish list true in product list
        Then user is able to remove the wishlist
        When modal is true
        Then stylist selects the user and adds the product to wishlist
        Then stylist can search and find the clients in modal