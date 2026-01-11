import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

import { apiVersion, dataset, projectId } from '@/sanity/env';

// Create a builder to generate URLs from Sanity image objects
const builder = imageUrlBuilder({
  projectId,
  dataset,
});

export function urlFor(source) {
  return builder.image(source);
}

// FIXED: Handle both the new Sanity object and any legacy strings
export function getProductImage(product) {
  if (!product) return '';

  // 1. If it's a real Sanity Image Object (The Standard Way)
  if (product.image) {
    try {
      return urlFor(product.image).url();
    } catch (e) {
      console.error("Error parsing image:", e);
      return '';
    }
  }

  // 2. Fallback: Check if 'imageUrl' exists (The Old Way)
  if (product.imageUrl) {
    return product.imageUrl.replace('image@', '');
  }

  return '';
}