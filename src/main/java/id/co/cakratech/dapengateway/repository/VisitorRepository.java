package id.co.cakratech.dapengateway.repository;

import id.co.cakratech.dapengateway.domain.Visitor;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Visitor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VisitorRepository extends JpaRepository<Visitor, Long> {
}
