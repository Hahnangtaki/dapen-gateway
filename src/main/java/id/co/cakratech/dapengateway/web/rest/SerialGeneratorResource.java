package id.co.cakratech.dapengateway.web.rest;

import id.co.cakratech.dapengateway.service.SerialGeneratorService;
import id.co.cakratech.dapengateway.web.rest.errors.BadRequestAlertException;
import id.co.cakratech.dapengateway.service.dto.SerialGeneratorDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link id.co.cakratech.dapengateway.domain.SerialGenerator}.
 */
@RestController
@RequestMapping("/api")
public class SerialGeneratorResource {

    private final Logger log = LoggerFactory.getLogger(SerialGeneratorResource.class);

    private static final String ENTITY_NAME = "serialGenerator";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SerialGeneratorService serialGeneratorService;

    public SerialGeneratorResource(SerialGeneratorService serialGeneratorService) {
        this.serialGeneratorService = serialGeneratorService;
    }

    /**
     * {@code POST  /serial-generators} : Create a new serialGenerator.
     *
     * @param serialGeneratorDTO the serialGeneratorDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new serialGeneratorDTO, or with status {@code 400 (Bad Request)} if the serialGenerator has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/serial-generators")
    public ResponseEntity<SerialGeneratorDTO> createSerialGenerator(@Valid @RequestBody SerialGeneratorDTO serialGeneratorDTO) throws URISyntaxException {
        log.debug("REST request to save SerialGenerator : {}", serialGeneratorDTO);
        if (serialGeneratorDTO.getId() != null) {
            throw new BadRequestAlertException("A new serialGenerator cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SerialGeneratorDTO result = serialGeneratorService.save(serialGeneratorDTO);
        return ResponseEntity.created(new URI("/api/serial-generators/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /serial-generators} : Updates an existing serialGenerator.
     *
     * @param serialGeneratorDTO the serialGeneratorDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated serialGeneratorDTO,
     * or with status {@code 400 (Bad Request)} if the serialGeneratorDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the serialGeneratorDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/serial-generators")
    public ResponseEntity<SerialGeneratorDTO> updateSerialGenerator(@Valid @RequestBody SerialGeneratorDTO serialGeneratorDTO) throws URISyntaxException {
        log.debug("REST request to update SerialGenerator : {}", serialGeneratorDTO);
        if (serialGeneratorDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SerialGeneratorDTO result = serialGeneratorService.save(serialGeneratorDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, serialGeneratorDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /serial-generators} : get all the serialGenerators.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of serialGenerators in body.
     */
    @GetMapping("/serial-generators")
    public List<SerialGeneratorDTO> getAllSerialGenerators() {
        log.debug("REST request to get all SerialGenerators");
        return serialGeneratorService.findAll();
    }

    /**
     * {@code GET  /serial-generators/:id} : get the "id" serialGenerator.
     *
     * @param id the id of the serialGeneratorDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the serialGeneratorDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/serial-generators/{id}")
    public ResponseEntity<SerialGeneratorDTO> getSerialGenerator(@PathVariable Long id) {
        log.debug("REST request to get SerialGenerator : {}", id);
        Optional<SerialGeneratorDTO> serialGeneratorDTO = serialGeneratorService.findOne(id);
        return ResponseUtil.wrapOrNotFound(serialGeneratorDTO);
    }

    /**
     * {@code DELETE  /serial-generators/:id} : delete the "id" serialGenerator.
     *
     * @param id the id of the serialGeneratorDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/serial-generators/{id}")
    public ResponseEntity<Void> deleteSerialGenerator(@PathVariable Long id) {
        log.debug("REST request to delete SerialGenerator : {}", id);
        serialGeneratorService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
