package id.co.cakratech.dapengateway.repository;

import id.co.cakratech.dapengateway.domain.SerialGenerator;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the SerialGenerator entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SerialGeneratorRepository extends JpaRepository<SerialGenerator, Long> {
}
