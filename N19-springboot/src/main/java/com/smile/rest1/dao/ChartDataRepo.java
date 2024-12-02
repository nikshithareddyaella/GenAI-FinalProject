package com.smile.rest1.dao;

import com.smile.rest1.model.ChartData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChartDataRepo extends JpaRepository<ChartData, Long> {
}
