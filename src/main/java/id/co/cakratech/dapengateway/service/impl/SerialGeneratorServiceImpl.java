package id.co.cakratech.dapengateway.service.impl;

import id.co.cakratech.dapengateway.service.SerialGeneratorService;
import id.co.cakratech.dapengateway.domain.SerialGenerator;
import id.co.cakratech.dapengateway.repository.SerialGeneratorRepository;
import id.co.cakratech.dapengateway.service.dto.SerialGeneratorDTO;
import id.co.cakratech.dapengateway.service.mapper.SerialGeneratorMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link SerialGenerator}.
 */
@Service
@Transactional
public class SerialGeneratorServiceImpl implements SerialGeneratorService {

    private final Logger log = LoggerFactory.getLogger(SerialGeneratorServiceImpl.class);

    private final SerialGeneratorRepository serialGeneratorRepository;

    private final SerialGeneratorMapper serialGeneratorMapper;

    public SerialGeneratorServiceImpl(SerialGeneratorRepository serialGeneratorRepository, SerialGeneratorMapper serialGeneratorMapper) {
        this.serialGeneratorRepository = serialGeneratorRepository;
        this.serialGeneratorMapper = serialGeneratorMapper;
    }

    /**
     * Save a serialGenerator.
     *
     * @param serialGeneratorDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public SerialGeneratorDTO save(SerialGeneratorDTO serialGeneratorDTO) {
        log.debug("Request to save SerialGenerator : {}", serialGeneratorDTO);
        SerialGenerator serialGenerator = serialGeneratorMapper.toEntity(serialGeneratorDTO);
        serialGenerator = serialGeneratorRepository.save(serialGenerator);
        return serialGeneratorMapper.toDto(serialGenerator);
    }

    /**
     * Get all the serialGenerators.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<SerialGeneratorDTO> findAll() {
        log.debug("Request to get all SerialGenerators");
        return serialGeneratorRepository.findAll().stream()
            .map(serialGeneratorMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one serialGenerator by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<SerialGeneratorDTO> findOne(Long id) {
        log.debug("Request to get SerialGenerator : {}", id);
        return serialGeneratorRepository.findById(id)
            .map(serialGeneratorMapper::toDto);
    }

    /**
     * Delete the serialGenerator by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SerialGenerator : {}", id);
        serialGeneratorRepository.deleteById(id);
    }
}
