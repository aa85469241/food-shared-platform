

const AuthLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-primary/80 z-50">
            {children}
        </div>
    )
}

export default AuthLayout