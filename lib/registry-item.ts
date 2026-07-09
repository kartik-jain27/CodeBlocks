import { readFile } from "fs/promises";
import path from "path";

import type { BlockRegistryItem, RegistryFile } from "@/lib/blocks-registry";

interface RegistryFileWithContent extends RegistryFile {
  content: string;
}

export interface RegistryItemResponse extends Omit<BlockRegistryItem, "files"> {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json";
  files: RegistryFileWithContent[];
}

export async function createRegistryItemResponse(
  block: BlockRegistryItem,
): Promise<RegistryItemResponse> {
  const files = await Promise.all(
    block.files.map(async (file) => ({
      ...file,
      content: await readFile(path.join(process.cwd(), file.path), "utf8"),
    })),
  );

  return {
    "$schema": "https://ui.shadcn.com/schema/registry-item.json",
    ...block,
    files,
  };
}
