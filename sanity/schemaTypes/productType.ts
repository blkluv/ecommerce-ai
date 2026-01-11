import { PackageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Crystal",
  type: "document",
  icon: PackageIcon,
  groups: [
    { name: "details", title: "Details", default: true },
    { name: "healing", title: "Healing Properties" },
    { name: "specifications", title: "Specifications" },
    { name: "media", title: "Media" },
    { name: "inventory", title: "Inventory" },
    { name: "marketing", title: "Marketing" },
  ],
  fields: [
    // Details Group
    defineField({
      name: "name",
      title: "Crystal Name",
      type: "string",
      group: "details",
      validation: (rule) => [
        rule.required().error("Crystal name is required"),
      ],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "details",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (rule) => [
        rule.required().error("Slug is required for URL generation"),
      ],
    }),
    defineField({
      name: "category",
      title: "Crystal Type",
      type: "reference",
      to: [{ type: "category" }],
      group: "details",
      validation: (rule) => [rule.required().error("Category is required")],
    }),
    defineField({
      name: "description",
      title: "Description & Benefits",
      type: "text",
      group: "details",
      rows: 4,
      description: "Brief description of the crystal and its benefits",
    }),

    // Healing Properties Group
    defineField({
      name: "chakras",
      title: "Associated Chakras",
      type: "array",
      of: [{ type: "string" }],
      group: "healing",
      options: {
        list: [
          { title: "Root", value: "root" },
          { title: "Sacral", value: "sacral" },
          { title: "Solar Plexus", value: "solar_plexus" },
          { title: "Heart", value: "heart" },
          { title: "Throat", value: "throat" },
          { title: "Third Eye", value: "third_eye" },
          { title: "Crown", value: "crown" },
        ],
      },
    }),
    defineField({
      name: "zodiac",
      title: "Zodiac Signs",
      type: "array",
      of: [{ type: "string" }],
      group: "healing",
      options: {
        list: [
          { title: "Aries", value: "aries" },
          { title: "Taurus", value: "taurus" },
          { title: "Gemini", value: "gemini" },
          { title: "Cancer", value: "cancer" },
          { title: "Leo", value: "leo" },
          { title: "Virgo", value: "virgo" },
          { title: "Libra", value: "libra" },
          { title: "Scorpio", value: "scorpio" },
          { title: "Sagittarius", value: "sagittarius" },
          { title: "Capricorn", value: "capricorn" },
          { title: "Aquarius", value: "aquarius" },
          { title: "Pisces", value: "pisces" },
        ],
      },
    }),
    defineField({
      name: "properties",
      title: "Healing Properties",
      type: "array",
      of: [{ type: "string" }],
      group: "healing",
      options: {
        list: [
          { title: "Protection", value: "protection" },
          { title: "Love", value: "love" },
          { title: "Healing", value: "healing" },
          { title: "Prosperity", value: "prosperity" },
          { title: "Clarity", value: "clarity" },
          { title: "Grounding", value: "grounding" },
          { title: "Energy", value: "energy" },
          { title: "Peace", value: "peace" },
          { title: "Intuition", value: "intuition" },
          { title: "Transformation", value: "transformation" },
        ],
      },
    }),
    defineField({
      name: "detailedDescription",
      title: "Detailed Healing Properties",
      type: "array",
      of: [{ type: "block" }],
      group: "healing",
      description: "Detailed explanation of healing properties and uses",
    }),
    defineField({
      name: "howToUse",
      title: "How to Use This Crystal",
      type: "array",
      of: [{ type: "block" }],
      group: "healing",
      description: "Instructions for using the crystal effectively",
    }),

    // Specifications Group
    defineField({
      name: "mineralFamily",
      title: "Mineral Family",
      type: "string",
      group: "specifications",
      options: {
        list: [
          { title: "Quartz", value: "quartz" },
          { title: "Feldspar", value: "feldspar" },
          { title: "Mica", value: "mica" },
          { title: "Carbonate", value: "carbonate" },
          { title: "Sulfate", value: "sulfate" },
          { title: "Silicate", value: "silicate" },
          { title: "Oxide", value: "oxide" },
          { title: "Sulfide", value: "sulfide" },
          { title: "Halide", value: "halide" },
          { title: "Organic", value: "organic" },
        ],
      },
    }),
    defineField({
      name: "hardness",
      title: "Mohs Hardness Scale (1-10)",
      type: "number",
      group: "specifications",
      validation: (rule) => [
        rule.min(1).error("Hardness must be at least 1"),
        rule.max(10).error("Hardness cannot exceed 10"),
      ],
    }),
    defineField({
      name: "origin",
      title: "Origin/Geographic Location",
      type: "string",
      group: "specifications",
      description: "Where the crystal is sourced from",
    }),
    defineField({
      name: "size",
      title: "Size Options",
      type: "array",
      group: "specifications",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "size",
              title: "Size",
              type: "string",
              options: {
                list: [
                  { title: "Small", value: "small" },
                  { title: "Medium", value: "medium" },
                  { title: "Large", value: "large" },
                  { title: "Extra Large", value: "xl" },
                ],
              },
            }),
            defineField({
              name: "price",
              title: "Price for this size",
              type: "number",
              validation: (rule) => [
                rule.positive().error("Price must be positive"),
              ],
            }),
            defineField({
              name: "weight",
              title: "Weight (grams)",
              type: "number",
              validation: (rule) => [
                rule.positive().error("Weight must be positive"),
              ],
            }),
            defineField({
              name: "dimensions",
              title: "Dimensions (cm)",
              type: "string",
              description: "e.g., '5cm x 3cm x 2cm'",
            }),
          ],
        },
      ],
      description: "Different size options available for this crystal",
    }),
    defineField({
      name: "careInstructions",
      title: "Care & Cleansing Instructions",
      type: "array",
      of: [{ type: "block" }],
      group: "specifications",
      description: "How to clean, charge, and care for the crystal",
    }),

    // Media Group
    defineField({
      name: "images",
      title: "Crystal Images",
      type: "array",
      group: "media",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative Text",
              type: "string",
              description: "Description for screen readers",
            }),
            defineField({
              name: "color",
              title: "Dominant Color in Image",
              type: "string",
              description: "Primary color shown in this image",
            }),
          ],
        },
      ],
      validation: (rule) => [
        rule.min(1).error("At least one image is required"),
      ],
    }),

    // Inventory Group
    defineField({
      name: "price",
      title: "Starting Price (for smallest size)",
      type: "number",
      group: "inventory",
      description: "Price in GBP (e.g., 29.99)",
      validation: (rule) => [
        rule.required().error("Price is required"),
        rule.positive().error("Price must be a positive number"),
      ],
    }),
    defineField({
      name: "stock",
      title: "Stock Quantity",
      type: "number",
      group: "inventory",
      initialValue: 0,
      description: "Number of items in stock",
      validation: (rule) => [
        rule.min(0).error("Stock cannot be negative"),
        rule.integer().error("Stock must be a whole number"),
      ],
    }),

    // Marketing Group
    defineField({
      name: "featured",
      title: "Featured Crystal",
      type: "boolean",
      group: "marketing",
      initialValue: false,
      description: "Show on homepage and featured sections",
    }),
    defineField({
      name: "newArrival",
      title: "New Arrival",
      type: "boolean",
      group: "marketing",
      initialValue: false,
      description: "Mark as new arrival",
    }),
    defineField({
      name: "bestSeller",
      title: "Best Seller",
      type: "boolean",
      group: "marketing",
      initialValue: false,
      description: "Mark as best seller",
    }),
    defineField({
      name: "rarity",
      title: "Rarity Level",
      type: "string",
      group: "marketing",
      options: {
        list: [
          { title: "Common", value: "common" },
          { title: "Uncommon", value: "uncommon" },
          { title: "Rare", value: "rare" },
          { title: "Very Rare", value: "very_rare" },
          { title: "Collector's Item", value: "collectors" },
        ],
      },
      initialValue: "common",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category.title",
      media: "images.0",
      price: "price",
      rarity: "rarity",
    },
    prepare({ title, subtitle, media, price, rarity }) {
      const rarityMap = {
        common: "🟢",
        uncommon: "🟡",
        rare: "🟠",
        very_rare: "🔴",
        collectors: "💎",
      };
      return {
        title,
        subtitle: `${subtitle ? subtitle + " • " : ""}£${price ?? 0} • ${
          rarityMap[rarity as keyof typeof rarityMap] || ""
        } ${rarity || ""}`,
        media,
      };
    },
  },
});