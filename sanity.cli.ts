// sanity.cli.ts - FINAL VERSION
import { defineCliConfig } from "sanity/cli";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const organizationId = process.env.NEXT_PUBLIC_SANITY_ORG_ID;

if (!organizationId || !projectId || !dataset) {
  throw new Error(
    "NEXT_PUBLIC_SANITY_ORG_ID, NEXT_PUBLIC_SANITY_PROJECT_ID, or NEXT_PUBLIC_SANITY_DATASET is not set"
  );
}

export default defineCliConfig({
  app: {
    organizationId,
    entry: "./app/(admin)/admin/page.tsx",
  },
  api: { projectId, dataset },
  // NO typegen config here
});