import { REPOSITORY } from "./const.js";

export type TJsBaseCommand = "--with-tailwind" | "--with-shadcn";

export type JSBaseBranches = keyof (typeof REPOSITORY)["JS_BASE"]["branches"];
