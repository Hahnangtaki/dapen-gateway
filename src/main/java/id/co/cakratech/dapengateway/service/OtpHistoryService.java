package id.co.cakratech.dapengateway.service;

import id.co.cakratech.dapengateway.service.dto.OtpHistoryDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link id.co.cakratech.dapengateway.domain.OtpHistory}.
 */
public interface OtpHistoryService {

    /**
     * Save a otpHistory.
     *
     * @param otpHistoryDTO the entity to save.
     * @return the persisted entity.
     */
    OtpHistoryDTO save(OtpHistoryDTO otpHistoryDTO);

    /**
     * Get all the otpHistories.
     *
     * @return the list of entities.
     */
    List<OtpHistoryDTO> findAll();

    /**
     * Get the "id" otpHistory.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<OtpHistoryDTO> findOne(Long id);

    /**
     * Delete the "id" otpHistory.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
