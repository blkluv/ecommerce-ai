import { createClient } from 'next-sanity';

const client = createClient({
  projectId: 'lemt5f0y',
  dataset: 'production',
  apiVersion: '2025-12-05',
  useCdn: false,
});

// FIXED: Fetch products by IDs
export async function getProductsByIds(ids) {
  try {
    const query = `*[_type == "product" && _id in $ids] {
      _id,
      name,
      "slug": slug.current,
      price,
      // FIXED: Fetch the full image object so urlFor works
      "image": images[0] {
        asset,
        hotspot
      },
      stock
    }`;
    
    const products = await client.fetch(query, { ids });
    return products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Fetch single product by slug
export async function getProductBySlug(slug) {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    description,
    price,
    // FIXED: Fetch the full image object
    "image": images[0] {
      asset,
      hotspot
    },
    // Also fetch all images for the gallery
    "images": images[] {
      asset,
      hotspot,
      _key
    },
    stock,
    category->{title, slug},
    material,
    color,
    dimensions,
    featured,
    assemblyRequired
  }`;
  
  return await client.fetch(query, { slug });
}

// Fetch all products
export async function getAllProducts() {
  const query = `*[_type == "product"] {
    _id,
    name,
    "slug": slug.current,
    price,
    // FIXED: Fetch the full image object
    "image": images[0] {
      asset,
      hotspot
    },
    stock,
    featured
  }`;
  
  return await client.fetch(query);
}