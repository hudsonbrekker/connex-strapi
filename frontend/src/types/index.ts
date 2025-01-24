export type CollapseItem = {
  title: string
  description: string
}

export type CollapseWithImageType = {
  title: string
  image: string
  collapseItems: CollapseItem[]
  direction?: "left" | "right"
}

export type ComponentSharedWithImage<T> = Omit<T, "image"> & {
  image: {
    __typename?: "UploadFile" | undefined
    url: string
    documentId: string
    name: string
  }
}