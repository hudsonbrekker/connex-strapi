import { gql } from "@/__generated__"

export const getGlobalSeo = gql(`
  query Global($locale: I18NLocaleCode, $status: PublicationStatus) {
    global(locale: $locale, status: $status) {
      defaultSeo {
        id
        metaTitle
        metaDescription
      }
      favicon {
        url
        name
      }
    }
  }
`)

export const getGlobalLogo = gql(`
	query Logo {
		global {
			logo {
				createdAt
				documentId
				name
				url
			}
		}
	}
`)

export const getHero = gql(`
	query Hero($locale: I18NLocaleCode, $status: PublicationStatus) {
		hero(locale: $locale, status: $status) {
      documentId
      description
      title
      heroImage {
        url
        documentId
      }
      ourNumber {
        body
        number
        title
      }
      locale
      logo {
        url
        name
        caption
      }
    }
	}
`)

export const getKeySolutions = gql(`
  query KeySolution($locale: I18NLocaleCode, $status: PublicationStatus) {
    keySolution(locale: $locale, status: $status) {
      documentId
      createdAt
      locale
      solutionCard {
        id
        title
        content
        slug
        image {
          url
          documentId
          name
        }
        movingImage {
          documentId
          name
          url
        }
      }
    }
  }
`)

export const getServices = gql(`
  query Service($locale: I18NLocaleCode, $status: PublicationStatus) {
    service(locale: $locale, status: $status) {
      title
      body
      services {
        id
        title
        image {
          documentId
          name
          url
        }
        serviceContent {
          id
          header
          content
        }
      }
    }
  }
`)

export const getProjects = gql(`
  query Project($locale: I18NLocaleCode, $status: PublicationStatus, $pagination: PaginationArg) {
    project(locale: $locale, status: $status) {
      title
      projectCarousel(pagination: $pagination) {
        name
        url
        createdAt
      }
      hightlightList {
        id
        projectName
        image {
          documentId
          name
          url
        }
        category
      }
    }
  }
`)

export const createContact = gql(`
  mutation CreateContact($data: ContactInput!) {
    createContact(data: $data) {
      company
      createdAt
      email
      message
      name
      service
      documentId
    }
  }
`)
