import "../../globals.css";
import SidebarComponent from "@/components/sidebar/Sidebar";
import HeaderComponent from "@/components/header/Header";
import SidebarMemo from "@/components/sidebar/Sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className={` flex w-screen h-screen`}>
        <SidebarMemo />
        <div className=" h-screen w-screen">
          <HeaderComponent />
          <div className=" content">{children}</div>
        </div>  
      </div>
    </div>
  );
}
