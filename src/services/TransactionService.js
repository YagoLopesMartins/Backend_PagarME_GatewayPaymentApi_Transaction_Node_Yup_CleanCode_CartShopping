import { v4 as uuidv4 } from "uuid";


import Cart from '../models/Cart.js';
import Transaction from '../models/Transaction.js';
import PagarMeProvider from "../providers/PagarMeProvider.js";

class TransactionService {

    paymentProvider;

    constructor(paymentProvider){
        this.paymentProvider = paymentProvider || new PagarMeProvider;
    }

    async process({
        cartCode,
        paymentType,
        installments,
        customer,
        billing,
        creditCard,
    }) {
        const cart = await Cart.findOne({ cartCode });

        if(!cart){
            throw `Cart ${cartCode} was not found.`
        }

        const transaction = await Transaction.create({
            cartCode: cart.code,
            code: await uuidv4(),
            total: cart.price,
            paymentType,
            installments,
            status: "started",
            customerName: customer.name,
            customerEmail: customer.email,
            customerMobile: customer.mobile,
            customerDocument: customer.document,
            billingAddress: billing.address,
            billingNumber: billing.number,
            billingNeighborhood: billing.neighborhood,
            billingCity: billing.city,
            billingState: billing.state,
            billingZipCode: billing.zipcode,
        });

        this.paymentProvider.process({
            transactionCode: transaction.code,
            total: transaction.total,
            paymentType,
            installments,
            customer,
            billing,
            creditCard,
        });

        return transaction;
    }
}

export default TransactionService;