package com.loja.dto;

import com.loja.model.Payment.PaymentMethod;
import java.math.BigDecimal;

public class PaymentRequestDTO {
    private BigDecimal amount;
    private PaymentMethod paymentMethod;
    
    // Dados PIX
    private String pixKey;
    
    // Dados Cartão
    private String cardNumber;
    private String cardHolderName;
    private String cardExpiryDate;
    private String cardCvv;
    
    // Getters and Setters
    public BigDecimal getAmount() {
        return amount;
    }
    
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
    
    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }
    
    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
    
    public String getPixKey() {
        return pixKey;
    }
    
    public void setPixKey(String pixKey) {
        this.pixKey = pixKey;
    }
    
    public String getCardNumber() {
        return cardNumber;
    }
    
    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }
    
    public String getCardHolderName() {
        return cardHolderName;
    }
    
    public void setCardHolderName(String cardHolderName) {
        this.cardHolderName = cardHolderName;
    }
    
    public String getCardExpiryDate() {
        return cardExpiryDate;
    }
    
    public void setCardExpiryDate(String cardExpiryDate) {
        this.cardExpiryDate = cardExpiryDate;
    }
    
    public String getCardCvv() {
        return cardCvv;
    }
    
    public void setCardCvv(String cardCvv) {
        this.cardCvv = cardCvv;
    }
} 