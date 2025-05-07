import paypal from "@paypal/checkout-server-sdk"
import client from "../config/paypalConfig";

export const proPayment = async (userId: string) => {
    return {
      url: `success_url:http://localhost:3001/success${userId}`,
    };
  };
  
export const createOrder = async ()=>{
  const request = new paypal.orders.OrdersCreateRequest()

  request.prefer("return=representation")
  request.requestBody({
    intent:"CAPTURE",
    purchase_units:[
      {
        amount:{
          currency_code:"USD",
          value:"9.99"
        }
      }
    ],
    application_context:{
      brand_name:"smartCV",
      landing_page:"NO_PREFERENCE",
      user_action:"PAY_NOW",

    }
  })

  const response = await client.execute(request)
  return response.result;
}

export const captureOrder = async(orderId:string)=>{
  
  const request = new paypal.orders.OrdersCaptureRequest(orderId)
  const response = await client.execute(request)
  return response.result

}