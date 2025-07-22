Feature: wishlist2
Scenario: user opens the screen
        Given page loads and user can see the screen
        When page loads and user receives navigation params
        Then abc
        Then for list empty components
        When page loads and user receives navigation params of falsy value
        Then checking the conditional rendering
        
    Scenario: Buyer opens wishlist2
        Given buyer has some products in wishlist2
        Then buyer can see the wishlisted products
        Then buyer can remove wishlisted products
        And buyer can add wishlist from suggetions
        When user clicks on add to cart
        Then user navigates to product description
        When user clicks on the product
        Then user navigates to product description
       When item gets rendered in order
       Then userClicks on add more
        When buyer has no products in wishlist
        Then buyer get empty wishlist message
        When component mounts and stylist go to client wishlist
        When screen loads for stylist
        Then stylist remove an item form favorite

         Scenario: stylist Opens wishlist
        Given page loads and user can see the screen
        When page loads and user receives navigation params
        Then Stylist can see rendered component
        Then button Component is found
        Then language is changed acordingly

        Scenario: stylist Opens wishlist for language
            Given page loads and user can see the screen for language
            When page loads and user receives navigation params for language
            Then language is changed acordingly for language
            Then language is changed acordingly for language for then
        