package id.co.cakratech.dapengateway.service.impl;

import id.co.cakratech.dapengateway.service.OtpHistoryService;
import id.co.cakratech.dapengateway.domain.OtpHistory;
import id.co.cakratech.dapengateway.repository.OtpHistoryRepository;
import id.co.cakratech.dapengateway.service.dto.OtpHistoryDTO;
import id.co.cakratech.dapengateway.service.mapper.OtpHistoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link OtpHistory}.
 */
@Service
@Transactional
public class OtpHistoryServiceImpl implements OtpHistoryService {

    private final Logger log = LoggerFactory.getLogger(OtpHistoryServiceImpl.class);

    private final OtpHistoryRepository otpHistoryRepository;

    private final OtpHistoryMapper otpHistoryMapper;

    public OtpHistoryServiceImpl(OtpHistoryRepository otpHistoryRepository, OtpHistoryMapper otpHistoryMapper) {
        this.otpHistoryRepository = otpHistoryRepository;
        this.otpHistoryMapper = otpHistoryMapper;
    }

    /**
     * Save a otpHistory.
     *
     * @param otpHistoryDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public OtpHistoryDTO save(OtpHistoryDTO otpHistoryDTO) {
        log.debug("Request to save OtpHistory : {}", otpHistoryDTO);
        OtpHistory otpHistory = otpHistoryMapper.toEntity(otpHistoryDTO);
        otpHistory = otpHistoryRepository.save(otpHistory);
        return otpHistoryMapper.toDto(otpHistory);
    }

    /**
     * Get all the otpHistories.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<OtpHistoryDTO> findAll() {
        log.debug("Request to get all OtpHistories");
        return otpHistoryRepository.findAll().stream()
            .map(otpHistoryMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one otpHistory by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<OtpHistoryDTO> findOne(Long id) {
        log.debug("Request to get OtpHistory : {}", id);
        return otpHistoryRepository.findById(id)
            .map(otpHistoryMapper::toDto);
    }

    /**
     * Delete the otpHistory by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete OtpHistory : {}", id);
        otpHistoryRepository.deleteById(id);
    }
}
