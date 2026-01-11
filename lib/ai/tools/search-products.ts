import { tool } from "ai";
import { z } from "zod";
import { sanityFetch } from "@/sanity/lib/live";
import { AI_SEARCH_PRODUCTS_QUERY } from "@/lib/sanity/queries/products";
import { formatPrice } from "@/lib/utils";
import { getStockStatus, getStockMessage } from "@/lib/constants/stock";
import { 
  CHAKRAS_VALUES, 
  PROPERTIES_VALUES, 
  RARITY_VALUES,
  ZODIAC_VALUES,
  MINERAL_FAMILY_VALUES 
} from "@/lib/constants/filters";
import type { AI_SEARCH_PRODUCTS_QUERYResult } from "@/sanity.types";
import type { SearchProduct } from "@/lib/ai/types";

const crystalSearchSchema = z.object({
  query: z
    .string()
    .optional()
    .default("")
    .describe(
      "Search term to find crystals by name, description, or properties (e.g., 'amethyst', 'protection', 'heart chakra', 'rose quartz')"
    ),
  category: z
    .string()
    .optional()
    .default("")
    .describe(
      "Filter by crystal category slug (e.g., 'quartz', 'chakra-stones', 'protection-crystals')"
    ),
  chakras: z
    .enum(["", ...CHAKRAS_VALUES])
    .optional()
    .default("")
    .describe("Filter by associated chakra (e.g., 'heart', 'crown', 'third_eye')"),
  properties: z
    .enum(["", ...PROPERTIES_VALUES])
    .optional()
    .default("")
    .describe("Filter by healing properties (e.g., 'love', 'protection', 'clarity')"),
  zodiac: z
    .enum(["", ...ZODIAC_VALUES])
    .optional()
    .default("")
    .describe("Filter by zodiac sign association (e.g., 'cancer', 'leo', 'pisces')"),
  mineralFamily: z
    .enum(["", ...MINERAL_FAMILY_VALUES])
    .optional()
    .default("")
    .describe("Filter by mineral family (e.g., 'quartz', 'silicate', 'carbonate')"),
  rarity: z
    .enum(["", ...RARITY_VALUES])
    .optional()
    .default("")
    .describe("Filter by rarity level (e.g., 'rare', 'very_rare', 'collectors')"),
  minPrice: z
    .number()
    .optional()
    .default(0)
    .describe("Minimum price in GBP (e.g., 10)"),
  maxPrice: z
    .number()
    .optional()
    .default(0)
    .describe("Maximum price in GBP (e.g., 200). Use 0 for no maximum."),
  inStockOnly: z
    .boolean()
    .optional()
    .default(false)
    .describe("Show only crystals currently in stock"),
  featuredOnly: z
    .boolean()
    .optional()
    .default(false)
    .describe("Show only featured crystals"),
  bestSellersOnly: z
    .boolean()
    .optional()
    .default(false)
    .describe("Show only best-selling crystals"),
  newArrivalsOnly: z
    .boolean()
    .optional()
    .default(false)
    .describe("Show only new arrivals"),
});

