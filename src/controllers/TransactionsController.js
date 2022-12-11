import Transaction from "../models/Transaction.js";
import * as Yup from "yup";
import parsePhoneNumber from "libphonenumber-js";
import { cpf, cnpj } from "cpf-cnpj-validator";

import Cart from "../models/Cart.js";

class TransactionsController {
    async create(req, res){
        try{
            const { 
                cartCode, paymentType, installments, customerEmail,
                customerName, customerMobile, customerDocument, billingAddress,
                billingNumber,billingNeighborhood, billingCity, billingState,
                billingZipCode,
                
                creditCardNumber,creditCardExpiration,creditCardHolderName,
                creditCardCvv
            } = req.body;


            const schema = Yup.object({
                cartCode:               Yup.string().required(),
                paymentType:            Yup.mixed().oneOf(["credit_card","billet"]).required(),
                installments:           Yup.number()
                    .min(1)
                    .when("paymentType", (paymentType, schema) => 
                    paymentType === "credit_card" ? schema.max(12) : schema.max(1)
                ),
                customerEmail:          Yup.string().required().email(),
                customerName:           Yup.string().required().min(3), 
                customerMobile:         Yup.string().required().test("is-valid-mobile", "${path} is not a mobile number", 
                        (value) => parsePhoneNumber(value, "BR").isValid()
                ), 
                customerDocument:       Yup.string().required().test("is-valid-document", "${path} is not a avlid CPF / CNPJ", 
                        (value) => cpf.isValid(value) || cnpj.isValid(value)
                ), 
                billingAddress:         Yup.string().required(),
                billingNumber:          Yup.string().required(),
                billingNeighborhood:    Yup.string().required(), 
                billingCity:            Yup.string().required(), 
                billingState:           Yup.string().required(),
                billingZipCode:         Yup.string().required(),
                
                creditCardNumber:       Yup.string()
                    .when("paymentType", 
                    (paymentType, schema) => {
                        paymentType === "credit_card" ? schema.required() : schema
                    }
                ),    

                creditCardExpiration:   Yup.string()
                    .when("paymentType", 
                    (paymentType, schema) => {
                        paymentType === "credit_card" ? schema.required() : schema
                    }
                ),
                creditCardHolderName:   Yup.string()
                    .when("paymentType", 
                    (paymentType, schema) => {
                        paymentType === "credit_card" ? schema.required() : schema
                    }
                ),
                creditCardCvv:  Yup.string()
                    .when("paymentType", 
                    (paymentType, schema) => {
                        paymentType === "credit_card" ? schema.required() : schema
                    }
                )
            });

            if(!(await schema.isValid(req.body))){
                return res.status(400).json({error: "Error on validate schema."});
            }

            const cart = Cart.findOne({ code: cartCode });

            if(!cart){
                return res.status(404).json();
            }

            // 1. Criar o transaction (registro)
            // 2. Integrar com o pagarme
            // 3. Processar regras (status)
            
            return res.status(200).json();


        }catch(err){
            console.error(err);
            return res.status(500).json({error: "Internal server error."});
        }
    }
   
    
}

export default new TransactionsController();