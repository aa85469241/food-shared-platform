
type HeadingProps = {
    title: string
    description?: string
}

const Heading = ({ title, description }: HeadingProps) => {
    return (
        <div className="mb-2">
            <h1 className="text-2xl font-semibold uppercase md:text-4xl">
                {title}
            </h1>
            <p className="text-sm font-medium tracking-wider">
                {description}
            </p>
        </div>
    )
}

export default Heading