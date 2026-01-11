// lib/sanity/queries/products.ts

// 1. Base Query (Used for "All Products" and aliased for Name sort)
export const ALL_PRODUCTS_QUERY = `*[_type == "product"] {
  _id,
  name,
  "slug": slug.current,
  price,
  "image": images[0]{
    asset,
    hotspot
  },
  category->{
    _id,
    title,
    "slug": slug.current
  },
  material,
  color,
  stock,
  featured
}`;

// 2. Featured Products Query (FIXES BUILD ERROR)
export const FEATURED_PRODUCTS_QUERY = `*[_type == "product" && featured == true] {
  _id,
  name,
  "slug": slug.current,
  price,
  "image": images[0]{
    asset,
    hotspot
  },
  stock,
  category->{
    title
  }
} | order(_createdAt desc)[0...4]`;

// 3. Filter Queries (FIXES IMAGE ERROR)

export const FILTER_PRODUCTS_BY_NAME_QUERY = `*[_type == "product"] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  price,
  "image": images[0]{
    asset,
    hotspot
  },
  category->{
    _id,
    title,
    "slug": slug.current
  },
  material,
  color,
  stock
}`;

export const FILTER_PRODUCTS_BY_PRICE_ASC_QUERY = `*[_type == "product"] | order(price asc) {
  _id,
  name,
  "slug": slug.current,
  price,
  "image": images[0]{
    asset, 
    hotspot
  },
  category->{
    _id,
    title,
    "slug": slug.current
  },
  material,
  color,
  stock
}`;

export const FILTER_PRODUCTS_BY_PRICE_DESC_QUERY = `*[_type == "product"] | order(price desc) {
  _id,
  name,
  "slug": slug.current,
  price,
  "image": images[0]{
    asset,
    hotspot
  },
  category->{
    _id,
    title,
    "slug": slug.current
  },
  material,
  color,
  stock
}`;

export const FILTER_PRODUCTS_BY_RELEVANCE_QUERY = `*[_type == "product"] {
  _id,
  name,
  "slug": slug.current,
  price,
  "image": images[0]{
    asset,
    hotspot
  },
  category->{
    _id,
    title,
    "slug": slug.current
  },
  material,
  color,
  stock,
  featured
} | order(featured desc, name asc)`;

// 4. Single Product by ID (for cart/checkout)
export const PRODUCTS_BY_IDS_QUERY = `*[_type == "product" && _id in $ids] {
  _id,
  name,
  "slug": slug.current,
  price,
  "image": images[0]{
    asset,
    hotspot
  },
  stock
}`;