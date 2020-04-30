package id.co.cakratech.dapengateway.repository;

import id.co.cakratech.dapengateway.domain.OtpHistory;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the OtpHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OtpHistoryRepository extends JpaRepository<OtpHistory, Long> {
}
