import { fileURLToPath, URL } from "node:url";

import netlify from "@netlify/vite-plugin-tanstack-start";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tanstackStart(), react(), tailwindcss(), netlify()],
  ssr: {
    // Netlify's function bundler must not externalize this mixed ESM/CJS chain.
    noExternal: [
      "html-react-parser",
      "html-dom-parser",
      "htmlparser2",
      "domhandler",
      "domelementtype",
      "domutils",
      "dom-serializer",
      "entities",
      "react-property",
      "style-to-js",
      "style-to-object",
      "inline-style-parser",
    ],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
