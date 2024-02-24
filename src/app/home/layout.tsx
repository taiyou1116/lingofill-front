import "../globals.css";
import SidebarComponent from "@/components/sidebar/Sidebar";
import HeaderComponent from "@/components/header/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className={` flex w-screen h-screen`}>
        <SidebarComponent />
        <div className=" h-screen w-screen">
          <HeaderComponent />
          <div className=" h-5/6">{children}</div>
        </div>  
      </div>
    </div>
  );
}
