import { useParams } from "react-router-dom";
import { transactions, transaction } from "../components/Data/dataTransactions";

export default function TransactionDetails() {
    const { id } = useParams();

    const transactionId = Number(id);

    const transaction: transaction | undefined = transactions.find(
        (c) => c.id === transactionId
    );

    if (!transaction) {
        return <div className="p-6">transaction not found</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Transaction Details</h2>

            <table className="w-full table-auto border-collapse">
                <tbody className="space-y-2">
                    <tr className="border-b">
                        <td className="font-semibold py-2">ID:</td>
                        <td className="py-2 text-right">{transaction.id}</td>
                    </tr>

                    <tr className="border-b">
                        <td className="font-semibold py-2">Transaction Date:</td>
                        <td className="py-2 text-right">{transaction.date}</td>
                    </tr>

                    <tr className="border-b">
                        <td className="font-semibold py-2">Sender Company:</td>
                        <td className="py-2 text-right">{transaction.senderCompany}</td>
                    </tr>

                    <tr className="border-b">
                        <td className="font-semibold py-2">Receiver Company:</td>
                        <td className="py-2 text-right">{transaction.receiverCompany}</td>
                    </tr>

                    <tr className="border-b">
                        <td className="font-semibold py-2">Status:</td>
                        <td className="py-2 text-right">
                            <span
                                className={
                                    transaction.status === "Completed"
                                        ? "text-green-600"
                                        : transaction.status === "Pending"
                                            ? "text-yellow-500"
                                            : "text-red-600"
                                }
                            >
                                {transaction.status}
                            </span>
                        </td>
                    </tr>

                    <tr className="border-b">
                        <td className="font-semibold py-2">Amount Send:</td>
                        <td className="py-2 text-right">{transaction.amountSend}</td>
                    </tr>

                    <tr className="border-b">
                        <td className="font-semibold py-2">Product Type:</td>
                        <td className="py-2 text-right">{transaction.productType}</td>
                    </tr>

                    <tr className="border-b">
                        <td className="font-semibold py-2">Product:</td>
                        <td className="py-2 text-right">{transaction.product}</td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
    );
}