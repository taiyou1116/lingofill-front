
import "../../globals.css";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <div className=" h-screen w-screen">
          <div className=" h-full">{children}</div>
        </div>  
    </div>
  );
}
