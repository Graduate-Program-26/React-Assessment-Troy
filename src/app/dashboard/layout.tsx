import { auth } from "@/src/auth";
import DashboardProvider from "./(components)/providers/dashboard-provider";
import DrawerUser from "./(components)/ui/drawer-user";

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth();

    return (
        <DashboardProvider
            drawerUser={
                session?.user ? <DrawerUser user={session.user} /> : null
            }
        >
            {children}
        </DashboardProvider>
    );
};

export default Layout;
