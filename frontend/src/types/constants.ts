
export const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL
export const GRAPHQL_URL = `${CMS_URL}/graphql`
export const IMAGE_URL = `${CMS_URL}/uploads`

export const HEADER_HEIGHT = 88

export const services: string[] = [
	"Community management",
	"Customer Service",
	"Monitoring",
	"Quality Assurance",
	"Localization",
]
