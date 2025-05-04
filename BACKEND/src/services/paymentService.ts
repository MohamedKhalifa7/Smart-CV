export const proPayment = async (userId: string) => {
    return {
      url: `success_url:http://localhost:3001/success${userId}`,
    };
  };
  
  export const proPaypalPayment = async ()=>{
    
  }