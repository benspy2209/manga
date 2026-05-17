import OpenAI from "openai";
import { v2 as cloudinary } from "cloudinary";

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type SupabaseInsertPayload = Record<string, unknown>;

export interface SupabasePersistenceClient {
  insert: (table: string, payload: SupabaseInsertPayload) => Promise<{ success: boolean }>;
}

// TODO: Re-enable Supabase persistence when registry access is available.
export const supabase: SupabasePersistenceClient = {
  async insert(table, payload) {
    console.info("[mock-supabase] insert", { table, payload });
    return { success: true };
  }
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export { cloudinary };
