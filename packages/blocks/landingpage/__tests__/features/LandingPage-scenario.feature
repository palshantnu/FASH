Feature: LandingPage

    Scenario: User navigates to LandingPage
        Given I am a User loading LandingPage
        When I navigate to the LandingPage
        Then I can load token with out erros
        And I can load the carsouel list
        And I can load the catalogue list
        And I can see the list of catalogues
        When There is error in response
        Then User sees alert
        And I can enter a product name with out error
        And I can go to cart screen
        And I can go to notification screen
        Given I am on landing page
        Then I can see the search bar
        Then data for carosal
        Then update address should succeed
        Then delete address should succeed
        Then wishlist add should succeed
        Then wishlist remove should succeed

    Scenario: User navigates to LandingPage checkLocation permission
        Given I am a User loading LandingPage checkLocation permission
        When I navigate to the LandingPage checkLocation permission
        Then I can load token with out erros checkLocation permission
        And I can load the carsouel list checkLocation permission
        And I can load the catalogue list checkLocation permission
        And I can see the list of catalogues checkLocation permission
        When There is error in response checkLocation permission
        Then User sees alert checkLocation permission
        And I can enter a product name with out error checkLocation permission
        And I can go to cart screen checkLocation permission
        And I can go to notification screen checkLocation permission
        Given I am on landing page checkLocation permission
        Then I can see the search bar checkLocation permission
        Then update address should succeed checkLocation permission
        Then delete address should succeed checkLocation permission
        Then I can get api call and get empty data with out error

    Scenario: User trying to utilise wishlist
        Given I am an user using the LandingPage and not signed in
        
        Then I get sign in alert
        Given I am signed in
        When I click on add to wishlist icon
        Then The catalogue is added to wishlist
        When I click the icon again
        Then It gets removed from wishlist

    Scenario: User trying to save address
        Given I am signed in to save address
        When I click on add to address
        Then Save address to UI

    Scenario: User trying to save address for home text
        Given I am signed in to save address for home text
        When I click on add to address for home text
        Then Save address to UI for home text
        
    Scenario: User trying to save address for default
        Given I am signed in to save address for default
        When I click on add to address for default
        Then Save address to UI for default

    Scenario: User trying to save address for selected address
        Given I am signed in to save address for selected address
        When I click on add to address for selected address
        Then Save address to UI for selected address

    Scenario: User trying to save address to load image
        Given I am signed in to save address to load image
        When I click on add to address to load image
        Then Save address to UI to load image

    Scenario: User trying to save address to load image for carousel
        Given I am signed in to save address to load image for carousel
        When I click on add to address to load image for carousel
        Then Save address to UI to load image for carousel

    Scenario: User trying to remove address check
        Given I am signed in to remove address check
        When I click on to remove address check
        Then Save address to UI to remove address check