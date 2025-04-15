import { REPOSITORY } from "./const.js";
import { TJsBaseCommand } from "./types.js";

export const JS_BASE_COMMAND_TO_BRANCH_MAPPING: Record<
  TJsBaseCommand,
  keyof (typeof REPOSITORY)["JS_BASE"]["branches"]
> = {
  "--with-tailwind": REPOSITORY.JS_BASE.branches.tailwind,
  "--with-shadcn": REPOSITORY.JS_BASE.branches.shadcn,
};
