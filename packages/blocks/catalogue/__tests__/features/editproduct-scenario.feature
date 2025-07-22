Feature: EditProduct

    Scenario: User navigates to EditProduct
        Given I am a User loading EditProduct
        When I navigate to the EditProduct
        Then EditProduct will load with out errors
        Then Set token from session response
        Then set recived catalogue details from navigation
        Then load the initialize the variants
        Then I can get the error for missing values
        Then I can edit the product details
        Then I can load categories ,subcategories and subsubcategories
        Then I can update the product details
        When I can select update variants tab
        Then I can load size and color list
        Then I can create the variant
        Then I can enter all the values
        Then I can enter sku value if it alredy exist then it give the error
        Then I can edit alredy exit sku
        When I can select upload image tab
        Then I can select the different type of view
        And if I enter next button without image i should get the error
        And I can upload the image
        And I can update the variant details
        When I can select assign store tab
        Then load the assign store details
       Then I can show all stores list
       Then I can select the all store checkbox
       Then I can able to search the store
       Then I can update the assign details
        Then I can leave the screen with out errors
       