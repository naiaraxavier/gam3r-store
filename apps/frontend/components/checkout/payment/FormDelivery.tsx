import { OrderDelivery } from "@gstore/core";

export interface FormDeliveryProps {
  delivery: Partial<OrderDelivery>;
  deliveryChanged: (delivery: Partial<OrderDelivery>) => void;
  className?: string;
}

export const FormDelivery = ({
  delivery,
  deliveryChanged,
  className,
}: FormDeliveryProps) => {
  const alterAttribute = (attribute: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      deliveryChanged({ ...delivery, [attribute]: e.target.value });
    };
  };

  return (
    <div className={`flex flex-col gap-3 ${className ?? ""}`}>
      <span className="px-7 pb-2 text-xl font-bold text-white/70">
        Dados da delivery
      </span>
      <div className="flex flex-col gap-5 bg-violet-dark/50 rounded-xl p-6">
        <input
          placeholder="Nome Completo"
          value={delivery.name}
          onChange={alterAttribute("name")}
          className="input"
        />
        <div className="flex gap-5">
          <input
            placeholder="E-mail"
            value={delivery.email}
            onChange={alterAttribute("email")}
            className="input flex-1"
          />
          <input
            placeholder="CPF"
            value={delivery.cpf}
            onChange={alterAttribute("cpf")}
            className="input flex-1"
          />
        </div>
        <div className="flex gap-5">
          <input
            placeholder="Logradouro"
            value={delivery.address}
            onChange={alterAttribute("address")}
            className="input flex-1"
          />
          <input
            placeholder="Complemento"
            value={delivery.complement}
            onChange={alterAttribute("complement")}
            className="input"
          />
        </div>
        <div className="flex gap-5">
          <input
            placeholder="Cidade"
            value={delivery.city}
            onChange={alterAttribute("city")}
            className="input flex-1"
          />
          <input
            placeholder="Estado"
            value={delivery.state}
            onChange={alterAttribute("state")}
            className="input flex-1"
          />
        </div>
      </div>
    </div>
  );
};
