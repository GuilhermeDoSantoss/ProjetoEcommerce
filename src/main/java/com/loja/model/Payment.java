package com.loja.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private BigDecimal amount;
    private PaymentMethod paymentMethod;
    private PaymentStatus status;
    private LocalDateTime paymentDate;
    
    // Dados específicos para PIX
    private String pixKey;
    
    // Dados específicos para cartão
    private String cardNumber;
    private String cardHolderName;
    private String cardExpiryDate;
    private String cardCvv;
    
    public enum PaymentMethod {
        PIX,
        DEBIT_CARD,
        CREDIT_CARD
    }
    
    public enum PaymentStatus {
        PENDING,
        APPROVED,
        REJECTED
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
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
    
    public PaymentStatus getStatus() {
        return status;
    }
    
    public void setStatus(PaymentStatus status) {
        this.status = status;
    }
    
    public LocalDateTime getPaymentDate() {
        return paymentDate;
    }
    
    public void setPaymentDate(LocalDateTime paymentDate) {
        this.paymentDate = paymentDate;
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