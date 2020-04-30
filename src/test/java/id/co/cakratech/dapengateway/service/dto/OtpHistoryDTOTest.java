package id.co.cakratech.dapengateway.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import id.co.cakratech.dapengateway.web.rest.TestUtil;

public class OtpHistoryDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(OtpHistoryDTO.class);
        OtpHistoryDTO otpHistoryDTO1 = new OtpHistoryDTO();
        otpHistoryDTO1.setId(1L);
        OtpHistoryDTO otpHistoryDTO2 = new OtpHistoryDTO();
        assertThat(otpHistoryDTO1).isNotEqualTo(otpHistoryDTO2);
        otpHistoryDTO2.setId(otpHistoryDTO1.getId());
        assertThat(otpHistoryDTO1).isEqualTo(otpHistoryDTO2);
        otpHistoryDTO2.setId(2L);
        assertThat(otpHistoryDTO1).isNotEqualTo(otpHistoryDTO2);
        otpHistoryDTO1.setId(null);
        assertThat(otpHistoryDTO1).isNotEqualTo(otpHistoryDTO2);
    }
}
