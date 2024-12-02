package com.smile.rest1.controller;

import com.smile.rest1.dao.ChartDataRepo;
import com.smile.rest1.model.ChartData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ChartController {

    @Autowired
    private ChartDataRepo chartDataRepo;

    @GetMapping("/charts")
    public ResponseEntity<List> getAllChartData() {
        System.out.println(" Hi getAllChartData");
        return new ResponseEntity<>(chartDataRepo.findAll(), HttpStatus.OK);
    }
}
