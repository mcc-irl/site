import { config, collection, singleton, fields } from "@keystatic/core";

export default config({
  storage: process.env.KEYSTATIC_GITHUB_CLIENT_ID
    ? {
        kind: "github",
        repo: { owner: "mcc-irl", name: "site" },
      }
    : { kind: "local" },

  ui: {
    brand: { name: "Michelle Carter Consultancy" },
  },

  collections: {
    reviews: collection({
      label: "Reviews",
      slugField: "name",
      path: "content/reviews/*",
      format: { data: "yaml" },
      schema: {
        name: fields.text({ label: "Name / Job Title" }),
        role: fields.text({ label: "Role" }),
        organisation: fields.text({ label: "Organisation" }),
        quote: fields.text({ label: "Quote", multiline: true }),
        rating: fields.integer({ label: "Rating (1–5)", defaultValue: 5 }),
        showInCarousel: fields.checkbox({
          label: "Show in homepage testimonials carousel",
          defaultValue: false,
        }),
      },
    }),

    services: collection({
      label: "Services",
      slugField: "title",
      path: "content/services/*",
      format: { contentField: "description" },
      schema: {
        title: fields.text({ label: "Service Title" }),
        order: fields.integer({ label: "Display Order", defaultValue: 99 }),
        description: fields.document({
          label: "Description",
          formatting: true,
          dividers: true,
          links: true,
        }),
        icon: fields.text({ label: "Icon (emoji)" }),
      },
    }),
  },

  singletons: {
    siteSettings: singleton({
      label: "Site Settings",
      path: "content/site-settings",
      format: { data: "yaml" },
      schema: {
        footerTagline: fields.text({ label: "Footer Tagline" }),
      },
    }),

    homePage: singleton({
      label: "Home Page",
      path: "content/homepage",
      format: { data: "yaml" },
      schema: {
        heroEyebrow: fields.text({ label: "Hero Eyebrow" }),
        heroHeading: fields.text({ label: "Hero Heading", multiline: true }),
        heroDescription: fields.text({ label: "Hero Description", multiline: true }),
        heroPrimaryButtonText: fields.text({ label: "Primary Button Text" }),
        heroPrimaryButtonHref: fields.text({ label: "Primary Button URL" }),
        heroSecondaryButtonText: fields.text({ label: "Secondary Button Text" }),
        heroSecondaryButtonHref: fields.text({ label: "Secondary Button URL" }),
        servicesEyebrow: fields.text({ label: "Services Section Eyebrow" }),
        servicesHeading: fields.text({ label: "Services Section Heading" }),
        servicesDescription: fields.text({ label: "Services Section Description", multiline: true }),
        trustStats: fields.array(
          fields.object({
            value: fields.text({ label: "Value" }),
            label: fields.text({ label: "Label" }),
          }),
          {
            label: "Trust Stats",
            itemLabel: (props) => props.fields.label.value ?? "Untitled",
          }
        ),
        showTrustStats: fields.checkbox({
          label: "Show Trust Stats section",
          defaultValue: true,
        }),
        testimonialsEyebrow: fields.text({ label: "Testimonials Section Eyebrow" }),
        testimonialsHeading: fields.text({ label: "Testimonials Section Heading" }),
        ctaHeading: fields.text({ label: "CTA Heading" }),
        ctaDescription: fields.text({ label: "CTA Description", multiline: true }),
        ctaButtonText: fields.text({ label: "CTA Button Text" }),
        ctaButtonHref: fields.text({ label: "CTA Button URL" }),
      },
    }),

    contactPage: singleton({
      label: "Contact Page",
      path: "content/contact-page",
      format: { data: "yaml" },
      schema: {
        pageDescription: fields.text({
          label: "Page Hero Description",
          multiline: true,
        }),
        contactDetails: fields.array(
          fields.object({
            field: fields.text({ label: "Field" }),
            detail: fields.text({ label: "Detail" }),
          }),
          {
            label: "Contact Details",
            itemLabel: (props) => props.fields.field.value ?? "Untitled",
          }
        ),
        serviceInterestOptions: fields.array(
          fields.text({ label: "Option" }),
          {
            label: "Service Interest Dropdown Options",
            itemLabel: (props) => props.value ?? "Untitled",
          }
        ),
      },
    }),

    bio: singleton({
      label: "Bio",
      path: "content/bio",
      format: { data: "yaml" },
      schema: {
        pageDescription: fields.text({
          label: "Page Hero Description",
          multiline: true,
        }),
        bio1: fields.text({
          label: "Introduction Paragraph 1",
          multiline: true,
        }),
        bio2: fields.text({
          label: "Introduction Paragraph 2",
          multiline: true,
        }),
        bio3: fields.text({
          label: "Introduction Paragraph 3",
          multiline: true,
        }),
        qualifications: fields.array(
          fields.text({ label: "Qualification" }),
          {
            label: "Qualifications",
            itemLabel: (props) => props.value ?? "Untitled",
          }
        ),
        values: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({
              label: "Description",
              multiline: true,
            }),
          }),
          {
            label: "Values",
            itemLabel: (props) => props.fields.title.value ?? "Untitled",
          }
        ),
      },
    }),

    servicesPage: singleton({
      label: "Services Page",
      path: "content/services-page",
      format: { data: "yaml" },
      schema: {
        pageDescription: fields.text({
          label: "Page Hero Description",
          multiline: true,
        }),
      },
    }),

    reviewsPage: singleton({
      label: "Reviews Page",
      path: "content/reviews-page",
      format: { data: "yaml" },
      schema: {
        pageDescription: fields.text({
          label: "Page Hero Description",
          multiline: true,
        }),
      },
    }),
  },
});
