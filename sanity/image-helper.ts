// lib/sanity/image-helper.ts
export function getSanityImageUrl(image: any): string | null {
  if (!image) return null;
  
  console.log('Image object:', image); // Debug log
  
  // Try Sanity asset first
  if (image.asset?.url) {
    console.log('Using asset.url:', image.asset.url);
    return image.asset.url;
  }
  
  // Then try _sanityAsset (Imgur URL)
  if (image._sanityAsset) {
    console.log('Using _sanityAsset:', image._sanityAsset);
    // Remove "image@" prefix if present
    const url = image._sanityAsset.startsWith('image@') 
      ? image._sanityAsset.substring(6)
      : image._sanityAsset;
    console.log('Processed URL:', url);
    return url;
  }
  
  console.log('No image URL found');
  return null;
}