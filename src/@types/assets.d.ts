declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.scss" {
  const content: any;
  // const content: Record<string, string>;
  export default content;
}

// declare module 'lodash.debounce' {
//   const content: any;
//   export default content;
// }
declare module "lodash.debounce";
