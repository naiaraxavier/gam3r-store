import { Footer } from "./Footer";
import { Header } from "./Header";

export interface PageProps {
  children: any;
  className?: string;
  withoutHeader?: boolean;
  withoutFooter?: boolean;
}

export const Page = ({
  children,
  className,
  withoutHeader,
  withoutFooter,
}: PageProps) => {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%, #2d0064 0%, #0d001c 100%)",
      }}
    >
      <div
        className="flex-1 flex flex-col w-screen"
        style={{ background: 'url("/background.png")' }}
      >
        {!withoutHeader && <Header />}
        <main className={`flex-1 flex flex-col ${className ?? ""}`}>
          {children}
        </main>
        {!withoutFooter && <Footer />}
      </div>
    </div>
  );
};
