import { Page } from "@/components/template/Page";
import { ProviderCart } from "@/data/contexts/ContextCart";
import { ProviderPayment } from "@/data/contexts/ContextPayment";
import { ProviderProducts } from "@/data/contexts/ContextProducts";

const Layout = ({ children }: any) => {
  return (
    <ProviderProducts>
      <ProviderCart>
        <ProviderPayment>
          <Page>{children}</Page>
        </ProviderPayment>
      </ProviderCart>
    </ProviderProducts>
  );
};

export default Layout;
