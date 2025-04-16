package com.loja.controller;

import com.loja.dto.PaymentRequestDTO;
import com.loja.model.Payment;
import com.loja.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:8080") // Ajuste para a URL do seu frontend
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping
    public ResponseEntity<Payment> processPayment(@RequestBody PaymentRequestDTO paymentRequest) {
        try {
            Payment payment = paymentService.processPayment(paymentRequest);
            return ResponseEntity.ok(payment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
} 