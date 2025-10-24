import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

import { envServer } from "@/config/env";

const withNextIntl = createNextIntlPlugin("./src/pkg/libraries/locale/request.ts");

const nextConfig: NextConfig = {
  reactCompiler: true,
  
  logging: {
    fetches: {
      fullUrl: envServer.NODE_ENV !== 'production',
    }
  }
};

export default withNextIntl(nextConfig);
