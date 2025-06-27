using Hotel_Backend.Models;
using Stripe;
using Stripe.Checkout;

namespace Hotel_Backend.Services
{
    public class StripeService
    {
        private readonly string _secretKey;

        public StripeService(IConfiguration configuration)
        {
            _secretKey = configuration["Stripe:SecretKey"];
            StripeConfiguration.ApiKey = _secretKey;
        }

        public Session CreateCheckoutSession(Room room)
        {
            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string> { "card" },
                LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions
                    {
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            UnitAmount = (long)((room.Price ?? 0) * 100),
                            Currency = "usd",
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = $"Room: {room.RoomName}",
                                Images = new List<string>{$"{room.ImageURL}"}
                            },

                        },
                        Quantity = 1
                    }
                },
                Mode = "payment",
                SuccessUrl = "http://localhost:5004/api/payment/success?roomId=" + room.RoomID,
                CancelUrl = "http://localhost:5004/api/payment/cancel"
            };

            var service = new SessionService();
            return service.Create(options);
        }
    }
}
