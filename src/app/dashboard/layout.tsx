import SideDrawer from "./(components)/drawer";
import DashboardHeader from "./(components)/header";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SideDrawer>
            <div className="flex flex-col flex-1">
                <DashboardHeader />
                <main className="flex-1">{children}</main>
            </div>
        </SideDrawer>
    );
};

export default Layout;
