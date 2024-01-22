import express from "express"
import midtransClient from "midtrans-client"

const router = express.Router()

router.post("/process-transactions",(req, res) =>{

try {

    const snap = new midtransClient.Snap({
isProduction: false,
serverKey:"SB-Mid-server-5RuVac2n-WKqLgoXlGyGAEFg",
clientKey:"SB-Mid-client-NxtFho1e1so1Wr04"
    })
 
    
    function generateOrderId() {
        const timestamp = Date.now();
        const randomNum = Math.floor(Math.random() * 10000);
        return `${timestamp}${randomNum}`;
      }
      
      const orderId = generateOrderId();
      
      const parameter = {
        transaction_details: {
          order_id: orderId, // Use the dynamically generated order ID
          gross_amount: "3000",
        },
        customer_details: {
          first_name: "poop",
          // other customer details...
        },
        // other transaction parameters...
      };

snap.createTransaction(parameter).then((transaction)=>{
const dataPayment = {
 response: JSON.stringify(transaction)

}
const token = transaction.token

res.status(200).json({message: "result", dataPayment, token: token})

})



    
} 

catch (error) {
    res.status(500).json({message: error.message})
}




    
})


export default router