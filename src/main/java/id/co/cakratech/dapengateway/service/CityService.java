package id.co.cakratech.dapengateway.service;

import id.co.cakratech.dapengateway.service.dto.CityDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link id.co.cakratech.dapengateway.domain.City}.
 */
public interface CityService {

    /**
     * Save a city.
     *
     * @param cityDTO the entity to save.
     * @return the persisted entity.
     */
    CityDTO save(CityDTO cityDTO);

    /**
     * Get all the cities.
     *
     * @return the list of entities.
     */
    List<CityDTO> findAll();

    /**
     * Get the "id" city.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CityDTO> findOne(Long id);

    /**
     * Delete the "id" city.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
