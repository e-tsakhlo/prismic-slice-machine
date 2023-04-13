import { SliceZone } from "@prismicio/react";
import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";

import { createClient } from "../prismicio";
import { components } from "../slices";

export type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = ({ page }) => (
  <SliceZone slices={page.data.slices} components={components} />
);

export const getStaticProps = async ({
  previewData,
}: GetStaticPropsContext) => {
  const client = createClient({ previewData });

  const page = await client.getByUID("page", "home", {
    graphQuery: `{
  page {
      ...pageFields
      slices {
        ...on blog {
          variation {
            ...on default {
              primary {
                ...primaryFields
              }
              items {
                blog_post {
                  ...blog_postFields
                  author {
                    ... on author {
                      ...authorFields
                    }
                  }
                }
              }
            }
          }
        }
        ...on feature {
          variation {
            ...on default {
              primary {
                ...primaryFields
              }
              items {
                ...itemsFields
              }
            }
            ...on withSideImage {
              primary {
                ...primaryFields
              }
              items {
                ...itemsFields
              }
            }
          }
        }
        ...on hero_block {
          variation {
            ...on default {
              primary {
                ...primaryFields
              }
            }
          }
        }
      }
    }
  }`,
  });

  if (!page) return { notFound: true };

  return {
    props: {
      page,
    },
  };
};

export default Page;
