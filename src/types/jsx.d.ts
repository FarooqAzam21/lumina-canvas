declare module "*.jsx" {
  import type { ReactNode } from "react";

  const component: () => ReactNode;
  export default component;
}