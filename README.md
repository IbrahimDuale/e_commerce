# Online Store
 An online store project

## Requirements

### Functional requirements
- **Login, signup and logout:** Users can create, login and logout of their account.
- **View, add, edit and delete products:** Users can view products and admins can add, edit and delete products.
- **View, add, edit and delete products' categories :** Users can view products and admins can add, edit and delete products' categories.
- **Search products:** Users can search products based on a string key.
- **View, add, update quantity and delete products in cart:** Users can view, add and delete products in their cart
- **Purchase items in cart:** Users can securely purchase items in their cart.
- **View past orders:** Users can view summaries of their past orders.

### Non-functional requirements
- **Available:** Website is highly available.
- **Scalable:** Website scales gracefully with increased users.
- **Consistent:** products in the user's cart reflects the products that the user added to their cart.
- **Secure:** payment system is secure.

## App design
![The shop's components and dependencies.](./images/design.png)
### Use Cases
- Users start by visiting the Home page and can
    - visit the Login or Signup page
        - in the Login or Signup page, users can
            - login or signup and on success be redirected back to the Home page
    - logout if logged in
    - search products using a search box
        - When search is entered, user is directed to the Products page and can
            - view products' summaries matching the search string
                - clicking a product takes the user to the Product page where they can
                    - view the product in greater detail
                    - add the product to their cart
    - view all products' categories
        - clicking a category takes the user to the Products page filtered by the clicked category
            - clicking a product takes the user to the Product page where they can
                - view the product in greater detail
                - add the product to their cart
    - view popular products' summaries
        - clicking a popular product takes the user to the Product page where they can
            - view the product in greater detail
            - add the product to their cart
    - view the quantity of products in their cart
    - Users can navigate to the Cart page and can
        - lower in quantity or remove a product from their cart
        - view sum of all products' prices in their cart
        - go to the Checkout page where they can securely purchase all products in their cart
            - On successful purchase user is directed to the Successful Purchase page
    - visit the Order History page and view summaries of their past orders.
- An admin, after logging into the Admin login page, can search, view, add, edit and delete products and products' categories.
- Users can anonymously
    - search products by search string
    - search products by products' categories.
    - add products to their cart
    - change in quantity or remove products in their cart
    - securely purchase products in their cart

### Services' descriptions
##### Web Server
Serves static web pages that the user uses to interface with other services.
##### Authentication
Handles login, logout and sign up of the user. Only when the user is logged in, can he or she view their order history, cart and user info. Additionally, a user logged with an admin account can view, add, update and delete products and product categories. After the user signs up, the service stores the user's info using the User Account service and automatically logs the user in.

##### Users' accounts
Gets, updates and adds user's info in a database. Ensures users can only get and update their own info and only a sign up event adds a new entry to the database.
##### Products
Anyone can retrieve a products info. Used to get, update and create new products. Only an admin account can update and create new products.
##### Products' categories
similar to  the Products service
##### Images' manager
similar to  the Products service
##### Products' manager
Only admin accounts can access this service. This service is used to create a product and/or product category with its associated images and stores them using the appropriate service. This service links the product and/or product categories with the images they were created with stored in the blob store. Additionally, Admins can view, update and delete products and products' categories and their associated images.
##### Search
Anyone can use this service. Used to search products given a query string or filter. When searching by query string, products with a title matching the query string are returned. When searching by filter, product categories matching the filter are returned.
##### Carts
Users can only modify their cart. Used to get, add, update, and delete products in their cart.
##### Orders' histories
Gets, and adds summaries of users' purchases. Users restricted to get their own purchase summaries. Orders are added automatically when a purchase event is fired.
##### Checkout
Helps users securely make a purchase. User does not interact with this service directly.


### Database schema
![Database Schema.](./images/schema.png)
*Above is a sql-like view of the tables in the nosql database. The only exception is the images table which will be implemented as a blob store.

#### accounts
- Document path: accounts/{user id}
- Data:
    - Name
        - the user's name
#### user access
- Document path: accounts/{user id}
- Data:
    access
        - User's access level; a string that's either USER or ADMIN.
#### carts
- Document path: carts/{cart id}/products/{product id}
- Data:
    - quantity
        - number of {product id} in the cart
#### orders metadata
- Document path: orders_metadata/{user id}/purchases/{generic id}
- INDEX : purchase date 
- Data:
    - purchase date
        - date the user completed the purchase
    - order id 
        - used to query the products the user ordered associated with the order id 
    - total price
        - price the user paid for the order
#### orders
- Document path: orders/{order id}/products/{product id}
- Data:
    - quantity
        - number of items of {product id}
#### products
- Document path: products/{product id}
- Data:
    - title
        - product's name
    - description
        - a small summary of what the product is
#### prices
- Document path: prices/{product id}
- Data:
    - price
        - price of the product
#### product category mapping
- Document path: product_category_map/{generic id}
- INDEX category id
- INDEX product id
- Data:
    - category id
        - id of category associated with product id key
    - product id
        - id of product associated with category id key
#### categories
- Document path: categories/{category id}
- Data: 
    - category_name
        - name of the category with the associated id
#### images
- Folder path: images/{product or category id}/
- Variable paths
    - product or category id:
        - the product or category id the images at this path are associated with. To keep the category and product id's from clashing the ids generated for each product and category should be obtained from the same key generator.
- Data:
    - images
        - responsive images with predefined names telling an image use case and screen it's most appropriate (ex thumbnail_400.png, thumbnail_800.png).




## Api of each service
- *All api calls are asynchronous and return a promise. When the promise fails, the description of the error passed as a string in the catch clause can be found in the api's Errors section.
- Library: import {function_name1, function_name2, ...} from "path/to/api's/folder/${api's name}.js" 

### auth.js
#### login(email : string, password : string) : User
##### Description
Logs user into their account. On success, behind the scenes an authentication object is recieved and passed during other api calls.
##### Parameters
- email: unique email bound to user's account
- password: password associated to user's account
##### Errors
- EMAIL_DNE: The email does not exist.
- WRONG_PASSWORD: The password is incorrect.
- SERVER_ERROR: The api call failed because the server did not respond.

#### logout() : None

#### signup(username : string, email : string, password : string) : None

### account.js
#### get_user() : User

### category.js
#### get_category(category_id : string) : Category
#### get_categories(after_document? : reference, limit = 100) : Categories
#### create_category(category_id : string, data : object) : None
#### update_category(category_id : string, data-to-change : object) : None
#### delete_category(category_id : string) : None


### product.js
#### get_product(product_id : string) : Product
#### get_products(after_document? : reference, limit = 100) : Products
#### create_product(product_id : string, data : object) : None
#### update_product(product_id : string, data_to_change : object) : None
#### delete_product(product_id : string) : None

### image.js
#### get_image(product_or_category_id : string, screen : Screen, purpose : ImagesPurpose) : Image
#### add_image(product_or_category_id : string, screen : Screen, purpose : ImagesPurpose, image : File) : None
#### delete_image(product_or_category_id : string, screen : Screen, purpose : ImagesPurpose) : None

### search.js
#### get_products_by_category(category_name : string) : Products
#### get_products_by_title(title : string) : Products

### cart.js
#### get_cart(user_id : string) : Cart
#### add_to_cart(user_id : string, product_id : string, quantity : integer) : None
#### update_cart(user_id : string, product_id : string, quantity : integer ) : None
#### delete_from_cart(user_id : string, product_id : string) : None

### checkout.js
#### get_stripe_sk(user_id : string) : string 

### order.js
#### get_order_history(user_id : string, after_document? : reference, limit = 100) : Orders

### admin.js
#### add_product(title : string, description : string, images : Images) : None
#### add_category(category_name : string, images : Images) : None
#### delete_category(category_id : string) : None
#### delete_product(product_id : string) : None


### Classes
- Library: import {function_name1, function_name2, ...} from "path/to/class's/folder/{class's name}.js" 
#### User
#### Cart
#### Orders
#### Order
#### Products
#### Categories
#### Images
#### Product
#### Category
#### Image

### Enumerations
- Library: import {function_name1, function_name2, ...} from "path/to/enum's/folder/{enum's name}.js"
#### Screen 
#### ImagesPurpose

## Web pages
#### Home
#### Login
#### Sign up
#### Products
#### Product
#### Cart
#### Checkout
#### Successful Purchase
#### Order History
#### Admin's Dashboard
#### Admin's Login
#### Admin's Products
#### Admin's Products' Categories

## Tech stack
#### React
#### React-Router
#### React Icons
#### Firebase

