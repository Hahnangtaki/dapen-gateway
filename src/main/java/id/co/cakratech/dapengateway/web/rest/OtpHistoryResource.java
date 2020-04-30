package id.co.cakratech.dapengateway.web.rest;

import id.co.cakratech.dapengateway.service.OtpHistoryService;
import id.co.cakratech.dapengateway.web.rest.errors.BadRequestAlertException;
import id.co.cakratech.dapengateway.service.dto.OtpHistoryDTO;

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
 * REST controller for managing {@link id.co.cakratech.dapengateway.domain.OtpHistory}.
 */
@RestController
@RequestMapping("/api")
public class OtpHistoryResource {

    private final Logger log = LoggerFactory.getLogger(OtpHistoryResource.class);

    private static final String ENTITY_NAME = "otpHistory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OtpHistoryService otpHistoryService;

    public OtpHistoryResource(OtpHistoryService otpHistoryService) {
        this.otpHistoryService = otpHistoryService;
    }

    /**
     * {@code POST  /otp-histories} : Create a new otpHistory.
     *
     * @param otpHistoryDTO the otpHistoryDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new otpHistoryDTO, or with status {@code 400 (Bad Request)} if the otpHistory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/otp-histories")
    public ResponseEntity<OtpHistoryDTO> createOtpHistory(@Valid @RequestBody OtpHistoryDTO otpHistoryDTO) throws URISyntaxException {
        log.debug("REST request to save OtpHistory : {}", otpHistoryDTO);
        if (otpHistoryDTO.getId() != null) {
            throw new BadRequestAlertException("A new otpHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OtpHistoryDTO result = otpHistoryService.save(otpHistoryDTO);
        return ResponseEntity.created(new URI("/api/otp-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /otp-histories} : Updates an existing otpHistory.
     *
     * @param otpHistoryDTO the otpHistoryDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated otpHistoryDTO,
     * or with status {@code 400 (Bad Request)} if the otpHistoryDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the otpHistoryDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/otp-histories")
    public ResponseEntity<OtpHistoryDTO> updateOtpHistory(@Valid @RequestBody OtpHistoryDTO otpHistoryDTO) throws URISyntaxException {
        log.debug("REST request to update OtpHistory : {}", otpHistoryDTO);
        if (otpHistoryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OtpHistoryDTO result = otpHistoryService.save(otpHistoryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, otpHistoryDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /otp-histories} : get all the otpHistories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of otpHistories in body.
     */
    @GetMapping("/otp-histories")
    public List<OtpHistoryDTO> getAllOtpHistories() {
        log.debug("REST request to get all OtpHistories");
        return otpHistoryService.findAll();
    }

    /**
     * {@code GET  /otp-histories/:id} : get the "id" otpHistory.
     *
     * @param id the id of the otpHistoryDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the otpHistoryDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/otp-histories/{id}")
    public ResponseEntity<OtpHistoryDTO> getOtpHistory(@PathVariable Long id) {
        log.debug("REST request to get OtpHistory : {}", id);
        Optional<OtpHistoryDTO> otpHistoryDTO = otpHistoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(otpHistoryDTO);
    }

    /**
     * {@code DELETE  /otp-histories/:id} : delete the "id" otpHistory.
     *
     * @param id the id of the otpHistoryDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/otp-histories/{id}")
    public ResponseEntity<Void> deleteOtpHistory(@PathVariable Long id) {
        log.debug("REST request to delete OtpHistory : {}", id);
        otpHistoryService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
