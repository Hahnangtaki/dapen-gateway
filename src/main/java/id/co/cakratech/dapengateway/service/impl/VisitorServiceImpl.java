package id.co.cakratech.dapengateway.service.impl;

import id.co.cakratech.dapengateway.service.VisitorService;
import id.co.cakratech.dapengateway.domain.Visitor;
import id.co.cakratech.dapengateway.repository.VisitorRepository;
import id.co.cakratech.dapengateway.service.dto.VisitorDTO;
import id.co.cakratech.dapengateway.service.mapper.VisitorMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Visitor}.
 */
@Service
@Transactional
public class VisitorServiceImpl implements VisitorService {

    private final Logger log = LoggerFactory.getLogger(VisitorServiceImpl.class);

    private final VisitorRepository visitorRepository;

    private final VisitorMapper visitorMapper;

    public VisitorServiceImpl(VisitorRepository visitorRepository, VisitorMapper visitorMapper) {
        this.visitorRepository = visitorRepository;
        this.visitorMapper = visitorMapper;
    }

    /**
     * Save a visitor.
     *
     * @param visitorDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public VisitorDTO save(VisitorDTO visitorDTO) {
        log.debug("Request to save Visitor : {}", visitorDTO);
        Visitor visitor = visitorMapper.toEntity(visitorDTO);
        visitor = visitorRepository.save(visitor);
        return visitorMapper.toDto(visitor);
    }

    /**
     * Get all the visitors.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<VisitorDTO> findAll() {
        log.debug("Request to get all Visitors");
        return visitorRepository.findAll().stream()
            .map(visitorMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one visitor by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<VisitorDTO> findOne(Long id) {
        log.debug("Request to get Visitor : {}", id);
        return visitorRepository.findById(id)
            .map(visitorMapper::toDto);
    }

    /**
     * Delete the visitor by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Visitor : {}", id);
        visitorRepository.deleteById(id);
    }
}
