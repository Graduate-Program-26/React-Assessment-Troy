import { auth } from "@/src/auth";
import DashboardProvider from "./(components)/providers/dashboard-provider";
import DrawerUser from "./(components)/ui/drawer-user";
import ReactQueryProvider from "./(components)/providers/query-provider";

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth();

    return (
        <ReactQueryProvider>
            <DashboardProvider
                drawerUser={
                    session?.user ? <DrawerUser user={session.user} /> : null
                }
            >
                {children}
            </DashboardProvider>
        </ReactQueryProvider>
    );
};

export default Layout;
