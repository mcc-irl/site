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
        featured: fields.checkbox({
          label: "Featured on homepage",
          defaultValue: false,
        }),
      },
    }),

    services: collection({
      label: "Services",
      slugField: "title",
      path: "content/services/*",
      format: { data: "yaml" },
      schema: {
        title: fields.text({ label: "Service Title" }),
        description: fields.text({ label: "Description", multiline: true }),
        icon: fields.text({ label: "Icon (emoji)" }),
      },
    }),
  },

  singletons: {
    bio: singleton({
      label: "Bio",
      path: "content/bio",
      format: { data: "yaml" },
      schema: {
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
  },
});
