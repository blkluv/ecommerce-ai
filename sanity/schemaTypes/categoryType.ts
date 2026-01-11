import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Crystal Category",
  type: "document",
  icon: TagIcon,
  groups: [
    { name: "details", title: "Details", default: true },
    { name: "properties", title: "Properties" },
    { name: "media", title: "Media" },
  ],
  fields: [
    // Details Group
    defineField({
      name: "title",
      title: "Category Name",
      type: "string",
      group: "details",
      validation: (rule) => [
        rule.required().error("Category title is required"),
      ],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "details",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => [
        rule.required().error("Slug is required for URL generation"),
      ],
    }),
    defineField({
      name: "description",
      title: "Category Description",
      type: "text",
      group: "details",
      rows: 3,
      description: "Brief description of this crystal category",
    }),
    defineField({
      name: "categoryType",
      title: "Category Type",
      type: "string",
      group: "details",
      options: {
        list: [
          { title: "By Crystal Type", value: "type" },
          { title: "By Color", value: "color" },
          { title: "By Chakra", value: "chakra" },
          { title: "By Healing Property", value: "property" },
          { title: "By Shape/Form", value: "shape" },
          { title: "By Collection", value: "collection" },
        ],
      },
      initialValue: "type",
      validation: (rule) => [
        rule.required().error("Category type is required"),
      ],
    }),

    // Properties Group
    defineField({
      name: "primaryChakra",
      title: "Primary Associated Chakra",
      type: "string",
      group: "properties",
      options: {
        list: [
          { title: "Root", value: "root" },
          { title: "Sacral", value: "sacral" },
          { title: "Solar Plexus", value: "solar_plexus" },
          { title: "Heart", value: "heart" },
          { title: "Throat", value: "throat" },
          { title: "Third Eye", value: "third_eye" },
          { title: "Crown", value: "crown" },
          { title: "All/Multiple", value: "multiple" },
        ],
      },
      description: "Main chakra associated with crystals in this category",
    }),
    defineField({
      name: "primaryColor",
      title: "Primary Color",
      type: "string",
      group: "properties",
      options: {
        list: [
          { title: "Red", value: "red" },
          { title: "Orange", value: "orange" },
          { title: "Yellow", value: "yellow" },
          { title: "Green", value: "green" },
          { title: "Blue", value: "blue" },
          { title: "Indigo", value: "indigo" },
          { title: "Violet/Purple", value: "violet" },
          { title: "Pink", value: "pink" },
          { title: "White/Clear", value: "white" },
          { title: "Black", value: "black" },
          { title: "Brown", value: "brown" },
          { title: "Gray", value: "gray" },
          { title: "Multi-colored", value: "multicolor" },
        ],
      },
      description: "Dominant color of crystals in this category",
    }),
    defineField({
      name: "primaryElement",
      title: "Associated Element",
      type: "string",
      group: "properties",
      options: {
        list: [
          { title: "Earth", value: "earth" },
          { title: "Air", value: "air" },
          { title: "Fire", value: "fire" },
          { title: "Water", value: "water" },
          { title: "Spirit/Ether", value: "spirit" },
          { title: "Multiple", value: "multiple" },
        ],
      },
      description: "Element associated with crystals in this category",
    }),
    defineField({
      name: "healingProperties",
      title: "Key Healing Properties",
      type: "array",
      group: "properties",
      of: [{ type: "string" }],
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
          { title: "Communication", value: "communication" },
          { title: "Creativity", value: "creativity" },
          { title: "Courage", value: "courage" },
          { title: "Focus", value: "focus" },
          { title: "Balance", value: "balance" },
        ],
      },
      description: "Main healing properties of crystals in this category",
    }),
    defineField({
      name: "typicalUses",
      title: "Typical Uses",
      type: "array",
      group: "properties",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Meditation", value: "meditation" },
          { title: "Jewelry", value: "jewelry" },
          { title: "Home Decor", value: "decor" },
          { title: "Grid Work", value: "grid" },
          { title: "Energy Clearing", value: "clearing" },
          { title: "Chakra Balancing", value: "chakra_balancing" },
          { title: "Sleep Aid", value: "sleep" },
          { title: "Work/Office", value: "work" },
          { title: "Travel", value: "travel" },
          { title: "Gifting", value: "gifting" },
        ],
      },
      description: "Common ways these crystals are used",
    }),

    // Media Group
    defineField({
      name: "image",
      title: "Category Image",
      type: "image",
      group: "media",
      options: {
        hotspot: true,
      },
      description: "Category thumbnail image",
      validation: (rule) => [
        rule.required().error("Category image is required"),
      ],
    }),
    defineField({
      name: "icon",
      title: "Category Icon",
      type: "string",
      group: "media",
      description: "Emoji representing this category (e.g., 💎, 🔮, 🌙)",
      initialValue: "💎",
    }),
    defineField({
      name: "colorCode",
      title: "Color Code",
      type: "string",
      group: "media",
      description: "Hex color code for this category (e.g., #4A90E2)",
    }),

    // SEO & Display
    defineField({
      name: "featured",
      title: "Featured Category",
      type: "boolean",
      group: "details",
      initialValue: false,
      description: "Show this category prominently on the homepage",
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      group: "details",
      initialValue: 0,
      description: "Order in which categories appear (lower numbers first)",
      validation: (rule) => [
        rule.integer().error("Sort order must be a whole number"),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "categoryType",
      media: "image",
      icon: "icon",
    },
    prepare({ title, subtitle, media, icon }) {
      const typeMap = {
        type: "🔮 Type",
        color: "🎨 Color",
        chakra: "🌀 Chakra",
        property: "💫 Property",
        shape: "📐 Shape",
        collection: "📦 Collection",
      };
      return {
        title: `${icon ? icon + " " : ""}${title}`,
        subtitle: typeMap[subtitle as keyof typeof typeMap] || subtitle,
        media,
      };
    },
  },
});