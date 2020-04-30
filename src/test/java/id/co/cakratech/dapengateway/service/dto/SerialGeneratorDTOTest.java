package id.co.cakratech.dapengateway.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import id.co.cakratech.dapengateway.web.rest.TestUtil;

public class SerialGeneratorDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SerialGeneratorDTO.class);
        SerialGeneratorDTO serialGeneratorDTO1 = new SerialGeneratorDTO();
        serialGeneratorDTO1.setId(1L);
        SerialGeneratorDTO serialGeneratorDTO2 = new SerialGeneratorDTO();
        assertThat(serialGeneratorDTO1).isNotEqualTo(serialGeneratorDTO2);
        serialGeneratorDTO2.setId(serialGeneratorDTO1.getId());
        assertThat(serialGeneratorDTO1).isEqualTo(serialGeneratorDTO2);
        serialGeneratorDTO2.setId(2L);
        assertThat(serialGeneratorDTO1).isNotEqualTo(serialGeneratorDTO2);
        serialGeneratorDTO1.setId(null);
        assertThat(serialGeneratorDTO1).isNotEqualTo(serialGeneratorDTO2);
    }
}
