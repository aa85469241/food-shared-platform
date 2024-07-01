'use client';

import { SignIn } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Page() {
    return (
        <div className="relative">
            <SignIn />
            <div className="absolute bottom-4 right-14">
                <Link 
                href="/auth/forgot-password"
                className="flex items-center text-xs hover:text-blue-600 hover:underline"
                >
                    <ArrowRight size={13} className="mr-2"/> forgot your password ?
                </Link>
            </div>
        </div>
    )

}