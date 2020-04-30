package id.co.cakratech.dapengateway.web.rest;

import id.co.cakratech.dapengateway.DapenApp;
import id.co.cakratech.dapengateway.domain.Visitor;
import id.co.cakratech.dapengateway.repository.VisitorRepository;
import id.co.cakratech.dapengateway.service.VisitorService;
import id.co.cakratech.dapengateway.service.dto.VisitorDTO;
import id.co.cakratech.dapengateway.service.mapper.VisitorMapper;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link VisitorResource} REST controller.
 */
@SpringBootTest(classes = DapenApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class VisitorResourceIT {

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_MOBILE_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_MOBILE_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_ENCODED_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_ENCODED_PASSWORD = "BBBBBBBBBB";

    private static final Integer DEFAULT_MEMBER_STATUS = 1;
    private static final Integer UPDATED_MEMBER_STATUS = 2;

    private static final LocalDate DEFAULT_MEMBER_SINCE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_MEMBER_SINCE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private VisitorRepository visitorRepository;

    @Autowired
    private VisitorMapper visitorMapper;

    @Autowired
    private VisitorService visitorService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVisitorMockMvc;

    private Visitor visitor;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Visitor createEntity(EntityManager em) {
        Visitor visitor = new Visitor()
            .email(DEFAULT_EMAIL)
            .mobilePhone(DEFAULT_MOBILE_PHONE)
            .encodedPassword(DEFAULT_ENCODED_PASSWORD)
            .memberStatus(DEFAULT_MEMBER_STATUS)
            .memberSince(DEFAULT_MEMBER_SINCE);
        return visitor;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Visitor createUpdatedEntity(EntityManager em) {
        Visitor visitor = new Visitor()
            .email(UPDATED_EMAIL)
            .mobilePhone(UPDATED_MOBILE_PHONE)
            .encodedPassword(UPDATED_ENCODED_PASSWORD)
            .memberStatus(UPDATED_MEMBER_STATUS)
            .memberSince(UPDATED_MEMBER_SINCE);
        return visitor;
    }

    @BeforeEach
    public void initTest() {
        visitor = createEntity(em);
    }

    @Test
    @Transactional
    public void createVisitor() throws Exception {
        int databaseSizeBeforeCreate = visitorRepository.findAll().size();

        // Create the Visitor
        VisitorDTO visitorDTO = visitorMapper.toDto(visitor);
        restVisitorMockMvc.perform(post("/api/visitors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(visitorDTO)))
            .andExpect(status().isCreated());

        // Validate the Visitor in the database
        List<Visitor> visitorList = visitorRepository.findAll();
        assertThat(visitorList).hasSize(databaseSizeBeforeCreate + 1);
        Visitor testVisitor = visitorList.get(visitorList.size() - 1);
        assertThat(testVisitor.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testVisitor.getMobilePhone()).isEqualTo(DEFAULT_MOBILE_PHONE);
        assertThat(testVisitor.getEncodedPassword()).isEqualTo(DEFAULT_ENCODED_PASSWORD);
        assertThat(testVisitor.getMemberStatus()).isEqualTo(DEFAULT_MEMBER_STATUS);
        assertThat(testVisitor.getMemberSince()).isEqualTo(DEFAULT_MEMBER_SINCE);
    }

    @Test
    @Transactional
    public void createVisitorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = visitorRepository.findAll().size();

        // Create the Visitor with an existing ID
        visitor.setId(1L);
        VisitorDTO visitorDTO = visitorMapper.toDto(visitor);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVisitorMockMvc.perform(post("/api/visitors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(visitorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Visitor in the database
        List<Visitor> visitorList = visitorRepository.findAll();
        assertThat(visitorList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllVisitors() throws Exception {
        // Initialize the database
        visitorRepository.saveAndFlush(visitor);

        // Get all the visitorList
        restVisitorMockMvc.perform(get("/api/visitors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(visitor.getId().intValue())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].mobilePhone").value(hasItem(DEFAULT_MOBILE_PHONE)))
            .andExpect(jsonPath("$.[*].encodedPassword").value(hasItem(DEFAULT_ENCODED_PASSWORD)))
            .andExpect(jsonPath("$.[*].memberStatus").value(hasItem(DEFAULT_MEMBER_STATUS)))
            .andExpect(jsonPath("$.[*].memberSince").value(hasItem(DEFAULT_MEMBER_SINCE.toString())));
    }
    
    @Test
    @Transactional
    public void getVisitor() throws Exception {
        // Initialize the database
        visitorRepository.saveAndFlush(visitor);

        // Get the visitor
        restVisitorMockMvc.perform(get("/api/visitors/{id}", visitor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(visitor.getId().intValue()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.mobilePhone").value(DEFAULT_MOBILE_PHONE))
            .andExpect(jsonPath("$.encodedPassword").value(DEFAULT_ENCODED_PASSWORD))
            .andExpect(jsonPath("$.memberStatus").value(DEFAULT_MEMBER_STATUS))
            .andExpect(jsonPath("$.memberSince").value(DEFAULT_MEMBER_SINCE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVisitor() throws Exception {
        // Get the visitor
        restVisitorMockMvc.perform(get("/api/visitors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVisitor() throws Exception {
        // Initialize the database
        visitorRepository.saveAndFlush(visitor);

        int databaseSizeBeforeUpdate = visitorRepository.findAll().size();

        // Update the visitor
        Visitor updatedVisitor = visitorRepository.findById(visitor.getId()).get();
        // Disconnect from session so that the updates on updatedVisitor are not directly saved in db
        em.detach(updatedVisitor);
        updatedVisitor
            .email(UPDATED_EMAIL)
            .mobilePhone(UPDATED_MOBILE_PHONE)
            .encodedPassword(UPDATED_ENCODED_PASSWORD)
            .memberStatus(UPDATED_MEMBER_STATUS)
            .memberSince(UPDATED_MEMBER_SINCE);
        VisitorDTO visitorDTO = visitorMapper.toDto(updatedVisitor);

        restVisitorMockMvc.perform(put("/api/visitors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(visitorDTO)))
            .andExpect(status().isOk());

        // Validate the Visitor in the database
        List<Visitor> visitorList = visitorRepository.findAll();
        assertThat(visitorList).hasSize(databaseSizeBeforeUpdate);
        Visitor testVisitor = visitorList.get(visitorList.size() - 1);
        assertThat(testVisitor.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testVisitor.getMobilePhone()).isEqualTo(UPDATED_MOBILE_PHONE);
        assertThat(testVisitor.getEncodedPassword()).isEqualTo(UPDATED_ENCODED_PASSWORD);
        assertThat(testVisitor.getMemberStatus()).isEqualTo(UPDATED_MEMBER_STATUS);
        assertThat(testVisitor.getMemberSince()).isEqualTo(UPDATED_MEMBER_SINCE);
    }

    @Test
    @Transactional
    public void updateNonExistingVisitor() throws Exception {
        int databaseSizeBeforeUpdate = visitorRepository.findAll().size();

        // Create the Visitor
        VisitorDTO visitorDTO = visitorMapper.toDto(visitor);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVisitorMockMvc.perform(put("/api/visitors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(visitorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Visitor in the database
        List<Visitor> visitorList = visitorRepository.findAll();
        assertThat(visitorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVisitor() throws Exception {
        // Initialize the database
        visitorRepository.saveAndFlush(visitor);

        int databaseSizeBeforeDelete = visitorRepository.findAll().size();

        // Delete the visitor
        restVisitorMockMvc.perform(delete("/api/visitors/{id}", visitor.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Visitor> visitorList = visitorRepository.findAll();
        assertThat(visitorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
