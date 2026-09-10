import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-07-11",
  useCdn: true,
});

function assertSanityConfiguration() {
  if (!projectId) {
    throw new Error("Product catalogue is not configured.");
  }
}

export async function fetchProducts(options = {}) {
  const { collection } = options;
  assertSanityConfiguration();
  const query = collection
    ? '*[_type == "product" && collection._ref in *[_type == "collection" && (slug.current == $collection || lower(name) == lower($collection))]._id] | order(_createdAt desc) { _id, name, price, description, image, stock, collection->{name, "slug": slug.current} }'
    : '*[_type == "product"] | order(_createdAt desc) { _id, name, price, description, image, stock, collection->{name, "slug": slug.current} }';

  return client.fetch(query, collection ? { collection } : {});
}

export async function fetchProductById(id) {
  assertSanityConfiguration();
  const query = '*[_type == "product" && _id == $id][0] { _id, name, price, description, image, stock, collection->{name} }';
  return client.fetch(query, { id });
}
