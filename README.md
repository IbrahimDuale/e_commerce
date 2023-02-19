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
                - if the user's cart is non-empty it'll be merged with their account's cart
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
Anyone can use this service. Used to search products given a query string or filter. When searching by query string, products with parts of their title or description matching the query string are returned. When searching by filter, products with a tag matching the filter are returned.
##### Carts
Users can only modify their cart. Used to get, add, update, and delete products in their cart.
##### Orders' histories
Gets, and adds summaries of users' purchases. Users restricted to get and add their own purchase summaries.
##### Checkout
Helps users securely make a purchase. User does not interact with this service directly.


### Database schema
![Database Schema.](./images/schema.png)
*Above is a sql-like view of the nosql database. The only exception is the images blob store table which will be a blob store

#### Document model of each table
##### accounts
- Document path: accounts/{user ids}
- Data:
    - Name
        - the user's name

##### carts
- Document path: carts/{cart ids}
- Data:
    - product id : quantity
        - the document will have rows of key-value pairs where the key is the product id and the value is the quantity of that item purchased (capping the number of items a user can have in their cart will restrict the max number of rows in this document to a reasonable amount).
#### orders metadata
- Document path: orders_metadata/{user id's}/purchases/{order}
- Note: sort or index document by timestamp to allow quick pagination by date.
- Data:
    - purchase date
        - time the user completed the purchase
    - order id 
        - id used to query in the orders database the products the user ordered
    - total price
        - price the user paid for the order
#### orders
- Document path: orders/{order id's}
- Data:
    - product id : quantity
        - the document will have rows of key-value pairs where the key is the product id and the value is the quantity of that item purchased (capping the number of items a user can have in their cart will restrict the max number of rows in this document to a reasonable amount).
#### products
- Document path: products/{product id's}
- Data:
    - title
        - product's name
    - description
        - a small summary of what the product is
#### product tag mapping
- Document path: product_tag_map/{product id's}
- Data:
    - tag id's 
        - rows of tag id's associated with the product (a product will not have more than 10 tags).
#### tags
- Document path: tags/{tag id's}
- Data: 
    - tag_name
        - name of the tag with the associated id
#### images
- Folder path: images/{id's}/{folder names}
- Variable paths
    - id's:
        - the product or tag id the images at this path are associated with. To keep the tag and product id's from clashing the id generated for each product and tag should be obtained from the same key generator.
    - folder names:
        - predefined folder names telling the purpose of the responsive images inside (ex. "thumbnail_image_1" will be a folder of responsive images containing the first thumbnail image for the product or tag it's associated with).
- Data:
    - images
        - a list of predefined responsive images associated with the folder(ex 400w.png, 800w.png).




## Api of each service
*All api calls are asynchronous and return a promise. When the promise succeeds, the data recieved is in the api's Return description. When the promise fails, the string passed description can be found in the api's Exceptions section.
### Authentication

#### login(email : string, password : string) : None

##### Description
Logs users into their account. On success, behind the scenes an authentication object is recieved and passed during other api calls.

##### Parameters
- email: unique email bound to user's account
- password: password associated to user's account
##### Returns
    - no data
##### Exceptions
- EMAIL_DNE: The email does not exist.
- WRONG_PASSWORD: The password is incorrect.
- SERVER_ERROR: The api call failed because the server did not respond.

#### logout() : Promise

#### signup(username : string, email : string, password : string) : Promise

#### is_logged_in : bool

### Users' accounts
#### get_user(user_id : string) : Promise
#### add_user(user_info : object) : Promise

### Products' categories
#### get_tags() : Promise
#### add_tag(tag_name : object) : Promise
#### update_tag(tag_name : string, new_tag_name : string) : Promise
#### delete_tag(tag_name : string) : Promise


### Products
#### get_products(reference = None : string, limit = 20) : Promise
#### get_product(product_id : string) : Promise
#### create_product(data : object) : Promise
#### update_product(product_id : string, data_to_change : object) : Promise
#### delete_product(product_id : string) : Promise

### Images' manager
#### get_products_images(product_id : string) : Promise
#### get_tag_names_images(tag_name : string) : Promise
#### add_image(product_id_or_tag_name : string, image_name : string, image : File) : Promise
#### update_image_name(product_id_or_tag_name : string, image_id : string, new_name : string) : Promise
#### delete_image(product_id_or_tag_name : string, image_id : string) : Promise
#### delete_products_images(product_id : string) : Promise
#### delete_tag_names_images(tag_name : string) : Promise

### Search
#### get_products_by_tag(tag_name : string) : Promise
#### get_products_by_key(search_key : string) : Promise

### Carts
#### get_users_cart(user_id : string) : Promise
#### update_cart(user_id : string, product_id : string, quantity : integer ) : Promise
#### delete_from_cart(user_id : string, product_id : string) : Promise

### Checkouts
#### start_purchase(user_id : string) : Promise

### Orders' histories
#### get_order_history(user_id : string) : Promise
#### add_cart_to_order_history() : Promise

### Products' manager
#### get_products(paginate_token = None : string, limit = 20) : Promise
#### get_tags() : Promise
#### add_product(product_info : object) : Promise
#### add_tag(tag_name : object) : Promise
#### add_image(product_id_or_tag_name : string, image_name : string, image : File) : Promise
#### update_image_name(product_id_or_tag_name : string, image_id : string, new_name : string) : Promise
#### update_product(product_id : string, new_product_info : object) : Promise
#### update_tag(tag_name : string, new_tag_name : string) : Promise
#### delete_tag(tag_name : string) : Promise
#### delete_product(product_id : string) : Promise

## Web pages
##### Home
##### Login
##### Sign up
##### Products
##### Product
##### Cart
##### Checkout
##### Successful Purchase
##### Order History
##### Admin's Dashboard
##### Admin's Login
##### Admin's Products
##### Admin's Products' Categories

## Tech stack
##### React
##### React-Router
##### React Icons
##### Firebase

