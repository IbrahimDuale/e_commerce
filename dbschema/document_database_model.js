//DOCUMENT DATA MODEL
/**
 * Note: Firebase Authentication and database Security Rules will be used as the major security services.
 */


/**
 * INDEX: id
 * KEY: id
 */
const users = {
    id: "int",
    name: "varchar",
    email: "varchar",
    //Users can have more than one cart. This is their most recent cart used.
    current_cart_id: "int",
}

/**
 * INDEX: (id, user_id))
 * KEY: id
 * Description: All the carts the user owns. 
 */
const carts_metadata = {
    id: "int",
    user_id: "int",
    //name of cart (ex. Alex)
    name: "varchar",
}

/**
 * INDEX: cart_id
 * KEY: (cart_id)
 * Description: This database will be used to get ALL products given a cart_id or to update a specific document.
 */
const carts_products = {
    id: "int",
    products: [{
        product_id: 'int',
        color_id: "int",
        size_id: "int",
        quantity: "int",
    }]
}


/**
 * INDEX: (user_id, purchase_date). Allows for pagination by date.
 * KEY: id
 * Description: 
 */
const orders_metadata = {
    id: "int",
    user_id: "int",
    purchase_date: "timestamp",
    total_price: "float",
    //ex. processing, accepted, shipped
    order_status_id: "int",
}


/**
 * Optional, could use an enumerator instead.
 * INDEX: ID
 * KEY: ID
 * Description: status of an order ex shipped, payment accepted etc.
 */
const orders_statuses = {
    id: "int",
    name: "varchar",
    description: "varchar"
}


/**
 * INDEX: (order_id)
 * KEY: (order_id)
 * Description: Used to get all products of a particular order, or to modify one of the products in the order. 
 * The unit_price is kept incase someone wants to edit their order on a product they bought on sale no longer on sale.
 */
const orders_products = {
    order_id: "int",
    products: [{
        product_id: "int",
        color_id: "int",
        size_id: "int",
        //unit price includes sale reduction to allow user to edit the quantity of an order without canceling it.
        unit_price: "float",
        quantity: "int",
    }]
}

/**
 * 
 * INDEX: id
 * KEY: id
 * Description: All Categories will be queried and a variable length tree will be generated reflecting category paths (ex Men -> Clothing -> jeans -> regular fit).
 */
const categories = {
    //To make the tree building faster there should be a sentinel root with a well known id
    id: "int",
    name: "varchar",
    children: ["category_id1",],
}

/**
 * 
 * Products have at most 4 categories to specify it. (ex. Men -> Clothes -> Jeans -> Regular fit);
 * Need 3 indexes for three ways to order: popularity, price, and recency.
 * Index: (active, main_category, sub1_category, sub2_category, sub3_category, default_price)
 * Index: (active, main_category, sub1_category, sub2_category, sub3_category, date_added)
 * Index: (active, main_category, sub1_category, sub2_category, sub3_category, total_purchases)
 * Filters: price range (can use price index), colors, sizes, brands, materials
 * KEY: id
 */
const products = {
    id: "int",
    name: "varchar",
    description: "varchar",
    //if false product is archived and should not show up in search results
    active: "boolean",
    //used to determine the product's group
    group_id: "int",
    //product's group name
    group_name: "varchar",
    //categories used for indexing
    main_category: "int",
    sub1_category: "int",
    sub2_category: "int",
    sub3_category: "int",
    //allows search by recency
    date_added: "timestamp",
    //allows search by popularity. Total purchases of all colors
    total_purchases: "float",
    //if (product, color, size) tuple in products has no price this is the price. Also allows sorting by popularity.
    default_price: "float",
    //Optionally an array to allow products searching of brand collaborated products.
    brands: ["brand_id1",],
    //is it okay to tumble dry the product?
    care_instructions: ["care_instruction_id1"],
    variations: [{
        color_id: "int",
        size_id: "int",
        //if missing in a document use product's default price instead
        price: "float",
        //sale reduction from 0-100%. Default is zero percent off.
        percent_off: "float",
        quantity_remaining: "int",
        purchases: "int",
    }],
    materials: [{
        material_id: "int",
        //How much of the product is composed of this material (0-100%)?
        percent: "float",
        //Optional, tells where the material is located
        description: "varchar",
    }]
}

/**
 * Optional, could be an enumerator
 * INDEX: (id)
 * KEY: (id)
 * Description: List of all care instructions of clothes such as tumble dry, no tumble dry etc.
 * 
 */
const products_care_instructions = {
    id: "int",
    name: 'varchar',
    descriptin: 'varchar',
}


/**
 * INDEX: id
 * KEY: id
 */
const brands = {
    id: "int",
    name: "varchar",
    description: "varchar",
}


/**
 * INDEX: product_id
 * KEY: product_id
 */
const product_images = {
    product_id: "int",
    images: [{
        //Such as "thumbnail_1" to tell the dev that it should be used as the first thumbnail
        image_use_id: "int",
        //ex. small, medium, large, 400w, 800w
        screen_size_id: "int",
        //is the image a blue t-shirt or red?
        color_id: "int",
        //should make use of a CDN for faster access
        image: "blob"
    }]


}

//same as product images but the brand's id is the key and there is no color_id. if combined with product_images care for clashing ids
const brands_images = {
    images: [{
        //Such as "thumbnail_1" to tell the dev that it should be used as the first thumbnail
        image_use_id: "int",
        //ex. small, medium, large, 400w, 800w
        screen_size_id: "int",
        //should make use of a CDN for faster access
        image: "blob"
    }]
}

//same as brands images but the category's id is the key.
const category_images = { ...brands_images }

/**
 * Optional: could use an enum
 * INDEX: id
 * KEY: id
 */
const materials = {
    id: "int",
    name: "varchar",
    description: "varchar"
}

/**
 * Optional: could use an enum
 * INDEX: id
 * KEY: id
 */
const sizes = {
    id: "int",
    size: "varchar",

}

/**
 * Optional: could use an enum
 * INDEX: id
 * KEY: id
 */
const colors = {
    id: "int",
    name: "varchar",
    hex: "varchar",

}

/**
 * Optional: could use an enum
 * INDEX: id
 * KEY: id
 */
const products_image_uses = {
    id: "int",
    //ex thumbnail_1, main_image_1, etc
    name: "varchar",
    description: "varchar",
}

/**
 * Description: same as product_image_uses. If combined care for clashing id's
 */
const brands_image_uses = { ...products_image_uses }

//same as above
const categories_image_uses = { ...brands_image_uses }

/**
 * OPTIONAL
 * INDEX: id
 * KEY: id
 * Description: Groups similar products (ex. A jacket that has a polyester and a more expensive leather version).
 * 
 */
const products_group = {
    id: "integer",
    name: "varchar",
    description: "varchar",
    products: ["product_id1",],

}
/**
 * Optional, could use an enumerator.
 * INDEX: ID
 * KEY: ID
 * Description: stores acceptable screen sizes for the images
 */
const screen_sizes = {
    id: "int",
    //ex. small, medium, 400w
    name: "varchar",
    description: "varchar",
}

/**
 * OPTIONAL
 * INDEX: category_id
 * KEY: category_id
 * Description: Quick way to suggest sizes based on  category when creating products
 */
const category_to_sizes = {
    category_id: "int",
    sizes: ["size_id1",],

}
