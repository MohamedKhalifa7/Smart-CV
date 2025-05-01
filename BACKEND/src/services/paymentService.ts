export const proPayment = async (userId: string) => {
    return {
      url: `http://localhost:3000/fake-payment?userId=${userId}`,
    };
  };
  