/* THIS FILE WAS GENERATED FOR PAYLOAD CMS — KEEP IN SYNC WITH PAYLOAD UPGRADES */
import config from "@payload-config";
import type { Metadata } from "next";
import {
  generatePageMetadata,
  RootPage,
  type GenerateViewMetadata,
} from "@payloadcms/next/views";

import { importMap } from "../importMap.js";

type Args = {
  params: Promise<{
    segments: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[];
  }>;
};

export const generateMetadata = ({
  params,
  searchParams,
}: Args): Promise<Metadata> =>
  (generatePageMetadata as GenerateViewMetadata)({
    config,
    params,
    searchParams,
  });

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config, importMap, params, searchParams });

export default Page;
