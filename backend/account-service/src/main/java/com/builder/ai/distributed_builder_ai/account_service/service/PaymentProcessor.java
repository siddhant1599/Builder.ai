package com.builder.ai.distributed_builder_ai.account_service.service;

import com.builder.ai.distributed_builder_ai.account_service.dto.subscription.CheckoutRequest;
import com.builder.ai.distributed_builder_ai.account_service.dto.subscription.CheckoutResponse;
import com.builder.ai.distributed_builder_ai.account_service.dto.subscription.PortalResponse;
import com.stripe.model.StripeObject;

import java.util.Map;

public interface PaymentProcessor {

    CheckoutResponse createCheckoutSessionUrl(CheckoutRequest request);

    PortalResponse openCustomerPortal();

    void handleWebhookEvent(String type, StripeObject stripeObject, Map<String, String> metadata);
}
