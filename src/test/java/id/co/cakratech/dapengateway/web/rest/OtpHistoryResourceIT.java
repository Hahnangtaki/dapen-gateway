package id.co.cakratech.dapengateway.web.rest;

import id.co.cakratech.dapengateway.DapenApp;
import id.co.cakratech.dapengateway.domain.OtpHistory;
import id.co.cakratech.dapengateway.repository.OtpHistoryRepository;
import id.co.cakratech.dapengateway.service.OtpHistoryService;
import id.co.cakratech.dapengateway.service.dto.OtpHistoryDTO;
import id.co.cakratech.dapengateway.service.mapper.OtpHistoryMapper;

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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static id.co.cakratech.dapengateway.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link OtpHistoryResource} REST controller.
 */
@SpringBootTest(classes = DapenApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class OtpHistoryResourceIT {

    private static final String DEFAULT_REFF_NO = "AAAAAAAAAA";
    private static final String UPDATED_REFF_NO = "BBBBBBBBBB";

    private static final String DEFAULT_ENCODED_OTP = "AAAAAAAAAA";
    private static final String UPDATED_ENCODED_OTP = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATED_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_EXECUTED_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_EXECUTED_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_EXPIRED_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_EXPIRED_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Integer DEFAULT_RETRY_MAX = 1;
    private static final Integer UPDATED_RETRY_MAX = 2;

    private static final Integer DEFAULT_RETRY_COUNT = 1;
    private static final Integer UPDATED_RETRY_COUNT = 2;

    @Autowired
    private OtpHistoryRepository otpHistoryRepository;

    @Autowired
    private OtpHistoryMapper otpHistoryMapper;

    @Autowired
    private OtpHistoryService otpHistoryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOtpHistoryMockMvc;

    private OtpHistory otpHistory;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OtpHistory createEntity(EntityManager em) {
        OtpHistory otpHistory = new OtpHistory()
            .reffNo(DEFAULT_REFF_NO)
            .encodedOtp(DEFAULT_ENCODED_OTP)
            .createdTime(DEFAULT_CREATED_TIME)
            .executedTime(DEFAULT_EXECUTED_TIME)
            .expiredTime(DEFAULT_EXPIRED_TIME)
            .retryMax(DEFAULT_RETRY_MAX)
            .retryCount(DEFAULT_RETRY_COUNT);
        return otpHistory;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OtpHistory createUpdatedEntity(EntityManager em) {
        OtpHistory otpHistory = new OtpHistory()
            .reffNo(UPDATED_REFF_NO)
            .encodedOtp(UPDATED_ENCODED_OTP)
            .createdTime(UPDATED_CREATED_TIME)
            .executedTime(UPDATED_EXECUTED_TIME)
            .expiredTime(UPDATED_EXPIRED_TIME)
            .retryMax(UPDATED_RETRY_MAX)
            .retryCount(UPDATED_RETRY_COUNT);
        return otpHistory;
    }

    @BeforeEach
    public void initTest() {
        otpHistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createOtpHistory() throws Exception {
        int databaseSizeBeforeCreate = otpHistoryRepository.findAll().size();

        // Create the OtpHistory
        OtpHistoryDTO otpHistoryDTO = otpHistoryMapper.toDto(otpHistory);
        restOtpHistoryMockMvc.perform(post("/api/otp-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(otpHistoryDTO)))
            .andExpect(status().isCreated());

        // Validate the OtpHistory in the database
        List<OtpHistory> otpHistoryList = otpHistoryRepository.findAll();
        assertThat(otpHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        OtpHistory testOtpHistory = otpHistoryList.get(otpHistoryList.size() - 1);
        assertThat(testOtpHistory.getReffNo()).isEqualTo(DEFAULT_REFF_NO);
        assertThat(testOtpHistory.getEncodedOtp()).isEqualTo(DEFAULT_ENCODED_OTP);
        assertThat(testOtpHistory.getCreatedTime()).isEqualTo(DEFAULT_CREATED_TIME);
        assertThat(testOtpHistory.getExecutedTime()).isEqualTo(DEFAULT_EXECUTED_TIME);
        assertThat(testOtpHistory.getExpiredTime()).isEqualTo(DEFAULT_EXPIRED_TIME);
        assertThat(testOtpHistory.getRetryMax()).isEqualTo(DEFAULT_RETRY_MAX);
        assertThat(testOtpHistory.getRetryCount()).isEqualTo(DEFAULT_RETRY_COUNT);
    }

    @Test
    @Transactional
    public void createOtpHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = otpHistoryRepository.findAll().size();

        // Create the OtpHistory with an existing ID
        otpHistory.setId(1L);
        OtpHistoryDTO otpHistoryDTO = otpHistoryMapper.toDto(otpHistory);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOtpHistoryMockMvc.perform(post("/api/otp-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(otpHistoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the OtpHistory in the database
        List<OtpHistory> otpHistoryList = otpHistoryRepository.findAll();
        assertThat(otpHistoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllOtpHistories() throws Exception {
        // Initialize the database
        otpHistoryRepository.saveAndFlush(otpHistory);

        // Get all the otpHistoryList
        restOtpHistoryMockMvc.perform(get("/api/otp-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(otpHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].reffNo").value(hasItem(DEFAULT_REFF_NO)))
            .andExpect(jsonPath("$.[*].encodedOtp").value(hasItem(DEFAULT_ENCODED_OTP)))
            .andExpect(jsonPath("$.[*].createdTime").value(hasItem(sameInstant(DEFAULT_CREATED_TIME))))
            .andExpect(jsonPath("$.[*].executedTime").value(hasItem(sameInstant(DEFAULT_EXECUTED_TIME))))
            .andExpect(jsonPath("$.[*].expiredTime").value(hasItem(sameInstant(DEFAULT_EXPIRED_TIME))))
            .andExpect(jsonPath("$.[*].retryMax").value(hasItem(DEFAULT_RETRY_MAX)))
            .andExpect(jsonPath("$.[*].retryCount").value(hasItem(DEFAULT_RETRY_COUNT)));
    }
    
    @Test
    @Transactional
    public void getOtpHistory() throws Exception {
        // Initialize the database
        otpHistoryRepository.saveAndFlush(otpHistory);

        // Get the otpHistory
        restOtpHistoryMockMvc.perform(get("/api/otp-histories/{id}", otpHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(otpHistory.getId().intValue()))
            .andExpect(jsonPath("$.reffNo").value(DEFAULT_REFF_NO))
            .andExpect(jsonPath("$.encodedOtp").value(DEFAULT_ENCODED_OTP))
            .andExpect(jsonPath("$.createdTime").value(sameInstant(DEFAULT_CREATED_TIME)))
            .andExpect(jsonPath("$.executedTime").value(sameInstant(DEFAULT_EXECUTED_TIME)))
            .andExpect(jsonPath("$.expiredTime").value(sameInstant(DEFAULT_EXPIRED_TIME)))
            .andExpect(jsonPath("$.retryMax").value(DEFAULT_RETRY_MAX))
            .andExpect(jsonPath("$.retryCount").value(DEFAULT_RETRY_COUNT));
    }

    @Test
    @Transactional
    public void getNonExistingOtpHistory() throws Exception {
        // Get the otpHistory
        restOtpHistoryMockMvc.perform(get("/api/otp-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOtpHistory() throws Exception {
        // Initialize the database
        otpHistoryRepository.saveAndFlush(otpHistory);

        int databaseSizeBeforeUpdate = otpHistoryRepository.findAll().size();

        // Update the otpHistory
        OtpHistory updatedOtpHistory = otpHistoryRepository.findById(otpHistory.getId()).get();
        // Disconnect from session so that the updates on updatedOtpHistory are not directly saved in db
        em.detach(updatedOtpHistory);
        updatedOtpHistory
            .reffNo(UPDATED_REFF_NO)
            .encodedOtp(UPDATED_ENCODED_OTP)
            .createdTime(UPDATED_CREATED_TIME)
            .executedTime(UPDATED_EXECUTED_TIME)
            .expiredTime(UPDATED_EXPIRED_TIME)
            .retryMax(UPDATED_RETRY_MAX)
            .retryCount(UPDATED_RETRY_COUNT);
        OtpHistoryDTO otpHistoryDTO = otpHistoryMapper.toDto(updatedOtpHistory);

        restOtpHistoryMockMvc.perform(put("/api/otp-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(otpHistoryDTO)))
            .andExpect(status().isOk());

        // Validate the OtpHistory in the database
        List<OtpHistory> otpHistoryList = otpHistoryRepository.findAll();
        assertThat(otpHistoryList).hasSize(databaseSizeBeforeUpdate);
        OtpHistory testOtpHistory = otpHistoryList.get(otpHistoryList.size() - 1);
        assertThat(testOtpHistory.getReffNo()).isEqualTo(UPDATED_REFF_NO);
        assertThat(testOtpHistory.getEncodedOtp()).isEqualTo(UPDATED_ENCODED_OTP);
        assertThat(testOtpHistory.getCreatedTime()).isEqualTo(UPDATED_CREATED_TIME);
        assertThat(testOtpHistory.getExecutedTime()).isEqualTo(UPDATED_EXECUTED_TIME);
        assertThat(testOtpHistory.getExpiredTime()).isEqualTo(UPDATED_EXPIRED_TIME);
        assertThat(testOtpHistory.getRetryMax()).isEqualTo(UPDATED_RETRY_MAX);
        assertThat(testOtpHistory.getRetryCount()).isEqualTo(UPDATED_RETRY_COUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingOtpHistory() throws Exception {
        int databaseSizeBeforeUpdate = otpHistoryRepository.findAll().size();

        // Create the OtpHistory
        OtpHistoryDTO otpHistoryDTO = otpHistoryMapper.toDto(otpHistory);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOtpHistoryMockMvc.perform(put("/api/otp-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(otpHistoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the OtpHistory in the database
        List<OtpHistory> otpHistoryList = otpHistoryRepository.findAll();
        assertThat(otpHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOtpHistory() throws Exception {
        // Initialize the database
        otpHistoryRepository.saveAndFlush(otpHistory);

        int databaseSizeBeforeDelete = otpHistoryRepository.findAll().size();

        // Delete the otpHistory
        restOtpHistoryMockMvc.perform(delete("/api/otp-histories/{id}", otpHistory.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OtpHistory> otpHistoryList = otpHistoryRepository.findAll();
        assertThat(otpHistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
