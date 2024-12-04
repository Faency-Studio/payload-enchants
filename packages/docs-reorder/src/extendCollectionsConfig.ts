import type { CollectionConfig } from 'payload'

import { CollectionDocsOrderButton } from './components/CollectionDocsOrder'
import { incrementOrder } from './hooks/incrementOrder'
import type { DocsReorderOptions } from './types'

const externdCollectionConfig = (collection: CollectionConfig) => {
  return {
    ...collection,
    admin: {
      ...(collection.admin ?? {}),
      components: {
        ...(collection.admin?.components ?? {}),
        beforeList: [
          ...(collection.admin?.components?.beforeList ?? []),
          CollectionDocsOrderButton(collection.slug),
        ],
      },
    },
    fields: [
      ...collection.fields,
      {
        access: {
          create: () => true,
          read: () => true,
          update: () => true,
        },
        admin: {
          hidden: false,
        },
        index: true,
        name: 'docOrder',
        type: 'number',
      },
    ],
    hooks: {
      ...(collection.hooks ?? {}),
      beforeValidate: [...(collection.hooks?.beforeValidate ?? []), incrementOrder],
    },
  } as CollectionConfig
}

export const extendCollectionsConfig = (
  incomingCollections: CollectionConfig[],
  { collections }: DocsReorderOptions,
) => {
  return incomingCollections.map((collection) => {
    const foundInConfig = collections.some(({ slug }) => slug === collection.slug)

    if (!foundInConfig) return collection

    return externdCollectionConfig(collection)
  })
}
