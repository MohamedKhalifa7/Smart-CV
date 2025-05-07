import paypal from "@paypal/checkout-server-sdk"
import dotenv from 'dotenv'

dotenv.config()


const environment = new paypal.core.LiveEnvironment(
    process.env.PAYPAL_CLIENT_ID!,
    process.env.PAYPAL_CLIENT_SECRET!,
)

const client = new paypal.core.PayPalHttpClient(environment)

export default client