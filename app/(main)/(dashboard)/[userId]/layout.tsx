
import Sidebar from "./_components/sidebar";
import FloatMenu from "./_components/float-menu";

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="w-full h-full pt-[100px] px-[4vw] pb-4 md:flex md:pl-0">
            <Sidebar />
            <FloatMenu />
            <main className="w-full h-max p-4 md:px-12 md:ml-[250px] lg:ml-[300px]">
                {children}
            </main>
        </div>
    );
}