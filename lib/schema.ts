import { z } from "zod";

export const FoodMapSchema = z.object({
    country: z.string().min(1, "*Please select a country."),
    address: z.string(),
    title: z.string().min(1, '*At least (1) letter for the name.'),
    description: z.string().min(1, '*At least (1) letter for the description.'),
    lowestPrice: z.number().min(1, '*At least (1) number required.').nonnegative(),
    highestPrice: z.number().min(1, '*At least (1) number required.').nonnegative(),
    images: z.object({ imgUrl: z.string() }).array().min(1, "*At least (1) image required."),
    hashTags: z.object({
        name: z.string().min(1, '*At least (1) letter for the tag.'),
        isPublic: z.boolean().default(true)
    }).array(),
}).refine((value) => value.lowestPrice <= value.highestPrice, {
    message: '*Lowest price cannot greater than highest price.',
    path: ["confirmPrice"]
})

export const CommentSchema = z.object({
    rating: z.number(),
    content: z.string().min(1, "*At least (1) word for your comment.")
})

export const PersonalInfoSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    birth: z.date(),
    description: z.string().max(50, "Please don't enter more than 50 words."),
})

export const ResetSchema = z.object({
    username: z.string().min(1, "Username is required."),
    email: z.string().email({
        message: "Email is required."
    })
})

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Minimum 6 characters required."
    }),
    confirmPassword: z.string().min(6, {
        message: "Minimum 6 characters required."
    }),
}).refine((value) => value.password === value.confirmPassword, {
    message: "Password not matching.",
    path: ["confirmPassword"]
})