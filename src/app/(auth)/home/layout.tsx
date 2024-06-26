import "../../globals.css";
import HeaderComponent from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className={` flex w-screen h-screen`}>
        <Sidebar />
        <div className=" h-screen w-screen">
          <HeaderComponent />
          <div className=" content">{children}</div>
        </div>  
      </div>
    </div>
  );
}
