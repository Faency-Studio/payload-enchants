import { CustomComponent } from 'payload'

export const CollectionDocsOrderButton = (collectionSlug: string): CustomComponent => {
  return {
    serverProps: {
      collectionSlug,
    },
    path: '@payload-enchants/docs-reorder/client#CollectionDocsOrderButton',
  }
}
