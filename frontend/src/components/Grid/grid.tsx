import { BackendResponse } from "../../Services/api";
import { Styled } from "./styles";


interface GridProps {
    gridContent?: BackendResponse;
}

export default function Grid({ gridContent }: GridProps) {    
    return (
        <Styled className={gridContent ? "fadeIn" : ""}>
            {
                gridContent &&
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Preço atual</th>
                            <th>Novo preço</th>
                            <th>Erros</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gridContent.items.sort((a, b) => b.errors.length - a.errors.length).map((item, index) => (
                            <tr key={index}>
                                <td>{item.code}</td>
                                <td>{item.product?.name}</td>
                                <td>{item.product?.sales_price && "R$" + Number(item.product.sales_price).toFixed(2)}</td>
                                <td>R${item.new_price.toFixed(2)}</td>
                                <td className="errorTd">
                                    {item.errors.length > 0 &&
                                        <ul>
                                            {item.errors.map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                        </ul>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </Styled>
    );
}
