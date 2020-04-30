package id.co.cakratech.dapengateway.service;

import id.co.cakratech.dapengateway.service.dto.SerialGeneratorDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link id.co.cakratech.dapengateway.domain.SerialGenerator}.
 */
public interface SerialGeneratorService {

    /**
     * Save a serialGenerator.
     *
     * @param serialGeneratorDTO the entity to save.
     * @return the persisted entity.
     */
    SerialGeneratorDTO save(SerialGeneratorDTO serialGeneratorDTO);

    /**
     * Get all the serialGenerators.
     *
     * @return the list of entities.
     */
    List<SerialGeneratorDTO> findAll();

    /**
     * Get the "id" serialGenerator.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<SerialGeneratorDTO> findOne(Long id);

    /**
     * Delete the "id" serialGenerator.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
