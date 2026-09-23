package com.ecommerce.project.service;

import com.ecommerce.project.payload.StripePaymentDto;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.CustomerSearchResult;
import com.stripe.model.PaymentIntent;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.CustomerSearchParams;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class StripeServiceImpl implements StripeService {

    @Value("${stripe.secret.key}")
    private String stripeApiKey;

    @PostConstruct
    public void init(){
        if (stripeApiKey != null) {
            Stripe.apiKey = stripeApiKey.trim();
        }
    }

    @Override
    public PaymentIntent paymentIntent(StripePaymentDto stripePaymentDto) throws StripeException {
        if (stripeApiKey != null) {
            Stripe.apiKey = stripeApiKey.trim();
        }
        Customer customer = null;
        String email = (stripePaymentDto.getEmail() != null && !stripePaymentDto.getEmail().isEmpty())
                ? stripePaymentDto.getEmail() : "customer@example.com";
        
        try {
            CustomerSearchParams searchParams =
                    CustomerSearchParams.builder()
                            .setQuery("email:'" + email + "'")
                            .build();
            CustomerSearchResult customers = Customer.search(searchParams);
            if (customers != null && customers.getData() != null && !customers.getData().isEmpty()) {
                customer = customers.getData().get(0);
            }
        } catch (Exception e) {
            System.err.println("Stripe Customer search warning: " + e.getMessage());
        }

        if (customer == null) {
            try {
                CustomerCreateParams.Builder builder = CustomerCreateParams.builder()
                        .setEmail(email)
                        .setName(stripePaymentDto.getName() != null ? stripePaymentDto.getName() : "Customer");

                if (stripePaymentDto.getAddress() != null) {
                    builder.setAddress(
                            CustomerCreateParams.Address.builder()
                                    .setLine1(stripePaymentDto.getAddress().getStreet() != null ? stripePaymentDto.getAddress().getStreet() : "123 Main St")
                                    .setCity(stripePaymentDto.getAddress().getCity() != null ? stripePaymentDto.getAddress().getCity() : "City")
                                    .setState(stripePaymentDto.getAddress().getState() != null ? stripePaymentDto.getAddress().getState() : "State")
                                    .setPostalCode(stripePaymentDto.getAddress().getPincode() != null ? stripePaymentDto.getAddress().getPincode() : "10001")
                                    .setCountry(stripePaymentDto.getAddress().getCountry() != null ? stripePaymentDto.getAddress().getCountry() : "IN")
                                    .build()
                    );
                }

                customer = Customer.create(builder.build());
            } catch (Exception e) {
                System.err.println("Stripe Customer create fallback without address: " + e.getMessage());
                customer = Customer.create(CustomerCreateParams.builder().setEmail(email).setName("Customer").build());
            }
        }

        String currency = stripePaymentDto.getCurrency() != null ? stripePaymentDto.getCurrency().toLowerCase() : "usd";
        long minAmount = currency.equalsIgnoreCase("inr") ? 5000L : 50L;
        long finalAmount = Math.max(stripePaymentDto.getAmount() != null ? stripePaymentDto.getAmount() : minAmount, minAmount);

        PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                        .setAmount(finalAmount)
                        .setCurrency(currency)
                        .setCustomer(customer.getId())
                        .setDescription(stripePaymentDto.getDescription() != null ? stripePaymentDto.getDescription() : "Order Payment")
                        .setAutomaticPaymentMethods(
                                PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                        .setEnabled(true)
                                        .build()
                        )
                        .build();

        return PaymentIntent.create(params);
    }
}
