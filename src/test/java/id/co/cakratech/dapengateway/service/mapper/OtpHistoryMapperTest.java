package id.co.cakratech.dapengateway.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class OtpHistoryMapperTest {

    private OtpHistoryMapper otpHistoryMapper;

    @BeforeEach
    public void setUp() {
        otpHistoryMapper = new OtpHistoryMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(otpHistoryMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(otpHistoryMapper.fromId(null)).isNull();
    }
}
