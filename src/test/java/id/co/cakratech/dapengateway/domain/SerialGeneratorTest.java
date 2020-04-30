package id.co.cakratech.dapengateway.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import id.co.cakratech.dapengateway.web.rest.TestUtil;

public class SerialGeneratorTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SerialGenerator.class);
        SerialGenerator serialGenerator1 = new SerialGenerator();
        serialGenerator1.setId(1L);
        SerialGenerator serialGenerator2 = new SerialGenerator();
        serialGenerator2.setId(serialGenerator1.getId());
        assertThat(serialGenerator1).isEqualTo(serialGenerator2);
        serialGenerator2.setId(2L);
        assertThat(serialGenerator1).isNotEqualTo(serialGenerator2);
        serialGenerator1.setId(null);
        assertThat(serialGenerator1).isNotEqualTo(serialGenerator2);
    }
}
