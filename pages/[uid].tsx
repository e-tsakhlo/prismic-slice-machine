import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { components } from "../slices";
import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";

export type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = (props) => (
  <SliceZone slices={props.page.data.slices} components={components} />
);

export const getStaticProps = async ({
  params,
  previewData,
}: GetStaticPropsContext<{ uid: string }>) => {
  if (!params) return { notFound: true };

  const client = createClient({ previewData });

  const page = await client.getByUID("page", params.uid);

  if (!page) return { notFound: true };

  return {
    props: {
      page,
    },
  };
};

export async function getStaticPaths() {
  const client = createClient();

  /**
   * Query all Documents from the API, except the homepage.
   */
  const pages = await client.getAllByType("page", {
    predicates: [prismic.predicate.not("my.page.uid", "home")],
  });

  /**
   * Define a path for every Document.
   */
  return {
    paths: pages.map((page) => {
      return prismicH.asLink(page);
    }),
    fallback: false,
  };
}

export default Page;
