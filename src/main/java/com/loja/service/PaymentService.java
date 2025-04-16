package com.loja.service;

import com.loja.dto.PaymentRequestDTO;
import com.loja.model.Payment;
import com.loja.model.Payment.PaymentMethod;
import com.loja.model.Payment.PaymentStatus;
import com.loja.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Transactional
    public Payment processPayment(PaymentRequestDTO paymentRequest) {
        Payment payment = new Payment();
        payment.setAmount(paymentRequest.getAmount());
        payment.setPaymentMethod(paymentRequest.getPaymentMethod());
        payment.setPaymentDate(LocalDateTime.now());
        payment.setStatus(PaymentStatus.PENDING);

        // Processamento específico para cada método de pagamento
        switch (paymentRequest.getPaymentMethod()) {
            case PIX:
                processPixPayment(payment, paymentRequest);
                break;
            case DEBIT_CARD:
            case CREDIT_CARD:
                processCardPayment(payment, paymentRequest);
                break;
        }

        // Simulação de processamento de pagamento
        // Em um ambiente real, aqui seria feita a integração com gateways de pagamento
        simulatePaymentProcessing(payment);

        return paymentRepository.save(payment);
    }

    private void processPixPayment(Payment payment, PaymentRequestDTO paymentRequest) {
        payment.setPixKey(paymentRequest.getPixKey());
        // Aqui seria feita a integração com o sistema PIX
    }

    private void processCardPayment(Payment payment, PaymentRequestDTO paymentRequest) {
        payment.setCardNumber(paymentRequest.getCardNumber());
        payment.setCardHolderName(paymentRequest.getCardHolderName());
        payment.setCardExpiryDate(paymentRequest.getCardExpiryDate());
        payment.setCardCvv(paymentRequest.getCardCvv());
        // Aqui seria feita a integração com o gateway de cartão
    }

    private void simulatePaymentProcessing(Payment payment) {
        // Simulação de processamento de pagamento
        // Em um ambiente real, isso seria substituído pela integração real
        try {
            Thread.sleep(2000); // Simula o tempo de processamento
            payment.setStatus(PaymentStatus.APPROVED);
        } catch (InterruptedException e) {
            payment.setStatus(PaymentStatus.REJECTED);
        }
    }
} 