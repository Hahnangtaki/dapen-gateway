package id.co.cakratech.dapengateway.web.rest;

import id.co.cakratech.dapengateway.DapenApp;
import id.co.cakratech.dapengateway.domain.SerialGenerator;
import id.co.cakratech.dapengateway.repository.SerialGeneratorRepository;
import id.co.cakratech.dapengateway.service.SerialGeneratorService;
import id.co.cakratech.dapengateway.service.dto.SerialGeneratorDTO;
import id.co.cakratech.dapengateway.service.mapper.SerialGeneratorMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SerialGeneratorResource} REST controller.
 */
@SpringBootTest(classes = DapenApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class SerialGeneratorResourceIT {

    private static final String DEFAULT_PROCESS_CODE = "A";
    private static final String UPDATED_PROCESS_CODE = "B";

    private static final String DEFAULT_PROCESS_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PROCESS_NAME = "BBBBBBBBBB";

    private static final Long DEFAULT_COUNTER = 1L;
    private static final Long UPDATED_COUNTER = 2L;

    @Autowired
    private SerialGeneratorRepository serialGeneratorRepository;

    @Autowired
    private SerialGeneratorMapper serialGeneratorMapper;

    @Autowired
    private SerialGeneratorService serialGeneratorService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSerialGeneratorMockMvc;

    private SerialGenerator serialGenerator;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SerialGenerator createEntity(EntityManager em) {
        SerialGenerator serialGenerator = new SerialGenerator()
            .processCode(DEFAULT_PROCESS_CODE)
            .processName(DEFAULT_PROCESS_NAME)
            .counter(DEFAULT_COUNTER);
        return serialGenerator;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SerialGenerator createUpdatedEntity(EntityManager em) {
        SerialGenerator serialGenerator = new SerialGenerator()
            .processCode(UPDATED_PROCESS_CODE)
            .processName(UPDATED_PROCESS_NAME)
            .counter(UPDATED_COUNTER);
        return serialGenerator;
    }

    @BeforeEach
    public void initTest() {
        serialGenerator = createEntity(em);
    }

    @Test
    @Transactional
    public void createSerialGenerator() throws Exception {
        int databaseSizeBeforeCreate = serialGeneratorRepository.findAll().size();

        // Create the SerialGenerator
        SerialGeneratorDTO serialGeneratorDTO = serialGeneratorMapper.toDto(serialGenerator);
        restSerialGeneratorMockMvc.perform(post("/api/serial-generators")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serialGeneratorDTO)))
            .andExpect(status().isCreated());

        // Validate the SerialGenerator in the database
        List<SerialGenerator> serialGeneratorList = serialGeneratorRepository.findAll();
        assertThat(serialGeneratorList).hasSize(databaseSizeBeforeCreate + 1);
        SerialGenerator testSerialGenerator = serialGeneratorList.get(serialGeneratorList.size() - 1);
        assertThat(testSerialGenerator.getProcessCode()).isEqualTo(DEFAULT_PROCESS_CODE);
        assertThat(testSerialGenerator.getProcessName()).isEqualTo(DEFAULT_PROCESS_NAME);
        assertThat(testSerialGenerator.getCounter()).isEqualTo(DEFAULT_COUNTER);
    }

    @Test
    @Transactional
    public void createSerialGeneratorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = serialGeneratorRepository.findAll().size();

        // Create the SerialGenerator with an existing ID
        serialGenerator.setId(1L);
        SerialGeneratorDTO serialGeneratorDTO = serialGeneratorMapper.toDto(serialGenerator);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSerialGeneratorMockMvc.perform(post("/api/serial-generators")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serialGeneratorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SerialGenerator in the database
        List<SerialGenerator> serialGeneratorList = serialGeneratorRepository.findAll();
        assertThat(serialGeneratorList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSerialGenerators() throws Exception {
        // Initialize the database
        serialGeneratorRepository.saveAndFlush(serialGenerator);

        // Get all the serialGeneratorList
        restSerialGeneratorMockMvc.perform(get("/api/serial-generators?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(serialGenerator.getId().intValue())))
            .andExpect(jsonPath("$.[*].processCode").value(hasItem(DEFAULT_PROCESS_CODE)))
            .andExpect(jsonPath("$.[*].processName").value(hasItem(DEFAULT_PROCESS_NAME)))
            .andExpect(jsonPath("$.[*].counter").value(hasItem(DEFAULT_COUNTER.intValue())));
    }
    
    @Test
    @Transactional
    public void getSerialGenerator() throws Exception {
        // Initialize the database
        serialGeneratorRepository.saveAndFlush(serialGenerator);

        // Get the serialGenerator
        restSerialGeneratorMockMvc.perform(get("/api/serial-generators/{id}", serialGenerator.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(serialGenerator.getId().intValue()))
            .andExpect(jsonPath("$.processCode").value(DEFAULT_PROCESS_CODE))
            .andExpect(jsonPath("$.processName").value(DEFAULT_PROCESS_NAME))
            .andExpect(jsonPath("$.counter").value(DEFAULT_COUNTER.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSerialGenerator() throws Exception {
        // Get the serialGenerator
        restSerialGeneratorMockMvc.perform(get("/api/serial-generators/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSerialGenerator() throws Exception {
        // Initialize the database
        serialGeneratorRepository.saveAndFlush(serialGenerator);

        int databaseSizeBeforeUpdate = serialGeneratorRepository.findAll().size();

        // Update the serialGenerator
        SerialGenerator updatedSerialGenerator = serialGeneratorRepository.findById(serialGenerator.getId()).get();
        // Disconnect from session so that the updates on updatedSerialGenerator are not directly saved in db
        em.detach(updatedSerialGenerator);
        updatedSerialGenerator
            .processCode(UPDATED_PROCESS_CODE)
            .processName(UPDATED_PROCESS_NAME)
            .counter(UPDATED_COUNTER);
        SerialGeneratorDTO serialGeneratorDTO = serialGeneratorMapper.toDto(updatedSerialGenerator);

        restSerialGeneratorMockMvc.perform(put("/api/serial-generators")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serialGeneratorDTO)))
            .andExpect(status().isOk());

        // Validate the SerialGenerator in the database
        List<SerialGenerator> serialGeneratorList = serialGeneratorRepository.findAll();
        assertThat(serialGeneratorList).hasSize(databaseSizeBeforeUpdate);
        SerialGenerator testSerialGenerator = serialGeneratorList.get(serialGeneratorList.size() - 1);
        assertThat(testSerialGenerator.getProcessCode()).isEqualTo(UPDATED_PROCESS_CODE);
        assertThat(testSerialGenerator.getProcessName()).isEqualTo(UPDATED_PROCESS_NAME);
        assertThat(testSerialGenerator.getCounter()).isEqualTo(UPDATED_COUNTER);
    }

    @Test
    @Transactional
    public void updateNonExistingSerialGenerator() throws Exception {
        int databaseSizeBeforeUpdate = serialGeneratorRepository.findAll().size();

        // Create the SerialGenerator
        SerialGeneratorDTO serialGeneratorDTO = serialGeneratorMapper.toDto(serialGenerator);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSerialGeneratorMockMvc.perform(put("/api/serial-generators")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serialGeneratorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SerialGenerator in the database
        List<SerialGenerator> serialGeneratorList = serialGeneratorRepository.findAll();
        assertThat(serialGeneratorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSerialGenerator() throws Exception {
        // Initialize the database
        serialGeneratorRepository.saveAndFlush(serialGenerator);

        int databaseSizeBeforeDelete = serialGeneratorRepository.findAll().size();

        // Delete the serialGenerator
        restSerialGeneratorMockMvc.perform(delete("/api/serial-generators/{id}", serialGenerator.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SerialGenerator> serialGeneratorList = serialGeneratorRepository.findAll();
        assertThat(serialGeneratorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