export const searchProductsTool = tool({
  description:
    "Search for healing crystals in the store. Can search by name, description, healing properties, chakra associations, zodiac signs, mineral family, and rarity. Filter by price range and availability. Returns detailed crystal information including metaphysical properties and stock status.",
  inputSchema: crystalSearchSchema,
  execute: async ({ 
    query, 
    category, 
    chakras, 
    properties, 
    zodiac,
    mineralFamily,
    rarity,
    minPrice, 
    maxPrice,
    inStockOnly,
    featuredOnly,
    bestSellersOnly,
    newArrivalsOnly
  }) => {
    console.log("[SearchCrystals] Query received:", {
      query,
      category,
      chakras,
      properties,
      zodiac,
      mineralFamily,
      rarity,
      minPrice,
      maxPrice,
      inStockOnly,
      featuredOnly,
      bestSellersOnly,
      newArrivalsOnly
    });

    try {
      const { data: crystals } = await sanityFetch({
        query: AI_SEARCH_PRODUCTS_QUERY,
        params: {
          searchQuery: query || "",
          categorySlug: category || "",
          chakras: chakras || "",
          properties: properties || "",
          zodiac: zodiac || "",
          mineralFamily: mineralFamily || "",
          rarity: rarity || "",
          minPrice: minPrice || 0,
          maxPrice: maxPrice || 0,
          inStockOnly: inStockOnly || false,
          featuredOnly: featuredOnly || false,
          bestSellersOnly: bestSellersOnly || false,
          newArrivalsOnly: newArrivalsOnly || false,
        },
      });

      console.log("[SearchCrystals] Crystals found:", crystals.length);

      if (crystals.length === 0) {
        return {
          found: false,
          message:
            "No healing crystals found matching your criteria. Try different search terms, or browse by chakra, healing property, or zodiac sign.",
          suggestions: [
            "Try searching by chakra (e.g., 'heart chakra crystals')",
            "Search by healing property (e.g., 'crystals for protection')", 
            "Browse by zodiac sign (e.g., 'crystals for Gemini')",
            "Explore different mineral families (e.g., 'quartz crystals')",
            "Check our featured crystals or new arrivals"
          ],
          crystals: [],
          filters: {
            query,
            category,
            chakras,
            properties,
            zodiac,
            mineralFamily,
            rarity,
            minPrice,
            maxPrice,
          },
        };
      }

      // Format the results with crystal-specific information
      const formattedCrystals: SearchProduct[] = (
        crystals as AI_SEARCH_PRODUCTS_QUERYResult
      ).map((crystal) => {
        // Format chakras as readable strings
        const formattedChakras = crystal.chakras?.map(chakra => {
          const chakraMap = {
            root: "Root",
            sacral: "Sacral", 
            solar_plexus: "Solar Plexus",
            heart: "Heart",
            throat: "Throat",
            third_eye: "Third Eye",
            crown: "Crown"
          };
          return chakraMap[chakra as keyof typeof chakraMap] || chakra;
        }) || [];

        // Format zodiac signs
        const formattedZodiac = crystal.zodiac?.map(sign => {
          const zodiacMap = {
            aries: "Aries",
            taurus: "Taurus",
            gemini: "Gemini",
            cancer: "Cancer",
            leo: "Leo",
            virgo: "Virgo",
            libra: "Libra",
            scorpio: "Scorpio",
            sagittarius: "Sagittarius",
            capricorn: "Capricorn",
            aquarius: "Aquarius",
            pisces: "Pisces"
          };
          return zodiacMap[sign as keyof typeof zodiacMap] || sign;
        }) || [];

        // Format healing properties
        const formattedProperties = crystal.properties?.map(prop => {
          const propMap = {
            protection: "Protection",
            love: "Love",
            healing: "Healing",
            prosperity: "Prosperity",
            clarity: "Clarity",
            grounding: "Grounding",
            energy: "Energy",
            peace: "Peace",
            intuition: "Intuition",
            transformation: "Transformation"
          };
          return propMap[prop as keyof typeof propMap] || prop;
        }) || [];

        // Format rarity
        const formattedRarity = crystal.rarity ? {
          common: "Common",
          uncommon: "Uncommon", 
          rare: "Rare",
          very_rare: "Very Rare",
          collectors: "Collector's Item"
        }[crystal.rarity] || crystal.rarity : null;

        return {
          id: crystal._id,
          name: crystal.name ?? null,
          slug: crystal.slug ?? null,
          description: crystal.description ?? null,
          detailedDescription: crystal.detailedDescription ?? null,
          price: crystal.price ?? null,
          priceFormatted: crystal.price ? formatPrice(crystal.price) : null,
          category: crystal.category?.title ?? null,
          categorySlug: crystal.category?.slug ?? null,
          chakras: formattedChakras,
          zodiac: formattedZodiac,
          healingProperties: formattedProperties,
          mineralFamily: crystal.mineralFamily ?? null,
          hardness: crystal.hardness ?? null,
          origin: crystal.origin ?? null,
          sizeOptions: crystal.size ?? null,
          howToUse: crystal.howToUse ?? null,
          careInstructions: crystal.careInstructions ?? null,
          stockCount: crystal.stock ?? 0,
          stockStatus: getStockStatus(crystal.stock),
          stockMessage: getStockMessage(crystal.stock),
          featured: crystal.featured ?? false,
          newArrival: crystal.newArrival ?? false,
          bestSeller: crystal.bestSeller ?? false,
          rarity: formattedRarity,
          imageUrl: crystal.images?.[0]?.asset?.url ?? null,
          allImages: crystal.images?.map(img => img.asset?.url).filter(Boolean) ?? [],
          productUrl: crystal.slug ? `/products/${crystal.slug}` : null,
          metaphysicalSummary: `This ${crystal.name} is associated with ${formattedChakras.length > 0 ? formattedChakras.join(", ") : "various"} chakra${formattedChakras.length !== 1 ? 's' : ''} and helps with ${formattedProperties.length > 0 ? formattedProperties.join(", ").toLowerCase() : "spiritual healing"}.${crystal.zodiac?.length ? ` It's particularly beneficial for ${formattedZodiac.join(", ")} zodiac signs.` : ''}`,
        };
      });

      // Sort crystals: featured first, then by rarity (rare to common), then by price
      const sortedCrystals = formattedCrystals.sort((a, b) => {
        // Featured first
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        
        // Then by rarity (rare to common)
        const rarityOrder = {
          "Collector's Item": 0,
          "Very Rare": 1,
          "Rare": 2,
          "Uncommon": 3,
          "Common": 4,
          null: 5
        };
        const aRarity = rarityOrder[a.rarity as keyof typeof rarityOrder] ?? 5;
        const bRarity = rarityOrder[b.rarity as keyof typeof rarityOrder] ?? 5;
        if (aRarity !== bRarity) return aRarity - bRarity;
        
        // Then by price (low to high)
        return (a.price || 0) - (b.price || 0);
      });

      return {
        found: true,
        message: `Found ${crystals.length} healing crystal${crystals.length === 1 ? "" : "s"} matching your search.`,
        totalResults: crystals.length,
        crystals: sortedCrystals,
        suggestions: crystals.length > 5 ? [
          "You can filter by specific chakras to narrow results",
          "Try filtering by healing properties for more targeted results",
          "Check rarity levels for unique or collector's items",
          "Sort by price or availability for quick selection"
        ] : [],
        filters: {
          query,
          category,
          chakras,
          properties,
          zodiac,
          mineralFamily,
          rarity,
          minPrice,
          maxPrice,
          inStockOnly,
          featuredOnly,
          bestSellersOnly,
          newArrivalsOnly
        },
      };
    } catch (error) {
      console.error("[SearchCrystals] Error:", error);
      return {
        found: false,
        message: "An error occurred while searching for healing crystals.",
        crystals: [],
        error: error instanceof Error ? error.message : "Unknown error",
        filters: {
          query,
          category,
          chakras,
          properties,
          zodiac,
          mineralFamily,
          rarity,
          minPrice,
          maxPrice,
        },
      };
    }
  },
});