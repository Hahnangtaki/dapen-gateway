package id.co.cakratech.dapengateway.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class SerialGeneratorMapperTest {

    private SerialGeneratorMapper serialGeneratorMapper;

    @BeforeEach
    public void setUp() {
        serialGeneratorMapper = new SerialGeneratorMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(serialGeneratorMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(serialGeneratorMapper.fromId(null)).isNull();
    }
}
