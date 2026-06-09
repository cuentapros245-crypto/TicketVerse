export const paymentService = {
    processTicketPayment: async (paymentDetails, cartItems, totalAmount) => {
      // Simulamos una llamada asíncrona a una API de pagos (Stripe / MercadoPago)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!paymentDetails.cardNumber || !paymentDetails.email) {
            reject({ success: false, message: "Datos de pago incompletos o inválidos." });
          } else {
            resolve({
              success: true,
              transactionId: `TX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
              message: "¡Pago procesado con éxito!",
              amount: totalAmount
            });
          }
        }, 2000); // 2 segundos de carga simulada
      });
    }
  };
  