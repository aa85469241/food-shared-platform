'use client';
import { motion } from "framer-motion";

type TemplateType = {
    children: React.ReactNode
}

export default function Template({ children }: TemplateType) {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.75 }}
        >
            {children}
        </motion.div>
    )
}
