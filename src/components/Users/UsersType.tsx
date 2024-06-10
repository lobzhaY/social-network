export type UserType = {
    "name": string,
    "id": string,
    "uniqueUrlName": string | null,
    "photos": {
      "small": string | null,
      "large": string | null
    },
    "status": string | null,
    "followed": boolean
}