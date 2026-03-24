import { auth } from "@/src/auth";
import SideDrawer from "./(components)/drawer";
import DashboardHeader from "./(components)/header";
import DrawerUser from "./(components)/drawer-user";

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth();

    return (
        <SideDrawer
            drawerUser={
                session?.user ? <DrawerUser user={session.user} /> : null
            }
        >
            <div className="flex flex-col flex-1">
                <DashboardHeader />
                <main className="flex-1">{children}</main>
            </div>
        </SideDrawer>
    );
};

export default Layout;
