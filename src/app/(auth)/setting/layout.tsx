import "../../globals.css";
import SettingHeaderComponent from "@/components/header/SettingHeader";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <div className=" h-screen w-screen">
          <SettingHeaderComponent />
          <div className=" h-full">{children}</div>
        </div>  
    </div>
  );
}
