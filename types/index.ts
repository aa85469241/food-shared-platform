import { Image, HashTag, Map, Favorite, Comment } from "@prisma/client";

export type TProfile = {
    id: string
    userId: string
    name: string
    imageUrl: string
    firstName?: string
    lastName?: string
    birth?: string
    description?: string
    createdAt: Date
    updatedAt: Date
    maps: UserMap[]
    favorites: UserFavorite[]
    comments: UserComment[]
}

export type UserMap = {
    id: string
    title: string
    isPublic: boolean
    createdAt: Date
    updatedAt: Date
}

export type UserFavorite = {
    id: string
    map: {
        id: string
        title: string
        images: Image[]
    }
    createdAt: Date
}

export type UserComment = {
    id: string
    rating: number
    content: string
    map: Map
    createdAt: Date
    updatedAt: Date
}

export type FoodMap = {
    id: string
    profileId: string
    country: string
    address: string | undefined
    title: string
    description: string
    lowestPrice: number
    highestPrice: number
    isPublic: boolean
    createdAt: Date
    updatedAt: Date
    images: Image[]
    hashTags: HashTag[]
    favorites: Favorite[]
    comments: Comment[]
    profile: TProfile
}

export type TFavorite = {
    id: string
    map: {
        id: string
        title: string
        country: string
        address: string
    }
    createdAt: Date
}

export type CommentValue = {
    id: string
    rating: number
    content: string
    profileId: string
    profile?: {
        name: string
        imageUrl: string
        firstName: string
        lastName: string
    },
    map?: {
        id: string
        title: string
    }
    createdAt: Date
    updatedAt: Date
}