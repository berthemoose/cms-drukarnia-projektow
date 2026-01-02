import path from "path";
import { payloadCloud } from "@payloadcms/plugin-cloud";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload/config";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { azureStorageAdapter } from "./adapters/AzureStorageAdapter";
import seo from "@payloadcms/plugin-seo";
import Users from "./collections/Users";
import { Media } from "./collections/Media";
import { NoStoreProducts } from "./collections/NoStoreProducts";
import { Regulamin } from "./globals/Regulamin";
import { Header } from "./globals/Header";
import { Footer } from "./globals/Footer";
import { LandingPage } from "./globals/LandingPage";
import Products from "./collections/Products";
import { ProductsPage } from "./globals/ProductsPage";
import { AppSettings } from "./globals/AppSettings";
import { AboutPage } from "./globals/AboutPage";
import { ContactPage } from "./globals/ContactPage";
import { PracaDyplomowa } from "./globals/PracaDyplomowa";
import { DeliveryOptions } from "./globals/DeliveryOptions";
import MyLogo from "./MyLogo";
import MyIcon from "./MyIcon";
const serverURL = process.env.PAYLOAD_PUBLIC_SERVER_URL;
const dbURI = process.env.DATABASE_URI;

const csrfOrigins =
  process.env.CSRF_ORIGINS?.split(",").map((o) => o.trim()) || [];

export default buildConfig({
  serverURL: serverURL,
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    components: {
      graphics: {
        Logo: MyLogo,
        Icon: MyIcon,
      }
    }
  },
  csrf: csrfOrigins,
  defaultDepth: 1,
  maxDepth: 5,
  editor: lexicalEditor({}),
  collections: [Users, Media, Products, NoStoreProducts],
  globals: [Header, Footer, Regulamin, LandingPage, ProductsPage, AppSettings, AboutPage, ContactPage, PracaDyplomowa, DeliveryOptions],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  // add an upload constraint
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [
    payloadCloud(),
    cloudStorage({
      /* enabled: '' */ //conditionally based on environment (dev/prod)
      collections: {
        media: {
          adapter: azureStorageAdapter,
        },
      },
    }),
    seo({
      collections: ["pages"],
      globals: ["landing-page", "regulamin", "aboutPage"],
      uploadsCollection: "media",
    }),
  ],
  db: mongooseAdapter({
    url: dbURI,
  }),
});
