/// <reference types="nativewind/types" />

// TypeScript 6 (TS2882) requires a declaration for side-effect imports of
// non-code files. nativewind does not ship one for stylesheets.
declare module "*.css";
