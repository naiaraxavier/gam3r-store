import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CartItem } from "@gstore/core";
import CabecalhoCheckout from "@/src/components/checkout/CabecalhoCheckout";
import CarrinhoItem from "../../components/checkout/carrinho/CarrinhoItem";
import CarrinhoVazio from "@/src/components/checkout/carrinho/CarrinhoVazio";
import Cores from "@/src/data/constants/Cores";
import useCarrinho from "@/src/data/hooks/useCarrinho";

export default function Carrinho({ navigation }: any) {
  const { itens, qtdeItens, adicionarItem, removerItem, removerProduto } =
    useCarrinho();

  return (
    <SafeAreaView style={styles.container}>
      <CabecalhoCheckout passo="carrinho" />
      <ScrollView
        contentContainerStyle={{ paddingVertical: 20, width: "100%" }}
      >
        {itens.length === 0 && <CarrinhoVazio />}
        {itens.map((item: CartItem) => (
          <CarrinhoItem
            key={item.product.id}
            item={item}
            adicionarItem={() => adicionarItem(item.product)}
            removerItem={() => removerItem(item.product)}
            removerProduto={() => removerProduto(item.product)}
          />
        ))}
      </ScrollView>
      {qtdeItens > 0 && (
        <Pressable
          style={styles.botao}
          onPress={() => {
            navigation.navigate("Pagamento");
          }}
        >
          <Ionicons name="card-outline" size={22} style={styles.botaoTexto} />
          <Text style={styles.botaoTexto}>Continuar</Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0E001D",
    width: "100%",
  },
  botao: {
    color: "#FFF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Cores.PRIMARIA,
    alignSelf: "center",
    borderRadius: 9999,
    height: 40,
    marginVertical: 20,
    paddingHorizontal: 50,
    gap: 8,
  },
  botaoTexto: {
    color: "#FFF",
  },
});
