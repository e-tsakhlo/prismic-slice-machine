import React from "react";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.FeatureSlice} FeatureSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<FeatureSlice>} FeatureProps
 * @param { FeatureProps }
 */
const Feature = ({ slice }) =>
  slice.variation === "default" ? (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            <PrismicText field={slice.primary.overline} />
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            <PrismicText field={slice.primary.title} />
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            <PrismicText field={slice.primary.description} />
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {slice.items?.map((feature, index) => (
              <div key={index} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <PrismicText field={feature.title} />
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  <PrismicText field={feature.description} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  ) : (
    <section className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                <PrismicText field={slice.primary.overline} />
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                <PrismicText field={slice.primary.title} />
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                <PrismicText field={slice.primary.description} />
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {slice.items?.map((feature, index) => (
                  <div key={index} className="relative">
                    <dt className="inline font-semibold text-gray-900">
                      <PrismicText field={feature.title} />
                    </dt>{" "}
                    <dd className="inline">
                      <PrismicText field={feature.description} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <PrismicNextImage
            field={slice.primary.side_image}
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </section>
  );

export default Feature;
