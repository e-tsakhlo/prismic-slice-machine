import React from "react";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { asDate } from "@prismicio/helpers";
import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.BlogSlice} BlogSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BlogSlice>} BlogProps
 * @param { BlogProps }
 */
const Blog = ({ slice }) => (
  <section className="bg-white py-24 sm:py-16">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          <PrismicText field={slice.primary.title} />
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          <PrismicText field={slice.primary.subtitle} />
        </p>
      </div>
      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {slice?.items?.map(({ blog_post: { data: blogPostData } }) => {
          if (!blogPostData) return null;

          return (
            <article
              key={blogPostData.uid}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time
                  dateTime={asDate(
                    blogPostData.publish_date
                  )?.toLocaleDateString()}
                  className="text-gray-500"
                >
                  <span>
                    {asDate(blogPostData.publish_date)?.toLocaleDateString()}
                  </span>
                </time>
                <a
                  href={`/blogs/?category=${blogPostData.category}`}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {String(blogPostData.category).charAt(0).toUpperCase() +
                    String(blogPostData.category).slice(1)}
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href={`/blogs/post/${blogPostData.uid}`}>
                    <span className="absolute inset-0" />
                    <PrismicText field={blogPostData.title} />
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  <PrismicText field={blogPostData.content} />
                </p>
              </div>
              {blogPostData?.author && (
                <div className="relative mt-8 flex items-center gap-x-4">
                  <PrismicNextImage
                    field={blogPostData.author.data.photo}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full bg-gray-50"
                  />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a href={`/authors/${blogPostData.author.data.uid}`}>
                        <span className="absolute inset-0" />
                        <PrismicText field={blogPostData.author.data.name} />
                      </a>
                    </p>
                    <p className="text-gray-600">
                      <PrismicText
                        field={blogPostData.author.data.occupation}
                      />
                    </p>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default Blog;
